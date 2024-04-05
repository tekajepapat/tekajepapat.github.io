const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: "infinite",
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
  },
});
