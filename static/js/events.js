const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 2000,
  },
  breakpoints: {
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2, // Number of slides per view on screens >= 768px
    },
    576: {
      slidesPerView: 1, // Number of slides per view on screens >= 576px
    },
  },
});
