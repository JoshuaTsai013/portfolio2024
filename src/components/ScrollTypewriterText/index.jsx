import { useState, useEffect } from "react";
import { useMotionValueEvent } from "motion/react";

function ScrollTypewriterText({ text = "", className, progress }) {
  const [displayText, setDisplayText] = useState("");

  const updateText = (value) => {
    const clamped = Math.min(1, Math.max(0, value));
    const charIndex = Math.floor(clamped * text.length);
    const safeIndex = Math.min(charIndex, text.length);

    const visiblePart = text.substring(0, safeIndex);
    const hiddenPart = text.substring(safeIndex).split('').map(char => char === ' ' ? ' ' : 'x').join('');
    setDisplayText(visiblePart + hiddenPart);
  };

  useMotionValueEvent(progress, "change", (latest) => {
    requestAnimationFrame(() => { updateText(latest); });
  });

  useEffect(() => {
    if (progress) {
      updateText(progress.get());
    } else {
      updateText(0);
    }
  }, [text, progress]);

  return (
    <h1 className={className} style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
      {displayText}
    </h1>
  );
}

export default ScrollTypewriterText;
