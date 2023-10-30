document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generate');
  const resultDiv = document.getElementById('result');

  generateButton.addEventListener('click', function() {
    const numbers = generatePowerballNumbers();
    const sortedMainNumbers = numbers.main.sort((a, b) => a - b);  // Sort the numbers
    let mainNumbersHTML = '';
    for (let i = 0; i < sortedMainNumbers.length; i++) {
      mainNumbersHTML += '<span class="circle main-number">' + sortedMainNumbers[i] + '</span>';
    }
    let powerballHTML = '<span class="circle powerball-number">' + numbers.powerball + '</span>';
    resultDiv.innerHTML = 'Your Powerball numbers: <div class="numbers">' + mainNumbersHTML + '</div>' +
                          'Powerball: <div class="powerball">' + powerballHTML + '</div>';
  });

function generatePowerballNumbers() {
  const mainNumbers = generateUniqueNumbers(5, 1, 69);
  const powerballNumber = generateRandomNumber(1, 26);

  return {
      main: mainNumbers,
      powerball: powerballNumber
  };
}

function generateUniqueNumbers(count, min, max) {
  const numbers = new Set();

  while (numbers.size < count) {
      numbers.add(generateRandomNumber(min, max));
  }

  return Array.from(numbers);
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
});