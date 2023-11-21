import React, { useEffect, useState } from 'react';
import './wordstyle.css';

const WordAnimation = () => {
  const words = ['conseltant', 'tutor', 'Guidance'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const maxWordIndex = words.length - 1;

    const changeText = () => {
      const nextWordIndex =
        currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
      const nextWord = words[nextWordIndex];

      const letterOutTimeouts = Array.from(currentWord).map((_, i) => {
        return setTimeout(() => {
          setCurrentWord(
            (prevWord) =>
              prevWord.substring(0, i) + ' ' + prevWord.substring(i + 1)
          );
        }, i * 80);
      });

      setTimeout(() => {
        setCurrentWord(nextWord);
      }, 340);

      const letterInTimeouts = Array.from(nextWord).map((_, i) => {
        return setTimeout(() => {
          setCurrentWord(
            (prevWord) =>
              prevWord.substring(0, i) +
              nextWord.charAt(i) +
              prevWord.substring(i + 1)
          );
        }, 340 + i * 80);
      });

      setCurrentWordIndex(nextWordIndex);

      return () => {
        letterOutTimeouts.forEach((timeout) => clearTimeout(timeout));
        letterInTimeouts.forEach((timeout) => clearTimeout(timeout));
      };
    };

    const interval = setInterval(changeText, 3000);

    return () => clearInterval(interval);
  }, [currentWordIndex, words]);

  return (
    <p className="px-2">
      {words.map((word, index) => (
        <span
          key={index}
          className={`word ${index === currentWordIndex ? 'fade-in' : ''}`}
        >
          {Array.from(word).map((letter, index) => (
            <span
              key={index}
              className={`letter ${
                index >= currentWord.length ? 'hidden' : ''
              }`}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
};

export default WordAnimation;
