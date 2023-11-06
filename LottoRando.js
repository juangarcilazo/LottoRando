document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generate');
  const resultDiv = document.getElementById('result');
  const previousNumbersColumn = document.getElementById('previousNumbersColumn');
  const numberTallyTable = document.getElementById('numberTally'); // Table for tally

  // Create an object to store number frequencies
  const numberCounts = {};

  generateButton.addEventListener('click', function() {
    const numbers = generatePowerballNumbers();
    const sortedMainNumbers = numbers.main.sort((a, b) => a - b);
    
    let mainNumbersHTML = '';
    for (let i = 0; i < sortedMainNumbers.length; i++) {
      const mainNumber = sortedMainNumbers[i];
      mainNumbersHTML += '<span class="circle main-number">' + mainNumber + '</span>';
      
      // Update the number count
      if (numberCounts[mainNumber]) {
        numberCounts[mainNumber]++;
      } else {
        numberCounts[mainNumber] = 1;
      }
    }
    
    let powerballHTML = '<span class="circle powerball-number">' + numbers.powerball + '</span>';
    
    // Display the current numbers
    resultDiv.innerHTML = 'Your Powerball numbers: <div class="numbers">' + mainNumbersHTML + '</div>' +
                          'Powerball: <div class="powerball">' + powerballHTML + '</div>';

    // Store the previous numbers
    const previousNumbersHTML = '<div class="previous-set">' + mainNumbersHTML + powerballHTML + '</div>';
    
    previousNumbersColumn.innerHTML = previousNumbersHTML + previousNumbersColumn.innerHTML;

    // Update the number tally table
    updateNumberTallyTable(numberCounts);
  });

  // Function to update the number tally table
  function updateNumberTallyTable(counts) {
    const tableBody = numberTallyTable.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear the table body

    for (let i = 1; i <= 69; i++) {
      const row = document.createElement('tr');
      const numberCell = document.createElement('td');
      numberCell.textContent = i;
      const tallyCell = document.createElement('td');
      tallyCell.textContent = counts[i] || 0;
      row.appendChild(numberCell);
      row.appendChild(tallyCell);
      tableBody.appendChild(row);
    }
  }


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

// Fetch data from API
function fetchApiData() {
  const url = 'YOUR_API_ENDPOINT_HERE';
  fetch(url, {
    method: 'GET',
    headers: {
      'API-Key': 'YOUR_API_KEY_HERE'  // If required
    }
  })
  .then(response => response.json())  // Parse the JSON from the response
  .then(data => {
    console.log(data);  // Log the data to the console
  })
  .catch(error => {
    console.error('Error fetching data:', error);  // Log any errors
  });
}

// Call this function when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  fetchApiData();
});