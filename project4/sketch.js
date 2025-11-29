let seed=42;
let paletteIndex=0;
const palettes=[
  [[228,87,46],[241,181,85],[255,173,173],[46,49,56],[168,218,220]],
  [[38,70,83],[42,157,143],[233,196,106],[244,162,97],[231,111,81]],
  [[99,155,255],[255,183,3],[255,111,145],[87,101,116],[164,227,144]]
];

const charcoal=[46,49,56];
const margin=14;
const LOOP_SECONDS=10;
const FPS=16;

let bandOffsets=new Array(7);
let bandW=new Array(7);
let bandH=new Array(7);
let bandY=new Array(7);
let baseAngle;

const N_CIRC=18;
let cx=new Array(N_CIRC);
let cy=new Array(N_CIRC);
let cd=new Array(N_CIRC);
let cpx=new Array(N_CIRC);
let cpy=new Array(N_CIRC);
let cps=new Array(N_CIRC);
let cvx=new Array(N_CIRC);
let cvy=new Array(N_CIRC);
let cvs=new Array(N_CIRC);
let cidx1=new Array(N_CIRC);
let cidx2=new Array(N_CIRC);
let hasOutline=new Array(N_CIRC);

const FAN_COUNT=8;
let fanCX,fanCY;
let fanAngles=new Array(FAN_COUNT);
const FAN_R1=64;
const FAN_R2=118;
const FAN_SPREAD=0.58;

function setup(){
  createCanvas(400,266);
  frameRate(FPS);
  colorMode(RGB,255);
  angleMode(RADIANS);
  rebuildLayout();
}

function rebuildLayout(){
  randomSeed(seed);
  noiseSeed(seed);
  baseAngle=random(-0.35,0.35);
  for(let i=0;i<7;i++){
    const off=i-3;
    bandOffsets[i]=off;
    bandW[i]=340;
    bandH[i]=22+off*8;
    bandY[i]=-10-off*4;
  }
  for(let i=0;i<N_CIRC;i++){
    cx[i]=random(margin,width-margin);
    cy[i]=random(margin,height-margin);
    cd[i]=random(14,72);
    cpx[i]=random(-PI,PI);
    cpy[i]=random(-PI,PI);
    cps[i]=random(-PI,PI);
    cvx[i]=random(0.25,0.7)*(random()<0.5?-1:1);
    cvy[i]=random(0.2,0.5)*(random()<0.5?-1:1);
    cvs[i]=random(0.6,1.1);
    cidx1[i]=int(random(palettes[paletteIndex].length));
    cidx2[i]=int(random(palettes[paletteIndex].length));
    hasOutline[i]=(i%5===0);
  }
  fanCX=random(90,width-90);
  fanCY=random(70,height-70);
  for(let i=0;i<FAN_COUNT;i++) fanAngles[i]=(i/FAN_COUNT)*TWO_PI;
}

function draw(){
  const t=millis()/1000;
  const loopPhase=(t%LOOP_SECONDS)/LOOP_SECONDS;
  const pal=palettes[paletteIndex];

  background('#f2efe8');

  stroke(charcoal[0],charcoal[1],charcoal[2],28);
  strokeWeight(1);
  for(let x=margin;x<=width-margin;x+=24) line(x,margin,x,height-margin);
  for(let y=margin;y<=height-margin;y+=24) line(margin,y,width-margin,y);

  push();
  translate(width*0.5,height*0.45);
  for(let i=0;i<7;i++){
    const off=bandOffsets[i];
    const ang=baseAngle+off*0.08+0.16*sin(TWO_PI*loopPhase+off*0.4);
    push();
    rotate(ang);
    const idxA=(off+pal.length)%pal.length;
    const idxB=(off+pal.length+1)%pal.length;
    const c1=color(pal[idxA][0],pal[idxA][1],pal[idxA][2]);
    const c2=color(pal[idxB][0],pal[idxB][1],pal[idxB][2]);
    const cc=lerpColor(c1,c2,(sin(TWO_PI*loopPhase+off*0.3)+1)/2);
    noStroke();
    fill(red(cc),green(cc),blue(cc),105+45*sin(TWO_PI*loopPhase+off));
    rect(-bandW[i]/2,bandY[i],bandW[i],bandH[i],4);
    pop();
  }
  pop();

  noStroke();
  for(let i=0;i<N_CIRC;i++){
    const px=cx[i]+12*sin(TWO_PI*loopPhase*cvx[i]+cpx[i]);
    const py=cy[i]+10*cos(TWO_PI*loopPhase*cvy[i]+cpy[i]);
    const dd=cd[i]*(0.92+0.14*sin(TWO_PI*loopPhase*cvs[i]+cps[i]));
    const C1=color(pal[cidx1[i]][0],pal[cidx1[i]][1],pal[cidx1[i]][2]);
    const C2=color(pal[cidx2[i]][0],pal[cidx2[i]][1],pal[cidx2[i]][2]);
    const mix=(sin(TWO_PI*loopPhase+i*0.13)+1)/2;
    const col=lerpColor(C1,C2,mix);
    fill(red(col),green(col),blue(col),130);
    circle(px,py,dd);
    if(hasOutline[i]){
      stroke(charcoal[0],charcoal[1],charcoal[2],100);
      strokeWeight(2);
      noFill();
      circle(px,py,dd+5+4*sin(TWO_PI*loopPhase+i));
      noStroke();
    }
  }

  const rot=TWO_PI*loopPhase;
  const cxFan=fanCX+5*cos(rot*1.1);
  const cyFan=fanCY+5*sin(rot*1.1);
  stroke(charcoal[0],charcoal[1],charcoal[2],120);
  strokeWeight(3);
  for(let i=0;i<FAN_COUNT;i++){
    const ang=rot+fanAngles[i];
    const c=pal[i%pal.length];
    fill(c[0],c[1],c[2],150);
    const p1x=cxFan+FAN_R1*cos(ang);
    const p1y=cyFan+FAN_R1*sin(ang);
    const p2x=cxFan+FAN_R2*cos(ang+FAN_SPREAD);
    const p2y=cyFan+FAN_R2*sin(ang+FAN_SPREAD);
    const p3x=cxFan+FAN_R2*cos(ang-FAN_SPREAD);
    const p3y=cyFan+FAN_R2*sin(ang-FAN_SPREAD);
    triangle(p1x,p1y,p2x,p2y,p3x,p3y);
  }

  noFill();
  stroke(charcoal[0],charcoal[1],charcoal[2],150);
  strokeWeight(2);
  rect(margin,margin,width-margin*2,height-margin*2,6);
}


function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 6);
  }
}