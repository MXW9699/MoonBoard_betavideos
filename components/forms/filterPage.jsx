import React, { useRef, useEffect, useState } from 'react';

//some kind of scale
//bar.width
//divide into sections bar.width/range
//

export default function FilterPage() {
  const [current, setCurrent] = useState(0);
  const slide = useRef(null);
  const notch = useRef(null);
  const SEGMENTS = 15;

  function draggable(e) {
    e.preventDefault();
    let start = e.clientX - parseInt(e.target.style.left || 0, 10);
    const mouseMoveHandler = (mouse) => {
      let width = slide.current.clientWidth;
      let delta = Math.min(Math.max(mouse.clientX - start, 0), width);
      let snap = Math.floor((delta / width) * SEGMENTS);
      e.target.style.left = `${delta}px`;

      setCurrent(snap);
    };
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    });
  }

  function readjust() {
    notch.current.style.left = `${
      (current * slide.current.clientWidth) / SEGMENTS
    }px`;
  }

  useEffect(() => {
    window.addEventListener('mouseup', readjust);
    return () => {
      window.removeEventListener('mouseup', readjust);
    };
  }, [current]);

  return (
    <>
      {current}
      <div
        style={{ backgroundColor: 'green', width: '100%', height: '10px' }}
        ref={slide}
      >
        <div
          style={{ backgroundColor: 'blue', position: 'absolute' }}
          onMouseDown={draggable}
          ref={notch}
        >
          O
        </div>
        {/* <div
        style={{ backgroundColor: 'yellow', position: 'absolute' }}
        ref={slide}
        onMouseDown={draggable}
      >
        O
      </div> */}
      </div>
    </>
  );
}
