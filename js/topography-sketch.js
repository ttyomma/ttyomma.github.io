  //▄▄▄▄▄ ▄· ▄▌      • ▌ ▄ ·.  ▄▄▄· 
  //•██  ▐█▪██▌▪     ·██ ▐███▪▐█ ▀█ 
  // ▐█.▪▐█▌▐█▪ ▄█▀▄ ▐█ ▌▐▌▐█·▄█▀▀█ 
  // ▐█▌· ▐█▀·.▐█▌.▐▌██ ██▌▐█▌▐█ ▪▐▌
  // ▀▀▀   ▀ •  ▀█▄▀▪▀▀  █▪▀▀▀ ▀  ▀ 
// u can coppy this effect, but give me any credits if you use it :)

// --- Effect Settings ---
let particleCount = 1500;
let noiseScale = 0.007;
let timeScale = 0.0011;
let particleSpeed = 5;
let strokeAlpha = 15;
let stopAnimationAfter = 20; // in seconds
let margin = 50;
// -------------------------

let particles = [];
let zoff = 0;
let animationRunning = true;
let startTime;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-canvas');
  resetSketch();
}

function draw() {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const canvasIsDark = get(0, 0)[0] < 128;
  if (isDarkMode !== canvasIsDark) {
    resetSketch();
  }
  
  const lineColor = isDarkMode ? [255, strokeAlpha] : [0, strokeAlpha];
  stroke(lineColor);
  strokeWeight(1);

  if (animationRunning && (millis() - startTime) > (stopAnimationAfter * 1000)) {
    animationRunning = false;
  }
  
  for (let p of particles) {
    p.previous.set(p.current);
    
    let angle = noise(p.current.x * noiseScale, p.current.y * noiseScale, zoff) * TWO_PI * 2;
    let v = p5.Vector.fromAngle(angle);
    v.mult(particleSpeed);
    p.current.add(v);
    
    if (p.current.x > width + margin || p.current.x < -margin || p.current.y > height + margin || p.current.y < -margin) {
      p.current.set(random(width), random(height));
      p.previous.set(p.current);
    }
    
    line(p.previous.x, p.previous.y, p.current.x, p.current.y);
  }
  
  if (animationRunning) {
    zoff += timeScale;
  }
}

function resetSketch() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
      particles.push({
      current: createVector(random(width), random(height)),
      previous: createVector(random(width), random(height))
    });
  }
  background(document.documentElement.classList.contains('dark') ? 0 : 255);
  animationRunning = true;
  startTime = millis();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetSketch();
}