import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function drawLine(ctx) {
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, ctx.canvas.height / 2);
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
  ctx.stroke();
}

export default function Canvas() {
  const canvas = useRef(null);

  const [ctx, setCtx] = useState(undefined);

  useEffect(() => {
    setCtx(canvas.current.getContext('2d'));
  }, []);

  const [windowWidth, windowHeight] = useWindowSize();

  useEffect(() => {
    if (!ctx) return;

    ctx.canvas.width = windowWidth;
    ctx.canvas.height = windowHeight;

    drawLine(ctx);
  }, [ctx, windowWidth, windowHeight]);

  return (
    <canvas ref={canvas} />
  );
}
