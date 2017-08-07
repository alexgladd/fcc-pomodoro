/* Pomodoro Javascript
 */

// globals ------------------------------------------------

var Modes = {
  POMODORO: 0,
  BREAK: 1
};

var appState = {
  mode: Modes.POMODORO,
  pomodoroTimer: {
    durationMin: 25
  },
  breakTimer: {
    durationMin: 5
  }
};

var appMode = Modes.POMODORO;

var timer

// jQuery start -------------------------------------------

$(document).ready(function() {
  onReset();
  
  // controls setup
  // TODO

  // settings setup
  // TODO
});

// events -------------------------------------------------

function onReset() {

}

// timers -------------------------------------------------
