const buttons = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.target).classList.add("active");
  });
});