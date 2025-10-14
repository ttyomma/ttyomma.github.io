  //▄▄▄▄▄ ▄· ▄▌      • ▌ ▄ ·.  ▄▄▄· 
  //•██  ▐█▪██▌▪     ·██ ▐███▪▐█ ▀█ 
  // ▐█.▪▐█▌▐█▪ ▄█▀▄ ▐█ ▌▐▌▐█·▄█▀▀█ 
  // ▐█▌· ▐█▀·.▐█▌.▐▌██ ██▌▐█▌▐█ ▪▐▌
  // ▀▀▀   ▀ •  ▀█▄▀▪▀▀  █▪▀▀▀ ▀  ▀ 
// u can coppy this effect, but give me any credits if you use it :) (like link on my github or portfolio)

// --- Effect Settings ---
let noiseScale = 0.009;
let baseTimeScale = 0.0005;
let baseParticleSpeed = 10;
let stopAnimationAfter = 2;
let fadeDuration = 2;

// --- Settings for devices ---
let particleCount_Desktop = 800;
let particleCount_Mobile = 200;
let strokeAlpha_Desktop = 20;
let strokeAlpha_Mobile = 25;

let particleCount;
let strokeAlpha;
let particles = [];
let zoff = 0;
let animationState = 'running';
let startTime;
let lastKnownThemeIsDark = null;


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-canvas');
  
  if (windowWidth < 768) {
    particleCount = particleCount_Mobile;
    strokeAlpha = strokeAlpha_Mobile;
    frameRate(30);
  } else {
    particleCount = particleCount_Desktop;
    strokeAlpha = strokeAlpha_Desktop;
    frameRate(60);
  }

  window.addEventListener('themeChanged', (event) => {
    loop();
    clear();
    background(event.detail.theme === 'dark' ? 0 : 255);
    lastKnownThemeIsDark = event.detail.theme === 'dark';
    startAnimation();
  });

  startAnimation();
}

function draw() {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  let elapsedTime = (millis() - startTime) / 1000;
  if (animationState === 'running' && elapsedTime > stopAnimationAfter) {
    animationState = 'fading';
  }
  
  let currentSpeed = baseParticleSpeed;
  let currentTimeScale = baseTimeScale;

  if (animationState === 'fading') {
    let fadeProgress = (elapsedTime - stopAnimationAfter) / fadeDuration;
    if (fadeProgress >= 1) {
      animationState = 'stopped';
      noLoop();
    } else {
      currentSpeed = lerp(baseParticleSpeed, 0, fadeProgress);
      currentTimeScale = lerp(baseTimeScale, 0, fadeProgress);
    }
  }
  
  const lineColor = isDarkMode ? [255, strokeAlpha] : [0, strokeAlpha];
  stroke(lineColor);
  strokeWeight(1);
  
  for (let p of particles) {
    p.previous.set(p.current);
    let angle = noise(p.current.x * noiseScale, p.current.y * noiseScale, zoff) * TWO_PI * 2;
    let v = p5.Vector.fromAngle(angle);
    v.mult(currentSpeed);
    p.current.add(v);
    
    if (p.current.x > width + 50 || p.current.x < -50 || p.current.y > height + 50 || p.current.y < -50) {
      p.current.set(random(width), random(height));
      p.previous.set(p.current);
    }
    
    line(p.previous.x, p.previous.y, p.current.x, p.current.y);
  }
  
  if (animationState !== 'stopped') {
    zoff += currentTimeScale;
  }
}

function startAnimation() {
  clear();
  particles = [];
  for (let i = 0; i < particleCount; i++) {
      particles.push({
      current: createVector(random(width), random(height)),
      previous: createVector(random(width), random(height))
    });
  }
  
  const currentThemeIsDark = document.documentElement.classList.contains('dark');
  background(currentThemeIsDark ? 0 : 255);
  
  lastKnownThemeIsDark = currentThemeIsDark; 
  animationState = 'running';
  zoff = 0;
  startTime = millis();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  loop();
  startAnimation();
}