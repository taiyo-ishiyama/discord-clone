import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from "./SidebarChannel";
import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import { auth, db } from "../../Firebase";
import { useAppSelector } from "../../app/hooks";
import useCollection from "../../hooks/useCollection";
import { addDoc, collection } from "firebase/firestore";


const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const { documents: channels} = useCollection("channels");

  const addChannel = async () => {
    let channelName: string | null = prompt("Create a new channel");

    if(channelName){
      await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
    }

  };

  return (
    <Container>
      <SidebarLeft>
        <ServerIcon>
          <img src='./discordIcon.png' alt='' />
        </ServerIcon>
        <ServerIcon>
          <img src='./logo192.png' alt='' />
        </ServerIcon>
      </SidebarLeft>

      <SidebarRight>
        <SidebarTop>
          <h3>Discord</h3>
          <ExpandMoreIcon />
        </SidebarTop>

        <SidebarChannels>
          <SidebarChannelsHeader>
            <SidebarHeader>
              <ExpandMoreIcon />
              <h4>Programming</h4>
            </SidebarHeader>
            <AddIconWrapper>
              <AddIcon onClick={()=> addChannel()} />
            </AddIconWrapper>
          </SidebarChannelsHeader>

          <SidebarChannelList>
            {channels.map((channel) => (
              <SidebarChannel channel={channel} id={channel.id} key={channel.id}/>
            ))}
          </SidebarChannelList>

          <SidebarFooter>
            <SidebarAccount>
              <img src={user?.photo} alt='' onClick={() => auth.signOut()} />
              <AccountName>
                <h4>{user?.displayName}</h4>
                <span>#{user?.uid.substring(0, 4)}</span>:
              </AccountName>
            </SidebarAccount>

            <SidebarVoice>
              <MicIcon />
              <HeadphonesIcon />
              <SettingsIcon />
            </SidebarVoice>
          </SidebarFooter>
        </SidebarChannels>
      </SidebarRight>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  display: flex;
  flex: 0.3;
  height: 100vh;
`;

const SidebarLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1c20;
  padding: 7px 15px;
`;

const ServerIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-top: 7px;
  background-color: #33363d;
  border-radius: 9999px;
  margin-bottom: 10px;
  position: relative;
  img {
    position: absolute;
    width: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const SidebarRight = styled.div`
  background-color: #2b2d33;
  width: 300px;
  position: relative;
  flex-grow: 1;
`;

const SidebarTop = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const SidebarChannels = styled.div`
  padding: 13px;
`;

const SidebarChannelsHeader = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  align-items: center;
`;

const SidebarHeader = styled.div`
  display: flex;
`;

const AddIconWrapper = styled.div`
  cursor: pointer;
`;

const SidebarChannelList = styled.div``;

const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 93%;
  padding-bottom: 10px;
  border-top: 1px solid #686a6e;
  padding-top: 10px;
  margin-left: -3px;
`;

const SidebarAccount = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 60px;
    border-radius: 50%;
  }
`;

const AccountName = styled.div`
  margin-left: 5px;
  h4 {
    color: white;
    font-weight: 500;
  }

  span {
    color: #686a6e;
  }
`;

const SidebarVoice = styled.div`
  display: flex;
  align-items: center;
  color: #686a6e;
`;
