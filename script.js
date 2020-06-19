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
const GAMEOVER2 = 6;
const GAMEOVER3 = 7;
const GAMEOVER4 = 8;
const SPELUITLEG = 6;
var spelStatus = UITLEG;

//beeld
var canvasBreedte =  1280;
var canvasHoogte = 720;
var veldBreedte = 1240;
var veldHoogte = 680;
var grasHoogte = 650;
var geenAchtergrond = false; //zwarte achtergrond bij level 4 die meebeweegt met de speler
var achtergrondX = 20
var achtergrondY = 20;
var achtergrondBreedte = veldBreedte;
var achtergrondHoogte = veldHoogte;

//speler
var spelerBreedte = 75; 
var spelerHoogte = 112;
var spelerX = 50; // begin x-positie van speler
var spelerY = grasHoogte - spelerHoogte; // begin y-positie van speler
var maxSnelheid = 10;
var nieuweSnelheid = 0;
var spelerVersnelling = 0.25;
var spelerSnelheid = 0.25;
var naarRechts = false;
var naarLinks = false;
var schuinLopen = false;
var inDeLucht = false;

//vijanden
var vijandX = [20, 655]; // x-positie van vijand
var vijandY = [315, 600]; // y-positie van vijand
var vijandX2 = [150, 710, 240];  
var vijandY2 = [270, 270, 130 ];  
var vijandX3 = [330, 725, 190, 440];
var vijandY3 = [100, 250, 240, 250];
var vijandX4 = [50, 1050, 720];
var vijandY4 = [390, 580, 250];
var vijandSnelheid = [2, 1, 0, 0.5]; // snelheid van de vijand
var vijandBreedte = 50;
var vijandHoogte = 50;
var uitersteVijandX = [20, 190]

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
var levelHoogte = 150;
var levelBreedte = 200;
var levelX = 1000;
var levelY = 20;

//vlag
var vlagX = [];
var vlagY = [];
var vlagBreedte = 50;
var vlagHoogte = 100;
var volgendeX = 638;
var volgendeY = canvasHoogte/4*3;

// plaatjes
var level1Plaatje;
var level2Plaatje;
var level3Plaatje;
var level4Plaatje;
var spelerImage;
var ondergrondImg;
var obstakelImage;
var achtergrondImg1;
var achtergrondImg2;
var achtergrondImg3;
var achtergrondImg4;
var schaapImg;
var sleutelImg;
var spelerPlaatje;
var vlagPlaatje;
var gewonnenPlaatje;
var persoon;
var wolfLopend;
var opnieuwKnopje;

//lettertypen
var GhostClouds;
var gameOverFont;

//schapen
var schaapY = [];
var schaapX = [];
var schaapBreedte = 80;
var schaapHoogte = 60;
var aantalSchapen = 0;
var schaapIsZichtbaar = true;

//sleutel
var sleutelX = []; 
var sleutelY = []; 
var sleutelBreedte = 50;
var sleutelHoogte = 50;
var heeftSleutelVast = false;
var sleutelIsZichtbaar = true;
var sleutelIsOpgepakt = false;

//obstakels
var opValObstakel = false;
var tegenObstakelRechts = false;
var tegenObstakelLinks = false;
var tegenDuwObstakel = false;
var moetVallen = false;
var staatOpObstakel = false;
var spelerSchuin = false;
var opTrampoline = false;

//duwObstakel 
var duwObstakel = {
  yPositie: 140,
  breedte: 10,
  hoogte: 140, }
var duwObstakelX = 950;

//valObstakel
var valObstakel = {
  xPositie: 660,
  breedte: 290,
  hoogte: 15,
}
var valObstakelY = 130;

var obstakelX =       [];
var obstakelY=        [];
var obstakelBreedte = [] ;
var obstakelHoogte =  [];

//bewegendObstakel 
var bewegendObstakelY = []; //230
var bewegendObstakelBreedte = 80;
var bewegendObstakelHoogte = 30;
var bewegendObstakelX = []; //80
var vanBewegendObstakelAf = false;
var bewegendObstakelSnelheid = [2, 0] 
var bewegendObstakelRichting = [0,-1] 
var uitersteWaardeX = []
var uitersteWaardeY = []


/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  if(spelStatus === LEVEL1) {
  image(achtergrondImg1, 20, 20, veldBreedte, veldHoogte); }

  if(spelStatus === LEVEL2) {
    image(achtergrondImg2, 20, 20, veldBreedte, veldHoogte); }

  if (spelStatus === LEVEL3) {
    image(achtergrondImg3, 20, 20, veldBreedte, veldHoogte); }

  if (spelStatus === LEVEL4) {
    image(achtergrondImg4, 20, 20, veldBreedte, veldHoogte); }

  //gras (ondergrond)
  noStroke();
  image(ondergrondImg, 20, grasHoogte, veldBreedte, 50);
};


/**
 * Tekent de vijand
 * 
 */
var tekenVijand = function() {
 for (var i = 0; i < vijandX.length; i++) {
    image(wolfLopend, vijandX[i], vijandY[i], vijandBreedte, vijandHoogte); 
    }
};

var tekenVijandLevel2 = function() {
 for (var i = 0; i < vijandX2.length; i++) {
    image(wolfLopend,vijandX2[i], vijandY2[i], vijandBreedte, vijandHoogte); 
    }
};

var tekenVijandLevel3 = function() {
    for (var i = 0; i < vijandX3.length; i++) {
    image(wolfLopend, vijandX3[i], vijandY3[i], vijandBreedte, vijandHoogte); 
    }
}

var tekenVijandLevel4 = function() {
    for (var i = 0; i < vijandX4.length; i++) {
    image(wolfLopend, vijandX4[i], vijandY4[i], vijandBreedte, vijandHoogte); 
    }
}

