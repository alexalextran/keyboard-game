import React, { useState } from "react";

const Mainpage = () => {
  var keyvalue = "Start!";
  var level = 1;

  function makeid(difficulty) {
    document.querySelector(".RESULT").innerHTML = " ";
    var possible =
      "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^QWERTYUIOPASDFGHJKLZXCVBNM`~-_=+[{]}\|;:',<.>/?";

    for (var i = 0; i < level; i++)
      keyvalue = possible.charAt(Math.floor(Math.random() * difficulty));


    document.querySelector(".PRESS").innerHTML = keyvalue;

    document.addEventListener(
      "keypress",
      (event) => {
        event.stopImmediatePropagation();
        var name = event.key;
        var code = event.code;

        console.log(`Key pressed ${name} \r\n Key code value: ${code}`);

        document.querySelector(".key").innerHTML = name;

        if (name == keyvalue) {
          keyvalue = "";
          document.querySelector(".timer__wrapper").style.animation = "";
          void document.querySelector(".timer__wrapper").offsetWidth;
          document.querySelector(".RESULT").innerHTML = "NICE!";
          starttimer();
          setTimeout(function(){
            makeid(difficulty)}, 4000);
        }
      },
      false
    );
  }

  function starttimer() {
    document.querySelector(".timer__wrapper").style.animation =
      "timer 4s linear";
  }

  function setdifficulty(mode) {
    if (mode == "easy") {
     

     
      starttimer();
      setTimeout(function(){
        makeid(36)
      },4000);
      
    }
    if (mode == "medium") {
    
      starttimer();
  
      setTimeout(function(){
        makeid(68)
      },4000);
    }
    if (mode == "programmer") {
   
      starttimer();
     
      setTimeout(function(){
        makeid(89)
      },4000);
    }
    
    
  }

  return (
    <section>
      <button
        onClick={() => {
          starttimer();
          setTimeout(makeid, 4000);
        }}
      ></button>
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
    </section>
  );
};

export default Mainpage;