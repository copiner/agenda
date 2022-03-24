import React, {FC, ReactEventHandler} from "react";
import {PlayListItem} from "../../constants";

import styled, { css } from "styled-components";

const Listdiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 6px;
  padding-top: 2px;
  border: 2px solid #666895;
  background: #2a2a3e;
      
`;

const Listul = styled.ul`
      flex:1;
      overflow:auto;
`;

const Listli = styled.li`
      width: 250px;
      padding: 4px;
      color: #666895;
      border: 1px solid transparent;
      border-bottom: 1px solid #666895;
      margin-bottom: 1px;
      list-style: none;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &:hover{
        background: #5f6282;
        border: 1px solid white;
        color: #e6e7ea;      
      }

      &.active{
        color: #e6e7ea;
        background: #5f6282;
        border: 1px solid white;
      
      }

`;

const Uploaddiv = styled.div`
      text-align: right;
`;

const Uploadlabel = styled.label`
      padding: 8px 0;
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #e6e7ea;
      border-top: 2px solid #666895;
      cursor: pointer;
      background: #2a2a3e;

`;

const Uploadinput = styled.input`
      display:none;
`;

interface Props {
  playList: PlayListItem[];
  playItem: PlayListItem;
  setPlayItem: (playItem: PlayListItem) => void;
  onUpload: ReactEventHandler<HTMLInputElement>;
}

const PlayList: FC<Props> = (props) => {
  const { playList, playItem, setPlayItem, onUpload } = props;

  return (
    <Listdiv>
      <Listul>
        {playList.map((audio, index) => (
          <Listli key={audio.url}
	  	  className={playItem.url===audio.url?"active":undefined}
		  onClick={() => setPlayItem(audio)}>
            {index + 1}. {audio.name}
          </Listli>
        ))}
      </Listul>
      <Uploaddiv>
        <Uploadlabel>
          <span>添加</span>
          <Uploadinput type="file" onChange={onUpload} accept="audio/*"/>
        </Uploadlabel>
      </Uploaddiv>
    </Listdiv>
  )
}

export default PlayList;
