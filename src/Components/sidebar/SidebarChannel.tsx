import { DocumentData } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { setChannelInfo } from "../../features/channelSlice";


type Props = {
  id: string;
  channel: DocumentData;
}

const SidebarChannel = (props: Props) => {
  const { id, channel } = props;
  const dispatch = useAppDispatch();

  return (
    <Container onClick={() => dispatch(setChannelInfo({
      channelId: id,
      channelName: channel.channel.channelName,
    }))}>
      <h4>
        <span>#</span>
        {channel.channel.channelName}
      </h4>
    </Container>
  );
};

export default SidebarChannel;

const Container = styled.div`
  padding-left: 20px;
  margin-top: 2px;
  h4 {
    color: #7b7c85;
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 1.1rem;
    cursor: pointer;

    &:hover {
      color: white;
      background-color: #33363d;
      border-radius: 7px;
    }

    span {
      font-size: 22px;
      padding-right: 10px;
    }
  }
`;
