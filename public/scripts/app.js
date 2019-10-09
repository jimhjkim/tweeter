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


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Jim",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@jimbo" },
    "content": {
      "text": "김현진"
    },
    "created_at": 1570580426718
  }
]

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
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
        ${tweet.content.text}
      </header>
      <footer class='unevenAlign'>
        <span class='left'>${timeago(tweet.created_at)}</span>
        <div class=right>
          <img src=/images/baseline_flag_black_18dp.png height='20px' width='20px'>
          <img src=/images/baseline_repeat_black_18dp.png height='20px' width='20px'>
          <img src=/images/baseline_thumb_up_alt_black_18dp.png height='20px' width='20px'>
        </div>
      </footer>
    `
  ;

  return $tweet.append(markup);
};

// date argument needs to be in UNIX format
const timeago = (date) => {
  // diff in seconds
  let seconds = (Date.now() - date) / 1000;
  let minutes = seconds/60;
  let hours = seconds/60/60;
  let days = seconds/60/60/24;

  if (seconds < 60) {
    return `${Math.round(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${Math.round(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.round(hours)} hours ago`;
  } else {
    return `${Math.round(days)} days ago`;
  }

};

$(document).ready(() => renderTweets(data));