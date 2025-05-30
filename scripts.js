document.addEventListener('DOMContentLoaded', () => {
    // Модален прозорец за кристалите (от предния пример)
    const viewButtons = document.querySelectorAll('.view-crystal-btn');
    const modal = new bootstrap.Modal(document.getElementById('crystalModal'));
    const modalTitle = document.getElementById('crystalModalLabel');
    const modalImg = document.getElementById('crystalModalImg');
    const modalDesc = document.getElementById('crystalModalDesc');
  
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const title = button.getAttribute('data-title');
        const imgSrc = button.getAttribute('data-img');
        const desc = button.getAttribute('data-desc');
  
        modalTitle.textContent = title;
        modalImg.src = imgSrc;
        modalImg.alt = title;
        modalDesc.textContent = desc;
  
        modal.show();
      });
    });
  
    // Scroll to top button
    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.style.display = 'block';
      } else {
        scrollBtn.style.display = 'none';
      }
    });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // Simple fade-in animation on scroll for elements with .fade-in class
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.1 };
    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
      });
    }, appearOptions);
  
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  
    // Theme switcher: dark / light mode
    const themeSwitcher = document.createElement('button');
    themeSwitcher.textContent = '🌙';
    themeSwitcher.id = 'themeSwitcher';
    themeSwitcher.title = 'Смени тема';
    themeSwitcher.style.position = 'fixed';
    themeSwitcher.style.bottom = '20px';
    themeSwitcher.style.right = '20px';
    themeSwitcher.style.padding = '10px 15px';
    themeSwitcher.style.fontSize = '20px';
    themeSwitcher.style.border = 'none';
    themeSwitcher.style.borderRadius = '50%';
    themeSwitcher.style.cursor = 'pointer';
    themeSwitcher.style.zIndex = '1050';
    document.body.appendChild(themeSwitcher);
  
    const darkClass = 'dark-mode';
  
    themeSwitcher.addEventListener('click', () => {
      document.body.classList.toggle(darkClass);
      themeSwitcher.textContent = document.body.classList.contains(darkClass) ? '☀️' : '🌙';
    });
  
    // Crystal gallery filter (by type)
    // Добави в HTML: филтър бутоните (примерно преди галерията):
    /*
    <div id="filterButtons" class="text-center mb-4">
      <button class="btn btn-outline-crystal active" data-filter="all">Всички</button>
      <button class="btn btn-outline-crystal" data-filter="quartz">Кварц</button>
      <button class="btn btn-outline-crystal" data-filter="amethyst">Аметист</button>
      <button class="btn btn-outline-crystal" data-filter="citrine">Цитрин</button>
    </div>
    */
  
    const filterButtons = document.querySelectorAll('#filterButtons button');
    const crystalCards = document.querySelectorAll('.crystal-card');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active to clicked button
        button.classList.add('active');
  
        const filter = button.getAttribute('data-filter');
        crystalCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else {
            // Cards should have data-type attributes in HTML like data-type="quartz"
            if (card.getAttribute('data-type') === filter) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  
    // Interactive "Which Crystal Are You?" quiz
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
  
    // Функция за показване на теста
    function startQuiz() {
      const quizSection = document.createElement('section');
      quizSection.id = 'quizSection';
      quizSection.classList.add('section-padding', 'bg-light');
      quizSection.innerHTML = `
        <div class="container">
          <h2 class="text-center text-crystal mb-4">Кой кристал си ти?</h2>
          <div id="quizContent" class="mb-3"></div>
          <div class="text-center">
            <button id="nextBtn" class="btn btn-crystal">Следващ въпрос</button>
          </div>
        </div>
      `;
      document.body.appendChild(quizSection);
  
      let currentQuestion = 0;
      const answersCount = { quartz: 0, amethyst: 0, citrine: 0 };
      const quizContent = document.getElementById('quizContent');
      const nextBtn = document.getElementById('nextBtn');
  
      function showQuestion() {
        const q = quizData[currentQuestion];
        let html = `<h4>${q.question}</h4><div>`;
        q.answers.forEach((answer, i) => {
          html += `
            <div class="form-check">
              <input class="form-check-input" type="radio" name="answer" id="answer${i}" value="${answer.type}">
              <label class="form-check-label" for="answer${i}">${answer.text}</label>
            </div>
          `;
        });
        html += '</div>';
        quizContent.innerHTML = html;
      }
  
      showQuestion();
  
      nextBtn.addEventListener('click', () => {
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

      document.addEventListener('DOMContentLoaded', () => {
        // Theme toggle button
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        themeToggleBtn.addEventListener('click', () => {
          document.body.classList.toggle('gray-theme');
        });
  
        // Scroll to top button show/hide and functionality
        const scrollBtn = document.getElementById('scrollTopBtn');
        window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
          } else {
            scrollBtn.style.display = 'none';
          }
        });
        scrollBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
  
        // Modal functionality for viewing crystal details
        const modal = new bootstrap.Modal(document.getElementById('crystalModal'));
        const modalTitle = document.getElementById('crystalModalLabel');
        const modalImg = document.getElementById('crystalModalImg');
        const modalDesc = document.getElementById('crystalModalDesc');
  
        document.querySelectorAll('.view-crystal-btn').forEach(button => {
          button.addEventListener('click', () => {
            modalTitle.textContent = button.dataset.title;
            modalImg.src = button.dataset.img;
            modalImg.alt = button.dataset.title;
            modalDesc.textContent = button.dataset.desc;
            modal.show();
          });
        });
      });
  
      function showResult() {
        // Find max
        const maxAnswer = Object.keys(answersCount).reduce((a, b) => (answersCount[a] > answersCount[b] ? a : b));
  
        const resultDescriptions = {
          quartz: "Ти си Кварц! Чист и прозрачен, стабилен и балансиращ.",
          amethyst: "Ти си Аметист! Духовен, защитен и интуитивен.",
          citrine: "Ти си Цитрин! Позитивен, жизнен и пълен с енергия.",
        };
  
        quizContent.innerHTML = `
          <h3>Резултатът ти:</h3>
          <p>${resultDescriptions[maxAnswer]}</p>
          <button id="closeQuiz" class="btn btn-outline-crystal mt-3">Затвори теста</button>
        `;
  
        document.getElementById('closeQuiz').addEventListener('click', () => {
          quizSection.remove();
        });
      }
    }
  
    // Добавям бутон за стартиране на теста в началото на страницата
    const quizStartBtn = document.createElement('button');
    quizStartBtn.textContent = 'Кой кристал съм аз?';
    quizStartBtn.classList.add('btn', 'btn-crystal');
    quizStartBtn.style.display = 'block';
    quizStartBtn.style.margin = '30px auto';
    quizStartBtn.style.fontWeight = 'bold';
    document.querySelector('main').prepend(quizStartBtn);
  
    quizStartBtn.addEventListener('click', () => {
      startQuiz();
      quizStartBtn.style.display = 'none';
    });
  
    // Bonus: При hover върху бутоните имаме малка анимация
    const allBtns = document.querySelectorAll('button');
    allBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.05)';
        btn.style.transition = 'transform 0.2s ease';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
      });
    });
  });  