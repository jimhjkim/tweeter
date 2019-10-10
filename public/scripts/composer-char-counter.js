$(document).ready(() => {
  const $textarea = $('textarea');
  $textarea.on('input', () => {
    let charLength = $textarea.val().length;
    let lengthDisplay = $textarea.parent().find('.counter');

    lengthDisplay.text(`${140 - charLength}`);
   
    if ((140 - charLength) < 0) {
      lengthDisplay.addClass('red');
    } else {
      lengthDisplay.removeClass('red');
    }
  });

});