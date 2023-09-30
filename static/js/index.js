var typed = new Typed('#typed', {
  strings: ['athletic', 'health', 'love', 'fun', 'thrill', 'power', 'skill', 'art'],
  typeSpeed: 75,
  backSpeed: 75,
  loop: true,
});

$(document).ready(() => {
  $(window).scroll(() => {
    const shouldAddClass = $(this).scrollTop() > 0.5*window.innerHeight;
    $('.navbar').toggleClass('bg-dark', shouldAddClass);
    $('.navbar').toggleClass('bg-transparent', !shouldAddClass);
  });
});


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
});