/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    if(spelStatus === LEVEL1) { //bewegen van vijanden LEVEL1
    vijandX[0] = vijandX[0] + vijandSnelheid[0]; //de vijand beweegt
      if (vijandX[0] > uitersteVijandX[1]){ //de vijand gaat naar links
        vijandSnelheid[0] = -1;
      }
      else if (vijandX[0] <= uitersteVijandX[0]) { ///de vijand gaat naar rechts
        vijandSnelheid[0] = 1;
      }     
    }

    if(spelStatus === LEVEL2) { //bewegen van vijanden LEVEL2
    for (var i = 0; i < vijandX2.length; i++) {
      vijandX2[i] = vijandX2[i] + vijandSnelheid[i];

      if(vijandX2[0] >= 550) {
        vijandSnelheid[0] = -2;

      } else if (vijandX2[0] <= 200) {
        vijandSnelheid[0] = 2; }
        else if( vijandX2[1] >= 720) {
        vijandSnelheid[1] = -1; 
      } else if (vijandX2[1] <= 600) {
        vijandSnelheid[1] = 1; }
      } //einde for loop
    }

    if(spelStatus === LEVEL3) {
      vijandX3[1] = vijandX3[1] + vijandSnelheid[3]
      if(vijandX3[1] >= 730) {
         vijandSnelheid[3] = -0.5;
      } else if(vijandX3[1] <= 600) {
         vijandSnelheid[3] = 0.5; }
    }
};


/**
 * Tekent schaap
 */
var tekenSchaap = function() {
 for (var i = 0; i < schaapX.length; i++) {
    image(schaapImg, schaapX[i], schaapY[i], schaapBreedte, schaapHoogte); //alle schapen worden getekend
 }
};

/**
 * Checkt of schaap geraakt is door de speler
 */
function checkSchaapGeraakt () {
    for (var i = 0; i < schaapX.length; i++) {
      if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, schaapX[i], schaapY[i], schaapBreedte, schaapHoogte) ) {
          schaapIsZichtbaar = true;
          verwijderSchaap(i); 
          i = i - 1;
          if(schaapIsZichtbaar === true) { //schaap wordt geraakt en schaap is zichtbaar
            aantalSchapen = aantalSchapen + 1;
            schaapIsZichtbaar = false; //zodat aantalSchapen niet blijft doortellen
          }
        }
    }  
};

/**
 * Schaap wordt verwijderd als hij is geraakt door de speler
 * De schapenTeller geeft aan hoeveel schapen er zijn opgepakt
 */
function verwijderSchaap(i) { 
    schaapX.splice(i, 1);
    schaapY.splice(i, 1);
};

var schapenTeller = function() {
    noStroke();
    fill("white");
    rect(1150, 30, 100, 50);
    fill("black");
    textSize(25);
    text(aantalSchapen + " x ",  1175, 45, 200, 200); 
};


var nieuwLevel1 = function() { //waarden die veranderen bij het starten van level1
    reset(); 
    schaapY = [590, 70, 410];
    schaapX = [1140, 456, 1130];
    sleutelX = [600];
    sleutelY = [75];
    vlagX = [1190];
    vlagY = [370];
    valObstakelY = 130;
    duwObstakelX = 950;  
}


var nieuwLevel2 = function() { //waarden die veranderen bij het starten van level2
    reset();
    schaapY = [320, 120, 120];
    schaapX = [950, 590, 160];
    vlagX = [35];
    vlagY = [220];
}


var nieuwLevel3 = function() { //waarden die veranderen bij het starten van level3
    reset();
    sleutelX = [540];
    sleutelY = [250];
    schaapY = [590, 90, 90];
    schaapX = [1150, 810, 220];
    vlagX = [60];
    vlagY = [190];
    bewegendObstakelY = [480, 385]; 
    bewegendObstakelX = [400, 1180]; 
    uitersteWaardeX = [250, 850];
    uitersteWaardeY = [120, 450];
};

var nieuwLevel4 = function() { //waarden die veranderen bij het starten van level4
    reset();
    bewegendObstakelY = [500, 450]; 
    bewegendObstakelX = [800, 550]; 
    uitersteWaardeX = [850, 1150];
    uitersteWaardeY = [300, 550];
    schaapY = [80, 240, 80];
    schaapX = [70, 640, 980];
    vlagX = [800];
    vlagY = [400];
};

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
if(spelerSchuin === true) {
    push(); //zorgt er voor dat niet het hele beeld wordt gedraaid
    translate(280, -150); // speler staat op het schuine obstakel
    rotate(30); // speler wordt gedraaid
    schuinLopen = true;
}

if (naarRechts === true || inDeLucht === true && springRichting > 0){ //speler loopt naar rechts of is in de lucht en springt naar rechts
    image(spelerImage[1], x, y, spelerBreedte, spelerHoogte); 
    achtergrondX = spelerX + spelerSnelheid + spelerBreedte + 20; //de zwarte achtergrond in level 4 beweegt mee met de speler
    achtergrondY= spelerY - 20 - achtergrondHoogte;
    naarRechts = true; //zodat de sleutel wisselt van kant

} else if(naarLinks === true || inDeLucht === true && springRichting < 0) { //speler loopt naar links of is in de lucht en springt naar links
    image(spelerImage[2], x, y, spelerBreedte, spelerHoogte); 
    naarLinks = true; //zodat de sleutel wisselt van kant
    achtergrondX = spelerX - spelerSnelheid + spelerBreedte + 20; //de zwarte achtergrond in level 4 beweegt mee met de speler
    achtergrondY = spelerY- 20 - achtergrondHoogte;

} else { image(spelerImage[0], x, y, spelerBreedte, spelerHoogte); //speler beweegt niet naar links of rechts
  }

if(spelerSchuin === true) {
    pop(); } //stop het draaien, speler is weer rechtop te zien
};

