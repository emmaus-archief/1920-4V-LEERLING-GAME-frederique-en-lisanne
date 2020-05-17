/// @ts-check
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

var canvasBreedte =  1280;
var canvasHoogte = 720;
var veldBreedte = 1240;
var veldHoogte = 680;
var grasHoogte = 600;

var spelerBreedte = 50; 
var spelerHoogte = 50;
var spelerX = 50; // x-positie van speler
var spelerY = grasHoogte - spelerHoogte; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten

//zwaartekracht
var jump = false; // moet er gesprongen worden?
var richting = 1; //de zwaartekracht in y richting
var versnelling = 8; //snelheid van speler
var springKracht = 17; //hoe hoog de speler kan springen
var valSnelheid = 8; //gelijk aan versnelling
var minHeight = grasHoogte - spelerHoogte; //height van de grond
var maxHeight = 55;  //height van de lucht
var sprongTeller = 0; //houdt bij hoevaak de speler springt


/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("blue");
  rect(20, 20, veldBreedte, veldHoogte);

  //gras (ondergrond)
  noStroke();
  fill(100, 200, 75); // groen
  rect(20, grasHoogte, veldBreedte, 100);

};


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

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill("white");
  rect(x, y, spelerBreedte, spelerHoogte);
};


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
  if (keyIsPressed && keyCode === 65) { // links
    spelerX = spelerX - 5;
  } else if (keyIsPressed && keyCode === 68) { // rechts
    spelerX = spelerX + 5; }

  if (spelerX < 20)  { 
    spelerX = spelerX + 5; //speler kan niet links van het speelveld
  }
  if (spelerX > veldBreedte - spelerBreedte ) {
    spelerX = spelerX - 5; //speler kan niet rechts van het speelveld
  }
};

function spelerSpringen() {
  if (keyCode === 32) { // spatie
    jump = true; //springen
  } 
  else {
    jump = false; //niet springen
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


//zwaartekracht
function zwaartekracht() {
  if (spelerY >= minHeight && jump === false) {
    spelerY = spelerY; //niet meer vallen
    sprongTeller = 0; //reset sprongTeller wanneer speler landt
  } else {
    spelerY = spelerY + (richting*versnelling); //speler kan springen
  }

  if (jump === true) {
    if (spelerY <= maxHeight || sprongTeller >= springKracht) {
      if(spelerY >= minHeight) {
        spelerY = minHeight; // speler gaat niet lager dan de minHeight (grond) als spatie wordt ingedrukt
      } else {
        versnelling = valSnelheid; // vallen als de maximale hoogte is bereikt bij het springen
      }
    } else {
      versnelling = -springKracht; // springen
      sprongTeller = sprongTeller + 1; //wordt toegevoegd bij sprongTeller
    } } else {
      versnelling = valSnelheid;
  }
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(canvasBreedte, canvasHoogte);
  background('black');
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
      spelerSpringen();
      zwaartekracht();
      
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

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}

