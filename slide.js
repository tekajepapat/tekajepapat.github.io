const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: "infinite",
autoplay: {
    delay: 2000, // delay in milliseconds between slides
    disableOnInteraction: false, // prevent autoplay from being stopped when user interacts with swiper
  },
  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
