import React, {
  useRef,
  useEffect,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  TouchEvent,
} from 'react';
import { FilterPageProps } from '../types/types';

export default function FilterPage({
  currentFilters,
  setFilter,
  closeForm,
}: FilterPageProps) {
  const SEGMENTS = 17;
  const [notch1, setnotch1] = useState(currentFilters.minGrade ?? 16);
  const [notch2, setnotch2] = useState(currentFilters.maxGrade ?? 0);
  const slide = useRef<HTMLDivElement>(null);
  const minSlider = useRef<HTMLDivElement>(null);
  const maxSlider = useRef<HTMLDivElement>(null);

  /**
   * Add eventlisteners to update the slider values on movement. Remove event listeners when mouseup or touch end
   * @param e : Mouse or TouchEvent
   * @param setter :Setterfunction to invoke
   */
  function draggable(
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
    setter: Dispatch<SetStateAction<number>>
  ): void {
    let event = 'touches' in e ? e.touches[0] : e;
    let target: HTMLDivElement = event.target as HTMLDivElement;
    let clientX: number = event.clientX;
    let start = clientX - parseInt(target.style.left ?? 0, 10);

    /**
     * Helper function to update the filter range state
     * @param mouse
     */
    const mouseMoveHandler = (
      mouse: globalThis.MouseEvent | globalThis.TouchEvent
    ) => {
      let clientX: number =
        mouse && mouse instanceof TouchEvent
          ? mouse.touches[0].clientX
          : mouse.clientX;

      if (slide.current) {
        let width = slide.current.clientWidth;
        let delta = Math.min(Math.max(clientX - start, 0), width);
        let snap = Math.floor((delta / width) * SEGMENTS);
        target.style.left = `${delta}px`;
        setter(snap);
      }
    };

    function removeSideEffects() {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', removeSideEffects);
      window.removeEventListener('touchmove', mouseMoveHandler);
      window.removeEventListener('touchend', removeSideEffects);
    }

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', removeSideEffects);
    window.addEventListener('touchmove', mouseMoveHandler);
    window.addEventListener('touchend', removeSideEffects);
  }

  /**
   * snap sliders on slider bar
   */
  function readjust() {
    if (maxSlider.current && slide.current) {
      maxSlider.current.style.left = `${
        (notch2 * slide.current.clientWidth) / SEGMENTS
      }px`;
    }
    if (minSlider.current && slide.current) {
      minSlider.current.style.left = `${
        (notch1 * slide.current.clientWidth) / SEGMENTS
      }px`;
    }
  }

  //set current notches to the current filter locations
  useEffect(() => {
    readjust();
  }, []);

  //readjust on movement
  useEffect(() => {
    window.addEventListener('mouseup', readjust);
    return () => {
      window.removeEventListener('mouseup', readjust);
    };
  }, [notch1, notch2]);

  const currentMin = Math.min(notch1, notch2);
  const currentMax = Math.max(notch1, notch2);
  return (
    <>
      {`${currentMin} - ${currentMax}`}
      <div
        style={{ backgroundColor: 'green', width: '100%', height: '10px' }}
        ref={slide}
      >
        <div
          style={{ backgroundColor: 'blue', position: 'absolute' }}
          onMouseDown={(e) => {
            draggable(e, setnotch1);
          }}
          onTouchStart={(e) => {
            draggable(e, setnotch1);
          }}
          ref={minSlider}
        >
          O
        </div>
        <div
          style={{ backgroundColor: 'yellow', position: 'absolute' }}
          onMouseDown={(e) => {
            draggable(e, setnotch2);
          }}
          onTouchStart={(e) => {
            draggable(e, setnotch2);
          }}
          ref={maxSlider}
        >
          O
        </div>
      </div>
      <button
        onClick={() => {
          setFilter({
            maxGrade: currentMax,
            minGrade: currentMin,
          });
          closeForm();
        }}
      >
        close
      </button>
    </>
  );
}
