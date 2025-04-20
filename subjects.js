// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out'
});

// Quiz data structure
const quizData = {
    history: {
        chapters: {
            "World War I": {
                topics: {
                    "Causes": {
                        difficulty: "medium",
                        questions: [/* ... existing questions ... */]
                    },
                    "Consequences": {
                        difficulty: "hard",
                        questions: [/* ... existing questions ... */]
                    }
                }
            }
            // ... other chapters
        }
    }
    // ... other subjects
};

// Show chapters for selected subject
function showChapters(subject) {
    const modal = document.getElementById('chapters-modal');
    const chaptersList = document.getElementById('chapters-list');
    const chapters = Object.keys(quizData[subject].chapters);

    let chaptersHTML = chapters.map(chapter => `
        <div class="chapter-card" data-aos="fade-up">
            <div class="chapter-header">
                <h3>${chapter}</h3>
                <span class="chapter-topics">
                    ${Object.keys(quizData[subject].chapters[chapter].topics).length} Topics
                </span>
            </div>
            <div class="chapter-topics-list">
                ${Object.entries(quizData[subject].chapters[chapter].topics).map(([topic, data]) => `
                    <div class="topic-item">
                        <span class="topic-name">${topic}</span>
                        <span class="topic-difficulty ${data.difficulty}">
                            ${data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1)}
                        </span>
                        <button onclick="startQuiz('${subject}', '${chapter}', '${topic}')">
                            Start Quiz
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    chaptersList.innerHTML = chaptersHTML;
    modal.style.display = 'block';
}

// Start quiz for selected topic
function startQuiz(subject, chapter, topic) {
    // Store quiz data in session storage
    sessionStorage.setItem('currentQuiz', JSON.stringify({
        subject,
        chapter,
        topic,
        questions: quizData[subject].chapters[chapter].topics[topic].questions
    }));
    
    // Redirect to quiz page
    window.location.href = 'quiz.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Close button functionality
document.querySelector('.close').onclick = function() {
    document.getElementById('chapters-modal').style.display = 'none';
}; 