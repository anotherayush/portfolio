// animation.js
class PortfolioBackground {
  constructor() {
      this.canvas = null;
      this.ctx = null;
      this.points = [];
      this.mouse = { x: 0, y: 0 };
      this.width = 0;
      this.height = 0;
      this.theme = {
          primary: '#9370DB',     // Main color (purple)
          background: '#fafafa'   // Off-white background
      };
      this.config = {
          pointCount: 100,         // Number of points
          pointSize: 2,         // Size of each point
          baseSpeed: 0.4,         // Base movement speed
          connectionRadius: 130,   // Maximum distance for points to connect
          mouseRadius: 150,       // Mouse influence radius
          mouseForce: 1.5,        // Strength of mouse influence
          connectionOpacity: 0.2  // Opacity of connecting lines
      };
  }

  initialize() {
      this.setupCanvas();
      this.setupEventListeners();
      this.createPoints();
      this.animate();
  }

  setupCanvas() {
      this.canvas = document.getElementById('animationCanvas');
      if (!this.canvas) {
          console.error('Canvas element not found!');
          return;
      }
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.zIndex = '-1';
      this.canvas.style.pointerEvents = 'none';
  }

  setupEventListeners() {
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
      });
      window.addEventListener('mouseout', () => {
          this.mouse.x = this.width / 2;
          this.mouse.y = this.height / 2;
      });
  }

  resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.createPoints();
  }

  createPoints() {
      this.points = Array.from({ length: this.config.pointCount }, () => ({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * this.config.baseSpeed,
          vy: (Math.random() - 0.5) * this.config.baseSpeed,
          connections: []
      }));
  }

  update() {
      this.points.forEach(point => {
          point.x += point.vx;
          point.y += point.vy;

          const dx = this.mouse.x - point.x;
          const dy = this.mouse.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.config.mouseRadius) {
              const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
              point.vx += (dx / distance) * force * 0.02 * this.config.mouseForce;
              point.vy += (dy / distance) * force * 0.02 * this.config.mouseForce;
          }

          const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
          if (speed > this.config.baseSpeed) {
              point.vx = (point.vx / speed) * this.config.baseSpeed;
              point.vy = (point.vy / speed) * this.config.baseSpeed;
          }

          if (point.x < 0 || point.x > this.width) point.vx *= -1;
          if (point.y < 0 || point.y > this.height) point.vy *= -1;

          point.x = Math.max(0, Math.min(this.width, point.x));
          point.y = Math.max(0, Math.min(this.height, point.y));
      });
  }

  findConnections() {
      this.points.forEach(point => {
          point.connections = [];
          this.points.forEach(otherPoint => {
              if (point === otherPoint) return;
              
              const dx = point.x - otherPoint.x;
              const dy = point.y - otherPoint.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < this.config.connectionRadius) {
                  point.connections.push({
                      point: otherPoint,
                      opacity: 1 - (distance / this.config.connectionRadius)
                  });
              }
          });
      });
  }

  draw() {
      this.ctx.fillStyle = this.theme.background;
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.points.forEach(point => {
          point.connections.forEach(connection => {
              this.ctx.beginPath();
              this.ctx.moveTo(point.x, point.y);
              this.ctx.lineTo(connection.point.x, connection.point.y);
              this.ctx.strokeStyle = `rgba(147, 112, 219, ${connection.opacity * this.config.connectionOpacity})`;
              this.ctx.stroke();
          });
      });

      this.points.forEach(point => {
          this.ctx.beginPath();
          this.ctx.arc(point.x, point.y, this.config.pointSize, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(147, 112, 219, 0.8)`;
          this.ctx.fill();
      });
  }

  animate() {
      this.update();
      this.findConnections();
      this.draw();
      requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const background = new PortfolioBackground();
  background.initialize();
});