export const copyToClipboard = (e, color) => {
  var textArea = document.createElement("textarea");
  textArea.value = color;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
  e.target.classList.add("open");
  setInterval(() => {
    e.target.classList.remove("open");
  }, 2000);
};

export const compareColors = (colors, saved) => {
  for (let color of Object.values(colors)) {
    for (let savedColor of Object.values(saved)) {
      if (color.id === savedColor.id) {
        color.saved = true;
      }
    }
  }
  return colors;
};
