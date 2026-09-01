const uyirLetters = ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"];
const meyLetters = ["க்", "ங்", "ச்", "ஞ்", "ட்", "ண்", "த்", "ந்", "ப்", "ம்", "ய்", "ர்", "ல்", "வ்", "ழ்", "ள்", "ற்", "ன்"];

const vowelMarkMap = {
  அ: "",
  ஆ: "ா",
  இ: "ி",
  ஈ: "ீ",
  உ: "ு",
  ஊ: "ூ",
  எ: "ெ",
  ஏ: "ே",
  ஐ: "ை",
  ஒ: "ொ",
  ஓ: "ோ",
  ஔ: "ௌ"
};

const selected = {
  consonant: "க்",
  vowel: "அ"
};

const board = document.querySelector(".triangle-scene");
const outerLayer = document.querySelector(".outer-layer");
const middleLayer = document.querySelector(".middle-layer");
const centerLetter = document.getElementById("center-letter");
const equationText = document.getElementById("equation-text");
const uyirList = document.getElementById("uyir-list");
const meyList = document.getElementById("mey-list");

const outerTriangleLayout = {
  left: ["க்", "ச்", "ட்", "த்", "ப்", "ற்"],
  right: ["ங்", "ஞ்", "ண்", "ந்", "ம்", "ன்"],
  bottom: ["ய்", "ர்", "ல்", "வ்", "ழ்", "ள்"]
};

const outerPositions = {
left: [
  { x: 41, y: 5  },
  { x: 33, y: 19 },
  { x: 25, y: 33 },
  { x: 16, y: 47 },
  { x: 8,  y: 61 },
  { x: 0,  y: 75 }
],
right: [
  { x: 59, y: 5  },
  { x: 67, y: 19 },
  { x: 75, y: 33 },
  { x: 84, y: 47 },
  { x: 92, y: 61 },
  { x: 100, y: 75 }
],
  bottom: [
    { x: 8, y: 91 },
    { x: 24, y: 91 },
    { x: 40, y: 91 },
    { x: 56, y: 91 },
    { x: 72, y: 91 },
    { x: 88, y: 91 }
  ]
};

const middleRows = [
  [
    { letter: "ஔ", x: 42, y: 12 },
    { letter: "அ", x: 58, y: 12 }
  ],
  [
    { letter: "ஓ", x: 30, y: 31 },
    { letter: "ஆ", x: 70, y: 31 }
  ],
  [
    { letter: "ஒ", x: 18, y: 50 },
    { letter: "இ", x: 82, y: 50 }
  ],
  [
    { letter: "ஐ", x: 6, y: 70 },
    { letter: "ஈ", x: 94, y: 70 }
  ],
  [
    { letter: "ஏ", x: 12, y: 92 },
    { letter: "எ", x: 37, y: 92 },
    { letter: "ஊ", x: 63, y: 92 },
    { letter: "உ", x: 88, y: 92 }
  ]
];

function normalizeConsonant(letter) {
  return letter.endsWith("்") ? letter.slice(0, -1) : letter;
}

function combineLetters(consonant, vowel) {
  const base = normalizeConsonant(consonant);
  return base + (vowelMarkMap[vowel] || "");
}

function renderTopLetters(container, letters, type) {
  container.innerHTML = "";

  letters.forEach((letter) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "letter-chip";
    chip.textContent = letter;
    chip.setAttribute("aria-label", `Select ${letter}`);

    if (type === "uyir" && letter === selected.vowel) {
      chip.classList.add("active");
    }

    if (type === "mey" && letter === selected.consonant) {
      chip.classList.add("active");
    }

    chip.addEventListener("click", () => {
      if (type === "uyir") {
        selected.vowel = letter;
      } else {
        selected.consonant = letter;
      }
      render();
    });

    container.appendChild(chip);
  });
}

function renderTriangleTiles() {
  board.querySelectorAll(".layer-letter").forEach((tile) => tile.remove());
  outerLayer.querySelectorAll(".layer-letter").forEach((tile) => tile.remove());
  middleLayer.querySelectorAll(".layer-letter").forEach((tile) => tile.remove());

  Object.entries(outerTriangleLayout).forEach(([side, letters]) => {
    letters.forEach((letter, index) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "layer-letter";
      tile.textContent = letter;

      const pos = outerPositions[side][index];
      tile.style.left = `${pos.x}%`;
      tile.style.top = `${pos.y}%`;

      if (letter === selected.consonant) {
        tile.classList.add("active");
      }

      tile.addEventListener("click", () => {
        selected.consonant = letter;
        render();
      });

      outerLayer.appendChild(tile);
    });
  });

  middleRows.forEach((row) => {
    row.forEach(({ letter, x, y }) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "layer-letter";
      tile.textContent = letter;

      tile.style.left = `${x}%`;
      tile.style.top = `${y}%`;

      if (letter === selected.vowel) {
        tile.classList.add("active");
      }

      tile.addEventListener("click", () => {
        selected.vowel = letter;
        render();
      });

      middleLayer.appendChild(tile);
    });
  });
}

function renderEquation() {
  const combined = combineLetters(selected.consonant, selected.vowel);
  equationText.innerHTML = `<span class="sequence">${selected.consonant}</span> + <span class="sequence">${selected.vowel}</span> = <span class="result">${combined}</span>`;
}

function render() {
  renderTopLetters(uyirList, uyirLetters, "uyir");
  renderTopLetters(meyList, meyLetters, "mey");
  renderTriangleTiles();
  renderEquation();
}

render();
