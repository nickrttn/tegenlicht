'use strict';

$.ready(document).then(function() {

  // ES6 IFFE's look friggin' spiffy motherfucker

  // make videos responsive
  fitvids();

  // enable submit button only when all radio buttons are checked
  let formRadio = $$('.pre-questions input[type="radio"]');
  let question1 = $$('input[name="Question1"][type="radio"]');
  let question2 = $$('input[name="Question2"][type="radio"]');
  let submit = $('.pre-questions__submit');

  // only disable the submit button for people who have JS
  if (submit) submit.disabled = true;

  formRadio._.events({
    'click': function(event) {
      let counter = 0;
      formRadio.forEach(function(el){
        if (el.checked) counter += 1;
        if (counter >= 2) {
          submit.disabled = false;
        }
      });
    }
  });

  // results page
  let resultBars = $$('.results__bar');

  setTimeout(resultBars.forEach((bar) => {
    var pct = bar.dataset.percentage;
    bar.style.background = 'linear-gradient(90deg, #e6e6e6 ' + pct + '%, #ffffff ' + pct + '%, #ffffff 100%)';
  }), 2000);
});

// timeline stuff
let duration = $('.timer__duration');
let elapsed = $('.timer__time-elapsed');
let elapsedBar = $('.timer__elapsed');
let explain = $('.timer__explanation');

let poll = $('.poll-item');
let timerText = $('.poll-item__timer');
let pollNotice = $('.poll-item.notice');
let pollFirst = $('.poll-item.first');
let pollSecond = $('.poll-item.second');
let pollThird = $('.poll-item.third');

let pollRadio = $$('.poll-item input[type=radio]');

// create a timeline with a length of 46:33
// send ticks every 1000ms
let tl = new Timeline({
  length: 2793000,
  frequency: 1000
});

// bind event handlers to show the twitter button after voting
pollRadio.forEach((input) => {
  input._.events({
    'click': (event) => {
      let pollParent = getClosest(event.target, '.poll-item');
      let twitterButton = $('.twitter', pollParent);
      twitterButton.classList.remove('hidden');
    }
  });
});

// add markers to the timeline
tl.markers.push(
  // first poll
{
  time: 388000,
  forward: () => {
    const POLL_DURATION = 30;

    let explanation = $('.notice');
    let timerText = $('.poll-item__timer');

    explanation.classList.add('hidden');
    $.before(pollFirst, explanation);
    pollFirst.classList.remove('hidden');

    let timer = new Timeline({
      length: 30000,
      frequency: 1000
    });

    timer.on('tick', () => {
      let elapsedDuration = moment.duration(timer.position());
      let elapsedSec = POLL_DURATION - elapsedDuration.seconds();

      if (elapsedSec.toString().length == 1) {
        let newElapsedSec = '0' + elapsedSec;
        elapsedSec = newElapsedSec;
      }

      let elapsedText = '-0:' + elapsedSec;
      timerText.innerHTML = elapsedText;
    });

    timer.on('end', () => {
      pollFirst.classList.add('disabled');
      let radioButtons = $$('input[type=radio]', pollFirst);

      radioButtons.forEach(function(btn) {
        btn.setAttribute('disabled', true);
      });

      timerText.innerHTML = '';
    });

    timer.play();
  },
},
  // second poll
{
  time: 1158000,
  forward: () => {
    const POLL_DURATION = 30;

    let poll = $('.first');
    let explanation = $('.notice');
    let timerText = $('.poll-item__timer');

    exp.classList.add('hidden');
    $.before(poll, explanation);
    poll.classList.remove('hidden');

    let timer = new Timeline({
      length: 30000,
      frequency: 1000
    });

    timer.on('tick', () => {
      let elapsedDuration = moment.duration(timer.position());
      let elapsedSec = POLL_DURATION - elapsedDuration.seconds();

      if (elapsedSec.toString().length == 1) {
        let newElapsedSec = '0' + elapsedSec;
        elapsedSec = newElapsedSec;
      }

      let elapsedText = '-0:' + elapsedSec;
      timerText.innerHTML = elapsedText;
    });

    timer.on('end', () => {
      pollSecond.classList.add('disabled');
      let radioButtons = $$('input[type=radio]', pollSecond);
      timerText.innerHTML = '';
    });

    timer.play();
  }
},
  // third poll
{
  time: 2316000,
  forward: () => {
    let poll = $('.first');
    let exp = $('.notice');
    let timerText = $('.poll-item__timer');
    const POLL_DURATION = 30;

    exp.classList.add('hidden');
    $.before(poll, exp);
    poll.classList.remove('hidden');

    let timer = new Timeline({
      length: 30000,
      frequency: 1000
    });

    timer.on('tick', () => {
      let elapsedDuration = moment.duration(timer.position());
      let elapsedSec = POLL_DURATION - elapsedDuration.seconds();

      if (elapsedSec.toString().length == 1) {
        let newElapsedSec = '0' + elapsedSec;
        elapsedSec = newElapsedSec;
      }

      let elapsedText = '-0:' + elapsedSec;
      timerText.innerHTML = elapsedText;
    });

    timer.on('end', () => {
      pollThird.classList.add('disabled');
      let radioButtons = $$('input[type=radio]', pollThird);
      timerText.innerHTML = '';
    });

    timer.play();
  }
});

// create a marker on the timeline for each marker object
tl.markers.forEach((marker) => {
  $.set(document.createElement('span'), {
    style: {
      left: "calc((" + marker.time + " / 2793000) * 100%)"
    },
    className: 'timer__marker',
    before: explain
  });
});

// update the text and timeline on ticks
tl.on('tick', () => {
  let elapsedDuration = moment.duration(tl.position());
  let elapsedMin = elapsedDuration.minutes();
  let elapsedSec = elapsedDuration.seconds();

  if (elapsedSec.toString().length == 1) {
    let newElapsedSec = '0' + elapsedSec;
    elapsedSec = newElapsedSec;
  }

  let elapsedText = elapsedMin + ':' + elapsedSec;

  elapsed.innerHTML = elapsedText;
  elapsedBar.style.width = "calc((" + tl.position() + " / 2793000) * 100%)";
}, false);

// PROTOTYPING STUFF
let play = $('.prototype .play');
let pause = $('.prototype .pause');
let first = $('.prototype .first');
let second = $('.prototype .second');
let third = $('.prototype .third');

// ** PROTOTYPING ONLY **
// start playing the timeline on notice click
pollNotice._.events({
  'click': () => {
    tl.play();
  }
});

play._.events({
  'click': () => {
    tl.play();
    console.log('press play');
  }
});

pause._.events({
  'click': () => {
    tl.pause();
    console.log('press pause');
  }
});

first._.events({
  'click': () => {
    tl.position(386000);
    console.log('press first');
  }
});

second._.events({
  'click': () => {
    tl.position(1156000);
    console.log('press second');
  }
});

third._.events({
  'click': () => {
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
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

        // If selector is a class
        if ( firstChar === '.' ) {
            if ( elem.classList.contains( selector.substr(1) ) ) {
                return elem;
            }
        }

        // If selector is an ID
        if ( firstChar === '#' ) {
            if ( elem.id === selector.substr(1) ) {
                return elem;
            }
        }

        // If selector is a data attribute
        if ( firstChar === '[' ) {
            if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
                return elem;
            }
        }

        // If selector is a tag
        if ( elem.tagName.toLowerCase() === selector ) {
            return elem;
        }

    }

    return false;

};
