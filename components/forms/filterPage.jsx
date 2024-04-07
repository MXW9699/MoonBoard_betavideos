import React, { useRef, useEffect } from 'react';

//some kind of scale
export default function FilterPage() {
  const slide = useRef(null);

  function draggable(e) {
    e.preventDefault();
    let start = e.clientX - parseInt(e.target.style.left || 0, 10);
    const mouseMoveHandler = (mouse) => {
      let delta = mouse.clientX - start;
      e.target.style.left = `${delta}px`;
    };
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    });
  }

  return (
    <div style={{ backgroundColor: 'green', width: '100%', height: '10px' }}>
      <div
        style={{ backgroundColor: 'blue', position: 'absolute' }}
        ref={slide}
        onMouseDown={draggable}
      >
        O
      </div>
      <div
        style={{ backgroundColor: 'yellow', position: 'absolute' }}
        ref={slide}
        onMouseDown={draggable}
      >
        O
      </div>
    </div>
  );
}
