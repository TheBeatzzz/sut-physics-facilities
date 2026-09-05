const filterButtons = document.querySelectorAll("[data-curricular-filter]");
const programCards = document.querySelectorAll("[data-curricular-level]");
const dialogOpeners = document.querySelectorAll("[data-curricular-dialog-open]");
const dialogClosers = document.querySelectorAll("[data-curricular-dialog-close]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
let activeDialog = null;
let lastDialogOpener = null;
const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

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

const openDialog = (dialogId, opener) => {
  const dialog = document.getElementById(dialogId);
  const panel = dialog?.querySelector(".curricular-modal-panel");
  if (!dialog || !panel) return;
  lastDialogOpener = opener;
  activeDialog = dialog;
  dialog.hidden = false;
  document.body.classList.add("has-curricular-modal");
  window.SUTI18n?.apply?.();
  panel.focus();
};

const closeDialog = () => {
  if (!activeDialog) return;
  activeDialog.hidden = true;
  document.body.classList.remove("has-curricular-modal");
  const opener = lastDialogOpener;
  activeDialog = null;
  lastDialogOpener = null;
  opener?.focus?.();
};

const trapDialogFocus = event => {
  if (!activeDialog || event.key !== "Tab") return;
  const focusableItems = [...activeDialog.querySelectorAll(focusableSelector)].filter(element => element.offsetParent !== null);
  if (!focusableItems.length) return;
  const firstItem = focusableItems[0];
  const lastItem = focusableItems[focusableItems.length - 1];

  if (event.shiftKey && document.activeElement === firstItem) {
    event.preventDefault();
    lastItem.focus();
  } else if (!event.shiftKey && document.activeElement === lastItem) {
    event.preventDefault();
    firstItem.focus();
  }
};

dialogOpeners.forEach(opener => {
  opener.addEventListener("click", () => openDialog(opener.dataset.curricularDialogOpen, opener));
  opener.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openDialog(opener.dataset.curricularDialogOpen, opener);
  });
});

dialogClosers.forEach(closer => {
  closer.addEventListener("click", closeDialog);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeDialog();
  trapDialogFocus(event);
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
