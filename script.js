const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// Planets data
const planets = [
  { class: '.mercury', radius: 60, speed: 0.04, angle: 0 },
  { class: '.venus', radius: 90, speed: 0.03, angle: 0 },
  {
    class: '.earth', radius: 130, speed: 0.02, angle: 0,
    moon: { el: null, radius: 20, speed: 0.1, angle: 0 }
  },
  { class: '.mars', radius: 170, speed: 0.015, angle: 0 },
  { class: '.jupiter', radius: 220, speed: 0.01, angle: 0 },
  { class: '.saturn', radius: 270, speed: 0.008, angle: 0 },
  { class: '.uranus', radius: 320, speed: 0.006, angle: 0 },
  { class: '.neptune', radius: 370, speed: 0.005, angle: 0 }
];

// Link DOM elements
planets.forEach(p => {
  p.el = document.querySelector(p.class);
  if (p.class === '.earth') {
    p.moon.el = p.el.querySelector('.moon');
  }
});

// Asteroid Belt
const asteroidBelt = [];
const asteroidCount = 50;
for (let i = 0; i < asteroidCount; i++) {
  const asteroid = document.createElement("div");
  asteroid.classList.add("asteroid");
  document.querySelector(".solar-system").appendChild(asteroid);

  asteroidBelt.push({
    el: asteroid,
    radius: 190 + Math.random() * 30,
    angle: Math.random() * Math.PI * 2,
    speed: 0.01 + Math.random() * 0.005,
    size: 1 + Math.random() * 2
  });

  asteroid.style.width = `${asteroidBelt[i].size}px`;
  asteroid.style.height = `${asteroidBelt[i].size}px`;
  asteroid.style.background = "#aaa";
  asteroid.style.position = "absolute";
  asteroid.style.borderRadius = "50%";
  asteroid.style.zIndex = 1;
}

// Stars
const starContainer = document.getElementById("stars");
for (let i = 0; i < 150; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = `${Math.random() * window.innerWidth}px`;
  star.style.top = `${Math.random() * window.innerHeight}px`;
  star.style.animationDuration = `${1 + Math.random() * 2}s`;
  starContainer.appendChild(star);
}

// Animate planets & asteroids
function animate() {
  planets.forEach(planet => {
    planet.angle += planet.speed;
    const x = centerX + planet.radius * Math.cos(planet.angle);
    const y = centerY + planet.radius * Math.sin(planet.angle);
    planet.el.style.left = `${x}px`;
    planet.el.style.top = `${y}px`;

    // Animate moon
    if (planet.moon) {
      planet.moon.angle += planet.moon.speed;
      const moonX = planet.el.offsetWidth / 2 + planet.moon.radius * Math.cos(planet.moon.angle);
      const moonY = planet.el.offsetHeight / 2 + planet.moon.radius * Math.sin(planet.moon.angle);
      planet.moon.el.style.left = `${moonX}px`;
      planet.moon.el.style.top = `${moonY}px`;
    }
  });

  asteroidBelt.forEach(ast => {
    ast.angle += ast.speed;
    const x = centerX + ast.radius * Math.cos(ast.angle);
    const y = centerY + ast.radius * Math.sin(ast.angle);
    ast.el.style.left = `${x}px`;
    ast.el.style.top = `${y}px`;
  });

  requestAnimationFrame(animate);
}
animate();

// Meteor every 20s
setInterval(() => {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');

  // Random start position from edge
  const edge = Math.floor(Math.random() * 4);
  let startX, startY;

  if (edge === 0) { // Top
    startX = Math.random() * window.innerWidth;
    startY = -20;
  } else if (edge === 1) { // Right
    startX = window.innerWidth + 20;
    startY = Math.random() * window.innerHeight;
  } else if (edge === 2) { // Bottom
    startX = Math.random() * window.innerWidth;
    startY = window.innerHeight + 20;
  } else { // Left
    startX = -20;
    startY = Math.random() * window.innerHeight;
  }

  // Random direction
  const dx = (centerX - startX) * 1.5 + (Math.random() * 100 - 50);
  const dy = (centerY - startY) * 1.5 + (Math.random() * 100 - 50);

  meteor.style.left = `${startX}px`;
  meteor.style.top = `${startY}px`;
  meteor.style.setProperty('--dx', `${dx}px`);
  meteor.style.setProperty('--dy', `${dy}px`);

  document.querySelector('.solar-system').appendChild(meteor);

  // Remove after animation
  setTimeout(() => {
    meteor.remove();
  }, 10000);
}, 20000);
