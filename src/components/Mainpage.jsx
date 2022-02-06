import React from "react";
import heart from "../assets/heartimage.png";
import frog from "../assets/frog.png";

const Mainpage = () => {
  var keyvalue = "Start!";
  var level = 1;
  var streak = 0;
  var life = 1;
  var gameover = false;
  var avg_time = [];
  var toggle_tutorial = true

  function makeid(difficulty) {
    if (gameover == true) {
      return;
    }
    document.querySelector(".RESULT").innerHTML = " ";
    document.querySelector(".heart").style.filter = "";
    document.querySelector(".heart").style.animationName = "";

    var possible =
      "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^QWERTYUIOPASDFGHJKLZXCVBNM`~-_=+[{]}|;:',<.>/?";

    for (var i = 0; i < level; i++)
      keyvalue = possible.charAt(Math.floor(Math.random() * difficulty));

    document.querySelector(".PRESS").innerHTML = keyvalue;

    document.addEventListener("keypress", executegame);
    start_timer();

    function executegame(event) {
      event.stopImmediatePropagation();
      var name = event.key;

      document.querySelector(".key").innerHTML = name;

      if (name == keyvalue) {
        avg_time.push(msecVar);
        console.log(avg_time);
        stop_timer();

        streak++;
        keyvalue = "";
        document.querySelector(".current__streak--value").innerHTML = streak;
        document.querySelector(".timer__wrapper").style.animation = "";
        void document.querySelector(".timer__wrapper").offsetWidth;
        document.querySelector(".RESULT").innerHTML = "NICE!";
        starttimer();
        life = 1;
        setTimeout(function () {
          makeid(difficulty);
        }, 4000);
      } else {
        life--;
        document.querySelector(".heart").style.filter = "grayscale(1)";
        document.querySelector(".heart").style.animationName = "shake";
        if (life < 0) {
          stop_timer();
          const sum = avg_time.reduce((a, b) => a + b, 0);
          var average = (sum / avg_time.length).toFixed(0) || 0;

          document.querySelector(".gameover").style.animation = "fade 800ms";
          document.querySelector(".gameover").style.display = "flex";
          document.getElementById("average").innerHTML = average;
          document.getElementById("streak").innerHTML = streak;

          gameover = true;
          document.removeEventListener("keypress", executegame);
        }
      }
    }
  }

  function starttimer() {
    document.querySelector(".timer__wrapper").style.animation =
      "timer 4s linear";
  }

  var timerOn = false;
  var msecVar = 0;
  var x;

  function setMsec() {
    msecVar = msecVar + 5;
    x = setTimeout(setMsec, 1);
    document.getElementById("msec").innerHTML = `<p>${msecVar}</p>`;
  }

  function start_timer() {
    if (!timerOn) {
      timerOn = true;
      setMsec();
    }
  }

  function stop_timer() {
    clearTimeout(x);
    reset_timer();
    timerOn = false;
  }

  function reset_timer() {
    msecVar = 0;
  }

  function setdifficulty(mode) {
    if (mode == "easy") {
      starttimer();
      setTimeout(function () {
        makeid(36);
      }, 4000);
    }
    if (mode == "medium") {
      starttimer();

      setTimeout(function () {
        makeid(68);
      }, 4000);
    }
    if (mode == "programmer") {
      starttimer();

      setTimeout(function () {
        makeid(89);
      }, 4000);
    }
  }

  function toggle__tutorial() {
    if(!toggle_tutorial){
      document.querySelector(".tutorial").style.opacity = "0"
      document.querySelector(".tutorial").style.display = "none"
      document.querySelector(".tutorial").style.animation = "none";
    }
    else{
      document.querySelector(".tutorial").style.opacity = "1"
      document.querySelector(".tutorial").style.display = "flex"
      document.querySelector(".tutorial").style.animation = "fade 800ms";
    }
    toggle_tutorial = !toggle_tutorial
  }

  

  return (
    <section>
      <div className="header">
        <h1>Welcome to Reakt</h1>
        <p>Where we test how well you know your keyboard!</p>
      </div>

      <div className="difficulty">
        <button
          onClick={() => {
            setdifficulty("easy");
          }}
        >
          Easy
        </button>
        <button
          onClick={() => {
            setdifficulty("medium");
          }}
        >
          Medium
        </button>
        <button
          onClick={() => {
            setdifficulty("programmer");
          }}
        >
          Programmer
        </button>
      </div>

      <div className="timer">
        <div className="timer__wrapper">
          <h1>3</h1> <h1>2</h1> <h1>1</h1>
          <h1 style={{ color: "red" }}>GO!</h1>
        </div>
      </div>
      <div className="PRESS"></div>

      <div className="RESULT"></div>

      <div className="KEY__ENTERED">
        <p>Last Key Pressed</p>
        <p className="key"></p>
      </div>

      <div className="current__streak">
        Current Streak <p className="current__streak--value"> 0</p>
      </div>

      <div className="current__life">
        <img className="heart" alt="life" src={heart}></img>
      </div>

      <div className="stopwatch">
        <div id="msec">0</div>
      </div>

      <div className="gameover">
        <div className="gameover__card">
          <h2>Game Over</h2>
          <p className="gameover__card--text">
            Nice try you got a streak of{" "}
            <span className="red" id="streak">
              14
            </span>{" "}
            and you averaged{" "}
            <span className="red" id="average">
              700ms
            </span>
          </p>
          <button>Wanna try again?</button>
        </div>
      </div>

      <img className="tutorial__frog" onClick={() => toggle__tutorial()} src={frog}></img>
      <p className="tutorial__text">Wanna know how to play? Click on me!</p>

      <div className="tutorial"  onClick={() => toggle__tutorial()}>
      Click outside the box to exit
        <div className="tutorial__card">
          <p>
            The moment you click a difficulty, you'll be given 3 seconds to
            prepare, once the countdown ends, press the respective key on your
            keyboard that matches the key displayed on screen
          </p>
          <p>
            Also for each round, you have one life, incase you accidently fat
            finger a key, and NOTE SOME KEYS REQUIRE YOU TO PRESS SHIFT/CAPSLOCK
            FIRST I.E CAPITAL LETTERS
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mainpage;
