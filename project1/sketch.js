let seed = 12345;
let paletteIndex = 0;
const palettes = [
  [
    [228, 87, 46],   
    [241, 181, 85],  
    [255, 173, 173], 
    [46, 49, 56],    
    [168, 218, 220]  
  ],
  [
    [38, 70, 83],   
    [42, 157, 143], 
    [233, 196, 106], 
    [244, 162, 97],  
    [231, 111, 81]   
  ],
  [
    [99, 155, 255],  
    [255, 183, 3],   
    [255, 111, 145], 
    [87, 101, 116], 
    [164, 227, 144]  
  ]
];

function setup() {
  createCanvas(600, 400);
  noLoop();
  angleMode(RADIANS);
}

function draw() {
  randomSeed(seed);
  noiseSeed(seed);
  background('#f2efe8');

  const pal = palettes[paletteIndex];
  const charcoal = [46, 49, 56];
  const margin = 20;

  stroke(charcoal[0], charcoal[1], charcoal[2], 40);
  strokeWeight(1);
  for (let x = margin; x <= width - margin; x += 20) line(x, margin, x, height - margin);
  for (let y = margin; y <= height - margin; y += 20) line(margin, y, width - margin, y);


  push();
  translate(width * 0.5, height * 0.45);
  const baseAngle = random(-0.35, 0.35);
  for (let i = -3; i <= 3; i++) {
    const c = pal[(i + pal.length) % pal.length];
    const alpha = 120 + i * 10;
    push();
    rotate(baseAngle + i * 0.08);
    noStroke();
    fill(c[0], c[1], c[2], alpha);
    rect(-260, -18 - i * 6, 520, 36 + i * 12, 6);
    pop();
  }
  pop();


  noStroke();
  for (let i = 0; i < 28; i++) {
    const c = pal[int(random(pal.length))];
    const d = random(20, 110);
    const a = random(60, 180);
    const x = random(margin, width - margin);
    const y = random(margin, height - margin);
    fill(c[0], c[1], c[2], a);
    circle(x, y, d);
    if (random() < 0.35) {
      stroke(charcoal[0], charcoal[1], charcoal[2], 120);
      strokeWeight(random(2, 5));
      noFill();
      circle(x, y, d + random(6, 16));
      noStroke();
    }
  }


  const fanCenter = createVector(random(120, 480), random(120, 280));
  const fanCount = 8;
  for (let i = 0; i < fanCount; i++) {
    const ang = random(TWO_PI);
    const r1 = random(50, 100);
    const r2 = r1 + random(40, 120);
    const spread = random(0.4, 0.9);
    const c = pal[i % pal.length];
    stroke(charcoal[0], charcoal[1], charcoal[2], 140);
    strokeWeight(3);
    fill(c[0], c[1], c[2], 160);
    const p1 = fanCenter.copy().add(p5.Vector.fromAngle(ang, r1));
    const p2 = fanCenter.copy().add(p5.Vector.fromAngle(ang + spread, r2));
    const p3 = fanCenter.copy().add(p5.Vector.fromAngle(ang - spread, r2));
    triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  }


  stroke(charcoal[0], charcoal[1], charcoal[2], 180);
  strokeWeight(5);
  noFill();
  const cornerR = [120, 150, 180];
  arc(margin, margin, cornerR[0], cornerR[0], 0, HALF_PI);
  arc(width - margin, height - margin, cornerR[1], cornerR[1], PI, PI + HALF_PI);
  strokeWeight(3);
  arc(width - margin, margin, cornerR[2], cornerR[2], HALF_PI, PI);

  noFill();
  stroke(charcoal[0], charcoal[1], charcoal[2], 160);
  strokeWeight(2);
  rect(margin, margin, width - margin * 2, height - margin * 2, 6);
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 6);
  }
}