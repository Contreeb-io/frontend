// Inspired by Can Tastemel's work for the lambda.ai landing page: https://cantastemel.com
import { useCallback, useEffect, useMemo, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import './Cubes.css';

interface CubesProps {
  gridSize?: number;
  maxAngle?: number;
  radius?: number;
  easing?: string;
  duration?: { enter: number; leave: number };
  cellGap?: number;
  borderStyle?: string;
  faceColor?: string;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
  rippleColor?: string;
  rippleSpeed?: number;
}

type CubeElement = HTMLDivElement & { dataset: { row: string; col: string } };

export default function Cubes({
  gridSize = 8,
  maxAngle = 45,
  radius = 3,
  easing = 'power3.out',
  duration = { enter: 0.3, leave: 0.6 },
  cellGap = 8,
  borderStyle = '1px solid #737CC0',
  faceColor = '#FFFEFC',
  autoAnimate = true,
  rippleOnClick = true,
  rippleColor = '#B9BEF7',
  rippleSpeed = 2,
}: CubesProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const userActiveRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const motionRef = useRef(false);
  const simPosRef = useRef({ x: 0, y: 0 });
  const simTargetRef = useRef({ x: 0, y: 0 });
  const cells = useMemo(() => Array.from({ length: gridSize * gridSize }, (_, index) => index), [gridSize]);
  const enterDuration = duration.enter;
  const leaveDuration = duration.leave;

  const getCubes = useCallback(() =>
    Array.from(sceneRef.current?.querySelectorAll<CubeElement>('.cubes-cell') ?? []), []);

  const tiltAt = useCallback((rowCenter: number, colCenter: number) => {
    for (const cube of getCubes()) {
      const distance = Math.hypot(Number(cube.dataset.row) - rowCenter, Number(cube.dataset.col) - colCenter);
      const angle = distance <= radius ? (1 - distance / radius) * maxAngle : 0;
      gsap.to(cube, {
        rotateX: -angle,
        rotateY: angle,
        duration: angle ? enterDuration : leaveDuration,
        ease: easing,
        overwrite: true,
      });
    }
  }, [easing, enterDuration, getCubes, leaveDuration, maxAngle, radius]);

  const resetAll = useCallback(() => {
    for (const cube of getCubes()) {
      gsap.to(cube, { rotateX: 0, rotateY: 0, duration: leaveDuration, ease: easing, overwrite: true });
    }
  }, [easing, getCubes, leaveDuration]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (motionRef.current || !sceneRef.current) return;
    userActiveRef.current = true;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    const rect = sceneRef.current.getBoundingClientRect();
    tiltAt(
      (event.clientY - rect.top) / rect.height * gridSize,
      (event.clientX - rect.left) / rect.width * gridSize,
    );
    idleTimerRef.current = setTimeout(() => { userActiveRef.current = false; }, 3000);
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!rippleOnClick || motionRef.current || !sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const row = Math.floor((event.clientY - rect.top) / rect.height * gridSize);
    const col = Math.floor((event.clientX - rect.left) / rect.width * gridSize);
    const faces = getCubes();

    for (const cube of faces) {
      const distance = Math.hypot(Number(cube.dataset.row) - row, Number(cube.dataset.col) - col);
      const delay = Math.round(distance) * 0.15 / rippleSpeed;
      const cubeFaces = cube.querySelectorAll('.cubes-face');
      gsap.to(cubeFaces, { backgroundColor: rippleColor, duration: 0.3 / rippleSpeed, delay, overwrite: true });
      gsap.to(cubeFaces, {
        backgroundColor: faceColor,
        duration: 0.3 / rippleSpeed,
        delay: delay + 0.9 / rippleSpeed,
      });
    }
  };

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => {
      motionRef.current = media.matches;
      if (media.matches) resetAll();
    };
    onMotionChange();
    media.addEventListener('change', onMotionChange);
    return () => media.removeEventListener('change', onMotionChange);
  }, [resetAll]);

  useEffect(() => {
    if (!autoAnimate) return;
    let frame = 0;
    simPosRef.current = { x: Math.random() * gridSize, y: Math.random() * gridSize };
    simTargetRef.current = { x: Math.random() * gridSize, y: Math.random() * gridSize };
    const animate = () => {
      if (!userActiveRef.current && !motionRef.current) {
        const pos = simPosRef.current;
        const target = simTargetRef.current;
        pos.x += (target.x - pos.x) * 0.02;
        pos.y += (target.y - pos.y) * 0.02;
        tiltAt(pos.y, pos.x);
        if (Math.hypot(pos.x - target.x, pos.y - target.y) < 0.1) {
          simTargetRef.current = { x: Math.random() * gridSize, y: Math.random() * gridSize };
        }
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [autoAnimate, gridSize, tiltAt]);

  useEffect(() => {
    const scene = sceneRef.current;
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (scene) {
        gsap.killTweensOf(scene.querySelectorAll('.cubes-cell, .cubes-face'));
      }
    };
  }, []);

  const style = {
    '--cubes-gap': `${cellGap}px`,
    '--cubes-border': borderStyle,
    '--cubes-face': faceColor,
  } as CSSProperties;

  return (
    <div className="cubes" style={style}>
      <div
        ref={sceneRef}
        className="cubes-scene"
        onPointerMove={onPointerMove}
        onPointerLeave={() => { userActiveRef.current = false; resetAll(); }}
        onClick={onClick}
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}
      >
        {cells.map((index) => (
          <div key={index} className="cubes-cell" data-row={Math.floor(index / gridSize)} data-col={index % gridSize}>
            {['top', 'bottom', 'left', 'right', 'front', 'back'].map((face) => (
              <div key={face} className={`cubes-face cubes-face--${face}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
