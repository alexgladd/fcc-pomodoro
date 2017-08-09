/* Pomodoro Javascript
 */

// globals ------------------------------------------------

var Modes = {
  POMODORO: 0,
  BREAK: 1
};

var appState = {
  mode: Modes.POMODORO,
  timerSettings: {},
  timer: {
    id: null,
    remainingSeconds: 0
  }
};

appState.timerSettings[Modes.POMODORO] = {
  durationMin: 25
};

appState.timerSettings[Modes.BREAK] = {
  durationMin: 5
};

var formatter = new Intl.NumberFormat("en-US", {minimumIntegerDigits: 2});

var beep = new Audio("sfx/microbeep.mp3");

// jQuery start -------------------------------------------

$(document).ready(function() {
  // init
  onReset();
  updateSettings();

  // controls setup
  $("#btn-pomodoro").on("click", onPomodoro);
  $("#btn-break").on("click", onBreak);
  $("#btn-reset").on("click", onReset);

  // settings setup
  $("#pomodoro-plus").on("click", onPomodoroPlus);
  $("#pomodoro-minus").on("click", onPomodoroMinus);
  $("#break-plus").on("click", onBreakPlus);
  $("#break-minus").on("click", onBreakMinus);
});

// events -------------------------------------------------

function onReset() {
  // stop any existing timer
  stopTimer();

  // reset timer
  appState.timer.remainingSeconds = appState.timerSettings[appState.mode].durationMin * 60;
  updateClockDisplay(appState.timer.remainingSeconds);
}

function onPomodoro() {
  if (appState.mode === Modes.POMODORO) {
    if (isTimerRunning()) {
      // pause the timer
      stopTimer();
    } else {
      // start the timer
      startTimer();
    }
  } else {
    // switch mode and reset
    appState.mode = Modes.POMODORO;
    onReset();
    updateButtonStates();
  }
}

function onBreak() {
  if (appState.mode === Modes.BREAK) {
    if (isTimerRunning()) {
      // pause the timer
      stopTimer();
    } else {
      // start the timer
      startTimer();
    }
  } else {
    // switch mode and reset
    appState.mode = Modes.BREAK;
    onReset();
    updateButtonStates();
  }
}

function onPomodoroPlus() {
  appState.timerSettings[Modes.POMODORO].durationMin += 1;
  updateSettings();
}

function onPomodoroMinus() {
  if (appState.timerSettings[Modes.POMODORO].durationMin >= 2) {
    appState.timerSettings[Modes.POMODORO].durationMin -= 1;
    updateSettings();
  }
}

function onBreakPlus() {
  appState.timerSettings[Modes.BREAK].durationMin += 1;
  updateSettings();
}

function onBreakMinus() {
  if (appState.timerSettings[Modes.BREAK].durationMin >= 2) {
    appState.timerSettings[Modes.BREAK].durationMin -= 1;
    updateSettings();
  }
}

// timers -------------------------------------------------

function startTimer() {
  if (isTimerRunning()) {
    stopTimer();
  }

  appState.timer.id = window.setInterval(timerTick, 1000);
}

function stopTimer() {
  if (isTimerRunning()) {
    window.clearInterval(appState.timer.id);
    appState.timer.id = null;
  }
}

function isTimerRunning() {
  if (appState.timer.id) {
    return true;
  } else {
    return false;
  }
}

function timerTick() {
  appState.timer.remainingSeconds = appState.timer.remainingSeconds - 1;
  updateClockDisplay(appState.timer.remainingSeconds);

  if (appState.timer.remainingSeconds === 0) {
    // done!
    beep.play();
    stopTimer();
  }
}

// functions ----------------------------------------------

function updateClockDisplay(secondsRemaining) {
  var mins = Math.floor(secondsRemaining / 60);
  var secs = secondsRemaining % 60;

  $("#pomodoro-clock").html(formatter.format(mins) + ":" + formatter.format(secs));
}

function updateButtonStates() {
  $("button.pomodoro-btn").each(function() {
    $(this).removeClass("pomodoro-btn-active");
  });

  if (appState.mode === Modes.POMODORO) {
    $("#btn-pomodoro").addClass("pomodoro-btn-active");
  } else if (appState.mode === Modes.BREAK) {
    $("#btn-break").addClass("pomodoro-btn-active");
  }
}

function updateSettings() {
  $("#pomodoro-duration").html(appState.timerSettings[Modes.POMODORO].durationMin);
  $("#break-duration").html(appState.timerSettings[Modes.BREAK].durationMin);
}
