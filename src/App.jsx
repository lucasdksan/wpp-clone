import { useEffect, useState } from 'react';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from "@mui/icons-material/Search";

import { ChatListItem } from './components/ChatListItem';
import { ChatIntro } from './components/ChatIntro';
import { ChatWindow } from './components/ChatWindow';
import { NewChat } from './components/NewChat';

import "./App.css";
import { Login } from './components/Login';
import api from './service/api';

export function App(){
  const [ chatList , setChatList ] = useState([
    {chatId: 1, title: 'Fulano de Tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 2, title: 'Aline', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 3, title: 'Lucas', image: 'https://www.w3schools.com/howto/img_avatar2.png'}
  ]);
  const [ activeChat, setActiveChat ] = useState({});
  const [ user, setUser ] = useState(null);
  const [ showNewChat, setShowNewChat ] = useState(false);

  useEffect(()=>{
    if(user != null){
      let unsub = api.onChatList(user.id, setChatList);

      return unsub;
    }
  },[user]);

  function handleNewChat(){
    setShowNewChat(true);
  }

  async function handleLoginData(u){
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    }

    await api.addUser(newUser);

    setUser(newUser);
  }

  if(user === null){
    return(
      <Login onReceive={handleLoginData}/>
    );
  }

  return(
    <div className="app-window">
      <aside className="sidebar">
        <NewChat
          chatlist={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>
          <img className="header--avatar" src={user.avatar} alt="User Icon" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{color: "#919191"}}/>
            </div>
            <div onClick={handleNewChat} className="header--btn">
              <ChatIcon style={{color: "#919191"}}/>
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{color: "#919191"}}/>
            </div>
          </div>
        </header>
        <div className="search">
          <div className="search--input">
            <SearchIcon
              fontSize="small"
              style={{color: "#919191"}}
            />
            <input 
              type="search" 
              placeholder="Procurar ou começar uma nova conversa"
            />
          </div>
        </div>
        <main className="chat-list">
          {
            chatList.map((item, key)=>{
              return(
                <ChatListItem
                  data={item}
                  onClick={()=>setActiveChat(chatList[key])}
                  active={activeChat.chatId === chatList[key].chatId}
                  key={key}
                />
              )
            })
          }
        </main>
      </aside>
      <section className="content-area">
          {
            activeChat.chatId !== undefined && 
            <ChatWindow user={user}/> 
          }

          {
            activeChat.chatId === undefined &&
            <ChatIntro/> 
          }
      </section>
    </div>
  );
}