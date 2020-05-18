// @ts-nocheck

/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 200; // x-positie van speler
var spelerY = 100; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten
var bgImg;
var img;
var welkScherm = 0;



/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  rect(20, 20, width - 2 * 20, height - 2 * 20);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function startScherm() {
    background(0);
    textSize(32);
    fill(red);
    text('Klik hier om te starten', 50,20,20,20);
}

function gameScherm() {
    fill(blue);
}

function gameOverScherm() {
    fill(255,255,255);
}

function draw() {
    if (welkScherm === 0) {
        startScherm();
    } else if (welkScherm === 1) {
        gameScherm();
    } else if (welkScherm === 2) {
        gameOverScherm();
    }
}

function startGame() {
    welkScherm = 1;
}

function mousePressed() {
    if(welkScherm === 0) {
        startGame();
    }
}

/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {


};

function preload() {
    img = loadImage('img/heidi1.jpg');
}
/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {

  // Top-left corner of the img is at (0, 0)
  // Width and height are the img's original width and height
  image(img, x, y);
}



/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
  if (keyIsPressed && keyCode === 65) { // "a" links
    spelerX = spelerX - 5;
  } else if (keyIsPressed && keyCode === 68) { // "d" rechts
    spelerX = spelerX + 5; 
  } else if (keyIsPressed && keyCode === 87) { // "w" omhoog
    spelerY = spelerY - 5; 
  } else if (keyIsPressed && keyCode === 83) { // "s" omlaag
    spelerY = spelerY + 5; 
  }
};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */




/*
function draw() {
    img(bgImg,0,0);
}
function preload () {
     bgImg = loadImage('img/treeSpring.jpg'); // Load the image
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegSpeler();

      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);
      startScherm();
      startGame();
      gameScherm();
      gameOverScherm();

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}

