// Navbar
document.addEventListener('DOMContentLoaded', function () {
  const userButton = document.getElementById('UserButton');
  const playerButton = document.getElementById('PlayerButton');
  const isiNavbar = document.getElementById('IsiNavbar');
  const isiNavbarMusic = document.getElementById('IsiNavbarMusic');
  const overlay = document.getElementById('Overlay');
  let isMenuOpen = false;
  let isMusicOpen = false;

  const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      isMusicOpen = false;
      updateNavbar();
  };

  const toggleMusicMenu = () => {
      isMusicOpen = !isMusicOpen;
      isMenuOpen = false;
      updateNavbar();
  };

  const updateNavbar = () => {
      isiNavbar.classList.toggle('menu-open', isMenuOpen);
      isiNavbarMusic.classList.toggle('menu-open', isMusicOpen);
      overlay.style.display = isMenuOpen || isMusicOpen ? 'block' : 'none';
  };

  userButton.addEventListener('click', toggleMenu);
  playerButton.addEventListener('click', toggleMusicMenu);

  document.addEventListener('click', function (event) {
      const isClickInsideNavbar = isiNavbar.contains(event.target);
      const isClickInsideNavbarMusic = isiNavbarMusic.contains(event.target);
      const isClickInsideUserButton = userButton.contains(event.target);
      const isClickInsidePlayerButton = playerButton.contains(event.target);

      if (!isClickInsideNavbar && !isClickInsideNavbarMusic && !isClickInsideUserButton && !isClickInsidePlayerButton && (isMenuOpen || isMusicOpen)) {
          isMenuOpen = false;
          isMusicOpen = false;
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
      step: 1
  });
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

(function () {
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

let currentAudio = null;

// function toggleMusicAlert() {
//   const musicAlert = document.getElementById('musicAlert');
//   if (musicAlert.style.display === 'none' || musicAlert.style.display === '') {
//       musicAlert.style.display = 'block';
//   } else {
//       musicAlert.style.display = 'none';
//   }

//   if (currentAudio) {
//       currentAudio.pause(); 
//       currentAudio.currentTime = 0;
//   }
// }

// function pauseMusic() {
//   if (currentAudio) {
//       currentAudio.pause();
//       currentAudio.currentTime = 0; // Atur waktu audio kembali ke awal
//   }
// }

// function playSong(song) {
    
//     if (currentAudio) {
//         currentAudio.pause(); 
//         currentAudio.currentTime = 0; 
//     }

//     alert(Memutar: ${song});
//     currentAudio = new Audio(song);
//     currentAudio.play();
// }


// Fungsi untuk menghentikan pemutaran lagu
function pauseMusic() {
  if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null; 
  }
}


const clientId = '8fa021d6754345208b87a086527318d8'; 
const clientSecret = '1d34fe75dabb415e9b90e11fc82cb679'; 
let accessToken = '';


async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
      },
      body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
      throw new Error('Gagal mendapatkan token akses');
  }

  const data = await response.json();
  accessToken = data.access_token;
}

// Mencari lagu
async function searchTracks(query) {
  const loadingElement = document.getElementById('loading');
  const resultsDiv = document.getElementById('results');

  // Tampilkan loading
  loadingElement.style.display = 'block';
  resultsDiv.innerHTML = ''; // Kosongkan hasil sebelumnya

  try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      displayResults(data.tracks.items);
  } catch (error) {
      resultsDiv.innerText = 'Error: ' + error.message;
  } finally {
      // Sembunyikan loading
      loadingElement.style.display = 'none';
  }
}

function displayResults(tracks) {
  const resultsDiv = document.getElementById('results');

  if (tracks.length === 0) {
      resultsDiv.innerHTML = '<p>Ra ono Hasile</p>';
      return;
  }

  tracks.forEach(track => {
      const trackDiv = document.createElement('div');
      trackDiv.className = 'track-block mb-2';

      const artistName = track.artists && track.artists.length > 0 ? track.artists[0].name : 'Goleki sing pener';
      const previewUrl = track.preview_url;

      trackDiv.innerHTML = `
          <div class="track-info">
              <span>${track.name} - ${artistName}</span>
              ${previewUrl ? `<button onclick="playPreview('${previewUrl}')" class=" text-white p-1" style="border-bottom: 1px solid #fff;">Setel</button>` : previewUrl ? `<button class=" text-white p-1" style="border-bottom: 1px solid #fff;">Setel Preview</button>` : '<span >Ra Tersedia</span>'}
          </div>
      `;
      resultsDiv.appendChild(trackDiv);
  });
}

function playPreview(previewUrl) {
  if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; 
  }

  currentAudio = new Audio(previewUrl);
  currentAudio.loop = true;
  currentAudio.play();

  currentAudio.onended = function () {
      currentAudio = null; 
  };
}

document.getElementById('searchButton').addEventListener('click', async () => {
  await getAccessToken();
  const query = document.getElementById('searchQuery').value.trim();
  if (query) {
      await searchTracks(query);
  } else {
      alert('Lebokno lagune sek..');
  }
});

