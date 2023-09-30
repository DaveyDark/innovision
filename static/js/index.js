var typed = new Typed('#typed', {
  strings: ['athletic', 'health', 'love', 'fun', 'thrill', 'power', 'skill', 'art'],
  typeSpeed: 75,
  backSpeed: 75,
  loop: true,
});

function toggleNavbar() {
  const shouldAddClass = $(this).scrollTop() > 0.5*window.innerHeight;
  $('.navbar').toggleClass('bg-dark', shouldAddClass);
  $('.navbar').toggleClass('bg-transparent', !shouldAddClass);
}

$(document).ready(() => {
  toggleNavbar()
  $(window).scroll(() => {
    toggleNavbar()
  });
});


