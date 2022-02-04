import React, { useState } from "react";
import heart from "../assets/heartimage.png";

const Mainpage = () => {
  var keyvalue = "Start!";
  var level = 1;
  var streak = 0;
  var life = 1;
  var gameover = false;

  function makeid(difficulty) {
    if (gameover == true) {
      return;
    }
    document.querySelector(".RESULT").innerHTML = " ";
    document.querySelector(".heart").style.filter =""
    document.querySelector(".heart").style.animationName =""

    var possible =
      "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^QWERTYUIOPASDFGHJKLZXCVBNM`~-_=+[{]}|;:',<.>/?";

    for (var i = 0; i < level; i++)
      keyvalue = possible.charAt(Math.floor(Math.random() * difficulty));

    document.querySelector(".PRESS").innerHTML = keyvalue;

    document.addEventListener("keypress", executegame);

    function executegame(event) {
      event.stopImmediatePropagation();
      var name = event.key;

      document.querySelector(".key").innerHTML = name;

      if (name == keyvalue) {
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
        console.log("hmm");
        life--;
        console.log(life);
        document.querySelector(".heart").style.filter ="grayscale(1)"
        document.querySelector(".heart").style.animationName ="shake"
        if (life < 0) {
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

  return (
    <section>
      <div className="header">
        <h1>Welcome to Reakt</h1>
        <p>Where we test how well you know your keyboard!</p>
      </div>
      <div className="tutorial">
        <h1>Tutorial</h1>
        <p>Before you start, here's a mini guide on how to play Reakt</p>
        <button> Start </button>
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
    </section>
  );
};

export default Mainpage;
