import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  DocumentReference,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../Firebase";
import useSubCollection from "../../hooks/useSubCollection";


const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const channelId = useAppSelector((state) => state.channel.channelId);
  const channelName = useAppSelector((state) => state.channel.channelName);
  const user = useAppSelector((state) => state.user.user);
  const { subDocuments: messages} = useSubCollection("channels", "messages");


  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    const docRef: DocumentReference<DocumentData> = await addDoc(
      collectionRef,
      {
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
      }
    );
    setInputText("");
  };

  return (
    <Container>
      <ChatHeader channelName={channelName} />

      <ChatMessageWrapper>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
      </ChatMessageWrapper>

      <ChatInput>
        <AddCircleOutlineIcon />
        <form>
          <input
            type='text'
            placeholder='Send a message to Udemy'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button
            type='submit'
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          >
            Send
          </button>
        </form>

        <ChatInputIcons>
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </ChatInputIcons>
      </ChatInput>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  background-color: #33363d;
  height: 100vh;
`;

const ChatMessageWrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #474b53;
  border-radius: 5px;
  margin: 20px;
  color: lightgray;

  form {
    flex-grow: 1;
    input {
      padding: 15px;
      background: transparent;
      border: none;
      outline: none;
      color: white;
      font-size: large;
      width: 100%;
    }
    button {
      display: none;
    }
  }
`;

const ChatInputIcons = styled.div`
  .MuiSvgIcon-root {
    padding: 5px;
  }
`;
