import React, {FC, ReactEventHandler} from "react";
import "./styles.module.css";
import {PlayListItem} from "../../constants";

interface Props {
  playList: PlayListItem[];
  playItem: PlayListItem;
  setPlayItem: (playItem: PlayListItem) => void;
  onUpload: ReactEventHandler<HTMLInputElement>;
}

const PlayList: FC<Props> = (props) => {
  const { playList, playItem, setPlayItem, onUpload } = props;

  return (
    <div className={"listWrapper"}>
      <ul className={"list"}>
        {playList.map((audio, index) => (
          <li key={audio.url} className={playItem.url === audio.url ? "active" : undefined} onClick={() => setPlayItem(audio)}>
            {index + 1}. {audio.name}
          </li>
        ))}
      </ul>
      <div className={"uploader"}>
        <label>
          <span>添加</span>
          <input type="file" onChange={onUpload} accept="audio/*"/>
        </label>
      </div>
    </div>
  )
}

export default PlayList;
