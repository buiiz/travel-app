import React from 'react';
import ReactPlayer from 'react-player/youtube';

export default function Player({ videoUrl }) {
  return (
    <div className="player-wrapper w-full bg-gray-900 rounded-xl bg-opacity-50 mx-5 p-5 mb-10 flex justify-center box-border">
      <ReactPlayer
        className="react-player p-5"
        width="100%"
        height="100%"
        url={videoUrl}
        controls
        light
      />
    </div>
  );
}
