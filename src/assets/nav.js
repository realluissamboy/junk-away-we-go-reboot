(function () {
  var toggle = document.getElementById("menu-toggle");
  if (!toggle) return;
  var menu = document.getElementById("mobile-menu");
  var isOpen = false;

  function openMenu() {
    menu.classList.remove("hidden");
    toggle.setAttribute("aria-expanded", "true");
    toggle.querySelector("span").textContent = "close";
    isOpen = true;
  }

  function closeMenu() {
    menu.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector("span").textContent = "menu";
    isOpen = false;
  }

  toggle.addEventListener("click", function () {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) {
      closeMenu();
    }
  });
})();
