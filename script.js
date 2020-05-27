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
var mode; // geeft weer of de game begonnen is of niet



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
    mode=0; // game nog niet gestart
    createCanvas(windowWidth,windowHeight);
};

function draw() {
    clear();
    if(mode==0) {
       text();
    }
    if(mode==1) {
        ellipse(100,100,100,100);
    }
};

function keyPressed(){
    if(keyCode===ENTER) {
        mode=1;
    }
};

var text = function(){
    fill(0);
    textSize(20);
    text('klik hier',20,20);
};

