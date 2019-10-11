// logic occurs after page is ready
$(document).ready(() => {
  const $textarea = $('textarea');
  // listen for any user input in the textarea
  $textarea.on('input', () => {
    // get length of textarea
    let charLength = $textarea.val().length;
    // traverse DOM near textarea to find counter element
    let charCounter = $textarea.parent().find('.counter');
    // update charCounter with latest value
    charCounter.text(`${140 - charLength}`);
   
    // check if charLength is over the 140 character limit
    if ((140 - charLength) < 0) {
      charCounter.addClass('red');
    } else {
      charCounter.removeClass('red');
    }

    // resize textarea
    autosize($textarea);
  });

  // $textarea.each(() => {
  //   autosize($textarea);
  // })

});


const autosize = (textarea) => {
  // temporarily shrink textarea so that scrollHeight returns content height when content does not fill textarea
  $(textarea).height(1);
  $(textarea).height($(textarea).prop('scrollHeight'));  
};
