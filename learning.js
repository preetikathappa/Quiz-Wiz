// User data (replace with actual backend data)
let userData = {
    name: "John Doe",
    points: 1250,
    quizzesCompleted: 15,
    averageScore: 85,
    recentActivity: []
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateUserStats();
    loadRecentActivity();
    initializeCharts();
});

// Update user statistics
function updateUserStats() {
    document.querySelector('.points-value').textContent = userData.points;
    document.querySelector('.quizzes-completed').textContent = userData.quizzesCompleted;
    document.querySelector('.average-score').textContent = userData.averageScore + '%';
}

// Load recent activity
function loadRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    const activities = [
        {
            type: 'quiz',
            subject: 'Mathematics',
            score: 90,
            date: '2024-01-15'
        },
        {
            type: 'flashcard',
            subject: 'Science',
            completed: 20,
            date: '2024-01-14'
        }
        // Add more activities
    ];

    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas fa-${activity.type === 'quiz' ? 'check-circle' : 'clone'}"></i>
            </div>
            <div class="activity-details">
                <h4>${activity.type === 'quiz' ? 'Quiz Completed' : 'Flashcard Session'}</h4>
                <p>${activity.subject} - ${activity.type === 'quiz' ? 
                    `Score: ${activity.score}%` : 
                    `${activity.completed} cards completed`}</p>
                <span class="activity-date">${new Date(activity.date).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');
}

// Quick Quiz functionality
function startQuickQuiz() {
    const difficulty = document.getElementById('difficultySelect').value;
    const questionCount = document.getElementById('questionCount').value;
    
    // Generate random quiz based on settings
    const quiz = generateRandomQuiz(difficulty, questionCount);
    
    // Store quiz data and redirect to quiz page
    sessionStorage.setItem('currentQuiz', JSON.stringify(quiz));
    window.location.href = 'quiz.html';
}

// Flashcards functionality
function showFlashcards() {
    const modal = document.getElementById('flashcards-modal');
    modal.style.display = 'block';
    
    // Initialize flashcards
    initializeFlashcards();
}

function initializeFlashcards() {
    let currentCard = 0;
    const flashcards = [
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is 2 + 2?", answer: "4" },
        // Add more flashcards
    ];

    const flashcard = document.querySelector('.flashcard');
    const prevBtn = document.getElementById('prevCard');
    const nextBtn = document.getElementById('nextCard');
    const flipBtn = document.getElementById('flipCard');

    function updateCard() {
        const front = flashcard.querySelector('.flashcard-front p');
        const back = flashcard.querySelector('.flashcard-back p');
        front.textContent = flashcards[currentCard].question;
        back.textContent = flashcards[currentCard].answer;
    }

    prevBtn.onclick = () => {
        if (currentCard > 0) {
            currentCard--;
            updateCard();
        }
    };

    nextBtn.onclick = () => {
        if (currentCard < flashcards.length - 1) {
            currentCard++;
            updateCard();
        }
    };

    flipBtn.onclick = () => {
        flashcard.querySelector('.flashcard-inner').style.transform = 
            flashcard.querySelector('.flashcard-inner').style.transform === 'rotateY(180deg)' 
                ? 'rotateY(0deg)' 
                : 'rotateY(180deg)';
    };

    updateCard();
}

// Statistics functionality
function showDetailedStats() {
    const modal = document.getElementById('stats-modal');
    modal.style.display = 'block';
    
    // Update charts if needed
    updateCharts();
}

function initializeCharts() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Quiz Scores',
                data: [75, 82, 88, 85],
                borderColor: '#6e8efb',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Close buttons for modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        this.closest('.modal').style.display = 'none';
    };
}); 