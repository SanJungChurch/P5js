let faceW = 280, faceH = 330, jawRound = .35, cheekPuff = 18;
let eyeSize = 34, eyeGap = 90, eyeY = -30, browTilt = .18, noseW = 26, noseH = 54, mouthW = 130, smile = .9;
let hairLength = 80, fringeDepth = 40, sideHair = 24;
let SKIN, SHADOW, HAIR, EYE, LIP, BLUSH;
let showGlasses = true, showHat = false, showEarring = true, showMustache = false;

function setup() {
  createCanvas(600, 600);
  noLoop();
  SKIN = color(247, 216, 191);
  SHADOW = color(230, 195, 168);
  HAIR = color(205, 145, 35);
  EYE = color(40, 40, 40);
  LIP = color(200, 70, 95);
  BLUSH = color(255, 170, 160, 130);
}

function draw() {
  background(245);
  translate(width / 2, height / 2 + 30);
  drawHairBack();
  drawFace();
  drawBlush();
  drawEyesAndBrows();
  drawNose();
  drawMouth();
  drawHairFront();
  if (showGlasses) drawGlasses();
  if (showHat) drawHat();
  if (showEarring) drawEarrings();
  if (showMustache) drawMustache();
  noFill();
  stroke(0, 40);
  strokeWeight(2);
  rectMode(CENTER);
  rect(0, -10, 520, 520, 12);
}

function drawFace() {
  noStroke();
  fill(SKIN);
  ellipse(0, 0, faceW, faceH);
  fill(SKIN);
  ellipse(-faceW * .33, faceH * .02, cheekPuff * 2.2, cheekPuff * 1.6);
  ellipse(faceW * .33, faceH * .02, cheekPuff * 2.2, cheekPuff * 1.6);
}

function drawBlush() {
  noStroke();
  fill(BLUSH);
  ellipse(-faceW * .28, faceH * .05, 40, 24);
  ellipse(faceW * .28, faceH * .05, 40, 24);
}

function drawEyesAndBrows() {
  noStroke();
  fill(255);
  ellipse(-eyeGap / 2, eyeY, eyeSize * 1.5, eyeSize);
  ellipse(eyeGap / 2, eyeY, eyeSize * 1.5, eyeSize);
  fill(EYE);
  ellipse(-eyeGap / 2, eyeY, eyeSize * .6, eyeSize * .65);
  ellipse(eyeGap / 2, eyeY, eyeSize * .6, eyeSize * .65);
  fill(255, 220);
  ellipse(-eyeGap / 2 - 4, eyeY - 4, 6, 6);
  ellipse(eyeGap / 2 - 4, eyeY - 4, 6, 6);
  stroke(0, 90);
  strokeWeight(3);
  noFill();
  arc(-eyeGap / 2, eyeY - 2, eyeSize * 1.6, eyeSize, PI, 0);
  arc(eyeGap / 2, eyeY - 2, eyeSize * 1.6, eyeSize, PI, 0);
  stroke(HAIR);
  strokeWeight(6);
  push();
  translate(-eyeGap / 2, eyeY - 36);
  rotate(-browTilt);
  line(-22, 0, 22, 0);
  pop();
  push();
  translate(eyeGap / 2, eyeY - 36);
  rotate(browTilt);
  line(-22, 0, 22, 0);
  pop();
}

function drawNose() {
  stroke(0, 40);
  strokeWeight(2);
  line(0, eyeY + 4, 0, eyeY + noseH - 6);
  noStroke();
  fill(SKIN);
  arc(0, eyeY + noseH, noseW * 1.2, noseW * .9, 0, PI, CHORD);
}

function drawMouth() {
  noStroke();
  fill(LIP);
  let y = eyeY + noseH + 40;
  ellipse(0, y, mouthW * .55, 20);
  stroke(120, 0, 30, 180);
  strokeWeight(3);
  noFill();
  arc(0, y, mouthW, 50 * smile, 0, PI);
  noStroke();
  fill(255, 80);
  arc(0, y + 4, mouthW * .45, 14, 0, PI, CHORD);
}

function drawHairBack() {
  noStroke();
  fill(HAIR);
  ellipse(0, -faceH * .07, faceW + sideHair * 2, faceH + hairLength);
  ellipse(-faceW * .48, 0, sideHair * 2.2, faceH * .7);
  ellipse(faceW * .48, 0, sideHair * 2.2, faceH * .7);
}

function drawHairFront() {
  stroke(HAIR);
  strokeWeight(14);
  noFill();
  let y = -faceH * .45;
  arc(-40, y + fringeDepth, 140, 90, PI, TWO_PI);
  arc(40, y + fringeDepth - 6, 140, 90, PI, TWO_PI);
  arc(0, y + fringeDepth - 10, 160, 100, PI, TWO_PI);
}

function drawGlasses() {
  stroke(0, 80);
  strokeWeight(6);
  noFill();
  let gw = eyeSize * 1.7, gh = eyeSize * 1.2;
  rectMode(CENTER);
  rect(-eyeGap / 2, eyeY, gw, gh, 10);
  rect(eyeGap / 2, eyeY, gw, gh, 10);
  line(-eyeGap / 2 + gw / 2, eyeY, eyeGap / 2 - gw / 2, eyeY);
  line(-eyeGap / 2 - gw / 2, eyeY, -eyeGap / 2 - gw / 2 - 18, eyeY - 6);
  line(eyeGap / 2 + gw / 2, eyeY, eyeGap / 2 + gw / 2 + 18, eyeY - 6);
}

function drawHat() {
  noStroke();
  fill(HAIR);
  rectMode(CENTER);
  rect(0, -faceH * .58, faceW * 1.2, 20, 10);
  rect(0, -faceH * .72, faceW * .7, 80, 12);
  fill(255, 230);
  rect(0, -faceH * .72, 26, 14, 3);
}

function drawEarrings() {
  noFill();
  stroke(200, 160, 30);
  strokeWeight(4);
  let y = eyeY + 20;
  circle(-faceW * .48, y, 18);
  circle(faceW * .48, y, 18);
}

function drawMustache() {
  stroke(HAIR);
  strokeWeight(6);
  noFill();
  let y = eyeY + noseH + 18;
  arc(-20, y, 40, 18, PI, TWO_PI);
  arc(20, y, 40, 18, PI, TWO_PI);
}

function keyPressed() {
  if (key === 's') saveCanvas('my_caricature', 'png');
}
