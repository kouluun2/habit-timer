import { useEffect } from 'react';

/**
 * useNativeTouchGuard - Native mobile viewport locking hook
 * Designed & Diagnosed by Claude Opus 5.5
 * 
 * Inspects swipe gesture direction (dx, dy) and DOM ancestor tree:
 * 1. Permits smooth native scrolling if target/ancestor is an active scroll container
 *    with remaining scroll room in that direction.
 * 2. Permits native controls (input[type="range"], [data-allow-touch]).
 * 3. Prevents multi-touch pinch zoom (Safari gesturestart / gesturechange).
 * 4. Cancels touchmove on empty/static backgrounds or at scroll boundaries with
 *    non-passive event listener, locking the viewport with 0px drift.
 */
function canScroll(el, dx, dy) {
  const s = window.getComputedStyle(el);
  const vertical = Math.abs(dy) > Math.abs(dx);

  if (vertical) {
    if (!/(auto|scroll)/.test(s.overflowY) || el.scrollHeight <= el.clientHeight) return false;
    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    // dy > 0: finger dragged downward (scrolling content up)
    return dy > 0 ? !atTop : !atBottom;
  } else {
    if (!/(auto|scroll)/.test(s.overflowX) || el.scrollWidth <= el.clientWidth) return false;
    const atLeft = el.scrollLeft <= 0;
    const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    // dx > 0: finger dragged rightward (scrolling content left)
    return dx > 0 ? !atLeft : !atRight;
  }
}

export function useNativeTouchGuard() {
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const onStart = (e) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onMove = (e) => {
      // Prevent multi-touch pinch zoom
      if (e.touches.length > 1) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      // Allow native range sliders & explicitly permitted touch elements
      const target = e.target;
      if (target instanceof Element && target.closest('input[type="range"], [data-allow-touch]')) {
        return;
      }

      // Check if target or any ancestor is currently scrollable in this direction
      for (let el = target; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
        if (el instanceof HTMLElement && canScroll(el, dx, dy)) {
          return;
        }
      }

      // No ancestor can scroll in this direction -> prevent viewport drift & bounce
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    // iOS Safari native gesture prevention (pinch-to-zoom)
    const onGesture = (e) => {
      if (e.cancelable) e.preventDefault();
    };

    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('gesturestart', onGesture, { passive: false });
    document.addEventListener('gesturechange', onGesture, { passive: false });

    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('gesturestart', onGesture);
      document.removeEventListener('gesturechange', onGesture);
    };
  }, []);
}
