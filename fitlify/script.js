// const popup = document.getElementById("routine-popup");
// const closeBtn = document.getElementById("close-popup");

// function openPopup() {
//   popup.style.display = "flex";
// }


// closeBtn.addEventListener('click', () => {
//   popup.style.display = "none";
// });


// document.getElementById("routine-form").addEventListener("submit", function(e) {
//   e.preventDefault();
//   const level = document.getElementById("level").value;
//   const muscleGroups = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
//   console.log("Selected Level:", level);
//   console.log("Muscle Groups:", muscleGroups);
//   popup.style.display = "none";
// });

// Workout Database
const workoutDatabase = {
  chest: {
    beginner: [
      { name: "Push-ups", sets: "3 sets of 8-10 reps" },
      { name: "Incline Push-ups", sets: "3 sets of 10 reps" },
      { name: "Chest Dips", sets: "2 sets of 6-8 reps" }
    ],
    intermediate: [
      { name: "Barbell Bench Press", sets: "4 sets of 8-10 reps" },
      { name: "Dumbbell Flyes", sets: "3 sets of 10-12 reps" },
      { name: "Push-ups", sets: "3 sets of 15 reps" }
    ],
    advanced: [
      { name: "Barbell Bench Press", sets: "5 sets of 5 reps" },
      { name: "Weighted Dips", sets: "4 sets of 8-10 reps" },
      { name: "Cable Crossovers", sets: "4 sets of 12 reps" }
    ]
  },
  back: {
    beginner: [
      { name: "Assisted Pull-ups", sets: "3 sets of 6-8 reps" },
      { name: "Dumbbell Rows", sets: "3 sets of 10 reps" },
      { name: "Lat Pulldowns", sets: "3 sets of 10 reps" }
    ],
    intermediate: [
      { name: "Pull-ups", sets: "4 sets of 8-10 reps" },
      { name: "Barbell Rows", sets: "4 sets of 8-10 reps" },
      { name: "Face Pulls", sets: "3 sets of 12 reps" }
    ],
    advanced: [
      { name: "Weighted Pull-ups", sets: "5 sets of 6-8 reps" },
      { name: "Deadlifts", sets: "4 sets of 5 reps" },
      { name: "T-Bar Rows", sets: "4 sets of 10 reps" }
    ]
  },
  legs: {
    beginner: [
      { name: "Bodyweight Squats", sets: "3 sets of 12 reps" },
      { name: "Lunges", sets: "3 sets of 10 reps per leg" },
      { name: "Leg Press", sets: "3 sets of 12 reps" }
    ],
    intermediate: [
      { name: "Barbell Squats", sets: "4 sets of 8-10 reps" },
      { name: "Romanian Deadlifts", sets: "3 sets of 10 reps" },
      { name: "Leg Curls", sets: "3 sets of 12 reps" }
    ],
    advanced: [
      { name: "Back Squats", sets: "5 sets of 5 reps" },
      { name: "Front Squats", sets: "4 sets of 6-8 reps" },
      { name: "Bulgarian Split Squats", sets: "4 sets of 10 reps" }
    ]
  },
  arms: {
    beginner: [
      { name: "Dumbbell Curls", sets: "3 sets of 10 reps" },
      { name: "Tricep Dips", sets: "3 sets of 8 reps" },
      { name: "Hammer Curls", sets: "3 sets of 10 reps" }
    ],
    intermediate: [
      { name: "Barbell Curls", sets: "4 sets of 8-10 reps" },
      { name: "Skull Crushers", sets: "3 sets of 10 reps" },
      { name: "Preacher Curls", sets: "3 sets of 12 reps" }
    ],
    advanced: [
      { name: "Weighted Chin-ups", sets: "4 sets of 8 reps" },
      { name: "Close-Grip Bench", sets: "4 sets of 6-8 reps" },
      { name: "Cable Curls", sets: "4 sets of 12 reps" }
    ]
  },
  core: {
    beginner: [
      { name: "Planks", sets: "3 sets of 30 seconds" },
      { name: "Crunches", sets: "3 sets of 15 reps" },
      { name: "Bird Dogs", sets: "3 sets of 10 per side" }
    ],
    intermediate: [
      { name: "Hanging Leg Raises", sets: "3 sets of 10 reps" },
      { name: "Russian Twists", sets: "3 sets of 20 reps" },
      { name: "Planks", sets: "3 sets of 60 seconds" }
    ],
    advanced: [
      { name: "Weighted Ab Rollouts", sets: "4 sets of 12 reps" },
      { name: "Dragon Flags", sets: "3 sets of 8 reps" },
      { name: "Weighted Planks", sets: "3 sets of 90 seconds" }
    ]
  },
  shoulders: {
    beginner: [
      { name: "Dumbbell Shoulder Press", sets: "3 sets of 10 reps" },
      { name: "Lateral Raises", sets: "3 sets of 12 reps" },
      { name: "Front Raises", sets: "3 sets of 10 reps" }
    ],
    intermediate: [
      { name: "Military Press", sets: "4 sets of 8 reps" },
      { name: "Arnold Press", sets: "3 sets of 10 reps" },
      { name: "Face Pulls", sets: "3 sets of 15 reps" }
    ],
    advanced: [
      { name: "Push Press", sets: "5 sets of 5 reps" },
      { name: "Handstand Push-ups", sets: "4 sets of 8 reps" },
      { name: "Cable Lateral Raises", sets: "4 sets of 12 reps" }
    ]
  }
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  const routineForm = document.getElementById('routine-form');
  
  // Only add event listener if form exists (on get-started page)
  if (routineForm) {
    routineForm.addEventListener('submit', generateRoutine);
  }
});

// Generate workout routine
function generateRoutine(e) {
  e.preventDefault();
  
  const level = document.getElementById('level').value;
  const muscleGroups = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(cb => cb.value);

  if (muscleGroups.length === 0) {
    alert('Please select at least one muscle group!');
    return;
  }

  const routineDisplay = document.getElementById('routine-display');
  routineDisplay.innerHTML = '<h3>Your Personalized Routine</h3>';

  muscleGroups.forEach(group => {
    const exercises = workoutDatabase[group][level];
    const groupDiv = document.createElement('div');
    groupDiv.className = 'muscle-group';
    groupDiv.innerHTML = `<h4>${group}</h4>`;
    
    exercises.forEach(exercise => {
      const exerciseDiv = document.createElement('div');
      exerciseDiv.className = 'exercise-item';
      exerciseDiv.innerHTML = `
        <h4>${exercise.name}</h4>
        <p>${exercise.sets}</p>
      `;
      groupDiv.appendChild(exerciseDiv);
    });
    
    routineDisplay.appendChild(groupDiv);
  });

  routineDisplay.style.display = 'block';
  routineDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Smooth scroll to top (for logo click)
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Make logo clickable to scroll to top on index page
document.addEventListener('DOMContentLoaded', function() {
  const logo = document.querySelector('.logo');
  if (logo && window.location.pathname.includes('index.html')) {
    logo.addEventListener('click', scrollToTop);
  }
});