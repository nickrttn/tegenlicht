'use strict';

// This isn't jQuery, it's Lea Verou's Blissful.js

$.ready(document).then(function () {

  // make videos responsive
  fitvids();

  // enable submit button only when all radio buttons are checked
  var formRadio = $$('.pre-questions input[type="radio"]');
  var question1 = $$('input[name="Question1"][type="radio"]');
  var question2 = $$('input[name="Question2"][type="radio"]');
  var submit = $('.pre-questions__submit');

  // only disable the submit button for people who have JS
  if (submit) submit.disabled = true;

  formRadio._.events({
    'click': function click(event) {
      var counter = 0;
      formRadio.forEach(function (el) {
        if (el.checked) counter += 1;
        if (counter >= 2) {
          submit.disabled = false;
        }
      });
    }
  });

  // results page
  var resultBars = $$('.results__bar');

  setTimeout(resultBars.forEach(function (bar) {
    var pct = bar.dataset.percentage;
    bar.style.background = 'linear-gradient(90deg, #e6e6e6 ' + pct + '%, #ffffff ' + pct + '%, #ffffff 100%)';
  }), 2000);
});

// timeline stuff
var duration = $('.timer__duration');
var elapsed = $('.timer__time-elapsed');
var elapsedBar = $('.timer__elapsed');
var explain = $('.timer__explanation');

var poll = $('.poll-item');
var timerText = $('.poll-item__timer');
var pollNotice = $('.poll-item.notice');
var pollFirst = $('.poll-item.first');
var pollSecond = $('.poll-item.second');
var pollThird = $('.poll-item.third');

var pollRadio = $$('.poll-item input[type=radio]');

// create a timeline with a length of 46:33
// send ticks every 1000ms
var tl = new Timeline({
  length: 2793000,
  frequency: 1000
});

// bind event handlers to show the twitter button after voting
pollRadio.forEach(function (input) {
  input._.events({
    'click': function click(event) {
      var pollParent = getClosest(event.target, '.poll-item');
      var twitterButton = $('.twitter', pollParent);
      twitterButton.classList.remove('hidden');
    }
  });
});

// add markers to the timeline
tl.markers.push(
// first poll
{
  time: 388000,
  forward: function forward() {
    var POLL_DURATION = 30;

    var explanation = $('.notice');
    var timerText = $('.poll-item__timer');

    explanation.classList.add('hidden');
    $.before(pollFirst, explanation);
    pollFirst.classList.remove('hidden');

    var timer = new Timeline({
      length: 30000,
      frequency: 1000
    });

    timer.on('tick', function () {
      var elapsedDuration = moment.duration(timer.position());
      var elapsedSec = POLL_DURATION - elapsedDuration.seconds();

      if (elapsedSec.toString().length == 1) {
        var newElapsedSec = '0' + elapsedSec;
        elapsedSec = newElapsedSec;
      }

      var elapsedText = '-0:' + elapsedSec;
      timerText.innerHTML = elapsedText;
    });

    timer.on('end', function () {
      pollFirst.classList.add('disabled');
      var radioButtons = $$('input[type=radio]', pollFirst);

      radioButtons.forEach(function (btn) {
        btn.setAttribute('disabled', true);
      });

      timerText.innerHTML = '';
    });

    timer.play();
  }
},
// second poll
{
  time: 1158000,
  forward: function forward() {
    var POLL_DURATION = 30;

    var poll = $('.first');
    var explanation = $('.notice');
    var timerText = $('.poll-item__timer');

    exp.classList.add('hidden');
    $.before(poll, explanation);
    poll.classList.remove('hidden');

    var timer = new Timeline({
      length: 30000,
      frequency: 1000
    });

    timer.on('tick', function () {
      var elapsedDuration = moment.duration(timer.position());
      var elapsedSec = POLL_DURATION - elapsedDuration.seconds();

      if (elapsedSec.toString().length == 1) {
        var newElapsedSec = '0' + elapsedSec;
        elapsedSec = newElapsedSec;
      }

      var elapsedText = '-0:' + elapsedSec;
      timerText.innerHTML = elapsedText;
    });

    timer.on('end', function () {
      pollSecond.classList.add('disabled');
      var radioButtons = $$('input[type=radio]', pollSecond);
      timerText.innerHTML = '';
    });

    timer.play();
  }
},
// third poll
{
  time: 2316000,
  forward: function forward() {
    var poll = $('.first');
    var exp = $('.notice');
    var timerText = $('.poll-item__timer');
    var POLL_DURATION = 30;

    exp.classList.add('hidden');
    $.before(poll, exp);
    poll.classList.remove('hidden');

    var timer = new Timeline({
      length: 30000,
      frequency: 1000
    });

    timer.on('tick', function () {
      var elapsedDuration = moment.duration(timer.position());
      var elapsedSec = POLL_DURATION - elapsedDuration.seconds();

      if (elapsedSec.toString().length == 1) {
        var newElapsedSec = '0' + elapsedSec;
        elapsedSec = newElapsedSec;
      }

      var elapsedText = '-0:' + elapsedSec;
      timerText.innerHTML = elapsedText;
    });

    timer.on('end', function () {
      pollThird.classList.add('disabled');
      var radioButtons = $$('input[type=radio]', pollThird);
      timerText.innerHTML = '';
    });

    timer.play();
  }
});

