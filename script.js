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
const LEVEL1= 1;
const LEVEL2 = 2;
const LEVEL3 = 3;
const LEVEL4 = 4;
const GAMEOVER = 5;
var spelStatus = UITLEG;

var canvasBreedte =  1280;
var canvasHoogte = 720;
var veldBreedte = 1240;
var veldHoogte = 680;
var grasHoogte = 650;

var spelerBreedte = 50; 
var spelerHoogte = 75;
var spelerX = 50; // x-positie van speler
var spelerY = grasHoogte - spelerHoogte; // y-positie van speler

//snelheid speler
var maxSnelheid = 10;
var nieuweSnelheid = 0;
var spelerVersnelling = 0.25;
var spelerSnelheid = 0.25;

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 450;   // x-positie van vijand
var vijandY = 210;   // y-positie van vijand
var vijandSnelheid = 2; // snelhei van de vijand
var vijandBreedte = 50;
var vijandHoogte = 50;

var score = 0; // aantal behaalde punten
var spelerPlaatje;

//zwaartekracht
var jump = false; // moet er gesprongen worden?
var richting = 1; //de zwaartekracht in y richting
var versnelling = 8; //snelheid van speler
var springKracht = 9; //hoe hoog de speler kan springen
var valSnelheid = 1; 
var minHoogte = grasHoogte - spelerHoogte; //hoogte van de grond
var maxHoogte = 20; 
var sprongTeller = 0; //houdt bij hoevaak de speler springt
var springRichting = 0;

// uitlegscherm
var levelHeight = 150;
var levelWidth = 200;
var levelX = 1000;
var levelY = 20;

// plaatjes
var level1Plaatje;
var level2Plaatje;
var level3Plaatje;
var level4Plaatje;
/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */


var tekenVeld = function () {
  fill("blue");
  image(level1Plaatje,200,200,200,200);
  rect(20, 20, veldBreedte, veldHoogte);

  //gras (ondergrond)
  noStroke();
  fill(100, 200, 75); // groen
  rect(20, grasHoogte, veldBreedte, 50);

};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    fill(225);
    rect(x, y, vijandBreedte, vijandHoogte);
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
  image(spelerPlaatje,x,y,spelerBreedte,spelerHoogte);
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    vijandX = vijandX + vijandSnelheid;
    if (vijandX > 580){
        vijandSnelheid = -2;
    }
    if (vijandX === 450) {
        vijandSnelheid = 2;
    }
};

function preload(){
    spelerPlaatje = loadImage('img/foto.png');
    level1Plaatje = loadImage('img/zomer.jpg');
    level2Plaatje = loadImage('img/herfst.jpg');
    level3Plaatje = loadImage('img/winter.jpg');
    level4Plaatje = loadImage('img/lente.jpg');
}

/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};


var opValObstakel = false;
var tegenObstakelRechts = false;
var tegenObstakelLinks = false;
var tegenDuwObstakel = false;
var moetVallen = false;
var staatOpObstakel = false;

//duwObstakel 
var duwObstakel = {
  yPositie: 170,
  breedte: 10,
  hoogte: 90, }
var duwObstakelX = 950;

//valObstakel
var valObstakel = {
  xPositie: 630,
  breedte: 320,
  hoogte: 30,
}
var valObstakelY = 100;