const apiKey = "AIzaSyAHPaSJZUm7f19aCJ3PYIEIKgJ52a6agY0"; 
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

let chatHistory = []; 

document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

async function sendMessage() {
    let userInput = document.getElementById("userInput");
    let chatBox = document.getElementById("chatBox");
    let message = userInput.value.trim();

    if (message === "") return;

    displayMessage(message, "user");
    userInput.value = ""; 

    chatHistory.push({ role: "user", text: message });

    const requestBody = {
        contents: [{
            parts: [
                { text: generatePrompt() }, 
                { text: `**Pertanyaan:** ${message}` }
            ]
        }]
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            const data = await response.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak bisa memahami.";
            
            displayMessage(reply, "ai");

            chatHistory.push({ role: "ai", text: reply });
        } else {
            const errorText = await response.text();
            console.error("Response Error:", errorText);
            displayMessage("Error dalam mendapatkan respon.", "ai");
        }
    } catch (error) {
        console.error("Error:", error);
        displayMessage("Terjadi kesalahan saat menghubungi server.", "ai");
    }
}

function generatePrompt() {
    let basePrompt = `Jawab pertanyaan dengan informasi berikut:
    - Buatlah kamu sebagai alumni kelas 12 TKJ 4 (jangan mengaku kalau kamu AI) dan menjelaskan pertanyaan terkait,
      jika pertanyaan sudah tidak terkait maka jawab sesuai pengetahuanmu yang tahu segalanya.

    Tentang Kelas 12 TKJ 4 
    - Kelas ini adalah kelas 12 TKJ 4 dari jurusan Teknik Komputer dan Jaringan (TKJ).  
    - Jumlah murid 36 orang, terdiri dari 12 laki-laki dan 24 perempuan.  
    - **Wali kelas: Bu Evi Andri Kurniawati, S.Kom.  
    - Kelas ini pernah meraih juara 1 futsal dua kali berturut-turut di Classmeeting.  

    Tentang SMKN 1 Giritontro
    - Sekolah ini berlokasi di Desa Giritontro, Kabupaten Wonogiri, Jawa Tengah.  
    - Kepala sekolah: Bapak Mugiyono, S.Pd., M.Eng. 
    - Fasilitas oke, ada Lab. TKJ, Lab. NKPI, Lab. Teknik Elektronika, dan Lab. Tata Busana.
    - Parkiran luas, mushola ada dsb, jelaskan yang bagus bagus.
    - Memiliki 4 jurusan:  
      1. Teknik Komputer dan Jaringan (TKJ)  
      2. Teknik Elektronika  
      3. Nautika Kapal Penangkap Ikan (NKPI)  
      4. Tata Busana  
    - Info lebih lanjut bisa cek di [Website Resmi SMKN 1 Giritontro](https://smkn1giritontro.sch.id/)

     Murid-Murid di Kelas 12 TKJ 4 
    - Beberapa di antaranya: Amanda, Salsa, Annisa, Putri, Aryan, Ashila, Aurin, Bayu, Deby, Erlina, Dimas, Dita, Yogi, Fahmi, Fajar, Bella,
      Febri, Feti, Herlina, Jeny, Amel, Hanif, Nabila, Naila, Nasywa, Rama, Alsa, Qasa, Rahma, Riffat, Rovi, Septi, Syarip, Windi, Yuleha, Zharifah.  
    - Hanya sebutkan nama jika ditanya, jangan disebutkan jika tidak perlu. 

     Cara Menjawab
    - Jawab dengan bahasa santai, ramah, dan gaya anak muda (Gen-Z vibes).
    - Jika ditanya tentang **jurusan, jelaskan dengan pengetahuanmu.    
    - Jika pertanyaannya **tidak terkait**, tetap jawab dengan informasi yang relevan dan **jawab dengan senang hati**.`;

    chatHistory.forEach(chat => {
        basePrompt += `\n\n${chat.role === "user" ? "User" : "AI"}: ${chat.text}`;
    });

    return basePrompt;
}

function displayMessage(text, sender) {
    let chatBox = document.getElementById("chatBox");
    let messageContainer = document.createElement("div");
    let messageDiv = document.createElement("div");

    messageContainer.classList.add("flex", "items-center", "my-1");
    messageDiv.classList.add("p-2", "rounded-lg", "break-words", "max-w-xs");

    if (sender === "user") {
        messageContainer.classList.add("flex-row-reverse"); 
        messageDiv.classList.add("bg-gray-500", "text-white", "ml-auto");
        messageDiv.textContent = text; 
    } else {
        messageDiv.classList.add("bg-gray-300", "text-black", "mr-auto");

        let span = document.createElement("span");
        messageDiv.appendChild(span);
        messageContainer.appendChild(messageDiv);
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
        typeText(span, text);
        return;
    }

    messageContainer.appendChild(messageDiv);
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function typeText(element, text, speed = 10) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(typing, speed); 
        }
    }
    typing();
}

