export default function makeDraggable(e, sideEffect) {
  e.preventDefault();
  function removeSideEffects() {
    windows.removeEventListener('mousemove', sideEffect);
    windows.removeEventListener('mouseup', removeSideEffects);
  }
  
  windows.addEventListener('mousemove', sideEffect);
  windows.addEventListener('mouseup', removeSideEffects);
}
