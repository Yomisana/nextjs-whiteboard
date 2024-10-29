function filename() {
  // get date and time for the file name
  const date = new Date();
  const dateString = date.toISOString().slice(0, 10);
  const timeString = date.toLocaleTimeString();
  return `whiteboard-${dateString}-${timeString}.png`;
}

function dev() {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }
  return false;
}

// save board as image
function saveBoard(canvas) {
  if (canvas) {
    const link = document.createElement("a");
    link.download = `${filename()}`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
}

function cleanBoard(canvas) {
  if (canvas) {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

const Boardfunction = { saveBoard, cleanBoard };

export { filename, dev, Boardfunction };
