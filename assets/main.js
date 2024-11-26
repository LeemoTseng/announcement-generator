
// INDEX
// $1. resizer
// $2. posterReview







// $1. resizer
const resizer = document.querySelector('#dragTrigger');
const topPanel = document.querySelector('#topPanel');
const posterReview = document.querySelector('.posterReview');
const dragableContainer = document.querySelector('#dragableContainer');

let isDragging = false;

const smoothHeightChange = (currentHeight, targetHeight, speed = 0.1) => {
  return currentHeight + (targetHeight - currentHeight) * speed;
};


resizer.addEventListener('mousedown', () => {
  isDragging = true;
});


document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    e.preventDefault();
    const containerRect = dragableContainer.getBoundingClientRect();
    const newHeight = e.clientY - containerRect.top;


    const minHeight = 100;
    const maxHeight = containerRect.height - 100;
    const adjustedHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));


    topPanel.style.flex = `0 0 ${adjustedHeight}px`;
    posterReview.style.height = `${adjustedHeight}px`;
  }
});


document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    document.body.style.cursor = 'default';
  }
});


