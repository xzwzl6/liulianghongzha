window.addEventListener('load', function() {
  // 获取 canvas 元素和上下文
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');

  // 获取和初始化控制元素
  var brushSizeInput = document.querySelector('#brush-size');
  var colorPicker = document.querySelector('#color-picker');
  var saveButton = document.querySelector('#save-btn');

  brushSizeInput.addEventListener('change', function() {
    ctx.lineWidth = this.value;
  });

  colorPicker.addEventListener('change', function() {
    ctx.strokeStyle = this.value;
  });

  saveButton.addEventListener('click', function() {
    var imgURL = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = imgURL;
    link.click();
  });

  // 设置画笔的颜色和宽度
  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = brushSizeInput.value;

  // 监听画布事件
  var isDrawing = false;
  var lastX, lastY;

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('touchstart', startDrawing);

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('touchmove', draw);

  window.addEventListener('mouseup', stopDrawing);
  window.addEventListener('touchend', stopDrawing);

  function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getCoords(e);
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    var [x, y] = getCoords(e);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function getCoords(event) {
    if (event.touches && event.touches.length === 1) {
      var touch = event.touches[0];
      return [touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop];
    } else {
      return [event.offsetX, event.offsetY];
    }
  }
});
