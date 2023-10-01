function toggleNavbar() {
  const shouldAddClass = $(this).scrollTop() > 0.5*window.innerHeight;
  $('.navbar').toggleClass('bg-dark', shouldAddClass);
  $('.navbar').toggleClass('bg-transparent', !shouldAddClass);
}

toggleNavbar()
$(window).scroll(() => {
  toggleNavbar()
});


