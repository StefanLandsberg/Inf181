const quizData = [
  {
    question: 'What visualization technique is suitable for representing hierarchical data?',
    options: [
      'Infographics',
      'Heat maps',
      'Scatter plots',
      'Tree maps',
    ],
    answer: 'Tree maps',
  },
  {
    question: 'How can interactive elements enhance data visualization?',
    options: [
      'By increasing user engagement and understanding',
      'By making it static and unengaging',
      'By adding complexity without improving understanding',
      'By confusing users',
    ],
    answer: 'By increasing user engagement and understanding',
  },
  {
    question: 'Where can individuals find resources to learn more about data visualization?',
    options: [
      'In a library',
      'Through online courses, workshops, and webinars',
      'At a bakery',
      'On the moon',
    ],
    answer: 'Through online courses, workshops, and webinars',
  },
  {
    question: 'What is a key principle of good design in data visualization?',
    options: [
      'Clutter and confusion',
      'Clarity, coherence, and accessibility',
      'Complexity and inconsistency',
      'Chaos and obscurity',
    ],
    answer: 'Clarity, coherence, and accessibility',
  },
  {
    question: 'Which emerging trend in data visualization involves immersive experiences like VR or AR?',
    options: [
      'Time travel visualization',
      'Virtual pet visualization',
      'Virtual reality (VR) or augmented reality (AR) applications',
      'Parallel universe visualization',
    ],
    answer: 'Virtual reality (VR) or augmented reality (AR) applications',
  },
  {
    question: 'What does data governance contribute to information quality?',
    options: [
      'Adds chaos to data',
      'Ensures poor information quality',
      'Has no impact on information quality',
      'Ensures structures for high-quality information',
    ],
    answer: 'Ensures structures for high-quality information',
  },
  {
    question: 'What is a consequence of poor information quality in decision-making?',
    options: [
      'Enhanced decision-making',
      'Increased credibility',
      'Improved outcomes',
      'Costs and risks in decision-making',
    ],
    answer: 'Costs and risks in decision-making',
  },
  {
    question: 'What is a key metric for measuring information quality?',
    options: [
      'Accuracy, relevance, and reliability',
      'Number of coffee breaks',
      'Likes on social media',
      'Time spent on meetings',
    ],
    answer: 'Accuracy, relevance, and reliability',
  },
  {
    question: 'What does data ethics primarily focus on?',
    options: [
      'Data storage capacity',
      'Privacy, fairness, and accountability',
      'Database design',
      'Speed of data transmission',
    ],
    answer: 'Privacy, fairness, and accountability',
  },
  {
    question: 'How does AI impact the workforce in information systems?',
    options: [
      'By reducing the need for skills',
      'By transforming the workforce and requiring new skills',
      'By maintaining the status quo',
      'By creating more paperwork',
    ],
    answer: 'By transforming the workforce and requiring new skills',
  },
];
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('Submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    resultContainer.style.fontSize='18px'
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br><br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
          <br><br><br>
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();