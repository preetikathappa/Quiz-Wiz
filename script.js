let correctAnswers = [];

async function generateQuiz() {
  const topic = document.getElementById("topic").value.trim();
  const form = document.getElementById("quiz-form");
  const loading = document.getElementById("loading");
  const scoreDisplay = document.getElementById("score-display");
  const submitBtn = document.getElementById("submit-btn");

  form.innerHTML = "";
  scoreDisplay.textContent = "";
  loading.textContent = "Generating quiz...";
  submitBtn.style.display = "none";
  correctAnswers = [];

  if (!topic) {
    alert("Please enter a topic.");
    loading.textContent = "";
    return;
  }

  try {
    const response = await fetch(`http://localhost:8000/generate-quiz?topic=${encodeURIComponent(topic)}`);
    const data = await response.json();
    console.log(data);  // Log to check response structure
    const quizText = data.quiz;

    const questions = quizText.split(/Q[0-9]+\.\s/).slice(1);

    questions.forEach((qText, index) => {
      const [questionWithOptions, answerLine] = qText.split("Answer:");
      const lines = questionWithOptions.trim().split("\n");

      const question = lines[0];
      const options = lines.slice(1).map(line => line.replace(/^[A-D]\.\s/, ''));

      const answerLetter = answerLine?.trim().charAt(0).toUpperCase() || "A";
      const answerIndex = ["A", "B", "C", "D"].indexOf(answerLetter);
      correctAnswers.push(answerIndex);

      const card = document.createElement("div");
      card.className = "question-card";

      card.innerHTML = `<h3>Q${index + 1}. ${question}</h3>`;

      options.forEach((option, optIndex) => {
        const optionID = `q${index}_opt${optIndex}`;
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="radio" name="q${index}" value="${optIndex}" id="${optionID}" />
          ${["A", "B", "C", "D"][optIndex]}. ${option}
        `;
        card.appendChild(label);
      });

      form.appendChild(card);
    });

    submitBtn.style.display = "inline-block";

  } catch (err) {
    alert("Failed to generate quiz. Please check your backend.");
    console.error(err);
  } finally {
    loading.textContent = "";
  }
}

function checkAnswers(event) {
  event.preventDefault();

  const form = document.getElementById("quiz-form");
  let score = 0;

  correctAnswers.forEach((correctIndex, i) => {
    const selected = form.querySelector(`input[name="q${i}"]:checked`);
    const questionCard = form.children[i];
    const labels = questionCard.querySelectorAll("label");

    labels.forEach((label, index) => {
      label.classList.remove("correct", "incorrect");
      if (index === correctIndex) {
        label.classList.add("correct");
      }

      if (selected && +selected.value === index && index !== correctIndex) {
        label.classList.add("incorrect");
      }
    });

    if (selected && +selected.value === correctIndex) {
      score++;
    }
  });

  const scoreDisplay = document.getElementById("score-display");
  scoreDisplay.textContent = `You scored ${score} out of ${correctAnswers.length}!`;
}

function generateQuiz(subject) {
    if (subject === "history") {
        renderHistoryQuiz();
    } else {
        quizContainer.innerHTML = `<p>Quiz for <strong>${subject}</strong> coming soon!</p>`;
    }
}

function submitQuiz() {
    const correctAnswers = {
        q1: "Fall of Constantinople",
        q2: "Winston Churchill",
        q3: "Ottoman Empire",
        q4: "Assassination of JFK",
        q5: "The Russian Revolution",
        q6: "Great Pyramid of Giza",
        q7: "Cleopatra",
        q8: "World War I",
        q9: "Assassination of Archduke Franz Ferdinand",
        q10: "Sumerians"
    };

    let score = 0;
    for (let i = 1; i <= 10; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === correctAnswers[`q${i}`]) {
            score++;
        }
    }

    quizContainer.innerHTML = `<p>Your score: ${score} out of 10</p>`;
}

// Sample data for subjects, chapters, and topics
const quizData = {
    history: {
        chapters: {
            "Ancient Civilizations": {
                topics: {
                    "Indus Valley Civilization": {
                        questions: [
                            {
                                question: "Which of the following is not a major city of the Indus Valley Civilization?",
                                options: ["Harappa", "Mohenjodaro", "Lothal", "Babylon"],
                                correctAnswer: 3
                            },
                            {
                                question: "What was the most remarkable feature of the Indus Valley cities?",
                                options: [
                                    "Tall temples",
                                    "Underground railways",
                                    "Well planned drainage system",
                                    "Large palaces"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What was the main occupation of the Indus Valley people?",
                                options: [
                                    "Agriculture",
                                    "Trade",
                                    "Fishing",
                                    "Mining"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "Which metal was NOT known to the Indus Valley people?",
                                options: [
                                    "Copper",
                                    "Bronze",
                                    "Iron",
                                    "Gold"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What was the script used by the Indus Valley people called?",
                                options: [
                                    "Brahmi",
                                    "Kharosthi",
                                    "Indus Script",
                                    "Sanskrit"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    },
                    "Mesopotamian Civilization": {
                        questions: [
                            {
                                question: "Which river system was the Mesopotamian civilization located between?",
                                options: [
                                    "Nile and Tigris",
                                    "Tigris and Euphrates",
                                    "Indus and Ganges",
                                    "Yellow and Yangtze"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the first written law code called?",
                                options: [
                                    "Code of Hammurabi",
                                    "Code of Ur-Nammu",
                                    "Code of Lipit-Ishtar",
                                    "Code of Eshnunna"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What was the main writing system of Mesopotamia?",
                                options: [
                                    "Hieroglyphics",
                                    "Cuneiform",
                                    "Alphabet",
                                    "Pictographs"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Which was the first city of Mesopotamia?",
                                options: [
                                    "Babylon",
                                    "Ur",
                                    "Uruk",
                                    "Nineveh"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What was the main building material in Mesopotamia?",
                                options: [
                                    "Stone",
                                    "Wood",
                                    "Mud bricks",
                                    "Marble"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    }
                }
            },
            "The Rise of Nationalism in Europe": {
                topics: {
                    "Nationalism": {
                        questions: [
                            {
                                question: "What was the main idea behind nationalism in 19th century Europe?",
                                options: [
                                    "Economic development",
                                    "Cultural and political unity of people",
                                    "Military expansion",
                                    "Religious unity"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Which event is considered a turning point in the rise of nationalism in Europe?",
                                options: [
                                    "The French Revolution",
                                    "The Industrial Revolution",
                                    "The Renaissance",
                                    "The Reformation"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What was the main goal of nationalist movements in Europe?",
                                options: [
                                    "Economic prosperity",
                                    "Creation of nation-states",
                                    "Religious freedom",
                                    "Technological advancement"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Which concept became central to nationalist ideology?",
                                options: [
                                    "Monarchy",
                                    "Democracy",
                                    "Sovereignty",
                                    "Colonialism"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What role did language play in European nationalism?",
                                options: [
                                    "Economic development",
                                    "Cultural identity",
                                    "Military strategy",
                                    "Religious unity"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    },
                    "Unification of Germany and Italy": {
                        questions: [
                            {
                                question: "Who was the main architect of German unification?",
                                options: [
                                    "Giuseppe Garibaldi",
                                    "Otto von Bismarck",
                                    "Count Cavour",
                                    "Victor Emmanuel II"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Which war led to the final unification of Germany?",
                                options: [
                                    "Franco-Prussian War",
                                    "Crimean War",
                                    "Napoleonic Wars",
                                    "World War I"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What was the role of the Zollverein in German unification?",
                                options: [
                                    "Military alliance",
                                    "Economic union",
                                    "Cultural movement",
                                    "Religious organization"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Who was known as the 'Sword of Italian Unification'?",
                                options: [
                                    "Giuseppe Mazzini",
                                    "Giuseppe Garibaldi",
                                    "Count Cavour",
                                    "Victor Emmanuel II"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the final step in Italian unification?",
                                options: [
                                    "Capture of Rome",
                                    "Battle of Solferino",
                                    "Treaty of Vienna",
                                    "Congress of Berlin"
                                ],
                                correctAnswer: 0
                            }
                        ]
                    }
                }
            },
            "Nationalism in India": {
                topics: {
                    "Non-Cooperation Movement": {
                        questions: [
                            {
                                question: "When did the Non-Cooperation Movement start?",
                                options: [
                                    "1919",
                                    "1920",
                                    "1921",
                                    "1922"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the main objective of the Non-Cooperation Movement?",
                                options: [
                                    "Complete independence",
                                    "Constitutional reforms",
                                    "Economic development",
                                    "Social reforms"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "Which event led to the withdrawal of the Non-Cooperation Movement?",
                                options: [
                                    "Jallianwala Bagh massacre",
                                    "Chauri Chaura incident",
                                    "Simon Commission",
                                    "Salt March"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the main method of protest in the Non-Cooperation Movement?",
                                options: [
                                    "Armed rebellion",
                                    "Peaceful non-cooperation",
                                    "Economic boycott",
                                    "Political negotiations"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Who was the main leader of the Non-Cooperation Movement?",
                                options: [
                                    "Jawaharlal Nehru",
                                    "Mahatma Gandhi",
                                    "Subhash Chandra Bose",
                                    "Bal Gangadhar Tilak"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    },
                    "Civil Disobedience Movement": {
                        questions: [
                            {
                                question: "What was the immediate cause of the Civil Disobedience Movement?",
                                options: [
                                    "Jallianwala Bagh massacre",
                                    "Salt March",
                                    "Simon Commission",
                                    "Partition of Bengal"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "Where did Gandhi start the Salt March?",
                                options: [
                                    "Delhi",
                                    "Mumbai",
                                    "Ahmedabad",
                                    "Sabarmati"
                                ],
                                correctAnswer: 3
                            },
                            {
                                question: "What was the main focus of the Civil Disobedience Movement?",
                                options: [
                                    "Salt tax",
                                    "Land revenue",
                                    "Industrial policy",
                                    "Education reform"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "Which agreement ended the Civil Disobedience Movement?",
                                options: [
                                    "Gandhi-Irwin Pact",
                                    "Lucknow Pact",
                                    "Poona Pact",
                                    "Delhi Pact"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What was the impact of the Civil Disobedience Movement?",
                                options: [
                                    "Immediate independence",
                                    "Increased British repression",
                                    "Strengthened nationalist movement",
                                    "Economic development"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    },
                    "Gandhi's Role": {
                        questions: [
                            {
                                question: "What was Gandhi's main contribution to the Indian freedom struggle?",
                                options: [
                                    "Military strategy",
                                    "Economic policies",
                                    "Non-violent resistance",
                                    "Constitutional reforms"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    },
                    "Movements": {
                        questions: [
                            {
                                question: "Which movement was known as the 'Quit India Movement'?",
                                options: [
                                    "Non-Cooperation Movement",
                                    "Civil Disobedience Movement",
                                    "August Movement",
                                    "Swadeshi Movement"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    }
                }
            },
            "Age of Industrialization": {
                topics: {
                    "Factories": {
                        questions: [
                            {
                                question: "What was the main characteristic of factory production?",
                                options: [
                                    "Handmade goods",
                                    "Mass production",
                                    "Customized products",
                                    "Seasonal production"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the main advantage of factory system?",
                                options: [
                                    "Lower costs",
                                    "Higher quality",
                                    "Increased production",
                                    "Better working conditions"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What was the typical working day in early factories?",
                                options: [
                                    "8 hours",
                                    "10 hours",
                                    "12-16 hours",
                                    "6 hours"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What was the main source of power in early factories?",
                                options: [
                                    "Electricity",
                                    "Steam power",
                                    "Water power",
                                    "Animal power"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the impact of factories on traditional crafts?",
                                options: [
                                    "Improved quality",
                                    "Increased demand",
                                    "Decline of traditional crafts",
                                    "No significant impact"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    },
                    "Labour": {
                        questions: [
                            {
                                question: "What was a common working condition in early factories?",
                                options: [
                                    "8-hour workday",
                                    "Safe working environment",
                                    "Child labor",
                                    "High wages"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What was the main issue faced by factory workers?",
                                options: [
                                    "High wages",
                                    "Long working hours",
                                    "Too many holidays",
                                    "Excessive benefits"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the typical age of child workers in factories?",
                                options: [
                                    "12-14 years",
                                    "8-10 years",
                                    "6-8 years",
                                    "4-6 years"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the main reason for employing children in factories?",
                                options: [
                                    "Better skills",
                                    "Lower wages",
                                    "Higher productivity",
                                    "Educational benefits"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the first labor law passed in Britain?",
                                options: [
                                    "Factory Act of 1833",
                                    "Labor Act of 1819",
                                    "Workers Act of 1825",
                                    "Employment Act of 1840"
                                ],
                                correctAnswer: 0
                            }
                        ]
                    },
                    "Industrial Revolution": {
                        questions: [
                            {
                                question: "Which industry was the first to be industrialized?",
                                options: [
                                    "Steel",
                                    "Textile",
                                    "Coal",
                                    "Railways"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the most significant technological innovation of the Industrial Revolution?",
                                options: [
                                    "Steam engine",
                                    "Spinning jenny",
                                    "Power loom",
                                    "Cotton gin"
                                ],
                                correctAnswer: 0
                            }
                        ]
                    }
                }
            },
            "World War I": {
                topics: {
                    "Causes": {
                        questions: [
                            {
                                question: "What was the immediate cause of World War I?",
                                options: [
                                    "Assassination of Archduke Franz Ferdinand",
                                    "German invasion of Belgium",
                                    "Russian mobilization",
                                    "British naval blockade"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "Which alliance system included Germany, Austria-Hungary, and Italy?",
                                options: [
                                    "Triple Entente",
                                    "Central Powers",
                                    "Triple Alliance",
                                    "Axis Powers"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What was the Schlieffen Plan?",
                                options: [
                                    "German plan for quick victory",
                                    "British naval strategy",
                                    "French defense plan",
                                    "Russian mobilization plan"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "Which country joined the war in 1917?",
                                options: [
                                    "Russia",
                                    "United States",
                                    "Japan",
                                    "Italy"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What was the main weapon introduced in WWI?",
                                options: [
                                    "Tank",
                                    "Machine gun",
                                    "Poison gas",
                                    "Aircraft"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    },
                    "Consequences": {
                        questions: [
                            {
                                question: "Which treaty ended World War I?",
                                options: [
                                    "Treaty of Versailles",
                                    "Treaty of Paris",
                                    "Treaty of London",
                                    "Treaty of Berlin"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What was the League of Nations?",
                                options: [
                                    "Military alliance",
                                    "Economic union",
                                    "International peace organization",
                                    "Colonial administration"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "Which country lost the most territory after WWI?",
                                options: [
                                    "France",
                                    "Britain",
                                    "Germany",
                                    "Russia"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What was the main economic impact of WWI?",
                                options: [
                                    "Economic boom",
                                    "Great Depression",
                                    "Hyperinflation",
                                    "Trade surplus"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "Which empire was dissolved after WWI?",
                                options: [
                                    "British Empire",
                                    "Ottoman Empire",
                                    "French Empire",
                                    "Russian Empire"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            }
        }
    },
    science: {
        chapters: {
            "Physics": {
                topics: {
                    "Motion": {
                        questions: [
                            {
                                question: "What is the SI unit of velocity?",
                                options: [
                                    "m/s²",
                                    "m/s",
                                    "km/h",
                                    "cm/s"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the acceleration due to gravity on Earth?",
                                options: [
                                    "9.8 m/s²",
                                    "10 m/s²",
                                    "8.9 m/s²",
                                    "11 m/s²"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "Which law states that every action has an equal and opposite reaction?",
                                options: [
                                    "First Law of Motion",
                                    "Second Law of Motion",
                                    "Third Law of Motion",
                                    "Law of Gravitation"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What is the formula for calculating speed?",
                                options: [
                                    "Distance × Time",
                                    "Distance ÷ Time",
                                    "Time ÷ Distance",
                                    "Force ÷ Mass"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is inertia?",
                                options: [
                                    "Force of gravity",
                                    "Resistance to change in motion",
                                    "Speed of light",
                                    "Energy of motion"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    },
                    "Energy": {
                        questions: [
                            {
                                question: "What is the SI unit of energy?",
                                options: [
                                    "Watt",
                                    "Joule",
                                    "Newton",
                                    "Pascal"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Which form of energy is stored in food?",
                                options: [
                                    "Kinetic energy",
                                    "Chemical energy",
                                    "Thermal energy",
                                    "Electrical energy"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the law of conservation of energy?",
                                options: [
                                    "Energy can be created",
                                    "Energy can be destroyed",
                                    "Energy cannot be created or destroyed",
                                    "Energy can be converted to matter"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What type of energy is associated with motion?",
                                options: [
                                    "Potential energy",
                                    "Kinetic energy",
                                    "Thermal energy",
                                    "Chemical energy"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the main source of energy on Earth?",
                                options: [
                                    "Wind",
                                    "Water",
                                    "Sun",
                                    "Fossil fuels"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    }
                }
            },
            "Chemistry": {
                topics: {
                    "Elements and Compounds": {
                        questions: [
                            {
                                question: "What is the smallest unit of an element?",
                                options: [
                                    "Molecule",
                                    "Atom",
                                    "Compound",
                                    "Ion"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "How many elements are in the periodic table?",
                                options: [
                                    "92",
                                    "118",
                                    "108",
                                    "126"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the chemical symbol for gold?",
                                options: [
                                    "Ag",
                                    "Au",
                                    "Fe",
                                    "Cu"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the most abundant element in the Earth's atmosphere?",
                                options: [
                                    "Oxygen",
                                    "Carbon dioxide",
                                    "Nitrogen",
                                    "Hydrogen"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What is the chemical formula for water?",
                                options: [
                                    "H2O2",
                                    "H2O",
                                    "HO",
                                    "H3O"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            },
            "Biology": {
                topics: {
                    "Cell Structure": {
                        questions: [
                            {
                                question: "What is the basic unit of life?",
                                options: [
                                    "Atom",
                                    "Molecule",
                                    "Cell",
                                    "Tissue"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "Which organelle is called the 'powerhouse of the cell'?",
                                options: [
                                    "Nucleus",
                                    "Mitochondria",
                                    "Ribosome",
                                    "Golgi apparatus"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the function of the cell membrane?",
                                options: [
                                    "Protein synthesis",
                                    "Energy production",
                                    "Cell protection and regulation",
                                    "DNA storage"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "Which organelle contains DNA?",
                                options: [
                                    "Mitochondria",
                                    "Nucleus",
                                    "Endoplasmic reticulum",
                                    "Lysosome"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the function of ribosomes?",
                                options: [
                                    "Energy production",
                                    "Protein synthesis",
                                    "Cell division",
                                    "Waste removal"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    },
                    "Human Body": {
                        questions: [
                            {
                                question: "How many bones are in the human body?",
                                options: [
                                    "156",
                                    "206",
                                    "256",
                                    "306"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Which is the largest organ in the human body?",
                                options: [
                                    "Liver",
                                    "Heart",
                                    "Skin",
                                    "Brain"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What is the function of red blood cells?",
                                options: [
                                    "Fight infection",
                                    "Carry oxygen",
                                    "Produce hormones",
                                    "Store energy"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Which system includes the heart and blood vessels?",
                                options: [
                                    "Nervous system",
                                    "Digestive system",
                                    "Circulatory system",
                                    "Respiratory system"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What is the function of the nervous system?",
                                options: [
                                    "Transport nutrients",
                                    "Control body functions",
                                    "Produce hormones",
                                    "Remove waste"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            },
            "Astronomy": {
                topics: {
                    "Solar System": {
                        questions: [
                            {
                                question: "Which planet is known as the Red Planet?",
                                options: [
                                    "Venus",
                                    "Mars",
                                    "Jupiter",
                                    "Saturn"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the largest planet in our solar system?",
                                options: [
                                    "Earth",
                                    "Saturn",
                                    "Jupiter",
                                    "Neptune"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "Which planet has the most moons?",
                                options: [
                                    "Mars",
                                    "Jupiter",
                                    "Saturn",
                                    "Uranus"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What is the Great Red Spot?",
                                options: [
                                    "Mars' volcano",
                                    "Jupiter's storm",
                                    "Saturn's ring",
                                    "Venus' cloud"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Which planet is closest to the Sun?",
                                options: [
                                    "Venus",
                                    "Mercury",
                                    "Mars",
                                    "Earth"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            }
        }
    },
    mathematics: {
        chapters: {
            "Algebra": {
                topics: {
                    "Linear Equations": {
                        questions: [
                            {
                                question: "What is the solution to 2x + 5 = 15?",
                                options: [
                                    "x = 5",
                                    "x = 10",
                                    "x = 7.5",
                                    "x = 20"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What is the slope of the line y = 3x + 2?",
                                options: [
                                    "2",
                                    "3",
                                    "5",
                                    "1"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the y-intercept of y = -2x + 4?",
                                options: [
                                    "-2",
                                    "4",
                                    "2",
                                    "-4"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Solve for x: 3(x + 2) = 15",
                                options: [
                                    "x = 3",
                                    "x = 5",
                                    "x = 7",
                                    "x = 9"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What is the solution to the system: y = 2x + 1 and y = -x + 4?",
                                options: [
                                    "(1, 3)",
                                    "(2, 5)",
                                    "(3, 7)",
                                    "(4, 9)"
                                ],
                                correctAnswer: 0
                            }
                        ]
                    }
                }
            },
            "Geometry": {
                topics: {
                    "Triangles": {
                        questions: [
                            {
                                question: "What is the sum of angles in a triangle?",
                                options: [
                                    "90 degrees",
                                    "180 degrees",
                                    "270 degrees",
                                    "360 degrees"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the Pythagorean theorem?",
                                options: [
                                    "a² + b² = c²",
                                    "a + b = c",
                                    "a × b = c",
                                    "a/b = c"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What type of triangle has all sides equal?",
                                options: [
                                    "Isosceles",
                                    "Scalene",
                                    "Equilateral",
                                    "Right"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What is the area of a triangle with base 6 and height 4?",
                                options: [
                                    "10",
                                    "12",
                                    "24",
                                    "48"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the third angle in a triangle with angles 45° and 45°?",
                                options: [
                                    "45°",
                                    "60°",
                                    "90°",
                                    "180°"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    }
                }
            },
            "Calculus": {
                topics: {
                    "Differentiation": {
                        questions: [
                            {
                                question: "What is the derivative of x²?",
                                options: [
                                    "x",
                                    "2x",
                                    "x³",
                                    "2x²"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the derivative of sin(x)?",
                                options: [
                                    "cos(x)",
                                    "-cos(x)",
                                    "tan(x)",
                                    "-sin(x)"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What is the chain rule used for?",
                                options: [
                                    "Adding functions",
                                    "Multiplying functions",
                                    "Differentiating composite functions",
                                    "Integrating functions"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What is the derivative of e^x?",
                                options: [
                                    "e^x",
                                    "x·e^x",
                                    "ln(x)",
                                    "1/x"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What is the derivative of ln(x)?",
                                options: [
                                    "1/x",
                                    "x",
                                    "e^x",
                                    "1/e^x"
                                ],
                                correctAnswer: 0
                            }
                        ]
                    },
                    "Integration": {
                        questions: [
                            {
                                question: "What is the integral of 2x?",
                                options: [
                                    "x²",
                                    "2x²",
                                    "x² + C",
                                    "2x² + C"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What is the integral of cos(x)?",
                                options: [
                                    "sin(x) + C",
                                    "-sin(x) + C",
                                    "tan(x) + C",
                                    "-cos(x) + C"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What is integration by parts used for?",
                                options: [
                                    "Adding functions",
                                    "Multiplying functions",
                                    "Integrating products of functions",
                                    "Differentiating functions"
                                ],
                                correctAnswer: 2
                            },
                            {
                                question: "What is the integral of 1/x?",
                                options: [
                                    "x + C",
                                    "ln|x| + C",
                                    "1/x² + C",
                                    "x² + C"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the integral of e^x?",
                                options: [
                                    "e^x + C",
                                    "x·e^x + C",
                                    "ln(x) + C",
                                    "1/x + C"
                                ],
                                correctAnswer: 0
                            }
                        ]
                    }
                }
            }
        }
    },
    literature: {
        chapters: {
            "Poetry": {
                topics: {
                    "Figures of Speech": {
                        questions: [
                            {
                                question: "What is a simile?",
                                options: [
                                    "Direct comparison using 'like' or 'as'",
                                    "Giving human traits to non-human things",
                                    "Exaggeration for effect",
                                    "Repeating consonant sounds"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What is personification?",
                                options: [
                                    "Comparing two things",
                                    "Giving human traits to non-human things",
                                    "Repeating vowel sounds",
                                    "Using words that sound like their meaning"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is alliteration?",
                                options: [
                                    "Repeating vowel sounds",
                                    "Repeating consonant sounds",
                                    "Comparing two things",
                                    "Exaggeration"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is a metaphor?",
                                options: [
                                    "Direct comparison without 'like' or 'as'",
                                    "Repeating sounds",
                                    "Exaggeration",
                                    "Giving human traits"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What is hyperbole?",
                                options: [
                                    "Understatement",
                                    "Exaggeration",
                                    "Comparison",
                                    "Sound repetition"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            },
            "Prose": {
                topics: {
                    "Literary Devices": {
                        questions: [
                            {
                                question: "What is foreshadowing?",
                                options: [
                                    "Looking back at past events",
                                    "Hints about future events",
                                    "Describing characters",
                                    "Setting the scene"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is a protagonist?",
                                options: [
                                    "Main character",
                                    "Villain",
                                    "Supporting character",
                                    "Narrator"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What is setting in literature?",
                                options: [
                                    "Time and place of the story",
                                    "Main character",
                                    "Plot twist",
                                    "Theme"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "What is theme in literature?",
                                options: [
                                    "Main character",
                                    "Central idea or message",
                                    "Time period",
                                    "Writing style"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is a plot?",
                                options: [
                                    "Main character",
                                    "Sequence of events",
                                    "Writing style",
                                    "Time period"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            },
            "Drama": {
                topics: {
                    "Shakespeare": {
                        questions: [
                            {
                                question: "Which is NOT a Shakespearean tragedy?",
                                options: [
                                    "Hamlet",
                                    "Macbeth",
                                    "Romeo and Juliet",
                                    "A Midsummer Night's Dream"
                                ],
                                correctAnswer: 3
                            },
                            {
                                question: "What is the famous quote from Hamlet?",
                                options: [
                                    "To be or not to be",
                                    "All the world's a stage",
                                    "Romeo, Romeo, wherefore art thou Romeo",
                                    "Fair is foul, and foul is fair"
                                ],
                                correctAnswer: 0
                            },
                            {
                                question: "Which play features the character Iago?",
                                options: [
                                    "Macbeth",
                                    "Othello",
                                    "King Lear",
                                    "The Tempest"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the setting of 'A Midsummer Night's Dream'?",
                                options: [
                                    "Venice",
                                    "Athens",
                                    "Rome",
                                    "London"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Which character says 'Out, damned spot!'?",
                                options: [
                                    "Lady Macbeth",
                                    "Ophelia",
                                    "Desdemona",
                                    "Portia"
                                ],
                                correctAnswer: 0
                            }
                        ]
                    },
                    "Modern Drama": {
                        questions: [
                            {
                                question: "Who wrote 'Death of a Salesman'?",
                                options: [
                                    "Tennessee Williams",
                                    "Arthur Miller",
                                    "Eugene O'Neill",
                                    "Samuel Beckett"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the main theme of 'Waiting for Godot'?",
                                options: [
                                    "Love and romance",
                                    "Existentialism",
                                    "Social class",
                                    "War and peace"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Which play features the character Blanche DuBois?",
                                options: [
                                    "The Glass Menagerie",
                                    "A Streetcar Named Desire",
                                    "Long Day's Journey Into Night",
                                    "The Crucible"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "Who wrote 'The Importance of Being Earnest'?",
                                options: [
                                    "George Bernard Shaw",
                                    "Oscar Wilde",
                                    "Henrik Ibsen",
                                    "Anton Chekhov"
                                ],
                                correctAnswer: 1
                            },
                            {
                                question: "What is the main theme of 'A Doll's House'?",
                                options: [
                                    "Gender roles",
                                    "War",
                                    "Religion",
                                    "Class struggle"
                                ],
                                correctAnswer: 0
                            }
                        ]
                    }
                }
            }
        }
    }
};

// DOM Elements
const subjectCards = document.querySelectorAll('.subject-card');
const chaptersModal = document.getElementById('chapters-modal');
const topicsModal = document.getElementById('topics-modal');
const quizModal = document.getElementById('quiz-modal');
const resultsModal = document.getElementById('results-modal');
const closeButtons = document.querySelectorAll('.close');

// Current state
let currentSubject = '';
let currentChapter = '';
let currentTopic = '';
let userAnswers = [];

// Event Listeners
subjectCards.forEach(card => {
    card.addEventListener('click', () => {
        currentSubject = card.dataset.subject;
        showChapters(currentSubject);
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        chaptersModal.style.display = 'none';
        topicsModal.style.display = 'none';
        quizModal.style.display = 'none';
        resultsModal.style.display = 'none';
    });
});

// Functions
function showChapters(subject) {
    const chaptersList = document.getElementById('chapters-list');
    chaptersList.innerHTML = '';
    
    const chapters = Object.keys(quizData[subject].chapters);
    chapters.forEach(chapter => {
        const chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item';
        chapterItem.textContent = chapter;
        chapterItem.addEventListener('click', () => {
            currentChapter = chapter;
            showTopics(subject, chapter);
        });
        chaptersList.appendChild(chapterItem);
    });
    
    chaptersModal.style.display = 'block';
}

function showTopics(subject, chapter) {
    const topicsList = document.getElementById('topics-list');
    topicsList.innerHTML = '';
    
    const topics = Object.keys(quizData[subject].chapters[chapter].topics);
    topics.forEach(topic => {
        const topicItem = document.createElement('div');
        topicItem.className = 'topic-item';
        topicItem.textContent = topic;
        topicItem.addEventListener('click', () => {
            currentTopic = topic;
            showQuiz(subject, chapter, topic);
        });
        topicsList.appendChild(topicItem);
    });
    
    chaptersModal.style.display = 'none';
    topicsModal.style.display = 'block';
}

function showQuiz(subject, chapter, topic) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    
    const questions = quizData[subject].chapters[chapter].topics[topic].questions;
    userAnswers = new Array(questions.length).fill(null);
    
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'quiz-question';
        
        const questionText = document.createElement('h3');
        questionText.textContent = `${index + 1}. ${question.question}`;
        questionElement.appendChild(questionText);
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'quiz-options';
        
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => {
                // Remove selected class from all options in this question
                optionsContainer.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                // Add selected class to clicked option
                optionElement.classList.add('selected');
                userAnswers[index] = optionIndex;
            });
            optionsContainer.appendChild(optionElement);
        });
        
        questionElement.appendChild(optionsContainer);
        quizContainer.appendChild(questionElement);
    });
    
    topicsModal.style.display = 'none';
    quizModal.style.display = 'block';
}

document.getElementById('submit-quiz').addEventListener('click', () => {
    const subject = currentSubject;
    const chapter = currentChapter;
    const topic = currentTopic;
    const questions = quizData[subject].chapters[chapter].topics[topic].questions;
    
    let correctAnswers = 0;
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    
    questions.forEach((question, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        if (userAnswers[index] === question.correctAnswer) {
            resultItem.classList.add('correct');
            resultItem.textContent = `Question ${index + 1}: Correct!`;
            correctAnswers++;
        } else {
            resultItem.classList.add('incorrect');
            resultItem.textContent = `Question ${index + 1}: Incorrect. The correct answer was: ${question.options[question.correctAnswer]}`;
        }
        
        resultsContainer.appendChild(resultItem);
    });
    
    const scoreElement = document.createElement('div');
    scoreElement.className = 'score';
    scoreElement.textContent = `Your Score: ${correctAnswers}/${questions.length}`;
    resultsContainer.insertBefore(scoreElement, resultsContainer.firstChild);
    
    quizModal.style.display = 'none';
    resultsModal.style.display = 'block';
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});