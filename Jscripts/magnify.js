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
  glass.className = "img-magnifier-glass";

  // Style the lens
  Object.assign(glass.style, {
    position: "absolute",
    border: "1px solid #ff0000ff",
    borderRadius: "8px",
    cursor: "none",
    width: "250px",
    height: "150px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    pointerEvents: "none",
    zIndex: "9999"
  });

  // Append to body instead of before the image
  document.body.appendChild(glass);

  const rect = img.getBoundingClientRect();
  glass.style.backgroundImage = `url('${img.src}')`;
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;

  function getCursorPos(e) {
    e = e || window.event;
    const rect = img.getBoundingClientRect();
    const x = e.pageX - rect.left - window.pageXOffset;
    const y = e.pageY - rect.top - window.pageYOffset;
    return { x, y };
  }

  function moveMagnifier(e) {
    if (!magnifierActive) return;
    e.preventDefault();

    const rect = img.getBoundingClientRect();
    const pos = getCursorPos(e);
    const x = pos.x;
    const y = pos.y;

    glass.style.left = `${rect.left + window.pageXOffset + x - glass.offsetWidth / 2}px`;
    glass.style.top  = `${rect.top  + window.pageYOffset + y - glass.offsetHeight / 2}px`;

    glass.style.backgroundPosition =
      `-${x * zoom - glass.offsetWidth / 2}px -${y * zoom - glass.offsetHeight / 2}px`;
  }

  img.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier, { passive: false });
}
