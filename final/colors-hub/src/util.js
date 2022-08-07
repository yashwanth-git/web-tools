const copyToClipboard = (e, color) => {
  console.log(color);
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

export default copyToClipboard;
