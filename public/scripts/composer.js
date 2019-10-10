// initialize shouldHide variable to keep track of whether new-tweet box should be hidden or not
let shouldHide = true;
// listen for scrolling
$(window).scroll(function() {
  // get scroll position
  let scroll = $(window).scrollTop();
  // show scroll up button
  if (scroll > 300) {
    // slide the new-tweet box if user is scrolling down
    if (shouldHide) {
      $('.new-tweet').slideUp('slow');
    }
    $('#scroll-up').fadeIn('slow');
    $('nav div').fadeOut('slow');

    // listen for click
    $('#scroll-up').click(() => {
      shouldHide = false;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      $('.new-tweet').fadeIn(2000, () => {
        $('textarea').focus();
        shouldHide = true;
      });
    });
  // do not show scroll button
  } else {
    $('#scroll-up').fadeOut('slow');
    $('nav div').fadeIn('slow');

  }
});


  