/**
 * preload
 * 
 */
function preload() {
  //lettertypen 
  GhostClouds = loadFont('lettertypen/GhostClouds.ttf');
  gameOverFont = loadFont('lettertypen/gameOverFont.ttf');

  //afbeeldingen
  spelerImage = [
    loadImage('afbeeldingen/herder_staand.png'),
    loadImage('afbeeldingen/herder1.png'),
    loadImage('afbeeldingen/herderlinks1.png') ] ;     
  ondergrondImg = loadImage('afbeeldingen/ondergrond.png');
  
  obstakelImage = [ 
      loadImage('afbeeldingen/water.png'),
      loadImage('afbeeldingen/grasObstakel1.png'),
      loadImage('afbeeldingen/grasObstakel2.png'),
      loadImage('afbeeldingen/hout1.png'),
      loadImage('afbeeldingen/huis1.png'),
      loadImage('afbeeldingen/trampoline.png'),
      loadImage('afbeeldingen/deur.png'),
      loadImage('afbeeldingen/ijs.png')
  ];

  achtergrondImg1 = loadImage('afbeeldingen/achtergrond.png');
  achtergrondImg2 = loadImage('afbeeldingen/strand.png');
  achtergrondImg3 = loadImage('afbeeldingen/herfst.png');
  achtergrondImg4 = loadImage('afbeeldingen/winter.png');
  schaapImg = loadImage('afbeeldingen/schaap.png');

  spelerPlaatje = loadImage('img/foto.png');
  level1Plaatje = loadImage('img/zomer.jpg');
  level2Plaatje = loadImage('img/herfst.jpg');
  level3Plaatje = loadImage('img/winter.jpg');
  level4Plaatje = loadImage('img/lente.jpg');
  sleutelImg = loadImage('afbeeldingen/sleutel.png');
  vlagPlaatje = loadImage('img/vlag.png');
  gewonnenPlaatje = loadImage('img/gewonnen.jpg');
  persoon = loadImage('img/persoon.jpg');
  wolfLopend = loadImage('img/wolfLopend.jpg');
  opnieuwKnopje = loadImage('img/opnieuw.jpg');
};

var sleutel = function() {
    for (var i = 0; i < sleutelX.length; i++) {
    if(sleutelIsZichtbaar) { //de sleutel is zichtbaar als hij nog niet is opgepakt en gebruikt om een dier te openen
    image(sleutelImg, sleutelX[i], sleutelY[i], sleutelBreedte, sleutelHoogte);
    }
    
    if(collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, sleutelX[i], sleutelY[i], sleutelBreedte, sleutelHoogte)) { //de speler pakt de sleutel op
        heeftSleutelVast = true;
        sleutelIsOpgepakt = true;
    }

    if(heeftSleutelVast === true && sleutelIsOpgepakt === true ) { 
        if(naarRechts === true) { //de sleutel bevindt zich aan de kant waar de speler niet heen loop
        sleutelX[i] = spelerX - 20;
        sleutelY[i] = spelerY + 50;
        }
        else if(naarLinks === true) {
        sleutelX[i] = spelerX + sleutelBreedte;
        sleutelY[i] = spelerY + 50;
        } 
    }
    }
};

/**
 * Tekent obstakels
 */
var tekenObstakel = function() { //obstakels van LEVEL1
    if(spelStatus === 1) { 
    obstakelX =       [290, 525, 810, 950, 410, 20, 20 , 190, 950, 390];
    obstakelY=        [590, 500, 470, 280, 280, 365, 250, 130, 20 , 610];
    obstakelBreedte = [100, 120, 430, 150, 250, 350, 80 , 470, 10 , 135];
    obstakelHoogte =  [100 , 168, 60 , 190, 15 , 30 , 30 , 15 , 120, 90 ];
    }

  //platforms
  for (var i = 0; i < obstakelX.length; i++) {
    if(spelStatus === LEVEL1) {
    fill(96, 56, 19); //alle obstakels zonder afbeeldingen zijn bruin
    image(obstakelImage[0], obstakelX[9], obstakelY[9], obstakelBreedte[9], obstakelHoogte[9]);
    image(obstakelImage[1], obstakelX[0], obstakelY[0], obstakelBreedte[0], obstakelHoogte[0]);
    image(obstakelImage[2], obstakelX[1], obstakelY[1], obstakelBreedte[1], obstakelHoogte[1]);
    image(obstakelImage[3], obstakelX[2], obstakelY[2], obstakelBreedte[2], obstakelHoogte[2]);
    image(obstakelImage[4], obstakelX[3], obstakelY[3], obstakelBreedte[3], obstakelHoogte[3]);
    }

    if(spelStatus === LEVEL2) { //bepaalde obstakels hebben een andere kleur
        image(obstakelImage[5], obstakelX[7], obstakelY[7], obstakelBreedte[7], obstakelHoogte[7]);
        if (i === 10 || i === 13 || i === 12){
        fill(246,212, 131);
        } else {
        fill(40, 27, 19);
        }
    }

    if(spelStatus === LEVEL3) {
        fill(186, 93, 44);
    }

    if (i !== 9) { //de rechthoek achter bepaalde obstakels verdwijnen (bijvoorbeeld van het water --> het is golvend)
        if(spelStatus === LEVEL2 && i !== 7) {
        rect(obstakelX[i], obstakelY[i], obstakelBreedte[i], obstakelHoogte[i]); 
        } else if(spelStatus === LEVEL1 || spelStatus === LEVEL3 || spelStatus === LEVEL4) {
        rect(obstakelX[i], obstakelY[i], obstakelBreedte[i], obstakelHoogte[i]); 
        }
    }
    if(spelStatus === LEVEL4) {
        fill(7, 48, 75);
        rect(obstakelX[i], obstakelY[i], obstakelBreedte[i], obstakelHoogte[i]); 
    }
  }
};

