const filterButtons = document.querySelectorAll("[data-curricular-filter]");
const programCards = document.querySelectorAll("[data-curricular-level]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");

const applyCurricularFilter = level => {
  programCards.forEach(card => {
    card.hidden = level !== "all" && card.dataset.curricularLevel !== level;
  });
};

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    applyCurricularFilter(button.dataset.curricularFilter);
  });
});

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation?.classList.toggle("is-open", !open);
});

navigation?.addEventListener("click", event => {
  if (event.target.closest("a")) {
    menuButton?.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});
