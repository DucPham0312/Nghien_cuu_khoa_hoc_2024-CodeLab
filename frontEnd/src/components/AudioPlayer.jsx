import React, { useRef, useState, useEffect } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/videos/audio/audio.mp3`}
        autoPlay
        loop
      >
        Trình duyệt của bạn không hỗ trợ thẻ audio.
      </audio>
      <button className="audio__wrap" onClick={togglePlay}>
        {isPlaying ? (
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/loud.svg`}
            alt=""
            className="flashcard__icon--result"
          />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/loudofff.svg`}
            alt=""
            className="flashcard__icon--result"
          />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
