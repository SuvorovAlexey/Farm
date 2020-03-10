let cvs = document.getElementById('canvas')

//игра будет 2-d
let ctx = cvs.getContext('2d')

//грузим картинки
let cow = new Image();
let chiken = new Image();
let wheatGreen = new Image();
let wheatYellow = new Image();

cow.src = 'img/cow.jpg';
chiken.src = 'img/chiken.jpg';
wheatGreen.src = 'img/green-wheat.jpg';
wheatYellow.src = 'img/yellow-wheat.jpg';

let wheat = { 
}

//загрузаем картинки в canvas
function draw() {

  //рисуем куриц
  let getChiken = (x, y) => {
    ctx.drawImage(chiken, x, y)
  }
  getChiken (0, 0)
  getChiken (100, 0)
  getChiken (200, 0)
  getChiken (300, 0)
  getChiken (300, 100)


  //рисуем пшеницу
  ctx.drawImage(wheatYellow, 500, 500)

  cvs.addEventListener('click', () => {
    alert('123')
  })
  
}

wheatYellow.onload = draw;