// create a marker on the timeline for each marker object
tl.markers.forEach(function (marker) {
  $.set(document.createElement('span'), {
    style: {
      left: "calc((" + marker.time + " / 2793000) * 100%)"
    },
    className: 'timer__marker',
    before: explain
  });
});

// update the text and timeline on ticks
tl.on('tick', function () {
  var elapsedDuration = moment.duration(tl.position());
  var elapsedMin = elapsedDuration.minutes();
  var elapsedSec = elapsedDuration.seconds();

  if (elapsedSec.toString().length == 1) {
    var newElapsedSec = '0' + elapsedSec;
    elapsedSec = newElapsedSec;
  }

  var elapsedText = elapsedMin + ':' + elapsedSec;

  elapsed.innerHTML = elapsedText;
  elapsedBar.style.width = "calc((" + tl.position() + " / 2793000) * 100%)";
}, false);

// PROTOTYPING STUFF
var play = $('.prototype .play');
var pause = $('.prototype .pause');
var first = $('.prototype .first');
var second = $('.prototype .second');
var third = $('.prototype .third');

// ** PROTOTYPING ONLY **
// start playing the timeline on notice click
pollNotice._.events({
  'click': function click() {
    tl.play();
  }
});

play._.events({
  'click': function click() {
    tl.play();
    console.log('press play');
  }
});

pause._.events({
  'click': function click() {
    tl.pause();
    console.log('press pause');
  }
});

first._.events({
  'click': function click() {
    tl.position(386000);
    console.log('press first');
  }
});

second._.events({
  'click': function click() {
    tl.position(1156000);
    console.log('press second');
  }
});

third._.events({
  'click': function click() {
    tl.position(2316000);
    console.log('press third');
  }
});

/**
 * Get closest DOM element up the tree that contains a class, ID, or data attribute
 * @param  {Node} elem The base element
 * @param  {String} selector The class, id, data attribute, or tag to look for
 * @return {Node} Null if no match
 */
function getClosest(elem, selector) {

  var firstChar = selector.charAt(0);

  // Get closest match
  for (; elem && elem !== document; elem = elem.parentNode) {

    // If selector is a class
    if (firstChar === '.') {
      if (elem.classList.contains(selector.substr(1))) {
        return elem;
      }
    }

    // If selector is an ID
    if (firstChar === '#') {
      if (elem.id === selector.substr(1)) {
        return elem;
      }
    }

    // If selector is a data attribute
    if (firstChar === '[') {
      if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
        return elem;
      }
    }

    // If selector is a tag
    if (elem.tagName.toLowerCase() === selector) {
      return elem;
    }
  }

  return false;
};