import './App.css';
import ChatList from './components/ChatList';
import ChatLog from './components/ChatLog';
import SideMenu from './components/SideMenu';

function App() { 
  return (
    <main className='flex'>
      <SideMenu />

      <section className='grid grid-cols-master-detail w-full'>
        <ChatList />
        <ChatLog />
      </section>
    </main>
  )
}

export default App
