let currentQuiz = {
    subject: '',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    startTime: null,
    endTime: null,
    answers: []
};

// Initialize quiz
function initQuiz() {
    console.log('Initializing quiz...');
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const mode = urlParams.get('mode');
    
    console.log('URL parameters:', { subject, mode });
    
    if (subject) {
        currentQuiz.subject = subject;
        loadQuizQuestions(subject);
    } else if (mode === 'quick') {
        loadQuickQuiz();
    }
    
    currentQuiz.startTime = new Date();
    updateQuestionCounter();
    startTimer();
    
    console.log('Quiz initialized with:', currentQuiz);
}

// Load quiz questions
function loadQuizQuestions(subject) {
    // In a real application, this would fetch questions from a server
    // For now, we'll use sample questions
    currentQuiz.questions = getSampleQuestions(subject);
    displayCurrentQuestion();
}

// Display current question
function displayCurrentQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    document.getElementById('question-text').textContent = question.text;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    
    updateNavigationButtons();
}

// Handle option selection
function selectOption(optionIndex) {
    console.log('Option selected:', optionIndex);
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const isCorrect = optionIndex === question.correctAnswer;
    
    console.log('Is correct answer?', isCorrect);
    
    // Store the answer
    currentQuiz.answers.push({
        questionIndex: currentQuiz.currentQuestionIndex,
        selectedOption: optionIndex,
        isCorrect: isCorrect,
        timeSpent: getTimeSpent()
    });
    
    if (isCorrect) {
        currentQuiz.score++;
    }
    
    console.log('Current score:', currentQuiz.score);
    
    // Move to next question or end quiz
    if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentQuestionIndex++;
        displayCurrentQuestion();
    } else {
        console.log('Quiz completed, calling endQuiz()');
        endQuiz();
    }
}

// End quiz and show results
function endQuiz() {
    console.log('endQuiz() called');
    currentQuiz.endTime = new Date();
    const timeTaken = (currentQuiz.endTime - currentQuiz.startTime) / 1000;
    const scorePercentage = (currentQuiz.score / currentQuiz.questions.length) * 100;
    
    console.log('Quiz completion details:', {
        totalQuestions: currentQuiz.questions.length,
        score: currentQuiz.score,
        percentage: scorePercentage,
        timeTaken: timeTaken,
        subject: currentQuiz.subject
    });
    
    // Calculate XP using the function from userData.js
    const xpEarned = calculateXP(currentQuiz.score, timeTaken);
    
    // Update results modal
    document.getElementById('final-score').textContent = `${Math.round(scorePercentage)}%`;
    document.getElementById('correct-answers').textContent = currentQuiz.score;
    document.getElementById('incorrect-answers').textContent = currentQuiz.questions.length - currentQuiz.score;
    document.getElementById('time-taken').textContent = formatTime(timeTaken);
    document.getElementById('xp-earned').textContent = xpEarned;
    
    // Show results modal
    document.getElementById('results-modal').style.display = 'block';
    
    // Update performance chart
    updatePerformanceChart();
    
    // Check for achievements
    checkAchievements();
}

// Submit quiz results to report
function submitToReport() {
    console.log('submitToReport() called');
    
    const quizData = {
        subject: currentQuiz.subject,
        score: currentQuiz.score, // Pass the actual score count, not percentage
        timeTaken: (currentQuiz.endTime - currentQuiz.startTime) / 1000,
        date: new Date(),
        answers: currentQuiz.answers
    };
    
    console.log('Prepared quiz data for submission:', quizData);
    
    // Update user data
    updateUserData(quizData);
    
    // Show success message
    alert('Quiz results have been submitted to your report!');
    
    // Redirect to learning page
    window.location.href = 'learning.html';
}

// Update performance chart
function updatePerformanceChart() {
    const ctx = document.getElementById('performance-chart').getContext('2d');
    const timeData = currentQuiz.answers.map((answer, index) => ({
        x: index + 1,
        y: answer.timeSpent
    }));
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData.map(d => `Q${d.x}`),
            datasets: [{
                label: 'Time Spent (seconds)',
                data: timeData.map(d => d.y),
                borderColor: '#3498db',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Helper functions
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function calculateXP(score, timeTaken) {
    // Base XP for correct answers
    let xp = score * 10;
    
    // Bonus XP for quick completion
    const timeBonus = Math.max(0, 100 - timeTaken);
    xp += Math.floor(timeBonus / 10);
    
    return xp;
}

function getTimeSpent() {
    return ((new Date() - currentQuiz.startTime) / 1000).toFixed(1);
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz); 