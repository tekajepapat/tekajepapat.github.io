// Autoplay
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  }
});

// Open Modal
$(document).ready(function() {
  $('.swiper-slide').on('click', function() {
    var imgSrc = $(this).css('background-image').replace('url("', '').replace('")', '');
    $('#modalImg').attr('src', imgSrc);  
    $('#myModal').css("display", "block"); 
  });

  $(document).on('click', function(event) {
    if (event.target == document.getElementById("myModal")) {
      $('#myModal').css("display", "none"); 
    }
  });

  $('.close').on('click', function() {
    $('#myModal').css("display", "none"); 
  });
});

