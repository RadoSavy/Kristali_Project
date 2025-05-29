document.getElementById('learnMore').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
  
  const options = document.querySelectorAll('.option');
  const feedback = document.getElementById('feedback');
  
  options.forEach(option => {
    option.addEventListener('click', () => {
      const correct = "Кварц";
      if (option.textContent === correct) {
        feedback.textContent = "✅ Вярно! Това е кварц.";
        feedback.style.color = "green";
      } else {
        feedback.textContent = "❌ Грешно. Опитай отново!";
        feedback.style.color = "red";
      }
    });
  });
  
  // Simple fade-in animation when scrolling
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  });
  
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });
  