var spelerOpObstakel = function() { //de speler staat op een obstakels
    sprongTeller = 0; // er kan weer gesprongen worden
    staatOpObstakel = true;
    jump = false; // niet meer springen
    moetVallen = false;
    spelerSchuin = false;
};

var obstakel = function() { //zorgt er voor dat de speler op een obstakel kan staan
    for (var i = 0; i < obstakelX.length; i++) {
    if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, obstakelX[i], obstakelY[i], obstakelBreedte[i], 1)) {
      spelerY = obstakelY[i] - spelerHoogte; //speler staat op obstakel
      spelerOpObstakel(); 
    }

    //speler valt van platform
    if(spelerY + spelerHoogte >= obstakelY[i] && spelerY < obstakelY[i] + 1 || spelerY + spelerHoogte >= bewegendObstakelY[i] && spelerY < bewegendObstakelY[i] + 1) { //speler is net van het (bewegende) obstakel af 
      if (spelerX + spelerBreedte <= obstakelX[i] && spelerX >= obstakelX[i] - spelerBreedte - 20 || 
        spelerX >= obstakelX[i] + obstakelBreedte[i] && spelerX + spelerBreedte <= obstakelX[i] + obstakelBreedte[i] + spelerBreedte + 20 || vanBewegendObstakelAf === true) { 
        springKracht = 9; //speler kan niet meer hoog springen (op de trampoline)
        moetVallen = true; //speler moet vallen tot aan minHoogte
      } 
    }  

    if(staatOpObstakel === true && moetVallen === true && spelerY <= minHoogte || spelerY <= 20) { //speler valt van het obstakel
      spelerY = spelerY + valSnelheid;
    }

    if(spelerY >= minHoogte) {  //speler valt niet meer van het obstakel en is dus op de minimale hoogte (de grond)
      moetVallen = false;
      staatOpObstakel = false;
    }

    //speler kan niet door obstakels 
    if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, //LINKS 
      obstakelX[i], obstakelY[i] + 5, obstakelBreedte[i] * 0.9, obstakelHoogte[i])) {
      tegenObstakelLinks = true;
      staatOpObstakel = false; //speler staat niet op obstakel
      versnelling = valSnelheid; //speler valt naar beneden ('botst' tegen onderkant obstakel)
      heeftSleutelVast = true;
    }

    else if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte,  //RECHTS
      obstakelX[i] + 20 , obstakelY[i] + 5, obstakelBreedte[i] - 20  , obstakelHoogte[i])) {
        tegenObstakelRechts = true;
        staatOpObstakel = false; //speler staat niet op obstakel
        versnelling = valSnelheid; //speler valt naar beneden ('botst' tegen onderkant obstakel)
        heeftSleutelVast = true;
     }
  }
};

  var valObstakels = function() { //obstakels die vallen als de speler erop staat
  fill(96, 56, 19); //bruin
  rect(valObstakel.xPositie, valObstakelY, valObstakel.breedte, valObstakel.hoogte);

  if(collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, valObstakel.xPositie, valObstakelY, valObstakel.breedte, valObstakel.hoogte - 20 )) {
    spelerY = valObstakelY - spelerHoogte; //speler staat op obstakel
    opValObstakel = true;
    spelerOpObstakel();
    
    if(valObstakelY === obstakelY[4]) { //platform stopt met naar beneden gaan en is even hoog als obstakel 4
    opValObstakel = false;
    valObstakelY = obstakelY[4]
    }

    if(opValObstakel === true) { //platform gaat naar beneden
      valObstakelY = valObstakelY + 2;
      spelerY = valObstakelY - spelerHoogte; //speler blijft op platform staan
    }
  }

  //speler bots tegen onderkant van valObstakel
  if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, valObstakel.xPositie, valObstakelY + 20, valObstakel.breedte, valObstakel.hoogte - 20 )) {
    staatOpObstakel = false; //speler staat niet op obstakel
    versnelling = valSnelheid; //speler valt naar beneden ('botst' tegen onderkant obstakel)
  }
};

var duwObstakels = function() { //obstakels bewegen als de speler er tegen aan loopt
  fill(170, 114, 73); //bruin
  rect(duwObstakelX, duwObstakel.yPositie, duwObstakel.breedte, duwObstakel.hoogte);
  if(spelerX + spelerBreedte >= duwObstakelX && spelerY + spelerHoogte <= duwObstakel.yPositie + duwObstakel.hoogte && 
    spelerY + spelerHoogte >= duwObstakel.yPositie) { //wanneer de speler tegen het duwobstakel loopt
    if(heeftSleutelVast === true && sleutelIsOpgepakt === true) { //speler kan alleen door het obstakel met een sleutel
        tegenDuwObstakel = true;
        duwObstakelX = duwObstakelX + 10;  //duwObstakel verschuift naar rechts als de speler er tegenaan loopt
        sleutelIsZichtbaar = false; //sleutel verdwijnt en is 'gebruikt'
    }
    else {
      tegenObstakelLinks = true; //speler kan niet door duwObstakel zonder sleutel
      sleutelNodig(); //krijgt een melding dat je een sleutel nodig hebt
         } 
    }
  if(duwObstakelX + duwObstakel.breedte >= obstakelX[3] + obstakelBreedte[3] ) { //duwObstakel stopt met bewegen
      duwObstakelX = obstakelX[3] + obstakelBreedte[3] - duwObstakel.breedte;
  } 
};


/**
 * Het bewegen van de speler
 * Updatet globale variabele spelerX en spelerY
 */
var snelheidVerandert = function() {
    nieuweSnelheid = spelerSnelheid + spelerVersnelling; // de snelheid van de speler neemt toe 
    spelerSnelheid = nieuweSnelheid;
};

