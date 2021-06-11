var $start = document.querySelector('#start')     // доступ к кнопки через id
var $game = document.querySelector('#game')       // доступ к фону квадрата id
var $time = document.querySelector('#time')
var score = 0                                     // это для того что бы подсчитывать сколько раз кликнули на кв. 
var isGameStarted = false                           // задаю переменную по умолчанию фолс
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var colors = ['red', 'blue', 'green', 'yellow', 'pink' ]  // создал массив цветов для смены цвета кв


$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)       // ('input', функция) этот медот позволяет применять то что я напишу в input


function show($el) {                                 // рефакторинг замена удаление скрытие.
$el.classList.remove('hide')

}

function hide($el) {                                 // рефакторинг создание скрытие.
$el.classList.add('hide')

}



function startGame() {
    score = 0
    setGameTime()                               // 
    $gameTime.setAttribute('disabled', 'true')      // блокирую input
                                      //.classList.remove('hide')        // что бы удалял бы скрытие.
                                      //.classList.add('hide')         // что бы скрывал результат до конца игры.
    isGameStarted = true                       // задаю тру, что бы игра началась  т.к.  по умолчанию была игра фолс
    $game.style.backgroundColor = '#fff'      // видоизменяю цвет фона через Js при нажатии кнопки
    hide($start)   //.classList.add('hide')              // этот класс есть в css и при активации кнопка пропадает.

    var interval = setInterval(function() {           // установил интервал
        var time = parseFloat($time.textContent)       // распарсил строчку
            
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)    // текст в числах = (время - 0.1)toFixed(1) <--- т.е. после . одна цифра.
        }
    }, 100)

    renderBox()

}

function setGameScore() {
    $result.textContent = score.toString()        // так результат score будет выводиться сюда + сразу результат преведён к строке.
}

function setGameTime() {
    var time = +$gameTime.value          // метод которы говорит о том что в переменную time будет помещенно то что прописано в input.  через +привожу строку к числу или можно через parseInt.
    $time.textContent = time.toFixed(1)        // прописываю что бы, было определённое значение времени.
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    $gameTime.removeAttribute('disabled')  // разблокирую input после завершение игры.
isGameStarted = false               // закончил игру
show($start)    //.classList.remove('hide')     // удаляю скрип по скрытию кнопки после окончания игры.
$game.style.backgroundColor = '#ccc'  // ставлю цвет фона кв. таким которым он был начала игры.
$game.innerHTML = ''                 // для того что бы при окончании игры кв. пропали     
hide($timeHeader)   //.classList.add('hide')      // скрываю временной подсчёт после окончания инры.
show($resultHeader)        //.classList.remove('hide')  // удаляю скрытый результат игры после её окончания. 

setGameScore()                          // вызываю функцию что бы прописывался результат.

}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        score++                      // прописываю это для того что бы при нажатии кв. считалось +1
        renderBox()
    }
}

function renderBox() {
    $game.innerHTML = ''             // создав пустую строку каждый раз новый кв. не будет создоваться в HTML и отоброжаться
 var box = document.createElement('div')       // создаю эл. внутри Js
 var boxSize = getRandom(30, 100)           // для того что бы он изменялся, создаю переменную и вызываю функцию (30, 100) <-----устонавл. числа
 var gameSize = $game.getBoundingClientRect()  // метод который даёт объект с всеми значениями.
 var maxTop = gameSize.height - boxSize         // так высчитываеться длинна отклонение в пределах переменной gameSize
 var maxLeft = gameSize.width - boxSize          // тут вычисляеться ширина
 console.log(gameSize)

 var randomColorIndex = getRandom(0, colors.length)   // создал переменную и задал значение по индексу от (0 до полной дленны)
 
 box.style.height = box.style.width = boxSize + 'px'         // тут я прописываю что ширина и высота будет от полученого результата функции  в пикселях
 box.style.position = 'absolute'
 box.style.backgroundColor = colors[randomColorIndex]
 box.style.top = getRandom(0, maxTop) + 'px'          // устанавливаю значение на которое будет отклоняться.
 box.style.left = getRandom(0, maxLeft) + 'px'
 box.style.cursor = 'pointer'               // это для того что бы курсор видоизменялся при наведении.
 box.setAttribute('data-box', 'true')       // это для того что бы определить что клик пошёл именно по кв.
 
 $game.insertAdjacentElement('afterbegin', box)     // для того что бы поместить это в эл. game - для этого нужно поместить

}

function getRandom(min, max) {
return Math.floor(Math.random() * (max - min) + min)       // возврат функции рандом.число() * (max - min) + min что было бы целым. + Math.floor(чтобы округлить в мень сторону)
}
