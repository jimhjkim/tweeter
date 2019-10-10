/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// return a tweet <article> element containing the entire HTML structure of the tweet

// $(document).ready(function() {
//   $('time.timeago').timeago();
// });

// console.log($.timeago(new Date()));

const loadTweets = (onlyLoadLatest = false) => {
  $.ajax('/tweets', { method: 'GET' })
    .then( (data) => {
      if (onlyLoadLatest) {
        renderTweets([data[data.length - 1]])
      } else {
        renderTweets(data);
      }
  });
};
loadTweets();

const renderTweets = (tweets) => {
  const $tweetsContainer = $('#tweets-container');
  const renderedTweets = [];

  for (let tweet of tweets) {
    // $tweetsContainer.append(createTweetElement(tweet));
    renderedTweets.unshift(createTweetElement(tweet)[0].outerHTML);
  }
  $tweetsContainer.prepend(renderedTweets.join(''));
  // console.log('after renderedTweets', $tweetsContainer.children());
};

const createTweetElement = (tweet) => {
  let $tweet = $('<article>').addClass('tweet');
  // const timeago_days = Math.round((Date.now() - tweet.created_at)/1000/60/60/24);

  const markup = 
    `
      <div class='unevenAlign'>
        <img class='left' src=${tweet.user.avatars} height='40px' width='40px'>
        <span class='left'>${tweet.user.name}</span>
        <p class='right' id='twitterHandle'>${tweet.user.handle}</p>
      </div>
      <header>
        ${escape(tweet.content.text)}
      </header>
      <footer class='unevenAlign'>
        <span class='left'>${timeago(tweet.created_at)}</span>
        <div class=right>
          <img src=/images/baseline_flag_black_18dp.png height='20px' width='20px'>
          <img src=/images/baseline_repeat_black_18dp.png height='20px' width='20px'>
          <img src=/images/baseline_thumb_up_alt_black_18dp.png height='20px' width='20px'>
        </div>
      </footer>
    `;

  return $tweet.append(markup);
};

// date argument needs to be in UNIX format
const timeago = (date) => {
  // diff in seconds
  let seconds = (Date.now() - date) / 1000;
  let minutes = seconds/60;
  let hours = seconds/60/60;
  let days = seconds/60/60/24;
  let years = seconds/60/60/24/365;

  if (seconds < 60) {
    return `${Math.round(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${Math.round(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.round(hours)} hours ago`;
  } else if (days < 365) {
    return `${Math.round(days)} days ago`;
  } else {
    return `${Math.round(years)} years ago`;
  }

};

// escape some text to protect against Cross-Site Scripting
const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(() => {
  // listen for user submission
  $('input').click((event) => {
    // prevent default submission behavior
    event.preventDefault();
    
    const $textarea = $('textarea');
    if (!$textarea.val()) {
      $('.isa_error').slideDown('slow').find('#error-message').text('Nothing to post!');

    } else if ($textarea.val().length > 140) {
      $('.isa_error').slideDown('slow').find('#error-message').text('Too long to post!');

    } else {
      $('.isa_error').slideUp('slow');

      $.ajax('/tweets', { method: 'POST', data: $('form').serialize() })
      .then(() => {
        loadTweets(true);
      });
      
      $('.isa_success').slideDown('slow').fadeOut('slow');
      $('textarea').val('');
      $('.counter').text('140');
    }
  });

  // listen for toggle
  $('#toggle').click(() => {
    $('.new-tweet').toggle('slow');
    $('textarea').focus();
  });

});