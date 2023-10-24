const html = document.documentElement;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const imagesQty = 512;
const FPS = 24;
let currentFrameIndex = 1;

const currentFrame = index => (
  `/img/test-by-alexrayo_${index.toString().padStart(5, '0')}.webp`
);

const preloadImages = () => {
  for (let i = 1; i <= imagesQty; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(currentFrameIndex);
canvas.width = 1280;
canvas.height = 720;
img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = () => {
  if (html.scrollTop < 0 || currentFrameIndex > imagesQty) {
    return;
  }
  console.log(currentFrameIndex)
  const newFrameIndex = Math.floor(html.scrollTop / FPS) + 1;
  if (newFrameIndex !== currentFrameIndex) {
    currentFrameIndex = newFrameIndex;
    if (currentFrameIndex > imagesQty) {
      currentFrameIndex = imagesQty; // avoid loading more images
    }
    img.src = currentFrame(currentFrameIndex);
    context.drawImage(img, 0, 0);
  }
};

window.addEventListener('scroll', updateImage);
preloadImages();