var beweegSpeler = function() {
  if (keyIsPressed && keyCode === 65 && spelerX > 20 && tegenObstakelRechts === false) { // links "a"
    naarRechts = false; //speler beweegt in de lucht ook naar links als hij heeft gesprongen
    naarLinks = true;
    snelheidVerandert();
    spelerX = spelerX - nieuweSnelheid;
    springRichting = -nieuweSnelheid; // speler kan naar links springen
    tegenObstakelLinks = false;  
}
  
  else if (keyIsPressed && keyCode === 68 && spelerX + spelerBreedte <= veldBreedte + 20 && tegenObstakelLinks === false) { // rechts "d"
    naarLinks = false; //speler beweegt in de lucht ook naar rechts als hij heeft gesprongen
    naarRechts = true;
    snelheidVerandert();
    spelerX = spelerX + nieuweSnelheid;
    springRichting = nieuweSnelheid; // speler kan naar rechts springen
    tegenObstakelRechts = false;
  }
  
  else {
    spelerSnelheid = 0.25; // de snelheid van de speler wordt weer normaal als de speler heeft stilgestaan
    nieuweSnelheid = 0;
    naarLinks = false; //speler staat stil
    naarRechts = false;
  } 

  if (spelerSnelheid >= maxSnelheid) { //de speler kan niet sneller dan de max snelheid
    spelerSnelheid = maxSnelheid;
  }
};


function spelerSpringen() {
  if (keyIsPressed && keyCode === 32 && moetVallen === false && spelerSchuin === false) { // als spatie wordt ingedrukt en de speler loopt niet schuin of valt
    jump = true; //springen
    staatOpObstakel = false;
    inDeLucht = true; //speler is in de lucht 
  }
  
  else {
    jump = false; //niet springen
  }
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    for (var i = 0; i < vijandX.length; i++) { //alle vijanden

    //wanneer de speler in contact komt met water of ijs (behalve in level2)
    if(spelStatus !== LEVEL2 && collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, obstakelX[9], obstakelY[9], obstakelBreedte[9], obstakelHoogte[9])) {
        return true;
    }

    if(spelStatus === LEVEL1) { //de speler botst tegen een vijand van level 1
      if(collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, vijandX[i], vijandY[i], vijandBreedte, vijandHoogte)){
        return true;
       } 
     } 
    } 

    for (var i = 0; i < vijandX2.length; i++) {
    if (spelStatus === LEVEL2) { //de speler botst tegen een vijand van level 2
        if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, vijandX2[i], vijandY2[i], vijandBreedte, vijandHoogte)){
        return true;
        }
    }
}
    for (var i = 0; i < vijandX3.length; i++) {
    if (spelStatus === LEVEL3) { //de speler botst tegen een vijand van level 3
        if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, vijandX3[i], vijandY3[i], vijandBreedte, vijandHoogte)){
        return true; }
     }
    }

    for (var i = 0; i < vijandX4.length; i++) {
    if (spelStatus === LEVEL4) { //de speler botst tegen een vijand van level 4
        if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, vijandX4[i], vijandY4[i], vijandBreedte, vijandHoogte)) {
        return true; }
    }
  }
};


/**
 * De speler valt als hij heeft gesprongen
 */
function zwaartekracht() {
  if (spelerY >= minHoogte && jump === false ||  staatOpObstakel === true) {
    sprongTeller = 0; //reset sprongTeller wanneer speler landt
    tegenObstakelRechts = false; //de speler kan bewegen en staat dus niet stil tegen de zijkant van een obstakel
    tegenObstakelLinks = false;
    inDeLucht = false; //speler is niet meer in de lucht
  } else  {  //de speler spring
    spelerY = spelerY + (richting*versnelling); //de speler springt omhoog
    spelerX = spelerX + springRichting;  //hoe meer de speler een kant op heeft gelopen, hoe verder de speler springt
  }

  if (jump === true && spelerY <= maxHoogte || sprongTeller  >= springKracht) { //de speler heeft de maximum hoogte bereikt
    if(spelerY >= minHoogte) {
      spelerY = minHoogte; // speler gaat niet lager dan de minHoogte (grond) als spatie wordt ingedrukt
      springRichting = 0; // de volgende keer als de speler springt, springt de speler niet te hoog
      moetVallen = false;
    } else {
      vallen(); //de speler valt
    }
  } else {
      versnelling = -springKracht - abs(springRichting) / 2; // bepaalt hoe hoog de speler springt
      sprongTeller = sprongTeller + 1; //wordt toegevoegd bij sprongTeller
    }

  if (spelerX < 20 || spelerX + spelerBreedte >= veldBreedte + 20 || spelerY <= 20 || 
      tegenObstakelLinks === true && tegenObstakelRechts === false || jump === false && tegenObstakelLinks === false && tegenObstakelRechts === true || jump === false && tegenObstakelLinks === true && tegenObstakelRechts === false ) { // speler kan niet uit het veld springen
    springRichting = 0;
  }
};

function vallen () {
  versnelling += valSnelheid * 3/4;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  createCanvas(canvasBreedte, canvasHoogte);
  angleMode(DEGREES);
}

/**
 * Het menu scherm
 */
function menu(){
    push();
    fill(0);
    rect(20,20, 80,50);
    fill(255);
    text('terug',40,40,20,20); 
    if(mouseIsPressed && mouseX <= 40 + 20 && mouseX >= 40 && mouseY <= 40 + 20 && mouseY >= 20) { //als je op de menu knop klikt ga je terug naar het startscherm
        spelStatus = UITLEG;
    }
    pop();
}


