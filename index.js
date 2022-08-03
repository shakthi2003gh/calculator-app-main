const arithmeticOperators = ["+", "-", "*", "/"];
const otherOperator = ["Backspace", "Escape", "Enter"];

// >Theme toggle button
const theme = document.querySelector("html");
const toggle = document.querySelector("#toggle");
const toggleButton = document.querySelector("#toggle-button");

toggle.addEventListener("click", () => {
  theme.dataset.theme = Number(theme.dataset.theme) + 1;
  if (theme.dataset.theme >= 4) theme.dataset.theme = 1;

  const currentTheme = Number(theme.dataset.theme);

  let pos = 0;
  if (currentTheme === 2) pos = 135;
  if (currentTheme === 3) pos = 280;

  toggleButton.style.transform = `translateX(${pos}%)`;
});

// >Calculator inputs
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".key-section button");
let calculateValue = 0;
let previousOperation = "";
let currentOperation = "";

// >>mouse
buttons.forEach((button) => button.addEventListener("click", clicked));

function clicked(e) {
  const dataType = e.target.dataset.type;
  const currentValue = Number(e.target.innerText) || e.target.innerText;

  compute(dataType, currentValue);
}

// >> keyboard
window.addEventListener("keydown", pressed);

function pressed(e) {
  if (
    Number(e.key) ||
    e.key === "0" ||
    [...arithmeticOperators, ...otherOperator, "."].includes(e.key)
  ) {
    const checkOperator = [...arithmeticOperators, ...otherOperator].includes(
      e.key
    );
    const dataType = checkOperator ? "operator" : "number";

    compute(dataType, e.key);
  }
}

// >compute
function compute(dataType, currentValue) {
  const displayValue = display.innerText;

  if (dataType === "number") {
    if (displayValue === "0") display.innerText = currentValue;
    else {
      display.innerText += currentValue;
    }
    previousOperation = currentOperation;
  }

  if (dataType === "operator") {
    const clickedValue = currentValue.toLowerCase();

    if (clickedValue === "reset" || clickedValue === "escape") {
      display.innerText = "0";
      calculateValue = 0;
      previousOperation = "";
      currentOperation = "";
    }

    if (clickedValue === "del" || clickedValue === "backspace")
      display.innerText = displayValue.slice(0, -1);

    if (arithmeticOperators.includes(clickedValue)) {
      currentOperation = clickedValue;
      calculateValue = operations(
        previousOperation,
        calculateValue,
        display.innerText
      );
      display.innerText = "";
    }

    if (clickedValue === "=" || clickedValue === "enter") {
      calculateValue = operations(
        previousOperation,
        calculateValue,
        displayValue
      );
      display.innerText = calculateValue;
      currentOperation = "";
      previousOperation = "";
      calculateValue = 0;
    }
  }
}

function operations(operation, calculateValue, displayValue) {
  if (operation === "+") calculateValue += parseFloat(displayValue);
  else if (operation === "-") calculateValue -= parseFloat(displayValue);
  else if (operation === "x" || operation === "*")
    calculateValue *= parseFloat(displayValue);
  else if (operation === "/") calculateValue /= parseFloat(displayValue);
  else calculateValue = parseFloat(displayValue);

  console.log(calculateValue);

  return calculateValue;
}
