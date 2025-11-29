let faceW = 280, faceH = 330, jawRound = .35, cheekPuff = 18;
let eyeSize = 34, eyeGap = 90, eyeY = -30, browTilt = .18, noseW = 26, noseH = 54, mouthW = 130, smile = .9;
let hairLength = 80, fringeDepth = 40, sideHair = 24;
let SKIN, SHADOW, HAIR, EYE, LIP, BLUSH;
let showGlasses = true, showHat = false, showEarring = true, showMustache = false;

let talkMode = false;
let blinkForce = 0;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  frameRate(16);
  noLoop();
  SKIN = color(247, 216, 191);
  SHADOW = color(230, 195, 168);
  HAIR = color(205, 145, 35);
  EYE = color(40, 40, 40);
  LIP = color(200, 70, 95);
  BLUSH = color(255, 170, 160, 130);
}

function draw() {
  const t = millis() / 1000;
  background(245);

  const headTilt = map(mouseX, 0, width, -0.07, 0.07);
  push();
  translate(width / 2, height / 2 + 30);
  rotate(headTilt);

  drawHairBack(t);
  drawFace();
  drawBlush(t);
  drawEyesAndBrows(t);
  drawNose();
  drawMouth(t);
  drawHairFront(t);

  if (showGlasses) drawGlasses();
  if (showHat) drawHat();
  if (showEarring) drawEarrings();
  if (showMustache) drawMustache();

  pop();

  noFill();
  stroke(0, 40);
  strokeWeight(2);
  rectMode(CENTER);
  rect(width / 2, height / 2 + 20, 520, 520, 12);
}

function drawFace() {
  noStroke();
  fill(SKIN);
  ellipse(0, 0, faceW, faceH);
  fill(SKIN);
  ellipse(-faceW * .33, faceH * .02, cheekPuff * 2.2, cheekPuff * 1.6);
  ellipse(faceW * .33, faceH * .02, cheekPuff * 2.2, cheekPuff * 1.6);
}

function drawBlush(t) {
  noStroke();
  const pul = 1 + 0.05 * sin(t * 2.2);
  fill(255, 170, 160, 110 + 20 * (pul - 1) * 10);
  ellipse(-faceW * .28, faceH * .05, 40 * pul, 24 * pul);
  ellipse(faceW * .28, faceH * .05, 40 * pul, 24 * pul);
}

function drawEyesAndBrows(t) {
  let blink = max(0, 0.6 * (sin(t * 3.3 + 0.5) > 0.95 ? 1 : 0) + blinkForce);
  blinkForce = max(0, blinkForce - 0.15);

  const mx = constrain(mouseX - (width / 2), -120, 120);
  const my = constrain(mouseY - (height / 2 + 30), -120, 120);
  const lookX = mx / 80;
  const lookY = my / 90;

  noStroke();
  fill(255);
  const eyeH = eyeSize * (1 - 0.65 * blink);
  ellipse(-eyeGap / 2, eyeY, eyeSize * 1.5, eyeH);
  ellipse(eyeGap / 2, eyeY, eyeSize * 1.5, eyeH);

  fill(EYE);
  ellipse(-eyeGap / 2 + lookX, eyeY + lookY * 0.7, eyeSize * .6, eyeH * .65);
  ellipse(eyeGap / 2 + lookX, eyeY + lookY * 0.7, eyeSize * .6, eyeH * .65);

  fill(255, 220);
  ellipse(-eyeGap / 2 - 4 + lookX * 0.3, eyeY - 4 + lookY * 0.3, 6, 6);
  ellipse(eyeGap / 2 - 4 + lookX * 0.3, eyeY - 4 + lookY * 0.3, 6, 6);

  stroke(0, 90);
  strokeWeight(3);
  noFill();
  arc(-eyeGap / 2, eyeY - 2 - 3 * blink, eyeSize * 1.6, eyeSize, PI, 0);
  arc(eyeGap / 2, eyeY - 2 - 3 * blink, eyeSize * 1.6, eyeSize, PI, 0);

  stroke(HAIR);
  strokeWeight(6);
  const browLift = 5 * sin(t * 2.1);
  push();
  translate(-eyeGap / 2, eyeY - 36 - browLift);
  rotate(-browTilt);
  line(-22, 0, 22, 0);
  pop();
  push();
  translate(eyeGap / 2, eyeY - 36 - browLift);
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

function drawMouth(t) {
  let y = eyeY + noseH + 40;
  let talk = talkMode ? (0.65 + 0.35 * (sin(t * 6.0) + 1) / 2) : 1.0;

  noStroke();
  fill(LIP);
  ellipse(0, y, mouthW * .55, 18 * talk);

  stroke(120, 0, 30, 180);
  strokeWeight(3);
  noFill();
  let arcH = 50 * smile * (0.9 + 0.1 * sin(t * 1.8));
  arc(0, y, mouthW, arcH, 0, PI);

  noStroke();
  fill(255, 80);
  arc(0, y + 4, mouthW * .45, 12 * talk, 0, PI, CHORD);
}

function drawHairBack(t) {
  const sway = 3 * sin(t * 2.0);
  noStroke();
  fill(HAIR);
  ellipse(0, -faceH * .07 + sway * 0.1, faceW + sideHair * 2, faceH + hairLength);
  ellipse(-faceW * .48 - sway * 0.6, 0, sideHair * 2.2, faceH * .7);
  ellipse(faceW * .48 + sway * 0.6, 0, sideHair * 2.2, faceH * .7);
}

function drawHairFront(t) {
  const jiggle = 2 * sin(t * 1.7);
  stroke(HAIR);
  strokeWeight(14);
  noFill();
  let y = -faceH * .45;
  arc(-40, y + fringeDepth + jiggle, 140, 90, PI, TWO_PI);
  arc(40, y + fringeDepth - 6 + jiggle * 0.9, 140, 90, PI, TWO_PI);
  arc(0, y + fringeDepth - 10 + jiggle * 0.8, 160, 100, PI, TWO_PI);
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
  stroke(HAIR);QD
  strokeWeight(6);
  noFill();
  let y = eyeY + noseH + 18;
  arc(-20, y, 40, 18, PI, TWO_PI);
  arc(20, y, 40, 18, PI, TWO_PI);
}

function keyPressed() {
  if (key === 's') {
    saveGif('my_characture', 10);}
  else if (key === 't' || key === 'T') { talkMode = !talkMode; redraw(); }
}

function mousePressed() {
  if (mouseX < width / 2) blinkForce = 1.0;
  else blinkForce = 1.0;
  redraw();
}

function mouseMoved() { redraw(); }
function mouseDragged() { redraw(); }
