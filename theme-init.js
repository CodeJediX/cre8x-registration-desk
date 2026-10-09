try {
  document.documentElement.dataset.theme = localStorage.getItem("cre8x_theme_v1") === "light" ? "light" : "dark";
} catch (_) {
  document.documentElement.dataset.theme = "dark";
}
