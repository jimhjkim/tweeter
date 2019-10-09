$(document).ready( () => {
  const $textarea = $('textarea');
  $textarea.on('keyup keydown', () => {    
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