import './App.css';
import SideMenu from './components/SideMenu';
import ChatOverview from './pages/ChatOverview';
import NewChat from './pages/NewChat';
import useConversationStore from './store/conversation-store';

function App() {

  // Active Chat Global State
  const activeChat = useConversationStore((state) => state.activeChat);
  const activeMenuButton = useConversationStore((state) => state.activeMenuButton);

  return (
    <main className='flex overflow-hidden'>
      <SideMenu/>
      {activeMenuButton === 'chat' && 
        <ChatOverview 
        activeChat={activeChat}
        />
      }
      {activeMenuButton === 'newChat' &&
        <NewChat />
      }
    </main>
  )
}

export default App
