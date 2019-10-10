// listen for scrolling
// let position = $(window).scrollTop();

$(window).scroll(function(event) {
  let scroll = $(window).scrollTop();

  // near the bottom
  if (scroll > 400) {
    $('.new-tweet').slideUp('slow', () => {
      $('#scroll-up').fadeIn('slow');
      $('nav div').fadeOut('slow');
      // listen for click
      $('#scroll-up').click(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        $('.new-tweet').fadeIn(2000, () => {
          $('textarea').focus();
        });
      });
    });

  // near the top
  } else {
    $('#scroll-up').fadeOut('slow');
    $('nav div').fadeIn('slow');

  }
  // position = scroll;
});


  




