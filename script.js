window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loadingmain').style.display = 'none';

    // Now start the counters
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let current = 0;

      const updateCount = () => {
        const increment = target / 100;

        if (current < target) {
          current += increment;
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
    animateProgress();

  }, 2000); // Delay everything after 2s
});



  // let progress = 0;
  const progressBar = document.querySelector('.progress-bars'); // Use the correct class
  const progressText = document.querySelector('.progress-text');
  
  // Update progress function
  function updateProgress() {
    progress += 1;
    const offset = 314 - (progress / 100) * 314;
    progressBar.style.strokeDashoffset = offset;
    progressText.textContent = `${progress}%`;
  
    if (progress < 100) {
      setTimeout(updateProgress, 50); // Update every 50ms for animation effect
    }
  }
  
  // Start progress animation when the page has fully loaded
  window.onload = function() {
    updateProgress();
  };
  window.onload = () => {
    const segments = document.querySelectorAll('.donut-segment');
    segments.forEach((segment, index) => {
      setTimeout(() => {
        segment.style.strokeDashoffset = 0;
      }, index * 300); // Animate each segment with a delay
    });
  };
  

  function setProgress(percent) {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    // Change color based on progress
    if (percent <= 25) {
      circle.style.stroke = 'var(--color-1)';
    } else if (percent <= 50) {
      circle.style.stroke = 'var(--color-2)';
    } else if (percent <= 75) {
      circle.style.stroke = 'var(--color-3)';
    } else {
      circle.style.stroke = 'var(--color-4)';
    }

    document.getElementById('progressText').textContent = `${percent}%`;
  }

  // Example: simulate progress
  let progress = 0;
  const interval = setInterval(() => {
    if (progress <= 100) {
      setProgress(progress);
      progress++;
    } else {
      clearInterval(interval);
    }
  }, 50);

////box sdf//////////
const totalScore = 76; // Target percentage
const segments = 4;
const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#ecf0f1'];
const chart = document.querySelector('.chart-container');
const scoreText = document.getElementById('score');

let currentPercent = 0;
const animationSpeed = 20; // milliseconds between updates

function updateChart(percent) {
  const anglePerSegment = (percent / 100) * 360 / segments;
  let startAngle = 0;
  let gradients = [];

  for (let i = 0; i < segments; i++) {
    let endAngle = startAngle + anglePerSegment;
    gradients.push(`${colors[i]} ${startAngle}deg ${endAngle}deg`);
    startAngle = endAngle;
  }

  // Add remaining angle (to 360°) as gray/dark background
  gradients.push(`#0b1320 ${startAngle}deg 360deg`);

  chart.style.background = `conic-gradient(${gradients.join(', ')})`;
  scoreText.textContent = `${Math.round(percent)}%`;
}

function animateProgress() {
  if (currentPercent < totalScore) {
    currentPercent += 1;
    updateChart(currentPercent);
    setTimeout(animateProgress, animationSpeed);
  } else {
    updateChart(totalScore); // Ensure final state is accurate
  }
}


