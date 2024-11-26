const axios = require('axios');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestions = async () => {
  const questions = [
    { question: 'Enter symbol (e.g., BTCUSDT): ', name: 'symbol' },
    { question: 'Enter Order type: ', name: 'order'},
    { question: 'Enter Green threshold value: ', name: 'green' },
    { question: 'Enter Red threshold value: ', name: 'red' }
  ];

  const answers = {};

  for (const { question, name } of questions) {
    answers[name] = await new Promise((resolve) => {
      readline.question(question, (input) => {
        resolve(input);
      });
    });
  }

  readline.close();

  const url = 'https://binpricenotifier.onrender.com/update-thresholds';
  const headers = { 'Content-Type': 'application/json' };
  const data = JSON.stringify(answers);

  axios.post(url, data, { headers })
    .then((response) => {
      console.log(`Thresholds updated successfully. Status code: ${response.status}`);
    })
    .catch((error) => {
      console.error(`Error updating thresholds: ${error.message}`);
    });
};

askQuestions();