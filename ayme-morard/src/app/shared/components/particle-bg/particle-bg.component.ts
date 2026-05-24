import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
}

@Component({
  selector: 'app-particle-bg',
  standalone: true,
  template: `<canvas #canvas class="particle-canvas"></canvas>`,
  styles: [`
    .particle-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }
  `]
})
export class ParticleBgComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0 };
  private animationId = 0;
  private boundResize: () => void;
  private boundMouseMove: (e: MouseEvent) => void;

  constructor() {
    this.boundResize = this.resize.bind(this);
    this.boundMouseMove = this.onMouseMove.bind(this);
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    this.initParticles();
    this.animate();
    window.addEventListener('resize', this.boundResize);
    window.addEventListener('mousemove', this.boundMouseMove);
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initParticles(): void {
    const count = Math.min(80, Math.floor((this.canvas.width * this.canvas.height) / 15000));
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5,
      alphaSpeed: (Math.random() - 0.5) * 0.005
    }));
  }

  private onMouseMove(e: MouseEvent): void {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const color = isDark ? '255, 255, 255' : '124, 58, 237';

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += p.alphaSpeed;

      if (p.alpha <= 0 || p.alpha >= 0.5) p.alphaSpeed *= -1;
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        p.alpha = Math.min(0.8, p.alpha + 0.01);
        p.x -= dx * 0.01;
        p.y -= dy * 0.01;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
      this.ctx.fill();
    }

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(${color}, ${0.05 * (1 - dist / 120)})`;
          this.ctx.stroke();
        }
      }
    }

    const gradient = this.ctx.createRadialGradient(
      this.canvas.width * 0.3, this.canvas.height * 0.4, 0,
      this.canvas.width * 0.3, this.canvas.height * 0.4, this.canvas.width * 0.6
    );
    gradient.addColorStop(0, isDark ? 'rgba(124, 58, 237, 0.03)' : 'rgba(124, 58, 237, 0.04)');
    gradient.addColorStop(0.5, 'transparent');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const gradient2 = this.ctx.createRadialGradient(
      this.canvas.width * 0.7, this.canvas.height * 0.7, 0,
      this.canvas.width * 0.7, this.canvas.height * 0.7, this.canvas.width * 0.5
    );
    gradient2.addColorStop(0, isDark ? 'rgba(6, 182, 212, 0.03)' : 'rgba(6, 182, 212, 0.04)');
    gradient2.addColorStop(0.5, 'transparent');
    this.ctx.fillStyle = gradient2;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.boundResize);
    window.removeEventListener('mousemove', this.boundMouseMove);
  }
}
