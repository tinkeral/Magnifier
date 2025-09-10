/*
window.addEventListener("load", () => {
  magnify("myimage", 2);
  });
  function magnify(imgID, zoom) {
  const img = document.getElementById(imgID);
  const glass = document.createElement("div");
  glass.setAttribute("class", "img-magnifier-glass");

  // Style the lens
  glass.style.position = "absolute";
  glass.style.border = "1px solid #ff0000ff";
  glass.style.borderRadius = "8px";
  glass.style.cursor = "none";
  glass.style.width = "250px";
  glass.style.height = "150px";
  glass.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  glass.style.pointerEvents = "none";

  // Insert lens
  img.parentElement.insertBefore(glass, img);

  // Set background image and size
  glass.style.backgroundImage = `url('${img.src}')`;
  glass.style.backgroundRepeat = "no-repeat";
  const rect = img.getBoundingClientRect(); // ✅ Define rect here
  glass.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;

  function getCursorPos(e) {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  }

function moveMagnifier(e) {
  e.preventDefault();
  const rect = img.getBoundingClientRect(); // Already here
  const pos = getCursorPos(e);
  const x = pos.x;
  const y = pos.y;

  glass.style.zIndex = "9999";
  glass.style.left = `${x - glass.offsetWidth / 2}px`;
  glass.style.top = `${y - glass.offsetHeight / 2}px`;
  glass.style.backgroundPosition = `-${x * zoom - glass.offsetWidth / 2}px -${y * zoom - glass.offsetHeight / 2}px`;
  glass.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`; // ✅ Already using rect
 }




  // Event listeners
  img.addEventListener("mousemove", moveMagnifier);
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  }
  */
let magnifierActive = false;
let glass = null;
let zoomLevel = 2; // start zoom

const toggleButton = document.getElementById("toggleMagnifier");
const zoomControl = document.getElementById("zoomControl");

toggleButton.addEventListener("click", () => {
  magnifierActive = !magnifierActive;

  if (magnifierActive) {
    activateMagnifier("myimage", zoomLevel);
    toggleButton.textContent = "Disable Magnifier";
    toggleButton.classList.add("glow-active");
  } else {
    if (glass) {
      glass.remove();
      glass = null;
    }
    toggleButton.textContent = "Enable Magnifier";
    toggleButton.classList.remove("glow-active");
  }
});

// Listen for zoom changes
zoomControl.addEventListener("input", (e) => {
  zoomLevel = parseFloat(e.target.value);
  if (magnifierActive) {
    // Re‑activate with new zoom
    if (glass) {
      glass.remove();
      glass = null;
    }
    activateMagnifier("myimage", zoomLevel);
  }
});



function activateMagnifier(imgID, zoom) {
  const img = document.getElementById(imgID);
  glass = document.createElement("div");
  glass.setAttribute("class", "img-magnifier-glass");

  // Style the lens
  glass.style.position = "absolute";
  glass.style.border = "1px solid #ff0000ff";
  glass.style.borderRadius = "8px";
  glass.style.cursor = "none";
  glass.style.width = "250px";
  glass.style.height = "150px";
  glass.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  glass.style.pointerEvents = "none";
  glass.style.zIndex = "9999";

  img.parentElement.insertBefore(glass, img);

  const rect = img.getBoundingClientRect();
  glass.style.backgroundImage = `url('${img.src}')`;
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;

  function getCursorPos(e) {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  }

  function moveMagnifier(e) {
    if (!magnifierActive) return;

    e.preventDefault();
    const rect = img.getBoundingClientRect();
    const pos = getCursorPos(e);
    const x = pos.x;
    const y = pos.y;

    glass.style.left = `${x - glass.offsetWidth / 2}px`;
    glass.style.top = `${y - glass.offsetHeight / 2}px`;
    glass.style.backgroundPosition = `-${x * zoom - glass.offsetWidth / 2}px -${y * zoom - glass.offsetHeight / 2}px`;
    glass.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
  }

  img.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
}