function uitlegScherm(){
    push(); //andere lettertypen worden niet beïnvloed door de lettertypen van het uitlegScherm
    background(190,220,240);
    fill(0);
    textSize(60);
    textFont(GhostClouds);
    text("SHEEP SWEEP",370,340,1000,1000);
    textSize(15);
    image(level1Plaatje, levelX,levelY,levelBreedte,levelHoogte);
    image(level2Plaatje, levelX,levelY + 170,levelBreedte,levelHoogte);
    image(level3Plaatje ,levelX,levelY + 340,levelBreedte,levelHoogte);
    image(level4Plaatje ,levelX,levelY + 510,levelBreedte,levelHoogte);
    fill(0);
    textFont('Helvetica');
    textSize(20);
    text('level 1',levelX + 100,levelY + 75,100,100);
    text('level 2',levelX + 100,levelY + 245,100,100);
    text('level 3',levelX + 100,levelY + 415,100,100);
    text('level 4',levelX + 100,levelY + 585,100,100);
    pop();
}

function tekstInBeeld() { //er komt tekst in beeld die vertelt wat je moet doen
    stroke(0);
    strokeWeight(10);
    fill("white");
    rect(400, 200, 500, 200);
    noStroke();
    fill(0);
    textSize(25);
}

/**
 * Meldingen
 */
function sleutelNodig() { //je hebt een sleutel nodig om verder te kunnen
    tekstInBeeld();
    fill(0);
    if(spelStatus === LEVEL1 || spelStatus === LEVEL3)
    text('Oeps! Je hebt een sleutel nodig om langs deze deur te kunnen...', 450, 250, 400, 500);

}

function levelNogNietGehaald() { //je hebt meer schapen nodig om verder te kunnen
    tekstInBeeld();
    text('Aantal schapen nog nodig:' + " " + schaapX.length, 450, 250, 400, 500);
}


/**
 * LEVEL 2
 */
function level2 () {
    if(spelStatus === LEVEL2) { //de veranderingen van de posities van de obstakels bij level2
        obstakelX =       [100, 150, 200, 250, 980, 1170, 950, 1050, 1030, 420, 20 , 900, 570, 150]; 
        obstakelY=        [620, 570, 520, 470, 550, 20  , 200, 600 , 250 , 650, 320, 380, 180, 180];
        obstakelBreedte = [320, 270, 220, 170, 70 , 90  , 100, 120 , 20  , 260, 760, 150, 80 , 250];
        obstakelHoogte =  [50 , 50 , 50 , 50 , 100, 630 ,  50, 50  , 150 , 50 , 30 , 30,  20 , 20 ];

    //speler staat op de trampoline
    if(spelerX  > obstakelX[7] && spelerX + spelerBreedte  < obstakelX[7] + obstakelBreedte[7]
        && spelerY + spelerHoogte > obstakelY[7] - 400 && spelerY + spelerHoogte < obstakelY[7] + obstakelHoogte[7] && opTrampoline === false) {
            springKracht = 18; //speler springt hoger
            opTrampoline = true;
            springRichting = 0; //speler springt recht omhoog

        if(opTrampoline = true && spelerY + spelerHoogte >= obstakel[7] - 10 ) { //speler kan weer omhoog springen
            opTrampoline = false;
        }
    }
    else {
        springKracht = 9; //normale springkracht
    }

    push(); //de "schuine" balk waar de speler overheen loopt
    fill("black");
    rectMode(CENTER);
    rotate(-60); //balk wordt gedraaid
    translate(-213, 770);
    rect(0, 0, 30, 350);
    pop();
  }
    
    if(spelerX >= 414 && spelerX <= 710 && spelerY + spelerHoogte <= 490 && spelerY + spelerHoogte >= 460) { //speler gaat schuin lopen op het schuine obstakel
        if(staatOpObstakel === true) {
        spelerSchuin = true;
        }
        else {
            spelerSchuin = false; //speler loopt niet meer schuin
        }
    } 

    if(spelerX >= 745 && spelerX <= 760 && spelerY <= 360 && spelerY >= 300) { //speler gaat weer recht lopen als hij van het schuine obstakel af is
        if (staatOpObstakel === true) {
        spelerSchuin = false;
        spelerY = minHoogte;
        }
    }

    if(collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, 420, 471, 280, 30)) {
        spelerY = 471 - spelerHoogte; //speler staat op obstakel
      sprongTeller = 0; // er kan weer gesprongen worden
      staatOpObstakel = true;
      jump = false; // niet meer springen
      moetVallen = false;
    }    
};
 

function level3() {
    if (spelStatus === LEVEL3) { //de obstakels en afbeeldingen die veranderen bij level3
        obstakelX =       [120, 930, 1090, 730, 440, 40 , 180, 870, 0, 310 ]; 
        obstakelY=        [560, 340, 480 , 150, 300, 290, 150, 530, 0,  640 ];
        obstakelBreedte = [100, 50 , 170 , 450, 350, 200, 200, 60 , 0, 400 ];
        obstakelHoogte =  [90 , 310, 40  , 20 , 20 , 30 , 20 , 120, 0, 60  ];
    }
    image(obstakelImage[0], obstakelX[9], obstakelY[9], obstakelBreedte[9], obstakelHoogte[9]);
    image(obstakelImage[6], obstakelX[7], obstakelY[7], obstakelBreedte[7], obstakelHoogte[7]);

    if(collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, obstakelX[7], obstakelY[7], obstakelBreedte[7], obstakelHoogte[7])) {
        if(heeftSleutelVast === true && sleutelIsOpgepakt === true) { //wanneer de speler de sleutel heeft opgepakt en tegen de deur loopt
        spelerX = 40;
        spelerY = 160;
        sleutelIsZichtbaar = false;
        } else {
            sleutelNodig();
        }
    } 
};

