// User data structure
const userData = {
    points: 0,
    quizzesCompleted: 0,
    averageScore: 0,
    streak: 0,
    lastQuizDate: null,
    quizHistory: [],
    achievements: [],
    learningPaths: {
        mathematics: { progress: 0, lastQuizScore: 0 },
        science: { progress: 0, lastQuizScore: 0 },
        history: { progress: 0, lastQuizScore: 0 },
        geography: { progress: 0, lastQuizScore: 0 },
        literature: { progress: 0, lastQuizScore: 0 },
        art: { progress: 0, lastQuizScore: 0 },
        music: { progress: 0, lastQuizScore: 0 },
        technology: { progress: 0, lastQuizScore: 0 },
        sports: { progress: 0, lastQuizScore: 0 },
        generalKnowledge: { progress: 0, lastQuizScore: 0 }
    }
};

// Quiz report structure
const quizReport = {
    subject: '',
    score: 0,
    timeTaken: 0,
    date: null,
    answers: [],
    xpEarned: 0,
    correctAnswers: 0,
    incorrectAnswers: 0
};

// Initialize user data from localStorage
function initializeUserData() {
    console.log('Initializing user data...');
    const savedData = localStorage.getItem('quizWizUserData');
    console.log('Raw saved data from localStorage:', savedData);
    
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            console.log('Parsed saved data:', parsedData);
            Object.assign(userData, parsedData);
            console.log('Final user data after initialization:', userData);
        } catch (error) {
            console.error('Error parsing saved data:', error);
            saveUserData(); // Reset to default if corrupted
        }
    } else {
        console.log('No saved data found, initializing with defaults');
        saveUserData();
    }
}

// Save user data to localStorage
function saveUserData() {
    try {
        console.log('Saving user data to localStorage:', userData);
        const dataToSave = JSON.stringify(userData);
        console.log('Stringified data:', dataToSave);
        localStorage.setItem('quizWizUserData', dataToSave);
        console.log('Data saved successfully');
        
        // Verify the save
        const verifyData = localStorage.getItem('quizWizUserData');
        console.log('Verified saved data:', verifyData);
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Update user data after completing a quiz
function updateUserData(quizData) {
    console.log('updateUserData called with:', quizData);
    
    // Create new quiz report
    const newReport = {
        ...quizReport,
        subject: quizData.subject,
        score: quizData.score,
        timeTaken: quizData.timeTaken,
        date: new Date(),
        answers: quizData.answers,
        xpEarned: calculateXP(quizData.score, quizData.timeTaken),
        correctAnswers: quizData.answers.filter(answer => answer.isCorrect).length,
        incorrectAnswers: quizData.answers.filter(answer => !answer.isCorrect).length
    };
    
    console.log('Created new quiz report:', newReport);

    // Update user data
    userData.quizzesCompleted++;
    userData.points += newReport.xpEarned;
    
    // Update average score
    const totalScore = userData.averageScore * (userData.quizzesCompleted - 1) + newReport.score;
    userData.averageScore = totalScore / userData.quizzesCompleted;

    // Update streak
    const today = new Date();
    if (userData.lastQuizDate) {
        const lastDate = new Date(userData.lastQuizDate);
        const dayDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        if (dayDiff === 1) {
            userData.streak++;
        } else if (dayDiff > 1) {
            userData.streak = 1;
        }
    } else {
        userData.streak = 1;
    }
    userData.lastQuizDate = today;

    // Update subject progress
    if (userData.learningPaths[quizData.subject]) {
        userData.learningPaths[quizData.subject].progress += 10;
        userData.learningPaths[quizData.subject].lastQuizScore = newReport.score;
    }

    // Add to quiz history
    userData.quizHistory.push(newReport);
    console.log('Updated user data before saving:', userData);

    // Check for achievements
    checkAchievements(newReport);

    // Save updated data
    saveUserData();
    
    // Verify the save
    const verifyData = localStorage.getItem('quizWizUserData');
    console.log('Verified saved data:', verifyData);
}

// Get quiz history for analytics
function getQuizHistory() {
    const history = userData.quizHistory;
    console.log('Retrieved quiz history:', history);
    return history;
}

// Get performance data for charts
function getPerformanceData(timePeriod = 'month') {
    const now = new Date();
    const history = getQuizHistory();
    
    let filteredHistory = history;
    if (timePeriod === 'week') {
        filteredHistory = history.filter(quiz => 
            (now - new Date(quiz.date)) / (1000 * 60 * 60 * 24) <= 7
        );
    } else if (timePeriod === 'month') {
        filteredHistory = history.filter(quiz => 
            (now - new Date(quiz.date)) / (1000 * 60 * 60 * 24) <= 30
        );
    }

    return filteredHistory.map(quiz => ({
        date: new Date(quiz.date).toLocaleDateString(),
        score: quiz.score,
        subject: quiz.subject
    }));
}

// Get subject-wise performance
function getSubjectPerformance() {
    const history = getQuizHistory();
    const subjectData = {};
    
    history.forEach(quiz => {
        if (!subjectData[quiz.subject]) {
            subjectData[quiz.subject] = {
                totalScore: 0,
                count: 0,
                lastScore: 0
            };
        }
        subjectData[quiz.subject].totalScore += quiz.score;
        subjectData[quiz.subject].count++;
        subjectData[quiz.subject].lastScore = quiz.score;
    });

    return Object.entries(subjectData).map(([subject, data]) => ({
        subject,
        averageScore: data.totalScore / data.count,
        lastScore: data.lastScore
    }));
}

// Helper function to calculate XP
function calculateXP(score, timeTaken) {
    console.log('Calculating XP with score:', score, 'and time:', timeTaken);
    
    // Base points for correct answers (10 points per correct answer)
    let xp = score * 10;
    console.log('Base points:', xp);
    
    // Bonus points for quick completion
    const averageTimePerQuestion = timeTaken / score; // Time per correct answer
    if (averageTimePerQuestion < 30) {
        const timeBonus = Math.floor((30 - averageTimePerQuestion) * 2);
        xp += timeBonus;
        console.log('Time bonus:', timeBonus);
    }
    
    // Perfect score bonus
    if (score === 5) { // Assuming 5 questions per quiz
        xp += 50; // 50 bonus points for perfect score
        console.log('Perfect score bonus: 50');
    }
    
    // Streak bonus
    if (userData.streak > 0) {
        const streakBonus = userData.streak * 5;
        xp += streakBonus;
        console.log('Streak bonus:', streakBonus);
    }
    
    console.log('Total XP calculated:', xp);
    return xp;
}

// Check and award achievements
function checkAchievements(quizReport) {
    const newAchievements = [];
    
    // Quiz Master Achievement
    if (userData.quizzesCompleted >= 10) {
        newAchievements.push({
            id: 'quiz-master',
            title: 'Quiz Master',
            description: 'Completed 10 quizzes',
            icon: '🏆'
        });
    }
    
    // Perfect Score Achievement
    if (quizReport.score === 100) {
        newAchievements.push({
            id: 'perfect-score',
            title: 'Perfect Score',
            description: 'Achieved 100% in a quiz',
            icon: '⭐'
        });
    }
    
    // Streak Achievement
    if (userData.streak >= 7) {
        newAchievements.push({
            id: 'streak-master',
            title: 'Streak Master',
            description: 'Maintained a 7-day streak',
            icon: '🔥'
        });
    }
    
    // Add new achievements to user data
    newAchievements.forEach(achievement => {
        if (!userData.achievements.some(a => a.id === achievement.id)) {
            userData.achievements.push(achievement);
        }
    });
}

// Initialize user data when the script loads
initializeUserData(); 