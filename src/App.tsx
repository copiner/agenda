import React, {ChangeEventHandler, FC, useEffect, useRef, useState} from 'react';
import useAudioVisualization from "./hooks/useAudioVisualization";

import { defaultPlayList, PlayListItem } from "./constants";
import Header from "./components/Header";
import Player from "./components/Player";
import PlayList from "./components/PlayList";
import { padLeft } from "./utils";

/*------------style-s-----------------*/
import styled from 'styled-components';

const Appdiv = styled.div`
  display: flex;
  padding: 16px;
  background: linear-gradient(0, #181929, 10%, #404264, 90%, #181929, 100%, #404264);
  border-radius: 6px;
`;

const Playdiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;

const Playlistdiv = styled.div`
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;

const Curspan = styled.span`
    margin-left: auto;
`;

/*------------style-e-----------------*/

const App: FC = () => {
  const {visualize, stopVisualize, resetCanvas} = useAudioVisualization('#canvas', 50);

  const [curtTime, setCurtTime] = useState<string>('00:00');
  const [curtAudio, setCurtAudio] = useState<PlayListItem>(defaultPlayList[0]);
  const [playList, setPlayList] = useState<PlayListItem[]>(defaultPlayList);

  const audioRef = useRef<HTMLAudioElement>(null);

  const onPlay = async () => {
    if (audioRef.current) {
      stopVisualize();
      await audioRef.current.play();
      // https://stackoverflow.com/a/48623627
      const audioEle = audioRef.current as any
      const stream = audioEle.mozCaptureStream ? audioEle.mozCaptureStream() : audioEle.captureStream();
      visualize(stream)
    }
  }

  const onPause = async () => {
    resetCanvas();
  }

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const [file] = e.target.files;
      const blobUrl = URL.createObjectURL(file);
      const [filename] = file.name.split('.');
      setCurtAudio({ name: filename, url: blobUrl });
      setPlayList([...playList, { name: filename, url: blobUrl }])
    }
  };

  useEffect(() => {
    resetCanvas();
    return () => {
      stopVisualize()
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const minute = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        setCurtTime(`${padLeft(minute)}:${padLeft(seconds)}`);
      }
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Appdiv>
      <Playdiv>
        <Header>
          正在播放：{curtAudio.name}
          <Curspan>{curtTime}</Curspan>
        </Header>
        <Player ref={audioRef} onPlay={onPlay} onPause={onPause} playItem={curtAudio} />
      </Playdiv>

      <Playlistdiv>
        <Header>播放列表</Header>
        <PlayList playList={playList} playItem={curtAudio} onUpload={onUpload} setPlayItem={setCurtAudio} />
      </Playlistdiv>
    </Appdiv>
  )
}

export default App;
