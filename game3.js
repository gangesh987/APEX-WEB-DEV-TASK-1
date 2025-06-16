// Sound effects
const soundClick = new Audio('assets/click.mp3');
const soundLevelUp = new Audio('assets/level-up.mp3');

function playSound(type) {
  if (type === 'click') soundClick.play();
  else if (type === 'level') soundLevelUp.play();
}

let xp = 0;
let level = 1;

function startQuest() {
  document.getElementById("questMsg").textContent = "⚔️ Your quest begins... slay those bugs!";
  playSound('click');
}

function completeLevel(type) {
  let gained = 0;
  if (type === "HTML") gained = 50;
  else if (type === "CSS") gained = 100;
  else if (type === "JS") gained = 150;

  xp += gained;
  playSound('click');

  document.getElementById(type.toLowerCase() + "Status").textContent = `✅ ${type} Level Complete! +${gained} XP`;
  document.getElementById("btn" + type).disabled = true;

  updateProgress();
}

function updateProgress() {
  let progress = Math.min((xp / 300) * 100, 100);
  document.getElementById("xpFill").style.width = progress + "%";
  document.getElementById("xpFill").textContent = xp + " XP";

  let newLevel = Math.floor(xp / 200) + 1;
  if (newLevel > level) {
    level = newLevel;
    document.getElementById("levelStatus").textContent = "Level: " + level;
    playSound('level');
  }

  // Save to local storage
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
}

// Load saved data
window.addEventListener("load", () => {
  xp = parseInt(localStorage.getItem("xp")) || 0;
  level = parseInt(localStorage.getItem("level")) || 1;
  updateProgress();

  const name = localStorage.getItem("charName");
  const charClass = localStorage.getItem("charClass");
  if (name && charClass) {
    document.getElementById('charInfo').textContent = `🧙 ${name} the ${charClass} returns!`;
  }

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }
});

// Theme toggle
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

// Character builder
function saveCharacter() {
  const name = document.getElementById('charName').value;
  const charClass = document.getElementById('charClass').value;
  localStorage.setItem("charName", name);
  localStorage.setItem("charClass", charClass);
  document.getElementById('charInfo').textContent = `🧙 ${name} the ${charClass} is ready to code!`;
}
