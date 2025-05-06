const directionSelect = document.querySelector("select");
const colorInputs = document.querySelectorAll(".colors input");
const color1 = colorInputs[0];
const color2 = colorInputs[1];
const codeBox = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");
const box = document.querySelector(".grad-box");

// Converts direction name to CSS value
function getDirectionValue(direction) {
  const map = {
    "Top Right": "to top right",
    "Top Left": "to top left",
    "Bottom Right": "to bottom right",
    "Bottom Left": "to bottom left",
    "Top": "to top",
    "Bottom": "to bottom",
    "Left": "to left",
    "Right": "to right"
  };
  return map[direction] || "to right";
}

// Generate gradient
function generateGradient() {
  const direction = getDirectionValue(directionSelect.value);
  const color1Val = color1.value;
  const color2Val = color2.value;

  const gradient = `linear-gradient(${direction}, ${color1Val}, ${color2Val})`;

  box.style.background = gradient;
  codeBox.value = `background: ${gradient};`;
}

// Generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Refresh color pickers with random values
function refreshColors() {
  color1.value = getRandomColor();
  color2.value = getRandomColor();
  generateGradient();
}

// Copy to clipboard
function copyCode() {
  navigator.clipboard.writeText(codeBox.value);
  copyBtn.innerText = "Copied!";
  setTimeout(() => {
    copyBtn.innerText = "Copy Code";
  }, 1000);
}

// Event listeners
directionSelect.addEventListener("change", generateGradient);
colorInputs.forEach(input => input.addEventListener("input", generateGradient));
refreshBtn.addEventListener("click", refreshColors);
copyBtn.addEventListener("click", copyCode);

// Initial gradient
window.onload = refreshColors;