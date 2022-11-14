var start = false
var gamePattern = []
var userPattern = []
var buttonColours = ['red', 'blue', 'green', 'yellow']
var level = 0

$(document).keypress(function () {
  if (!start) {
    start = true
    $('#level-title').text('Level 0')
    nextSequence()
  }
})

// function startTimer() {
//   if()
// }

// var userPatternNumber=0;

$('.btn').click(function () {
  var userChosenColour = $(this).attr('id')
  // userPatternNumber++;
  userPattern.push(userChosenColour)
  makeSound(userChosenColour)
  // startTimer();
  buttonAnimation(userChosenColour)
  checkPattern(userPattern.length)
})

function nextSequence() {
  level++
  $('#level-title').text('Level ' + level)
  userPattern = []
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  $('#' + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeIn(100)
  makeSound(randomChosenColour)
}

function makeSound(colour) {
  var audio = new Audio('sounds/' + colour + '.mp3')
  audio.play()
}

function buttonAnimation(currColour) {
  $('#' + currColour).addClass('pressed')
  setTimeout(function () {
    $('#' + currColour)
      .removeClass('pressed')
      .fadeOut(50)
      .fadeIn(50)
      .fadeIn(50) 
     
  }, 80)
}

function overAndReStart() {
  makeSound('wrong')
  $('body').addClass('game-over')
  setTimeout(function () {
    $('body').removeClass('game-over')
  }, 400)

  $('#level-title').text('Game Over, Press Any key to restart')
  level = 0
  gamePattern = []
  start = 0
}

function checkPattern(currLevel) {
  if (userPattern[currLevel - 1] === gamePattern[currLevel - 1]) {
    if (currLevel === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    overAndReStart()
  }
}
