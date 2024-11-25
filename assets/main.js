
// $1. resizer
const resizer = document.querySelector('#dragTrigger');
const topPanel = document.querySelector('#topPanel');
const posterReview = document.querySelector('.posterReview');
const dragableContainer = document.querySelector('#dragableContainer');

let isDragging = false;

// 開始拖曳
resizer.addEventListener('mousedown', () => {
  isDragging = true;
});

// 拖曳中
document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const containerRect = dragableContainer.getBoundingClientRect();
    const newHeight = e.clientY - containerRect.top;

    // 限制 topPanel 的最小高度，避免區塊過小或崩潰
    const minHeight = 100; // 最小高度
    const maxHeight = containerRect.height - 100; // 最大高度，避免 bottomPanel 過小
    const adjustedHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

    // 更新 topPanel 高度
    topPanel.style.flex = `0 0 ${adjustedHeight}px`;

    // 更新 posterReview 高度
    posterReview.style.height = `${adjustedHeight}px`;
  }
});

// 停止拖曳
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    document.body.style.cursor = 'default';
  }
});
