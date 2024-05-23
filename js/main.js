const canvas = document.getElementById("canvas");
const window_height = "300";
const window_width = "500";

let ctx = canvas.getContext("2d");

canvas.height = window_height;
canvas.width = window_width;
canvas.style.backgroundColor = "#b7f7ed";
class Circle {
  constructor(x, y, radius, color, text, backcolor, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.backcolor = backcolor;
    this.speed = speed;

    this.dx = 0.2 * this.speed;
    this.dy = 0.2 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Si el circulo supera el margen derecho entonces se mueve a la izquierda
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    // Si el circulo supera el margen superior entonces se mueve a abajo
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.posX += this.dx;
    this.posY += this.dy;
    this.updateTable();
  }

  updateTable() {
    let row = document.getElementById(`circle-${this.text}`);
    if (row) {
      row.innerText = `X: ${Math.floor(this.posX)}, Y: ${Math.floor(this.posY)}`;
    }
  }
}
const nCircles = 10;
let circles = [];

for (let i = 0; i < nCircles; i++) {
  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let randomspeed = Math.random() * 8 + 1;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, randomspeed);
  circles.push(miCirculo);
}

let updateCircles = function () {
  requestAnimationFrame(updateCircles);
  ctx.clearRect(0, 0, window_width, window_height);
  circles.forEach((circle) => {
    circle.update(ctx);
  });
};

updateCircles();
