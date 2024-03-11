import { useEffect, useState } from 'react';
import './App.css';
import ChatList from './components/ChatList';
import ChatLog from './components/ChatLog';
import SideMenu from './components/SideMenu';

export type Conversation = {
  id:string;
  createdAt:string;
  updatedAt:string;
  __typename:string
}

function App() { 
  const [user, setUser] = useState<String>('');
  const [activeChatId, setActiveChatId] = useState<String>('');

  useEffect(()=>{
    setUser('65ea5ca7aa69acc599ded3bd');
  },[]);

  function handleChatSelected(chat:Conversation) {
    setActiveChatId(chat.id);
  }

  return (
    <main className='flex'>
      <SideMenu />

      <section className='grid grid-cols-master-detail w-full'>
        <ChatList 
        onChatSelected={handleChatSelected}
        user={user}/>
        <ChatLog 
        activeChatId={activeChatId}
        user={user}/>
      </section>
    </main>
  )
}

export default App
