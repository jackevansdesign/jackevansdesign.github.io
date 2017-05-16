function whichTransitionEvent(){
  var t,
      el = document.createElement("newAnimation");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  };

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

var transitionEvent = whichTransitionEvent();

var animationPlayer = document.querySelector(".player"),
    playButton = document.querySelector(".play"),
    transitionEvent = whichTransitionEvent();

playButton.addEventListener("click", function() {
  if (animationPlayer.classList) {
    animationPlayer.classList.add("is-playing");
  } else {
    animationPlayer.className += " " + "is-playing";
  }

  animationPlayer.addEventListener(transitionEvent, resetAnimation);
});

function resetAnimation(event) {
  animationPlayer.removeEventListener(transitionEvent, resetAnimation);
  animationPlayer.classList.remove("is-playing");
}
