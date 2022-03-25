import React, {Ref} from "react";
import {PlayListItem} from "../../constants";
import styled from 'styled-components';

const Canvasdiv = styled.div`
    display: flex;
    border-radius: 6px;
    border: 4px solid black;
    margin-bottom: 16px;
`;
const Controldiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    audio {
      background: white;
      border-radius: 6px;
      flex: 1;
    }
`;

interface Props {
  onPlay: () => void;
  onPause: () => void;
  playItem: PlayListItem;
}

const Player = React.forwardRef((props: Props, audioRef: Ref<HTMLAudioElement>) => {
  const { playItem, onPlay, onPause } = props;

  return (
    <>
      <Canvasdiv>
        <canvas id="canvas" width={500} height={300}/>
      </Canvasdiv>
      <Controldiv>
        <audio ref={audioRef} src={playItem.url} onPlay={onPlay} onPause={onPause} controls />
      </Controldiv>
    </>
  )
})

export default Player;
