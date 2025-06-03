const popup = document.getElementById("routine-popup");
const closeBtn = document.getElementById("close-popup");

function openPopup() {
  popup.style.display = "flex";
}


closeBtn.addEventListener('click', () => {
  popup.style.display = "none";
});


document.getElementById("routine-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const level = document.getElementById("level").value;
  const muscleGroups = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  console.log("Selected Level:", level);
  console.log("Muscle Groups:", muscleGroups);
  popup.style.display = "none";
});