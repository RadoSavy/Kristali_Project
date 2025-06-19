document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true
    });

    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeToggleBtn.querySelector('i');
    const currentTheme = localStorage.getItem('theme');

    // Set initial theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    // Theme toggle button click event
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem('theme', 'light');
        }
    });

    // Scroll to top button functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Crystal modal functionality
    const viewButtons = document.querySelectorAll('.view-crystal-btn');
    const modal = new bootstrap.Modal(document.getElementById('crystalModal'));
    const modalTitle = document.getElementById('crystalModalLabel');
    const modalImg = document.getElementById('crystalModalImg');
    const modalDesc = document.getElementById('crystalModalDesc');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const imgSrc = this.getAttribute('data-img');
            const desc = this.getAttribute('data-desc');

            modalTitle.textContent = title;
            modalImg.src = imgSrc;
            modalImg.alt = title;
            modalDesc.textContent = desc;

            modal.show();
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect to all buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Quiz functionality
    const quizData = [
        {
            question: "Какъв е твоят любим цвят?",
            answers: [
                { text: "Прозрачен/Бял", type: "quartz" },
                { text: "Лилав", type: "amethyst" },
                { text: "Жълт/Златист", type: "citrine" },
            ],
        },
        {
            question: "Какво те кара да се чувстваш най-добре?",
            answers: [
                { text: "Спокойствие и яснота", type: "quartz" },
                { text: "Духовност и защита", type: "amethyst" },
                { text: "Позитивна енергия и увереност", type: "citrine" },
            ],
        },
        {
            question: "Коя характеристика ти е най-важна?",
            answers: [
                { text: "Чистота", type: "quartz" },
                { text: "Интуиция", type: "amethyst" },
                { text: "Радост", type: "citrine" },
            ],
        },
    ];

    // Create quiz section
    function createQuizSection() {
        const quizSection = document.createElement('section');
        quizSection.id = 'quizSection';
        quizSection.className = 'section-padding bg-light';
        quizSection.innerHTML = `
            <div class="container">
                <h2 class="text-center text-crystal mb-4">Кой кристал си ти?</h2>
                <div id="quizContent" class="mb-3"></div>
                <div class="text-center">
                    <button id="nextBtn" class="btn btn-crystal">Следващ въпрос</button>
                </div>
            </div>
        `;
        
        document.body.insertBefore(quizSection, document.querySelector('#gallery'));
        
        startQuiz();
    }

    function startQuiz() {
        let currentQuestion = 0;
        const answersCount = { quartz: 0, amethyst: 0, citrine: 0 };
        const quizContent = document.getElementById('quizContent');
        const nextBtn = document.getElementById('nextBtn');

        function showQuestion() {
            const q = quizData[currentQuestion];
            let html = `<h4 class="mb-3">${q.question}</h4><div class="quiz-answers">`;
            
            q.answers.forEach((answer, i) => {
                html += `
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="radio" name="answer" id="answer${i}" value="${answer.type}">
                        <label class="form-check-label" for="answer${i}">${answer.text}</label>
                    </div>
                `;
            });
            
            html += '</div>';
            quizContent.innerHTML = html;
        }

        showQuestion();

        nextBtn.addEventListener('click', function() {
            const selected = document.querySelector('input[name="answer"]:checked');
            
            if (!selected) {
                alert('Моля, изберете отговор, за да продължите.');
                return;
            }
            
            answersCount[selected.value]++;
            currentQuestion++;
            
            if (currentQuestion < quizData.length) {
                showQuestion();
            } else {
                showResult();
                nextBtn.style.display = 'none';
            }
        });

        function showResult() {
            const maxAnswer = Object.keys(answersCount).reduce((a, b) => 
                answersCount[a] > answersCount[b] ? a : b
            );

            const resultDescriptions = {
                quartz: "Ти си Кварц! Чист и прозрачен, стабилен и балансиращ.",
                amethyst: "Ти си Аметист! Духовен, защитен и интуитивен.",
                citrine: "Ти си Цитрин! Позитивен, жизнен и пълен с енергия."
            };

            const resultImages = {
                quartz: "Images/Amethyst.webp",
                amethyst: "Images/IMAGE_1424682_40_0.jpg",
                citrine: "Images/Quartz_var._citrine_(quartz_jaune_du_Brésil).jpg"
            };

            quizContent.innerHTML = `
                <div class="quiz-result text-center">
                    <h3 class="mb-4">Резултатът ти:</h3>
                    <img src="${resultImages[maxAnswer]}" class="img-fluid rounded mb-4" style="max-height: 200px;" alt="Резултат">
                    <p class="lead">${resultDescriptions[maxAnswer]}</p>
                    <button id="closeQuiz" class="btn btn-crystal mt-3">Затвори теста</button>
                </div>
            `;

            document.getElementById('closeQuiz').addEventListener('click', function() {
                document.getElementById('quizSection').remove();
                createQuizButton();
            });
        }
    }

    function createQuizButton() {
        const quizButton = document.createElement('button');
        quizButton.id = 'startQuizBtn';
        quizButton.className = 'btn btn-crystal d-block mx-auto my-4';
        quizButton.textContent = 'Кой кристал съм аз?';
        
        document.querySelector('main').prepend(quizButton);
        
        quizButton.addEventListener('click', function() {
            this.remove();
            createQuizSection();
        });
    }

    // Initialize quiz button
    createQuizButton();
});
