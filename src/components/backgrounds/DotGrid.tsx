// Adapted from React Bits: https://reactbits.dev/backgrounds/dot-grid
'use client';
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

const throttle = (func: (event: MouseEvent) => void, limit: number) => {
  let lastCall = 0;
  return (event: MouseEvent) => {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(event);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  moveX: number;
  moveY: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

const createDot = (cx: number, cy: number, index: number): Dot => ({
  cx,
  cy,
  moveX: (index % 2 === 0 ? 1 : -1) * (45 + (index % 5) * 11),
  moveY: (index % 3 === 0 ? -1 : 1) * (36 + (index % 4) * 9),
  xOffset: 0,
  yOffset: 0,
  _inertiaApplied: false,
});

export interface DotGridProps {
  positions?: readonly (readonly [number, number])[];
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  autoMove?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const DotGrid: React.FC<DotGridProps> = ({
  positions,
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  autoMove = false,
  className = '',
  style
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const boundsRef = useRef({ width: 0, height: 0 });
  const pointerRef = useRef({
    x: -Infinity,
    y: -Infinity,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;

    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    boundsRef.current = { width, height };
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    dotsRef.current.forEach(dot => gsap.killTweensOf(dot));
    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push(createDot(cx, cy, dots.length));
      }
    }
    dotsRef.current = positions
      ? positions.map(([x, y], index) => createDot(x * width, y * height, index))
      : dots;
  }, [dotSize, gap, positions]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId = 0;
    let previousFrame = performance.now();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;
      const now = performance.now();
      const delta = Math.min((now - previousFrame) / 1000, 0.05);
      previousFrame = now;
      const shouldMove = autoMove && !motion.matches;
      const { width, height } = boundsRef.current;
      const radius = dotSize / 2;

      dotsRef.current.forEach((dot) => {
        if (shouldMove && width > dotSize && height > dotSize) {
          dot.cx += dot.moveX * delta;
          dot.cy += dot.moveY * delta;

          if (dot.cx < radius) {
            dot.cx = 2 * radius - dot.cx;
            dot.moveX = Math.abs(dot.moveX);
          } else if (dot.cx > width - radius) {
            dot.cx = 2 * (width - radius) - dot.cx;
            dot.moveX = -Math.abs(dot.moveX);
          }

          if (dot.cy < radius) {
            dot.cy = 2 * radius - dot.cy;
            dot.moveY = Math.abs(dot.moveY);
          } else if (dot.cy > height - radius) {
            dot.cy = 2 * (height - radius) - dot.cy;
            dot.moveY = -Math.abs(dot.moveY);
          }
        }

        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = ox - px;
        const dy = oy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      });

      if (!motion.matches) rafId = requestAnimationFrame(draw);
    };

    const redraw = () => { cancelAnimationFrame(rafId); draw(); };
    const observer = new ResizeObserver(redraw);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    motion.addEventListener('change', redraw);
    draw();
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      motion.removeEventListener('change', redraw);
    };
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath, autoMove, dotSize]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      if (wrapperRef.current) ro.observe(wrapperRef.current);
    } else {
      (window as Window).addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMove = (e: MouseEvent) => {
      if (motion.matches) return;
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current!.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        pr.x = pr.y = -Infinity;
        return;
      }
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      if (motion.matches) return;
      const rect = canvasRef.current!.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
      dotsRef.current.forEach(dot => gsap.killTweensOf(dot));
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
    <section className={`flex items-center justify-center h-full w-full relative ${className}`} style={style}>
      <div ref={wrapperRef} className="w-full h-full relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>
    </section>
  );
};

export default DotGrid;
