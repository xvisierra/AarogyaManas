const questions = [
    {
      question: "How would you rate your overall mood today?",
      options: ["Very Bad", "Bad", "Neutral", "Good", "Very Good"]
    },
    {
      question: "How well did you sleep last night?",
      options: ["Very Poorly", "Poorly", "Fair", "Well", "Very Well"]
    },
    {
      question: "How would you rate your stress level today?",
      options: ["Very Low", "Low", "Moderate", "High", "Very High"]
    },
    {
      question: "How productive were you today?",
      options: ["Not Productive at All", "Not Very Productive", "Neutral", "Productive", "Very Productive"]
    },
    {
      question: "How would you rate your energy levels?",
      options: ["Very Low", "Low", "Moderate", "High", "Very High"]
    },
    {
      question: "How satisfied are you with your day?",
      options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"]
    },
    {
      question: "How social were you today?",
      options: ["Very Introverted", "Introverted", "Neutral", "Extroverted", "Very Extroverted"]
    },
    {
      question: "Did you experience any anxiety today?",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      question: "How motivated were you today?",
      options: ["Very Unmotivated", "Unmotivated", "Neutral", "Motivated", "Very Motivated"]
    },
    {
      question: "Did you engage in any physical exercise today?",
      options: ["None", "Less than 30 minutes", "30-60 minutes", "1-2 hours", "More than 2 hours"]
    }
  ];
  
  let currentQuestionIndex = 0;
  let selectedAnswers = [];
  
  function displayCurrentQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionTitle = document.getElementById('questionTitle');
    const optionsContainer = document.getElementById('optionsContainer');
  
    questionTitle.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = ''; // Clear previous options
  
    // Display options
    currentQuestion.options.forEach((option, index) => {
      const radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = 'questionOptions';
      radioInput.value = index;
      radioInput.id = `option${index}`;
      
      const label = document.createElement('label');
      label.htmlFor = `option${index}`;
      label.textContent = option;
      
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('form-group');
      optionDiv.appendChild(radioInput);
      optionDiv.appendChild(label);
      
      optionsContainer.appendChild(optionDiv);
    });
  }
  
  function nextQuestion() {
    const selectedOption = document.querySelector('input[name="questionOptions"]:checked');
    if (!selectedOption) {
      alert('Please select an option.');
      return;
    }
  
    selectedAnswers.push(parseInt(selectedOption.value, 10));
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayCurrentQuestion();
    } else {
      // No more questions, identify mood
      identifyMood();
    }
  }
  
  function startOver() {
    currentQuestionIndex = 0;
    selectedAnswers = [];
    displayCurrentQuestion();
    document.getElementById('result').innerText = '';
    const questionCard = document.getElementById('questionCard');
    questionCard.style.backgroundColor = '';
  }
  
  function identifyMood() {
    let totalScore = 0;
    selectedAnswers.forEach(answer => {
      totalScore += answer;
    });
  
    const averageScore = totalScore / selectedAnswers.length;
  
    let mood = '';
    let cardColor = '';
  
    if (averageScore < 1) {
      mood = 'Very Negative';
      cardColor = 'red';
    } else if (averageScore < 2) {
      mood = 'Negative';
      cardColor = 'orange';
    } else if (averageScore < 3) {
      mood = 'Neutral';
      cardColor = 'white';
    } else if (averageScore < 4) {
      mood = 'Positive';
      cardColor = 'blue';
    } else {
      mood = 'Very Positive';
      cardColor = 'green';
    }
  
    const questionCard = document.getElementById('questionCard');
    questionCard.style.backgroundColor = cardColor;
  
    document.getElementById('result').innerText = `Your overall mood is: ${mood}`;
  
    const startOverButton = document.createElement('button');
    startOverButton.textContent = 'Start Over';
    startOverButton.classList.add('btn', 'btn-primary', 'mt-3');
    startOverButton.addEventListener('click', startOver);
    
    document.getElementById('result').appendChild(startOverButton);
  }
  
  // Display the first question initially
  displayCurrentQuestion();
  