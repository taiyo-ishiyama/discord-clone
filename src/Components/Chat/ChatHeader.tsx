import React from "react";
import styled from "styled-components";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PushPinIcon from '@mui/icons-material/PushPin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';

type Props = {
  channelName: string | null;
};

const ChatHeader = (props: Props) => {
  const {channelName} = props;
  return (
    <Container>
      <ChatHeaderLeft>
        <h3>
          <span>#</span>
          {channelName}
        </h3>
      </ChatHeaderLeft>

      <ChatHeaderRight>
        <NotificationsIcon />
        <PushPinIcon/>
        <PeopleAltIcon/>

        <ChatHeaderSearch>
          <input type="text" placeholder="Search"/>
          <SearchIcon/>
        </ChatHeaderSearch>
        <SendIcon/>
        <HelpIcon/>
      </ChatHeaderRight>
    </Container>
  );
};

export default ChatHeader;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
`;

const ChatHeaderLeft = styled.div`
  padding-left: 15px;

  span {
    color: #7b7c85;
    padding-right: 7px;
  }

  h3{
    color: white;
  }
`;

const ChatHeaderRight = styled.div`
  padding-right: 15px;
  display: flex;
  align-items: center;
  gap: 13px;
  color: #7b7c85;

  .MuiSvgIcon-root {
    cursor: pointer;
  }
`;

const ChatHeaderSearch = styled.div`
  display: flex;
  align-items: center;
  background-color: #282831;
  padding: 3px;
  border-radius: 3px;

  input {
    background: transparent;
    outline: none;
    color: white;
    border: none;
  }
`