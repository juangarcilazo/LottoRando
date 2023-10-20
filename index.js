function generateRandomLotteryNumbers() {
    const lotteryNumbers = [];
    
    // Generate 5 random main numbers (1-69)
    for (let i = 0; i < 5; i++) {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * 69) + 1;
      } while (lotteryNumbers.includes(randomNum)); // Ensure no duplicates
      lotteryNumbers.push(randomNum);
    }
  
    // Generate a random Powerball number (1-26)
    const powerballNumber = Math.floor(Math.random() * 26) + 1;
    
    // Sort the main numbers in ascending order
    lotteryNumbers.sort((a, b) => a - b);
  
    return { mainNumbers: lotteryNumbers, powerball: powerballNumber };
  }
  
  const randomLotteryNumbers = generateRandomLotteryNumbers();
  console.log("Main Numbers: " + randomLotteryNumbers.mainNumbers.join(', '));
  console.log("Powerball Number: " + randomLotteryNumbers.powerball);