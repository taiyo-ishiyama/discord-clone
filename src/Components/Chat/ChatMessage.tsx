import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import { Timestamp } from 'firebase/firestore';


type Props = {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

const ChatMessage = (props: Props) => {
  const {message, timestamp, user } = props;
  return (
    <Container>
      <Avatar src={user?.photo}/>
      <MessageInfo>
        <h4>{user?.displayName}
          <span>{new Date(timestamp?.toDate()).toLocaleString()}</span>
        </h4>

        <p>{message}</p>
      </MessageInfo>
    </Container>
  )
}

export default ChatMessage


const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  color: white;
`

const MessageInfo = styled.div`
  padding: 20px 20px 20px 10px;
  span{
    color: #7b7c85;
    margin-left: 20px;
    font-size: 16px;
  }
`