document.addEventListener("DOMContentLoaded", function(event) {
    var container = document.querySelector('#container');
    var canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'snow absolute');
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d'),
        containerW = container.clientWidth,
        containerH = container.clientHeight,
        numFlakes = 36,
        flakes = [];
    canvas.width = containerW;
    canvas.height = containerH;

    function create() {
      var i = numFlakes,
          flake;

      while (i--) {
        flake = new Flake();
        flakes.push(flake);
      }

      loop();
    }

    function Flake() {
      var maxWeight = 5,
          maxSpeed = 3;

      this.x = randomBetween(0, containerW, true);
      this.y = randomBetween(0, containerH, true);
      this.r = randomBetween(0, 1);
      this.a = randomBetween(0, Math.PI);
      this.aStep = 0.01;


      this.weight = randomBetween(2, maxWeight);
      this.alpha = (this.weight / maxWeight);
      this.speed = (this.weight / maxWeight) * maxSpeed;

      this.update = function() {
        this.x += Math.cos(this.a) * this.r;
        this.a += this.aStep;

        this.y += this.speed;
      };
    }

    function loop() {
      var i = flakes.length,
          z,
          dist,
          flakeA,
          flakeB;

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, containerW, containerH);
      ctx.restore();

      while (i--) {

        flakeA = flakes[i];
        flakeA.update();


        ctx.beginPath();
        ctx.arc(flakeA.x, flakeA.y, flakeA.weight, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + flakeA.alpha + ')';
        ctx.fill();

        if (flakeA.y >= containerH) {
          flakeA.y = -flakeA.weight;
        }
      }

      requestAnimationFrame(loop);
    }

    function randomBetween(min, max, round) {
      var num = Math.random() * (max - min + 1) + min;

      if (round) {
        return Math.floor(num);
      } else {
        return num;
      }
    }

    function distanceBetween(vector1, vector2) {
      var dx = vector2.x - vector1.x,
          dy = vector2.y - vector1.y;

      return Math.sqrt(dx*dx + dy*dy);
    }

    function adjustSizeAndPositions() {
      containerW = container.clientWidth;
      containerH = container.clientHeight;
      canvas.width = containerW;
      canvas.height = containerH;

      for (var i in flakes) {
          flakes[i].x = randomBetween(0, containerW, true);
          flakes[i].y = randomBetween(0, containerH, true);
          flakes[i].r = randomBetween(0, 1);
          flakes[i].a = randomBetween(0, Math.PI);
      }
    }

    create();
    window.addEventListener('orientationchange', adjustSizeAndPositions);
    window.addEventListener('resize', adjustSizeAndPositions);
});