function level4() {
    obstakelX =       [190, 350, 160, 300, 500, 460, 635, 700, 20 , 510, 20 , 940, 950 ]; 
    obstakelY=        [550, 450, 300, 150, 150, 150, 300, 500, 440, 640, 140, 630, 140 ];
    obstakelBreedte = [50 , 70 , 80 , 200, 280, 50 , 400, 140, 80 , 750, 140, 150, 200 ];
    obstakelHoogte =  [100 , 30, 10 , 10 , 10 , 500, 20 , 10 , 10 , 60 , 10 , 70 , 20 ];

    image(obstakelImage[7], obstakelX[9], obstakelY[9], obstakelBreedte[9], obstakelHoogte[9]); //afbeelding van ijs

   if(collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, obstakelX[4], obstakelY[4], obstakelBreedte[4], obstakelHoogte[4])) {
        geenAchtergrond = true; } //als de speler op een bepaald punt is gekomen verdwijnt de zwarte achtergrond
}

function bewegendeObstakels() {
    fill(96, 56, 19); 

    for (var i = 0; i < bewegendObstakelX.length; i++) {
    rect(bewegendObstakelX[i], bewegendObstakelY[i], bewegendObstakelBreedte, bewegendObstakelHoogte); //de obstakels bewegen met een bepaalde snelheid
    bewegendObstakelX[0] = bewegendObstakelX[0] + bewegendObstakelSnelheid[0];
    bewegendObstakelY[1] = bewegendObstakelY[1] + bewegendObstakelRichting[1];

    if(bewegendObstakelX[0] >= uitersteWaardeX[1] ) { //als de uiterste waarde is gebruikt, gaat het obstakel de andere kant op
        bewegendObstakelSnelheid[0] = -2;
    } else if (bewegendObstakelX[0] <= uitersteWaardeX[0]) {
        bewegendObstakelSnelheid[0] = 2;
    }

    if(bewegendObstakelY[1] >= uitersteWaardeY[1]) {
        bewegendObstakelRichting[1] = -1;
    } else if (bewegendObstakelY[1] <= uitersteWaardeY[0]) {
        bewegendObstakelRichting[1] = 1;
    }

    //speler staat op het bewegende obstakel
    if(collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, bewegendObstakelX[i], bewegendObstakelY[i], bewegendObstakelBreedte, bewegendObstakelHoogte )) {
        spelerOpObstakel();
        spelerX = spelerX + bewegendObstakelSnelheid[i] * 2
        spelerY = bewegendObstakelY[i] - spelerHoogte;
        spelerY = spelerY + bewegendObstakelRichting [i] * 2 // speler beweegt mee met bewegendObstakel
    } 

    //speler staat net naast het bewegende obstakel en moet dus vallen
    if(spelerX + spelerBreedte <= bewegendObstakelX[0] && spelerX >= bewegendObstakelX[0] - spelerBreedte - 20 || 
        spelerX >= bewegendObstakelX[0] + bewegendObstakelBreedte && spelerX + spelerBreedte <= bewegendObstakelX[0] + bewegendObstakelBreedte + spelerBreedte + 20 
        || spelerX + spelerBreedte <= bewegendObstakelX[1] && spelerX >= bewegendObstakelX[1] - spelerBreedte - 20 || 
        spelerX >= bewegendObstakelX[1] + bewegendObstakelBreedte && spelerX + spelerBreedte <= bewegendObstakelX[1] + bewegendObstakelBreedte + spelerBreedte + 20) {
            vanBewegendObstakelAf = true;
        } else {
            vanBewegendObstakelAf = false;
        }
    }  
};


function achtergrond() {
    fill(0)
    rect(achtergrondX, 20, achtergrondBreedte, achtergrondHoogte) //zwarte achtergrond beweegt mee
    rect(20, achtergrondY, achtergrondBreedte, achtergrondHoogte)
}

function reset() { //bij het starten van een level veranderen de posities weer naar wat het was
    sleutelIsZichtbaar = true;
    spelerSchuin = false;
    spelerX = 20;
    spelerY = minHoogte;
    aantalSchapen = 0;
    sleutelIsOpgepakt = false;
    heeftSleutelVast = false;
}

function eind(){
    for (var i = 0; i < vlagX.length; i++) {
    image(vlagPlaatje,vlagX[i],vlagY[i],vlagBreedte,vlagHoogte);
    if(collideRectRect(spelerX,spelerY,spelerBreedte,spelerHoogte,vlagX[i],vlagY[i],vlagBreedte,vlagHoogte)) {
        if(schaapX.length === 0) { //wanneer de speler tegen de vlag loopt en alle schapen zijn opgepakt
        volgende(); }
    else {
        levelNogNietGehaald(); //de speler heeft nog niet alle schapen
      }
    }
  }
};


function volgende(){ //de speler gaat naar een volgend level
    fill(0);
    background(75,0,160);
    image(gewonnenPlaatje,290,50,700,400);
    ellipse(volgendeX,volgendeY,200,50);
    if(mouseIsPressed && mouseX <= volgendeX + 100 && mouseX >= volgendeX && mouseY <= volgendeY + 100 && mouseY >= volgendeY){
        if (spelStatus === LEVEL1) {
        spelStatus = LEVEL2;
        nieuwLevel2(); }
        else if (spelStatus === LEVEL2) {
         spelStatus = LEVEL3;
        nieuwLevel3();
        } else if (spelStatus === LEVEL3) {
         spelStatus = LEVEL4;
        nieuwLevel4();
        geenAchtergrond = false;
        }
    }
    fill(255);
    text("volgende",612,533,50,50);  
};

