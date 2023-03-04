let roof = document.getElementById('roof');
let wind = document.getElementById('window');
let wall = document.getElementById('wall');
let pipe = document.getElementById('pipe');

console.log(roof)

let blocks = {
  roof: {
    elem: roof,
    init: [0, 0, 180],
    zindex: 3,
    rotate: 0,
  },
  wind: {
    elem: wind,
    init: [0, 90, 135, 225],
    zindex: 4,
    rotate: 0,
  },
  wall: {
    elem: wall,
    init: [0, 90, 1395, 225],
    zindex: 2,
    rotate: 0,
  },
  pipe: {
    elem: pipe,
    init: [0, 90, 135, 225],
    zindex: 5,
    rotate: 0,
  }
}

function checkHouse() {
  let indentWind = 35;
  let windGood = wall.offsetTop + indentWind < wind.offsetTop && 
  wall.offsetLeft + indentWind < wind.offsetLeft &&
  wall.offsetTop + wall.offsetHeight - indentWind > wind.offsetTop + wind.offsetHeight &&
  wall.offsetLeft + wall.offsetWidth - indentWind > wind.offsetLeft + wind.offsetWidth;

  let indentRoof = 15;
  let roofGood = roof.offsetTop + roof.offsetHeight > wall.offsetTop && 
  roof.offsetTop + roof.offsetHeight < wall.offsetTop + indentRoof && 
  roof.offsetLeft < wall.offsetLeft && 
  roof.offsetLeft + roof.offsetWidth > wall.offsetLeft+ wall.offsetWidth ;

  let pipeSideIndent = 30;
  let pipeTopIndent = 50;
  let pipeGood = pipe.offsetTop + pipe.offsetHeight > roof.offsetTop + pipeTopIndent &&
    pipe.offsetTop + pipe.offsetHeight < roof.offsetTop + roof.offsetHeight &&
    pipe.offsetLeft > roof.offsetLeft + pipeSideIndent &&
    pipe.offsetLeft < roof.offsetLeft + roof.offsetWidth - pipeSideIndent;

  if (windGood && roofGood && pipeGood) {
      wall.onmousedown = null; 
      wind.onmousedown = null
      roof.onmousedown = null;
      alert("Домик собран ^_^")
  }
}

function houseAssembly() {
  for (block_id in blocks) {
    let block = blocks[block_id];

    document.body.appendChild(block.elem);

    block.rotate = block.init[Math.round(Math.random() * block.init.length)];
    
    block.elem.style.left = '300px';
    block.elem.style.top = '1700px';
    block.elem.style.transform = `rotate(${block.rotate}deg)`
    block.elem.style.zIndex = block.zindex;
    block.elem.style.opacity = 0.8

    block.elem.ondragstart = function () { return false; };

    block.elem.ondblclick = function () {
      block.rotate = (block.rotate + 45) % 360;
      block.elem.style.transform = `rotate(${block.rotate}deg)`
    }

    block.elem.onmousedown = function (e) {
      block.elem.style.zIndex = 100;
      let shiftT = e.pageY - block.elem.offsetTop;
      let shiftL = e.pageX - block.elem.offsetLeft;

      document.onmousemove = function (e) {
        block.elem.style.top = (e.pageY - shiftT) + 'px';
        block.elem.style.left = (e.pageX - shiftL) + 'px';
      }

      document.onmouseup = function () {
        document.onmousemove = null;
        block.elem.style.zIndex = block.zindex;
        checkHouse();
      }
    };

    block.elem.addEventListener('touchstart', (e) => {
      block.elem.style.zIndex = 100;
      let shiftT = e.changedTouches[0].pageY - block.elem.offsetTop;
      let shiftL = e.changedTouches[0].pageX - block.elem.offsetLeft;

      block.elem.addEventListener('touchmove', (e) => {
        document.body.addEventListener('touchmove', preventDefault, { passive: false });
        block.elem.style.top = (e.changedTouches[0].pageY - shiftT) + 'px';
        block.elem.style.left = (e.changedTouches[0].pageX - shiftL) + 'px';
      })

      document.addEventListener('touchend', () => {
        document.body.removeEventListener('touchmove', preventDefault, { passive: false });
        block.elem.style.zIndex = block.zindex;
        checkHouse();
      })
    })

  }
}

function preventDefault(e) {
  if (e.cancelable) e.preventDefault();
}

houseAssembly();