import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import './App.css';
import ChatList from './components/ChatList';
import ChatLog from './components/ChatLog';
import SideMenu from './components/SideMenu';
import { GET_CONVERSATIONS } from './services/ServiceCalls';
import useConversationStore from './store/conversation-store';



function App() { 
  // Set Logged in User, this will be replaced for a login page that will create a global state for the user logged in
  // const [user, setUser] = useState<string>('');
  const loggedUser = useConversationStore((state) => state.loggedUser);
  const setLoggedUser = useConversationStore((state) => state.setLoggedUser);

  // This way we set the conversations in the conversation-store
  const setConversations = useConversationStore((state) => state.setConversations);

  // Active Chat Global State
  const activeChat = useConversationStore((state) => state.activeChat);

  // Hardcode for setting logged user, will be replaced for login page and functionality
  useEffect(()=>{
    setLoggedUser('65ea5ca7aa69acc599ded3bd');
  },[]);

  // Query for fetching all conversations filtered by user
  const FETCH_CONVERSATIONS = GET_CONVERSATIONS(loggedUser!);
  const {data} = useQuery(FETCH_CONVERSATIONS);

  // UseEffect for setting conversations in the conversation-store
  useEffect(()=>{
    if(data){
        setConversations(data.Conversations);
    }
  },[data]);

  return (
    <main className='flex'>
      <SideMenu />

      <section className='grid grid-cols-master-detail w-full'>
        <ChatList/>
        {activeChat && 
          <ChatLog/>
        }
      </section>
    </main>
  )
}

export default App