function spelUitleg(){ //als op deze knop wordt geklikt, wordt het spel uitgelegd
    fill(0);
    rect(570,415,80,30);
    textFont('georgia');
    textSize(15);
    fill(255);
    text('uitleg', 590 ,425,40,40);
    if(mouseIsPressed && mouseX <= 590 + 40 && mouseX >= 590 && mouseY <= 425 + 40 && mouseY >= 425){
        image(persoon,50,130,200,500);
        fill(0);
        triangle(195,220,335,190,290,180);
        rect(290,90,610,110);
        fill(255);
        textFont('Helvetica');
        textSize(14);
     text('Het is weer lente! Bob de herder is al zijn schapen verloren en heeft jouw hulp nodig om ze terug te vinden. Je beweegt naar links met A, met D beweeg je naar rechts en met de spatiebalk spring je. Probeer zoveel mogelijk schapen te pakken, maar kijk uit voor de wolven en het water. Soms heb je bepaalde dingen nodig om het level te halen (zoals een sleutel). Veel succes ermee en hopelijk maak je Bob blij door hem zijn schapen weer terug te geven.',300,100,600,500);
    }
};

function gameOver(){ //wanneer de speler is geraakt door een vijand of in het water/op het ijs is gevallen
     filter(GRAY);
      fill(0);
      textSize(85);
      textFont(gameOverFont);
      text('GAME OVER',400,100,5000,5000);
      textFont('georgia')
      textSize(40);
      text('Je had' + ' ' + aantalSchapen + ' ' + 'schapen', 450, 500, 600, 600); //"score"
};

function nieuwLevel() { //elke keer als er een nieuw level wordt gestart
        tekenVeld();
        tekenSpeler(spelerX, spelerY);
        beweegVijand();
        obstakel();
        tekenSchaap();
        spelerSpringen();
        beweegSpeler();
        zwaartekracht();
        tekenObstakel();
        schapenTeller();
        checkSchaapGeraakt();      
        menu();
};


function opnieuw(){
    fill(255);
    image(opnieuwKnopje,450,300,300,150);
    if(mouseIsPressed && mouseX <= 450 + 300 && mouseX >= 450 && mouseY <= 300 + 150 && mouseY >= 300) {
        spelStatus = LEVEL1;
        nieuwLevel1();
    }
}
function opnieuw2(){
    fill(255);
    image(opnieuwKnopje,450,300,300,150);
    if(mouseIsPressed && mouseX <= 500 + 300 && mouseX >= 500 && mouseY <= 300 + 150 && mouseY >= 300) {
        spelStatus = LEVEL2;
        nieuwLevel2();
    }
}
function opnieuw3(){
    fill(255);
    image(opnieuwKnopje,450,300,300,150);
    if(mouseIsPressed && mouseX <= 500 + 300 && mouseX >= 500 && mouseY <= 300 + 150 && mouseY >= 300) {
        spelStatus = LEVEL3;
        nieuwLevel3();
    }
}
function opnieuw4(){
    fill(255);
    image(opnieuwKnopje,450,300,300,150);
    if(mouseIsPressed && mouseX <= 500 + 300 && mouseX >= 500 && mouseY <= 300 + 150 && mouseY >= 300) {
        spelStatus = LEVEL4;
        nieuwLevel4();
        geenAchtergrond = false;
       }
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
    spelUitleg();
    if(mouseIsPressed && mouseX <= levelX + levelBreedte && mouseX >= levelX && mouseY <= levelY + levelHoogte && mouseY >= levelY) {
        spelStatus = LEVEL1;
        nieuwLevel1();
    } else if(mouseIsPressed && mouseX <= levelX + levelBreedte && mouseX >= levelX && mouseY <= levelY + 170 + levelHoogte && mouseY >= levelY + 170) {
        spelStatus = LEVEL2;
        nieuwLevel2();
    } else if(mouseIsPressed && mouseX <= levelX + levelBreedte && mouseX >= levelX && mouseY <= levelY + 340 + levelHoogte && mouseY >= levelY + 340) {
        spelStatus = LEVEL3;
        nieuwLevel3();
    } else if(mouseIsPressed && mouseX <= levelX + levelBreedte && mouseX >= levelX && mouseY <= levelY + 510 + levelHoogte && mouseY >= levelY + 510) {
        spelStatus = LEVEL4;
        nieuwLevel4();
        geenAchtergrond = false;
    }
    textFont('georgia');
    spelUitleg();
    break;

    case LEVEL1:
      nieuwLevel();
      tekenVijand();
      sleutel();
      valObstakels();
      duwObstakels();
      eind(); 
      if (checkSpelerGeraakt()) {
        spelStatus = GAMEOVER;
      }
    break;

    case LEVEL2:
      nieuwLevel();
      tekenVijandLevel2();
      level2();
      eind(); 
      if (checkSpelerGeraakt()) {
        spelStatus = GAMEOVER2;
      }
    break;

    case LEVEL3:
        nieuwLevel();
        tekenVijandLevel3();
        sleutel();
        level3();
        bewegendeObstakels();
        eind(); 
        if (checkSpelerGeraakt()) {
        spelStatus = GAMEOVER3;
      }
    break;

    case LEVEL4:
        nieuwLevel();
        tekenVijandLevel4();
        bewegendeObstakels();     
        level4();  
        eind(); 
        if(geenAchtergrond === false) {
        achtergrond(); }
        if (checkSpelerGeraakt()) {
        spelStatus = GAMEOVER4;
      }
    break;

    case GAMEOVER:
      menu();
      gameOver();
      opnieuw();
      spelerX = 50;
      spelerY = grasHoogte - spelerHoogte;
    break;

    case GAMEOVER2:
      gameOver();
      menu();
      opnieuw2();
      spelerX = 50;
      spelerY = grasHoogte - spelerHoogte;
    break;

    case GAMEOVER3:
      gameOver();
      menu();
      opnieuw3();
      spelerX = 50;
      spelerY = grasHoogte - spelerHoogte;
    break;

    case GAMEOVER4:
      gameOver();
      menu();
      opnieuw4();
      spelerX = 50;
      spelerY = grasHoogte - spelerHoogte;
    break

  }
};