/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/*eslint-env jquery*/

//  GET tweets from database server
const loadTweets = (onlyLoadLatest = false) => {
  $.ajax('/tweets', { method: 'GET' })
    .then((data) => {
      // check if only new tweets (user input) need to be rendered and loaded
      if (onlyLoadLatest) {
        renderTweets([data[data.length - 1]]);
      } else {
        renderTweets(data);
      }
    });
};
// load tweets for the initial server launch
loadTweets();

// add tweet markup to tweets container
const renderTweets = (tweets) => {
  const $tweetsContainer = $('#tweets-container');
  const renderedTweets = [];

  for (let tweet of tweets) {
    renderedTweets.unshift(createTweetElement(tweet)[0].outerHTML);
  }
  $tweetsContainer.prepend(renderedTweets.join(''));

  // like button
  $('.fa-heart').click(function() {    
    $(this).toggleClass('clicked');
  });
};

// generate markup from database server
const createTweetElement = (tweet) => {
  let $tweet = $('<article>').addClass('tweet');

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
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    `;

  return $tweet.append(markup);
};

// calculate time ago
const timeago = (date) => {
  // diff in seconds
  let seconds = (Date.now() - date) / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;
  let years = days / 365;

  if (seconds < 60) {
    return `${Math.round(seconds)} second${Math.round(seconds) > 1 ? 's' : ''} ago`;
  } else if (minutes < 60) {
    return `${Math.round(minutes)} minute${Math.round(minutes) > 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${Math.round(hours)} hour${Math.round(hours) > 1 ? 's' : ''} ago`;
  } else if (days < 365) {
    return `${Math.round(days)} day${Math.round(days) > 1 ? 's' : ''} ago`;
  } else {
    return `${Math.round(years)} year${Math.round(years) ? 's' : ''} ago`;
  }

};

// escape some text to protect against Cross-Site Scripting
const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// execute when page is ready
$(document).ready(() => {
  // listen for user submission
  $('input').click((event) => {
    event.preventDefault();
    
    // textarea validation logic
    const $textarea = $('textarea');
    // empty textarea
    if (!$textarea.val()) {
      // slide previous error msg up
      $('.isa_error').slideUp('slow', () => {
        $('.isa_error').slideDown('slow').find('#error-message').text('Nothing to post!');
      });
    // user input too long
    } else if ($textarea.val().length > 140) {
      // slide previous error msg up
      $('.isa_error').slideUp('slow', () => {
        $('.isa_error').slideDown('slow').find('#error-message').text('Too long to post!');
      });
    // successful submission
    } else {
      // slide previous error msg up
      $('.isa_error').slideUp('slow');
      // add new tweet to database server
      $.ajax('/tweets', { method: 'POST', data: $('form').serialize() })
        .then(() => {
          loadTweets(true);
        });
      // flash success submission msg
      $('.isa_success').slideDown('slow').fadeOut('slow');
      // clear textarea
      $('textarea').val('');
      // reset char counter
      $('.counter').text('140');
      // reset height of textarea
      $('textarea').css('height', '2em');
      // return cursor back to textarea
      $('textarea').focus();
    }
  });

  // listen for write tweet toggle click
  $('nav div').click(() => {
    $('.new-tweet').toggle('slow', () => {
      $('textarea').focus();
    });
  });

});