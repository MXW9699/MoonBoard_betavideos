import React, { useRef, useEffect, useState, useMemo } from 'react';

//some kind of scale
//bar.width
//divide into sections bar.width/range
//

export default function FilterPage({ setGradeFilter, gradeFilter }) {
  const SEGMENTS = 15;
  const slide = useRef(null);
  const notchLow = useRef(null);
  const notchHigh = useRef(null);
  const [lowestGrade, setLowestGrade] = useState(gradeFilter.lowest);
  const [highestGrade, setHighestGrade] = useState(gradeFilter.highest);

  const sliderWidth = slide.current?.clientWidth ?? 0;

  /**
   * add event listener to clicked notch for movement and update
   * remove event listender after click removed
   * @param {*} e mouseEvent
   * @param {*} setGrade setterfunction for the grade
   */
  function draggable(e, setGrade) {
    console.log(e.target);
    let start = e.clientX - parseInt(e.target.style.left || 0, 10);
    let width = slide.current.clientWidth;
    let lowPos = parseInt(notchLow.current.style.left, 10);
    let hiPos = parseInt(notchHigh.current.style.left, 10);

    /**
     * calibrate the notch position, update notch position with movement of mouse
     * @param {*} mouse mouse event
     * @returns
     */
    const mouseMoveHandler = (mouse) => {
      let delta;
      if (lowPos == hiPos) {
        function something(e) {
          console.log(e.clientX - start);
        }
        window.addEventListener('mousemove', something);

        e.target = notchLow.current;
        setGrade = setLowestGrade;
      }
      switch (e.target) {
        case notchLow.current: {
          delta = Math.min(Math.max(mouse.clientX - start, 0), hiPos + 1);
          break;
        }
        case notchHigh.current: {
          delta = Math.min(Math.max(mouse.clientX - start, lowPos + 1), width);
          break;
        }
        default:
          return;
      }
      let snap = Math.floor((delta / width) * SEGMENTS);
      e.target.style.left = `${delta}px`;
      setGrade(snap);
    };

    function removeHandlers() {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', removeHandlers);
    }

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', removeHandlers);
  }

  /**
   * readjusting the notches and update the grade filter
   */
  function readjust() {
    const positionLow = (lowestGrade * sliderWidth) / SEGMENTS;
    notchLow.current.style.left = `${positionLow}px`;

    const positionHigh = (highestGrade * sliderWidth) / SEGMENTS;
    notchHigh.current.style.left = `${positionHigh}px`;

    setGradeFilter({ lowest: lowestGrade, highest: highestGrade });
  }

  /**
   * on mount update the notches to the current filter setting
   */
  useEffect(() => {
    const positionLow = (lowestGrade * slide.current?.clientWidth) / SEGMENTS;
    notchLow.current.style.left = `${positionLow}px`;
    const positionHigh = (highestGrade * slide.current?.clientWidth) / SEGMENTS;
    notchHigh.current.style.left = `${positionHigh}px`;
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', readjust);
    return () => {
      window.removeEventListener('mouseup', readjust);
    };
  }, [lowestGrade, highestGrade]);

  return (
    <>
      {`${lowestGrade}, ${highestGrade}`}
      <div
        style={{ backgroundColor: 'green', width: '100%', height: '10px' }}
        ref={slide}
      >
        <div
          style={{ backgroundColor: 'blue', position: 'absolute' }}
          onMouseDown={(e) => draggable(e, setLowestGrade)}
          ref={notchLow}
        >
          O
        </div>
        <div
          style={{ backgroundColor: 'yellow', position: 'absolute' }}
          ref={notchHigh}
          onMouseDown={(e) => draggable(e, setHighestGrade)}
        >
          O
        </div>
      </div>
    </>
  );
}
