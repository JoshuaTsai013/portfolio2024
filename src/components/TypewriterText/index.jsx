import { useState, useEffect } from "react";

function TypewriterText({ text, className, trigger = false, speed = 50 }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset when trigger becomes false
    if (!trigger) {
      setDisplayText(text.split('').map(char => char === ' ' ? ' ' : '_').join(''));
      setCurrentIndex(0);
      return;
    }

    // Start typing animation when triggered
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => {
          const chars = text.split('');
          const display = chars.map((char, i) => {
            if (i <= currentIndex) {
              return char;
            }
            return char === ' ' ? ' ' : '_';
          });
          return display.join('');
        });
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [trigger, currentIndex, text, speed]);

  return (
    <h1 className={className} style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
      {displayText || text.split('').map(char => char === ' ' ? ' ' : '_').join('')}
    </h1>
  );
}

export default TypewriterText;
