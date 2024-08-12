//!This shows the chating feature
document.addEventListener('DOMContentLoaded', () => {
  const net = new brain.NeuralNetwork({
      hiddenLayers: [3, 3]
  });

  // Fetch vocabulary, training data, and responses from JSON files
  let vocabularyData, trainingData, responsesData;

  Promise.all([
      fetch('vocabulary.json').then(response => response.json()),
      fetch('training_data.json').then(response => response.json()),
      fetch('responses.json').then(response => response.json())
  ])
  .then(([vocabulary, training, responses]) => {
      vocabularyData = vocabulary;
      trainingData = training;
      responsesData = responses;
      initializeChatbot();
  })
  .catch(error => {
      console.error('Error loading JSON files:', error);
  });

  // Function to initialize chatbot after data is loaded
  function initializeChatbot() {
      // Train the network
      net.train(trainingData, {
          iterations: 100000,
          errorThresh: 0.0001,
          log: true,
          logPeriod: 100,
          learningRate: 0.2
      });

      // Add event listener for input
      document.getElementById('input').addEventListener('keypress', function (e) {
          if (e.key === 'Enter') {
              e.preventDefault();
              getResponse();
          }
      });
  }

  // Preprocess input
  function preprocessInput(input) {
      return input.toLowerCase().replace(/[^\w\s]/g, '').trim();
  }

  // Encode input using vocabulary
  function encodeInput(input) {
      const inputEncoded = {};

      vocabularyData.forEach(word => {
          inputEncoded[word] = 0;
      });

      const words = input.split(/\W+/);

      words.forEach(word => {
          if (word in inputEncoded) {
              inputEncoded[word] = 1;
          }
      });

      return inputEncoded;
  }

  // Decode output using responses
  function decodeOutput(output) {
      const maxResponse = Object.keys(output).reduce((a, b) => output[a] > output[b] ? a : b);

      return responsesData[maxResponse] || "Sorry, I didn't understand that.";
  }

  // Get response from user input
  function getResponse() {
      const userInput = preprocessInput(document.getElementById('input').value);
      const userInputEncoded = encodeInput(userInput);

      const output = net.run(userInputEncoded);

      const response = decodeOutput(output);
      document.getElementById('chatbot-response').innerText = response;
  }
});


//!From Here Other Javascript For the Code continues

function removeLoadingScreen() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'none'; // Hides the loading screen
    }, 3000); // 3000 milliseconds = 3 seconds
}

// Directly call the function
removeLoadingScreen();

//*Counter

        // Function to update the displayed counter
function updateCounterDisplay() {
    document.getElementById('counter').textContent = counter;
}

        // Get the counter value from localStorage, or start at 0 if it doesn't exist
let counter = parseInt(localStorage.getItem('clickCounter')) || 0;
updateCounterDisplay();

        // Increment counter when the Enter key is pressed and save to localStorage
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        counter += 1;
        localStorage.setItem('clickCounter', counter);
        updateCounterDisplay();
    }
});





