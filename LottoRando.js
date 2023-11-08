document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generate');
  const resultDiv = document.getElementById('result');
  const previousNumbersColumn = document.getElementById('previousNumbersColumn');
  const numberTallyTable = document.getElementById('numberTally'); // Table for tally
  const powerballTallyTable = document.getElementById('powerballTallyTable'); // Table for Powerball tally
  const counterElement = document.getElementById('counter'); // Counter element

  let generateCount = 0; // Initialize the counter

  // Create an object to store number frequencies
  const numberCounts = {};

  // Create an object to store the tallied numbers along with their counts
  const tallyCounts = {};

  // Declare a variable to store Powerball tally counts
  const powerballTallyCounts = {};

  let numbers; // Declare 'numbers' variable here

  generateButton.addEventListener('click', function() {
    for (let i = 0; i < 69; i++) {
      // Increment the counter and update the display
      generateCount++;
      counterElement.textContent = 'Number of Generates: ' + generateCount;
      numbers = generatePowerballNumbers(); // Assign 'numbers' here

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

        // Update the tally count
        if (tallyCounts[mainNumber]) {
          tallyCounts[mainNumber]++;
        } else {
          tallyCounts[mainNumber] = 1;
        }
      }

      let powerballHTML = '<span class="circle powerball-number">' + numbers.powerball + '</span>';

      // Display the current numbers
      resultDiv.innerHTML = 'Your Powerball numbers: <div class="numbers">' + mainNumbersHTML + '</div>' +
                            'Powerball: <div class="powerball">' + powerballHTML + '</div>';

      // Store the previous numbers
      const previousNumbersHTML = '<div class="previous-set">' + mainNumbersHTML + powerballHTML + '</div>';

      previousNumbersColumn.innerHTML = previousNumbersHTML + previousNumbersColumn.innerHTML;

      // Update the number tally table (excluding Powerball number)
      updateNumberTallyTable(tallyCounts);

      // Update the tally count for Powerball
      if (powerballTallyCounts[numbers.powerball]) {
        powerballTallyCounts[numbers.powerball]++;
      } else {
        powerballTallyCounts[numbers.powerball] = 1;
      }

      // Update the Powerball tally table
      updatePowerballTallyTable(powerballTallyCounts);
    }
  });

  // Function to update the number tally table (excluding Powerball)
  function updateNumberTallyTable(counts) {
    const tableBody = numberTallyTable.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear the table body

    // Convert the tallyCounts object to an array of objects for sorting
    const tallyArray = Object.keys(counts).map(key => ({ number: parseInt(key), count: counts[key] }));

    // Sort the tallyArray in descending order of counts
    tallyArray.sort((a, b) => b.count - a.count);

    for (let i = 0; i < tallyArray.length; i++) {
      const row = document.createElement('tr');
      const numberCell = document.createElement('td');
      numberCell.textContent = tallyArray[i].number;
      const tallyCell = document.createElement('td');
      tallyCell.textContent = tallyArray[i].count;
      row.appendChild(numberCell);
      row.appendChild(tallyCell);
      tableBody.appendChild(row);

      // Add the "top-number" class to the top 9 rows
       if (i < 9) {
          row.classList.add('top-number');
      }
    }
  }

  // Function to update the Powerball tally table
  function updatePowerballTallyTable(powerballCounts) {
    const powerballTableBody = powerballTallyTable.querySelector('tbody');
    powerballTableBody.innerHTML = ''; // Clear the table body

    // Convert the powerballCounts object to an array of objects for sorting
    const powerballArray = Object.keys(powerballCounts).map(key => ({ number: parseInt(key), count: powerballCounts[key] }));

    // Sort the powerballArray in descending order of counts
    powerballArray.sort((a, b) => b.count - a.count);

    for (let i = 0; i < powerballArray.length; i++) {
      const row = document.createElement('tr');
      const numberCell = document.createElement('td');
      numberCell.textContent = powerballArray[i].number;
      const tallyCell = document.createElement('td');
      tallyCell.textContent = powerballArray[i].count;
      row.appendChild(numberCell);
      row.appendChild(tallyCell);
      powerballTableBody.appendChild(row);
      // Add the "top-number" class to the top 9 rows
    if (i < 3) {
      row.classList.add('top-number');
    }
    }
  }

  // Function to generate Powerball numbers
  function generatePowerballNumbers() {
    const mainNumbers = generateUniqueNumbers(5, 1, 69);
    const powerballNumber = generateRandomNumber(1, 26);

    return {
      main: mainNumbers,
      powerball: powerballNumber
    };
  }

  // Function to generate unique random numbers
  function generateUniqueNumbers(count, min, max) {
    const numbers = new Set();

    while (numbers.size < count) {
      numbers.add(generateRandomNumber(min, max));
    }

    return Array.from(numbers);
  }

  // Function to generate a random number within a range
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});