var obstakel = function() {
  var obstakelX =       [260, 525, 810, 950, 450, 105, 20 , 190, 950] 
  var obstakelY=        [570, 475, 470, 260, 260, 345, 230, 100, 20 ]
  var obstakelBreedte = [100, 100, 430, 150, 180, 180, 80 , 440, 10 ] 
  var obstakelHoogte =  [80 , 175, 60 , 210, 30 , 30 , 30 , 30 , 150] 

  
  //platforms
  for (var i = 0; i < obstakelX.length; i++) {
    fill("red");
    rect(obstakelX[i], obstakelY[i], obstakelBreedte[i], obstakelHoogte[i]); // de obstakels

    if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, obstakelX[i], obstakelY[i], obstakelBreedte[i], 1)) {
      spelerY = obstakelY[i] - spelerHoogte; //speler staat op obstakel
      sprongTeller = 0; // er kan weer gesprongen worden
      staatOpObstakel = true;
      jump = false; // niet meer springen
      moetVallen = false;
    }
    //speler valt van platform
    if(spelerY + spelerHoogte >= obstakelY[i] && spelerY < obstakelY[i] + 1) {
      if (spelerX + spelerBreedte <= obstakelX[i] && spelerX >= obstakelX[i] - spelerBreedte * 2 || 
        spelerX >= obstakelX[i] + obstakelBreedte[i] && spelerX + spelerBreedte <= obstakelX[i] + obstakelBreedte[i] + spelerBreedte * 2 ) { 
        springKracht = 9;
        moetVallen = true;
      } 
    }  

    if(staatOpObstakel === true && moetVallen === true && spelerY <= minHoogte || spelerY <= 20) { 
      spelerY = spelerY + valSnelheid;
    }

    if(spelerY >= minHoogte) { 
      moetVallen = false;
    }

    //speler kan niet door obstakels 
    if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, //LINKS 
      obstakelX[i], obstakelY[i] + 5, obstakelBreedte[i] * 0.9, obstakelHoogte[i])) {
      tegenObstakelLinks = true;
      staatOpObstakel = false; //speler staat niet op obstakel
      versnelling = valSnelheid; //speler valt naar beneden ('botst' tegen onderkant obstakel)
    }

    else if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte,  //RECHTS
      obstakelX[i] + 20 , obstakelY[i] + 5, obstakelBreedte[i] - 20  , obstakelHoogte[i])) {
        tegenObstakelRechts = true;
        staatOpObstakel = false; //speler staat niet op obstakel
        versnelling = valSnelheid; //speler valt naar beneden ('botst' tegen onderkant obstakel)
     
     }
  }

  /*
  //modder - als speler hierop staat kan hij minder hoog springen
  if (spelerX + spelerBreedte >= obstakelX[2] + 60 && spelerX + spelerBreedte <= obstakelX[2] + obstakelBreedte[2] && spelerY + spelerHoogte >= obstakelY[2] - 200 && 
    spelerY < obstakelY[2] + 1 )  {
    springKracht = 2;
  }
  else {
    springKracht = 9;
  } */

  //valObstakel
  fill("white");
  rect(valObstakel.xPositie, valObstakelY, valObstakel.breedte, valObstakel.hoogte);

  if(collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, valObstakel.xPositie, valObstakelY, valObstakel.breedte, valObstakel.hoogte - 20 )) {
    spelerY = valObstakelY - spelerHoogte; //speler staat op obstakel
    sprongTeller = 0; // er kan weer gesprongen worden
    opValObstakel = true;
    staatOpObstakel = true;
    jump = false; // niet meer springen
    
    if(valObstakelY === obstakelY[4]) { //platform stopt met naar beneden gaan
    opValObstakel = false;
    valObstakelY = obstakelY[4]
    }

    if(opValObstakel === true) { //platform gaat naar beneden
      valObstakelY = valObstakelY + 2;
    spelerY = valObstakelY - spelerHoogte;
    }
  }

  //speler bots tegen onderkant van valObstakel
  if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, valObstakel.xPositie, valObstakelY + 20, valObstakel.breedte, valObstakel.hoogte - 20 )) {
    staatOpObstakel = false; //speler staat niet op obstakel
    versnelling = valSnelheid; //speler valt naar beneden ('botst' tegen onderkant obstakel)
  }


  //duwObstakel 
  fill("purple");
  rect(duwObstakelX, duwObstakel.yPositie, duwObstakel.breedte, duwObstakel.hoogte);
  if(spelerX + spelerBreedte >= duwObstakelX && spelerY + spelerHoogte <= duwObstakel.yPositie + duwObstakel.hoogte && 
    spelerY + spelerHoogte >= duwObstakel.yPositie) {
      tegenDuwObstakel = true;
      duwObstakelX = duwObstakelX + 10;
    if(duwObstakelX + duwObstakel.breedte >= obstakelX[3] + obstakelBreedte[3] ) {
      duwObstakelX = obstakelX[3] + obstakelBreedte[3] - duwObstakel.breedte;
    }
  }
};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */

var beweegSpeler = function() {
  if (keyIsPressed && keyCode === 65 && spelerX > 20 && tegenObstakelRechts === false) { // links "a"
    nieuweSnelheid = spelerSnelheid + spelerVersnelling; // de snelheid van de speler neemt toe 
    spelerSnelheid = nieuweSnelheid;
    spelerX = spelerX - nieuweSnelheid
    springRichting = -nieuweSnelheid; // speler kan naar links springen
    tegenObstakelLinks = false;
     }
  
  else if (keyIsPressed && keyCode === 68 && spelerX + spelerBreedte <= veldBreedte + 20 && tegenObstakelLinks === false) { // rechts "d"
    nieuweSnelheid = spelerSnelheid + spelerVersnelling; // de snelheid van de speler neemt toe 
    spelerSnelheid = nieuweSnelheid;
    spelerX = spelerX + nieuweSnelheid;
    springRichting = nieuweSnelheid; // speler kan naar rechts springen
    tegenObstakelRechts = false;
  }
  
  else {
    spelerSnelheid = 0.25; // de snelheid van de speler wordt weer normaal als de speler heeft stilgestaan
    nieuweSnelheid = 0;
  } 

  if (spelerSnelheid >= maxSnelheid) { //de speler kan niet sneller dan de max snelheid
    spelerSnelheid = maxSnelheid;
  }
};

