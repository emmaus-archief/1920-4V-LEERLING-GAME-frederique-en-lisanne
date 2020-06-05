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

var spelerBreedte = 75; 
var spelerHoogte = 112.5;
var spelerX = 50; // x-positie van speler
var spelerY = grasHoogte - spelerHoogte; // y-positie van speler

//snelheid speler
var maxSnelheid = 10;
var nieuweSnelheid = 0;
var spelerVersnelling = 0.25;
var spelerSnelheid = 0.25;
var naarRechts = false;
var naarLinks = false;

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = [20, 655];   // x-positie van vijand
var vijandY = [315, 600];   // y-positie van vijand
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
var spelerImage;
var ondergrondImg;
var obstakelImage;
var achtergrondImg;
var schaapImg;
var sleutelImg;

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */


var tekenVeld = function () {
  image(achtergrondImg, 20, 20, veldBreedte, veldHoogte);

  //gras (ondergrond)
  noStroke();
  //fill(100, 200, 75); // groen
  image(ondergrondImg, 20, grasHoogte, veldBreedte, 50);

};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
 for (var i = 0; i < vijandX.length; i++) {
    fill(0, 0 , 0);
    rect(vijandX[i], vijandY[i], vijandBreedte, vijandHoogte); 
    }
};

var schaapBreedte = 80;
var schaapHoogte = 60;
var schaapIsZichtbaar = true;
var alleSchapenZichtbaar = true;

/**
 * Tekent schaap
 */
var tekenSchaap = function() {
    var schaapY = [];
    var schaapX = [];
    
        schaapY.push(590, 70, 410);
        schaapX.push(1140, 456, 1130);
  
 for (var i = 0; i < schaapX.length; i++) {
    image(schaapImg, schaapX[i], schaapY[i], schaapBreedte, schaapHoogte)

    if (collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, schaapX[i], schaapY[i], schaapBreedte, schaapHoogte) ) {
        aantalSchapen = aantalSchapen + 1;
        schaapX.splice(i, 1)
        schaapY.splice(i, 1)
        console.log(schaapX);
        console.log(schaapY);
        //array verandert wel, maar het schaap verdwijnt niet ? 
        
    }  
 }
};

var aantalSchapen = 0;

var schapenTeller = function() {
    fill("white");
    rect(1150, 30, 100, 50);
    fill("black");
    textSize(20);
    text(aantalSchapen + " x ",  1175, 55);
}

var test = 1;
/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
   if (naarRechts === true || inDeLucht === true && springRichting > 0){ //speler is in de lucht en springt naar rechts
     image(spelerImage[1], x, y, spelerBreedte, spelerHoogte);
     naarRechts = true; //zodat de sleutel wisselt van kant
  } else if(naarLinks === true || inDeLucht === true && springRichting < 0) {
      image(spelerImage[2], x, y, spelerBreedte, spelerHoogte);
      naarLinks = true; //zodat de sleutel wisselt van kant

  } else { image(spelerImage[0], x, y, spelerBreedte, spelerHoogte); //speler beweegt niet naar links of rechts
  }
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    vijandX[0] = vijandX[0] + vijandSnelheid;
    if (vijandX[0] > 190){
        vijandSnelheid = -1;
    }
    if (vijandX[0] === 20) {
        vijandSnelheid = 1;
    } 
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};

/**
 * preload
 * 
 */
function preload() {
  spelerImage = [
    loadImage('afbeeldingen/herder_staand.png'),
    loadImage('afbeeldingen/herder1.png'),
    loadImage('afbeeldingen/herderlinks1.png') ] ;
    //loadImage('afbeeldingen/herder2.png'),
    //loadImage('afbeeldingen/herder3.png'),
    //loadImage('afbeeldingen/herder4.png')       
  ondergrondImg = loadImage('afbeeldingen/ondergrond.png');
  
  obstakelImage = [ 
      loadImage('afbeeldingen/water.png'),
      loadImage('afbeeldingen/grasObstakel1.png'),
      loadImage('afbeeldingen/grasObstakel2.png'),
      loadImage('afbeeldingen/hout1.png')
  ];

  achtergrondImg = loadImage('afbeeldingen/achtergrond.png');
  schaapImg = loadImage('afbeeldingen/schaap.png');

   spelerPlaatje = loadImage('img/foto.png');
    level1Plaatje = loadImage('img/zomer.jpg');
    level2Plaatje = loadImage('img/herfst.jpg');
    level3Plaatje = loadImage('img/winter.jpg');
    level4Plaatje = loadImage('img/lente.jpg');
    sleutelImg = loadImage('afbeeldingen/sleutel.png');

}

var sleutelX = 600;
var sleutelY = 75;
var sleutelBreedte = 50;
var sleutelHoogte = 50;
var heeftSleutelVast = false;
var sleutelIsZichtbaar = true;
var sleutelIsOpgepakt = false;

var sleutel = function() {
    if(sleutelIsZichtbaar) {
    image(sleutelImg, sleutelX, sleutelY, sleutelBreedte, sleutelHoogte);
    }
    
    if(collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, sleutelX, sleutelY, sleutelBreedte, sleutelHoogte)) {
        heeftSleutelVast = true;
        sleutelIsOpgepakt = true;
    }

    if(heeftSleutelVast === true && sleutelIsOpgepakt === true ) {
        if(naarRechts === true) {
        sleutelX = spelerX - 20;
        sleutelY = spelerY + 50;
        }
        else if(naarLinks === true) {
        sleutelX = spelerX + sleutelBreedte;
        sleutelY = spelerY + 50;
        } 
    }



}

