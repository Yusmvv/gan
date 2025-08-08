let beats = 0;
let beatsPerClick = 1;

let studioLevel = 0;
let assistantCount = 0;
let inspirationLevel = 0;

const beatsCountElem = document.getElementById('beats-count');
const beatButton = document.getElementById('beat-button');

const studioUpgradeBtn = document.getElementById('studio-upgrade');
const assistantUpgradeBtn = document.getElementById('assistant-upgrade');
const inspirationUpgradeBtn = document.getElementById('inspiration-upgrade');

const upgradePrices = {
  studio: 50,
  assistant: 200,
  inspiration: 500,
};

// Base64 закодированные брейнрот звуки (короткие wav)
const soundsData = {
  click: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAZGF0YQAAAACAgICAgP///wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA",
  upgrade: "data:audio/wav;base64,UklGRkAAAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAZGF0YQAAAAAA/////wD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA",
};

function playSoundBase64(base64) {
  const audio = new Audio(base64);
  audio.volume = 0.3;
  audio.play();
}

function updateUI() {
  beatsCountElem.textContent = Битов: ${Math.floor(beats)};

  studioUpgradeBtn.textContent = Улучшить студию (Цена: ${upgradePrices.studio});
  assistantUpgradeBtn.textContent = Нанять ассистента (Цена: ${upgradePrices.assistant});
  inspirationUpgradeBtn.textContent = Усилитель вдохновения (Цена: ${upgradePrices.inspiration});

  studioUpgradeBtn.disabled = beats < upgradePrices.studio;
  assistantUpgradeBtn.disabled = beats < upgradePrices.assistant;
  inspirationUpgradeBtn.disabled = beats < upgradePrices.inspiration;
}

beatButton.addEventListener('click', () => {
  beats += beatsPerClick;
  updateUI();
  playSoundBase64(soundsData.click);
});

studioUpgradeBtn.addEventListener('click', () => {
  if (beats >= upgradePrices.studio) {
    beats -= upgradePrices.studio;
    studioLevel++;
    upgradePrices.studio = Math.floor(upgradePrices.studio * 1.7);
    beatsPerClick += 1;
    updateUI();
    playSoundBase64(soundsData.upgrade);
  }
});

assistantUpgradeBtn.addEventListener('click', () => {
  if (beats >= upgradePrices.assistant) {
    beats -= upgradePrices.assistant;
    assistantCount++;
    upgradePrices.assistant = Math.floor(upgradePrices.assistant * 2);
    updateUI();
    playSoundBase64(soundsData.upgrade);
  }
});

inspirationUpgradeBtn.addEventListener('click', () => {
  if (beats >= upgradePrices.inspiration) {
    beats -= upgradePrices.inspiration;
    inspirationLevel++;
    upgradePrices.inspiration = Math.floor(upgradePrices.inspiration * 2.5);
    beatsPerClick += 2;
    updateUI();
    playSoundBase64(soundsData.upgrade);
  }
});

function autoBeat() {
  beats += assistantCount * (1 + inspirationLevel * 0.5);
  updateUI();
}

setInterval(autoBeat, 1000);

updateUI();