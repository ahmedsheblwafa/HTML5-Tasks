const ctx = myCanv.getContext("2d");

let clciked = false;
let brushSize = 5;
range.onchange = e => {
  brushSize = e.target.value;
};

let startpoint = {
  x: 0,
  y: 0
};

myCanv.onmousedown = e => {
  clciked = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  startpoint = {
    x: e.offsetX,
    y: e.offsetY
  };
};

const draw = () => {
  myCanv.onmousemove = e => {
    if (clciked) {
      ctx.lineWidth = brushSize;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  };
  myCanv.onmouseup = e => {
    clciked = false;
  };
};

const drawLine = () => {
  myCanv.onmouseup = e => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineWidth = brushSize;
    ctx.stroke();
    clciked = false;
  };
  myCanv.onmousemove = "";
};
const drawRect = () => {
  myCanv.onmouseup = e => {
    ctx.rect(
      startpoint.x,
      startpoint.y,
      e.offsetX - startpoint.x,
      e.offsetY - startpoint.y
    );
    ctx.lineWidth = brushSize;
    ctx.stroke();
    clciked = false;
  };
  myCanv.onmousemove = "";
};

const erase = () => {
  myCanv.onmousemove = e => {
    if (clciked) {
      ctx.clearRect(e.offsetX, e.offsetY, brushSize, brushSize);
    }
  };
  myCanv.onmouseup = e => {
    clciked = false;
  };
};

const eraseAll = () => {
  ctx.clearRect(0, 0, myCanv.width, myCanv.height);
};

// *********************************
// add listeners to buttons
// *********************************
drawbutton.onclick = draw;

linebutton.onclick = drawLine;

erasebutton.onclick = erase;

eraseallbutton.onclick = eraseAll;

rectbutton.onclick = drawRect;