//obstakels
var opValObstakel = false;
var tegenObstakelRechts = false;
var tegenObstakelLinks = false;
var tegenDuwObstakel = false;
var moetVallen = false;
var staatOpObstakel = false;

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



var obstakel = function() {
  var obstakelX =       [290, 525, 810, 950, 410, 20, 20 , 190, 950, 390] 
  var obstakelY=        [590, 500, 470, 280, 280, 365, 250, 130, 20 , 610 ]
  var obstakelBreedte = [100, 120, 430, 150, 250, 365, 80 , 470, 10 , 135 ] 
  var obstakelHoogte =  [100 , 168, 60 , 210, 15 , 30 , 30 , 15 , 120, 90  ] 

  //platforms
  for (var i = 0; i < obstakelX.length; i++) {
    fill("red");
    rect(obstakelX[i], obstakelY[i], obstakelBreedte[i], obstakelHoogte[i]); // de obstakels

    image(obstakelImage[0], obstakelX[9], obstakelY[9], obstakelBreedte[9], obstakelHoogte[9]);
    image(obstakelImage[1], obstakelX[0], obstakelY[0], obstakelBreedte[0], obstakelHoogte[0]);
    image(obstakelImage[2], obstakelX[1], obstakelY[1], obstakelBreedte[1], obstakelHoogte[1]);
    image(obstakelImage[3], obstakelX[2], obstakelY[2], obstakelBreedte[2], obstakelHoogte[2]);

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
    if(heeftSleutelVast === true && sleutelIsOpgepakt === true) {
        tegenDuwObstakel = true;
         duwObstakelX = duwObstakelX + 10; } //duwObstakel verschuift naar links als de speler er tegenaan loopt
    else {
      tegenObstakelLinks = true; //speler kan niet door duwObstakel zonder sleutel
         } 
    }
  if(duwObstakelX + duwObstakel.breedte >= obstakelX[3] + obstakelBreedte[3] ) { //duwObstakel stopt met bewegen
      duwObstakelX = obstakelX[3] + obstakelBreedte[3] - duwObstakel.breedte;
  } 
};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */

var beweegSpeler = function() {
  if (keyIsPressed && keyCode === 65 && spelerX > 20 && tegenObstakelRechts === false) { // links "a"
    naarRechts = false;
    naarLinks = true;
    nieuweSnelheid = spelerSnelheid + spelerVersnelling; // de snelheid van de speler neemt toe 
    spelerSnelheid = nieuweSnelheid;
    spelerX = spelerX - nieuweSnelheid
    springRichting = -nieuweSnelheid; // speler kan naar links springen
    tegenObstakelLinks = false;
     }
  
  else if (keyIsPressed && keyCode === 68 && spelerX + spelerBreedte <= veldBreedte + 20 && tegenObstakelLinks === false) { // rechts "d"
    naarLinks = false;
    naarRechts = true;
    nieuweSnelheid = spelerSnelheid + spelerVersnelling; // de snelheid van de speler neemt toe 
    spelerSnelheid = nieuweSnelheid;
    spelerX = spelerX + nieuweSnelheid;
    springRichting = nieuweSnelheid; // speler kan naar rechts springen
    tegenObstakelRechts = false;
  }
  
  else {
    spelerSnelheid = 0.25; // de snelheid van de speler wordt weer normaal als de speler heeft stilgestaan
    nieuweSnelheid = 0;
    naarLinks = false;
    naarRechts = false;
  } 

  if (spelerSnelheid >= maxSnelheid) { //de speler kan niet sneller dan de max snelheid
    spelerSnelheid = maxSnelheid;
  }
};

//LATER WEGHALEN
function locatie() { //om te kijken op welke plaats je de obstakels wilt plaatsen
  fill("white");
  text("X: "+mouseX, 800, 300);
  text("Y: "+mouseY, 800, 350);
} 

var inDeLucht = false;

function spelerSpringen() {
  if (keyIsPressed && keyCode === 32 && moetVallen === false) { // spatie
    jump = true; //springen
    staatOpObstakel = false;
    inDeLucht = true; //speler is in de lucht 
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
    for (var i = 0; i < vijandX.length; i++) {
    if(collideRectRect(spelerX, spelerY, spelerBreedte, spelerHoogte, vijandX[i], vijandY[i], vijandBreedte, vijandHoogte)){
        console.log("De speler is geraakt door de vijand");
        return true;
      } 
    }
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
    inDeLucht = false; //speler is niet meer in de lucht
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
  alert("(Voor Lisanne) A = links, D = rechts, spatie = springen\n De rode obstakels worden weggehaald als alles een plaatje heeft\n Nog werken aan: schapenTeller");
}

function menu(){
    fill(0);
    rect(20,20,200,50);
    fill(0,220,22);
    text('terug',20,20,20,20);
    if(mouseIsPressed && mouseX <= 20 + 200 && mouseX >= 20 && mouseY <= 20 + 50 && mouseY >= 20) {
        spelStatus = UITLEG;
        spelerX = 50;
        spelerY = grasHoogte - spelerHoogte;
        valObstakelY = 130;
        duwObstakelX = 950;
        sleutelX = 900;
        sleutelY = grasHoogte - 50;
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


      spelerSpringen();
      zwaartekracht();
      tekenVeld();
      tekenVijand();
      tekenSchaap();
      tekenSpeler(spelerX, spelerY);
      obstakel();
      menu();
      locatie();
      schapenTeller();
      sleutel();
      

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
      menu();
      break;


  }
}
