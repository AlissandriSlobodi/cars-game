const score = document.querySelector(".score");
const sound = document.querySelector(".sound");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

startScreen.addEventListener("click", start);

let player = { speed: 8, score: 0 };

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  // console.log(keys);
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function stopGame() {
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML =
    "<p> <strong>Game Over</strong>  <br> <strong><u>Your Final Score is</strong></u>" +
    "<strong> :</strong> &nbsp" +
    "&nbsp" +
    points +
    "<br> <strong><i>Press Here to Restart the game</strong></i></p>";
}

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.left > bRect.right ||
    aRect.right < bRect.left
  );
}

function moveLines() {
  let lines = document.querySelectorAll(".lines");

  lines.forEach(function (item) {
    if (item.y > 700) {
      item.y -= 750;
    }

    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function moveCompetitorcars(car) {
  let competitorcars = document.querySelectorAll(".competitor");

  competitorcars.forEach(function (item) {
    if (isCollide(car, item)) {
      stopGame();
    }
    if (item.y > 700) {
      item.y = -100;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }

    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    moveLines();
    moveCompetitorcars(car);
    if (keys.ArrowUp && player.y > road.top + 3) {
      player.y -= player.speed;
    }

    if (keys.ArrowDown && player.y < road.bottom - 85) {
      player.y += player.speed;
    }

    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
    player.score++;
    points = Math.trunc(player.score / 100 / 1.2);
    score.innerText = "Score: " + points;
  }
}
function start() {
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";

  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  for (x = 0; x < 5; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 250;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  for (x = 0; x < 3; x++) {
    let competitorcars = document.createElement("div");
    competitorcars.setAttribute("class", "competitor");
    competitorcars.y = (x + 1) * 350 * -1;
    competitorcars.y = x * 150;
    competitorcars.style.backgroundImage =
      "url('https://assets.codepen.io/7773162/F881911B-9977-4381-8A92-EA31A4AE09F6.png')";
    competitorcars.style.width = 45 + "px";
    competitorcars.style.left = Math.floor(Math.random() * 350) + "px";
    competitorcars.style.top = competitorcars.y + "px";
    gameArea.appendChild(competitorcars);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;
}

// Этот код представляет собой простую реализацию игры на веб-странице
// с использованием HTML, CSS и JavaScript.

// Обьяснение, что тут происходит

// Выбираем элементы DOM:
// const score = document.querySelector(".score");
// const sound = document.querySelector(".sound");
// const startScreen = document.querySelector(".startScreen");
// const gameArea = document.querySelector(".gameArea");
// Эти строки кода выбирают элементы DOM с классами "score", "sound", "startScreen" и "gameArea" для последующего использования.

// Обработчик события при клике на экране начала игры:
// startScreen.addEventListener('click', start);
// Эта строка кода добавляет слушатель событий на элемент "startScreen", который вызывает функцию start при клике.

// Объект player и объект keys:
// let player = { speed: 8, score: 0 };
// let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
// player содержит информацию о скорости игрока и его текущем счете. keys используется для отслеживания состояния клавиш (нажата или отпущена).

// Обработчики событий клавиш:
// document.addEventListener('keydown', keyDown);
// document.addEventListener('keyup', keyUp);
// Эти строки добавляют слушатели событий для отслеживания нажатия и отпускания клавиш.

// Функции keyDown и keyUp:
// function keyDown(e) { /*...*/ }
// function keyUp(e) { /*...*/ }
// Эти функции обрабатывают события нажатия и отпускания клавиш, обновляя состояние keys.

// Функция stopGame:
// function stopGame() { /*...*/ }
// Эта функция завершает игру, устанавливая player.start в false и отображая экран окончания игры.

// Функция isCollide:
// function isCollide(a, b) { /*...*/ }
// Эта функция проверяет, сталкиваются ли два элемента на странице.

// Функции moveLines и moveCompetitorcars:
// function moveLines() { /*...*/ }
// function moveCompetitorcars(car) { /*...*/ }
// Эти функции обрабатывают движение линий и конкурирующих машин на дороге.

// Функция gamePlay:
// function gamePlay() { /*...*/ }
// Эта функция управляет логикой игры, обрабатывает движение игрока и обновление счета.

// Функция start:
// function start() { /*...*/ }
// Эта функция начинает игру, инициализирует начальные параметры, создает линии и конкурирующие машины, а также устанавливает анимацию для игрового цикла.

// Враги (конкурирующие машины) двигаются в игре
// с использованием функции moveCompetitorcars:
// function moveCompetitorcars(car) {
//   let competitorcars = document.querySelectorAll('.competitor');

//   competitorcars.forEach(function(item) {
//     if (isCollide(car, item)) {
//       stopGame();
//     }
//     if (item.y > 700) {
//       item.y = -100;
//       item.style.left = Math.floor(Math.random() * 350) + "px";
//     }

//     item.y += player.speed;
//     item.style.top = item.y + "px";
//   });
// }
// Сначала функция выбирает все элементы с классом "competitor",
// предполагая, что это конкурирующие машины.

// Затем она проходит через каждый элемент с помощью метода forEach.

// Если происходит столкновение (isCollide(car, item) возвращает true),
// вызывается функция stopGame, что приводит к завершению игры.

// Если машина (элемент item) выходит за нижнюю границу экрана
// (item.y > 700), то ей присваивается новая позиция выше экрана,
// и ей случайным образом устанавливается горизонтальная позиция
// (item.style.left = Math.floor(Math.random() * 350) + "px").

// Затем координата y элемента увеличивается на скорость игрока
// (item.y += player.speed), и позиция элемента обновляется на странице
// (item.style.top = item.y + "px").

// Таким образом, конкурирующие машины перемещаются вверх по экрану
// с постоянной скоростью. Если они достигают нижней границы,
// то они снова появляются сверху с новой горизонтальной позицией.
// Если происходит столкновение с игровым автомобилем (car),
// игра завершается.