//LATER WEGHALEN
/* function locatie() { //om te kijken op welke plaats je de obstakels wilt plaatsen
  fill("white");
  text("X: "+mouseX, 800, 300);
  text("Y: "+mouseY, 800, 350);
} */

function spelerSpringen() {
  if (keyIsPressed && keyCode === 32 && moetVallen === false) { // spatie
    jump = true; //springen
    staatOpObstakel = false;
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
  if (spelerY >= minHoogte && jump === false ||  staatOpObstakel === true) {
    spelerY = spelerY; //niet meer vallen
    sprongTeller = 0; //reset sprongTeller wanneer speler landt
    tegenObstakelRechts = false; //de speler kan bewegen en staat dus niet stil tegen de zijkant van een obstakel
    tegenObstakelLinks = false;
  } else  { 
    spelerY = spelerY + (richting*versnelling);
    spelerX = spelerX + springRichting; 
  }

  if (jump === true && spelerY <= maxHoogte || sprongTeller  >= springKracht) {
    if(spelerY >= minHoogte) {
      spelerY = minHoogte; // speler gaat niet lager dan de minHoogte (grond) als spatie wordt ingedrukt
      springRichting = 0; // de volgende keer als de speler springt, springt de speler niet te hoog
      moetVallen = false;
    } else {
      vallen(); 
    }
  } else {
      versnelling = -springKracht - abs(springRichting) / 2; // springen
      sprongTeller = sprongTeller + 1; //wordt toegevoegd bij sprongTeller
    }

  if (spelerX < 20 || spelerX + spelerBreedte >= veldBreedte + 20 || spelerY <= 20 || 
      tegenObstakelLinks === true && tegenObstakelRechts === false || jump === false && tegenObstakelLinks === false && tegenObstakelRechts === true || jump === false && tegenObstakelLinks === true && tegenObstakelRechts === false ) { // speler kan niet uit het veld springen
    springRichting = 0;
  }
};



function vallen () {
  versnelling += valSnelheid * 3/4; // vallen als de maximale hoogte is bereikt bij het springen 
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

function menu(){
    fill(0);
    rect(20,20,200,50);
    fill(0,220,22);
    text('terug',20,20,20,20);
    if(mouseIsPressed && mouseX <= 20 + 200 && mouseX >= 20 && mouseY <= 20 + 50 && mouseY >= 20) {
        spelStatus = UITLEG;
    }
}
function uitlegScherm(){
    background(0);
    fill(225,0,0);
    image(level1Plaatje, levelX,levelY,levelWidth,levelHeight);
    image(level2Plaatje, levelX,levelY + 170,levelWidth,levelHeight);
    image(level3Plaatje ,levelX,levelY + 340,levelWidth,levelHeight);
    image(level4Plaatje ,levelX,levelY + 510,levelWidth,levelHeight);
    fill(0);
    text('level 1',levelX + 100,levelY + 75,100,100);
    text('level 2',levelX + 100,levelY + 245,100,100);
    text('level 3',levelX + 100,levelY + 415,100,100);
    text('level 4',levelX + 100,levelY + 585,100,100);
}
/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case UITLEG: // startscherm
    uitlegScherm();
    if(mouseIsPressed && mouseX <= levelX + levelWidth && mouseX >= levelX && mouseY <= levelY + levelHeight && mouseY >= levelY) {
        spelStatus = LEVEL1;
    } else if(mouseIsPressed && mouseX <= levelX + levelWidth && mouseX >= levelX && mouseY <= levelY + 170 + levelHeight && mouseY >= levelY + 170) {
        spelStatus = LEVEL2;
    } else if(mouseIsPressed && mouseX <= levelX + levelWidth && mouseX >= levelX && mouseY <= levelY + 340 + levelHeight && mouseY >= levelY + 340) {
        spelStatus = LEVEL3;
    } else if(mouseIsPressed && mouseX <= levelX + levelWidth && mouseX >= levelX && mouseY <= levelY + 510 + levelHeight && mouseY >= levelY + 510) {
        spelStatus = LEVEL4;
    }
    break;
    case LEVEL1:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        spelStatus = GAMEOVER;
      }

      if(collideRectRect(spelerX,spelerY,spelerBreedte,spelerHoogte,vijandX,vijandY,vijandBreedte,vijandHoogte)){
          console.log("het spel is voorbij");
      }

      spelerSpringen();
      zwaartekracht();
      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);
      obstakel();
      menu();
      //locatie();

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
      case LEVEL2:
        background(0,225,225);
        menu();
      break;
       case LEVEL3:
        background(225,0,0);
        menu();
      break;
       case LEVEL4:
        background(225,225,0);
        menu();
      break;
      case GAMEOVER:
      background(225,225,0);
      break;


  }
}
