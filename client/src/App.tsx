import { useEffect, useState } from 'react';
import './App.css';
import ChatList from './components/ChatList';
import ChatLog from './components/ChatLog';
import SideMenu from './components/SideMenu';

export type User = {
  id:string;
  username:string;
  profilePic:string;
}

export type Conversation = {
  id:string;
  users: User[];
  createdAt:string;
  updatedAt:string;
  __typename:string
}

function App() { 
  const [user, setUser] = useState<string>('');
  const [activeChat, setActiveChat] = useState<Conversation>();

  useEffect(()=>{
    setUser('65ea5ca7aa69acc599ded3bd');
  },[]);

  function handleChatSelected(chat:Conversation) {
    setActiveChat(chat);
  }

  return (
    <main className='flex'>
      <SideMenu />

      <section className='grid grid-cols-master-detail w-full'>
        <ChatList 
        onChatSelected={handleChatSelected}
        user={user}/>
        {activeChat && <ChatLog 
        activeChat={activeChat}
        user={user}/>}
      </section>
    </main>
  )
}

export default App
