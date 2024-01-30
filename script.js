
 //Navbar
  document.addEventListener('DOMContentLoaded', function () {
  const userButton = document.getElementById('UserButton');
  const isiNavbar = document.getElementById('IsiNavbar');
  const overlay = document.getElementById('Overlay');
  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    updateNavbar();
  };

  const updateNavbar = () => {
  isiNavbar.classList.toggle('menu-open', isMenuOpen);
  overlay.style.display = isMenuOpen ? 'block' : 'none';
};

  userButton.addEventListener('click', toggleMenu);

  document.addEventListener('click', function (event) {
    const isClickInsideNavbar = isiNavbar.contains(event.target) || userButton.contains(event.target);

    if (!isClickInsideNavbar && isMenuOpen) {
      isMenuOpen = false;
      updateNavbar();
    }
  });

  updateNavbar();
});

//fungsi rating

 var step = 100;

$(".slider").each(function () {
    var self = $(this);
    var slider = self.slider({
        create: function () {
            self.find('.text strong').text(self.slider('value'));
            setPathData(self.find('.smiley').find('svg path'), self.slider('value'));
        },
        slide: function (event, ui) {
            self.find('.text strong').text(ui.value);
            setPathData(self.find('.smiley').find('svg path'), ui.value);
        },
        range: 'min',
        min: 1,
        max: step,
        value: 50,
        step: 1 });

});

function setPathData(path, value) {
    var firstStep = 6 / step * value;
    var secondStep = 2 / step * value;
    path.attr('d', 'M1,' + (7 - firstStep) + ' C6.33333333,' + (2 + secondStep) + ' 11.6666667,' + (1 + firstStep) + ' 17,' + (1 + firstStep) + ' C22.3333333,' + (1 + firstStep) + ' 27.6666667,' + (2 + secondStep) + ' 33,' + (7 - firstStep));
}

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

//fungsi struktur dan jadwal
function showStruktur() {
  document.getElementById('strukturContent').style.display = 'block';
  document.getElementById('jadwalContent').style.display = 'none';
}

function showJadwal() {
  document.getElementById('strukturContent').style.display = 'none';
  document.getElementById('jadwalContent').style.display = 'block';
}

// Tampilkan struktur secara default
showStruktur();

//fungsi update year
function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.getElementById('copyrightYear');

  if (copyrightElement) {
    copyrightElement.textContent = `© ${currentYear} XII TKJ 4 | Dikelola Kelas TKJ 4`;
  }
}

updateCopyrightYear();
setInterval(updateCopyrightYear, 1000 * 60 * 60 * 24);
