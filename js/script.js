let wheat = {
    sum: 0
}

let cow = {
    sum: 0
}

let chiken = {
    sum: 0
}

let money = {
    sum: 0
}

let appArea = document.querySelector('.app-area')
let wheatCounter = document.querySelector('.wheat-counter')
let eggsCounter = document.querySelector('.eggs-counter')
let milkCounter = document.querySelector('.milk-counter')

appArea.onclick = function(event) {
    let target = event.target; // где был клик?

    //нажимаем на корову
    if (target.classList == 'cell cow' && wheat.sum >= 1 && buttonReposition.classList != 'btnActive') {
        target.classList = 'cell cow waiting-cow'
        let bringBackBG = () => {
            target.classList = 'cell cow'

            //добавляем в счетчик молоко
            cow.sum = cow.sum + 2
            milkCounter.textContent = 'Молоко: ' + cow.sum  
        }
        setTimeout(bringBackBG, 20000)

        //вычитаем пшеницу из счетчика
        wheat.sum = wheat.sum - 1
        wheatCounter.textContent = 'Пшеница: ' + wheat.sum 
    }


    //нажимаем на курицу
    else if (target.classList == 'cell chiken' && wheat.sum >= 1 && buttonReposition.classList != 'btnActive') {
        target.classList = 'cell chiken waiting-chiken'
        let bringBackBG = () => {
            target.classList = 'cell chiken' 
        }
        setTimeout(bringBackBG, 30000)


        //меняем 1 пшеницу на 3 яйца (1 яйцо в 10 сек)
        let timerId = setInterval( () => {
                chiken.sum = chiken.sum + 1
                eggsCounter.textContent = 'Яйца: ' + chiken.sum
            }, 10000);
        setTimeout(() => { clearInterval(timerId)}, 30000);
        
        //вычитаем пшеницу из счетчика
        wheat.sum = wheat.sum - 1
        wheatCounter.textContent = 'Пшеница: ' + wheat.sum    
    }

    //если не хватает пшеницы
    else if ((target.classList == 'cell cow' || target.classList == 'cell chiken') && wheat.sum < 1 && buttonReposition.classList != 'btnActive') {
        alert('Недостаточно пшеницы!')
    }

    //нажимаем на пшеницу
    else if  (target.classList == 'cell wheat' && buttonReposition.classList != 'btnActive') {
        target.classList = 'cell wheat waiting-wheat'
        let bringBackCow = () => {
            target.classList = 'cell wheat'
        }
        setTimeout(bringBackCow, 10000)
        wheat.sum = wheat.sum + 1;
        wheatCounter.textContent = 'Пшеница: ' + wheat.sum
    }
}

//кнопки продажи товара
let saleBtn = document.querySelectorAll('.sale')
let getMoney = document.querySelector('.get-money')

saleBtn[0].addEventListener('click', function(){
    money.sum = money.sum + (cow.sum * 50)
    getMoney.textContent = 'Заработано денег: ' + money.sum + ' руб.'
    cow.sum = 0
    milkCounter.textContent = 'Молоко: ' + cow.sum 
})

saleBtn[1].addEventListener('click', function(){
    money.sum = money.sum + (chiken.sum * 8)
    getMoney.textContent = 'Заработано денег: ' + money.sum + ' руб.'
    chiken.sum = 0
    eggsCounter.textContent = 'Яйца: ' + chiken.sum
})


//кнопка перемещния элементов
let buttonReposition = document.getElementById('reposition')
let unit = document.querySelectorAll('.cell')

buttonReposition.addEventListener('click', ()=> {
    buttonReposition.classList.toggle('btnActive')
})

for (let index = 0; index < unit.length; index++) {

    unit[index].onmousedown = function(event) { // (1) отследить нажатие

        if(buttonReposition.classList == 'btnActive') {
            // (2) подготовить к перемещению:
            // разместить поверх остального содержимого и в абсолютных координатах
            unit[index].style.position = 'absolute';
            unit[index].style.zIndex = 1000;
            
            // и установим абсолютно спозиционированный объект под курсор
            moveAt(event.pageX, event.pageY);
        
            // передвинуть объект под координаты курсора
            // и сдвинуть на половину ширины/высоты для центрирования
            function moveAt(pageX, pageY) {
                unit[index].style.left = pageX - unit[index].offsetWidth / 2 + 'px';
                unit[index].style.top = pageY - unit[index].offsetHeight / 2 + 'px';
            }
        
            function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            }
        
            // (3) перемещать по экрану
            document.addEventListener('mousemove', onMouseMove);
        
            // (4) положить объект, удалить более ненужные обработчики событий
            unit[index].onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            unit[index].onmouseup = null;
            };
        }
      };
    
}

       
    






