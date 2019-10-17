var canvas = document.getElementById("glcanvas")
context = canvas.getContext('2d')

var animate = true;
var animateID;

window.onkeydown = function () {
    animate = !this.animate;
    if (animate) {
        window.requestAnimationFrame(mainLoop)
    } else {
        this.cancelAnimationFrame(animateID)
    }
}

function mainLoop(){
    if(animate){
        animateID = window.requestAnimationFrame(mainLoop);
    }
    render()
    update()
}

window.requestAnimationFrame(mainLoop)

class Car {
    constructor(x, y) {
        // alert("inside constructor")
        this.x = x;
        this.y = y

        const img = new Image()
        img.src = 'images/download.png'
        img.onload = () => {
            context.drawImage(img, 0, 0);
            console.log("yippe inside img.onload")
        };
        this.img = img;
        console.log("yippe after this.img")

    }

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end
    }
}

Car.prototype.advancePosition = function (x, y) {
    this.x = this.lerp(this.x, this.x + x, 1)
    this.y = this.lerp(this.y, this.y + y, 1)
}
cultus = new Car(20, 10)

function gameLoop() {
    requestAnimationFrame(mainLoop);
    render()
    update()
}


function update() {
    console.log(canvas.width)
    console.log(canvas.height)
    cultus.advancePosition(0.91, 0.4)
}

function render() {
    clearCanvas(canvas)
    context.drawImage(cultus.img, cultus.x, cultus.y)

    context.beginPath();
    context.rect(cultus.x, cultus.y, cultus.img.width, cultus.img.height)
    context.strokeStyle = "black"
    context.stroke()
    context.closePath()

    A = canvas.width / cultus.x;
    C = -cultus.img.width;
    B = canvas.height / cultus.y
    D = (canvas.height - cultus.img.height) - B * cultus.y

    if (cultus.x > canvas.width - cultus.img.width) {
        context.translate(-1, 0) //stop car at boundary
        cultus.x = A * cultus.x + C;
        console.log("X--", cultus.x)
    }

    if (cultus.y > canvas.height - cultus.img.height) {
        context.translate(0, -1)
        cultus.y = B * cultus.y + D;
        console.log("y---", cultus.y)
    }


}

function clearCanvas(cvs) {
    const ctx = cvs.getContext('2d')
    ctx.save();
    ctx.globalCompositeOperation = 'copy'
    ctx.strokeStyle = 'transparent'
    ctx.beginPath()
    ctx.lineTo(0, 0)
    ctx.stroke()
    ctx.restore()
}