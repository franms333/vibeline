import './App.css';
import { FaReact } from "react-icons/fa";
import { IoGlobeOutline, IoChatbubbleEllipsesOutline, IoVideocamOutline, IoMusicalNotesOutline, IoCalendarOutline, IoSettingsOutline, IoLogOutOutline  } from "react-icons/io5";
import UserPic from './assets/profile_pic.jpg';
import { useState } from 'react';

function App() {
  const [activeButton, setActiveButton] = useState<string>('');

  function handleActiveButton(button:string) {
    setActiveButton(button);
  }

  return (
    <div className='h-screen max-w-20 flex flex-col items-center py-5 p-2 bg-[#FAFAFA]'>
      <div className='flex flex-col gap-3'>
        <FaReact 
        className='text-[#27AE60] text-5xl'
        />
        <img className='w-12 h-12 rounded-full object-cover' src={UserPic} alt="User Profile Pic for chat application" />
      </div>

      <span className='w-12 border-t-2 bg-slate-400 mt-6'/>

      <div className='flex flex-col gap-6 pt-6'>
        {/* <IoGlobeOutline className='text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer hover:text-[#52be80]'/> */}
        <button className={`rounded-lg p-2 ${activeButton === 'globe' ? 'bg-[#3db670]' : ''}`} 
        onClick={() => handleActiveButton('globe')}>
          <IoGlobeOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer ${activeButton === 'globe' ? 'text-white' : ''}`}/>
        </button>
        <button className={`rounded-lg p-2 ${activeButton === 'chat' ? 'bg-[#3db670]' : ''}`}  onClick={() => handleActiveButton('chat')}>
          <IoChatbubbleEllipsesOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer ${activeButton === 'chat' ? 'text-white' : ''}`}/>
        </button>
        <button className={`rounded-lg p-2 ${activeButton === 'video' ? 'bg-[#3db670]' : ''}`}  onClick={() => handleActiveButton('video')}>
          <IoVideocamOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer ${activeButton === 'video' ? 'text-white' : ''}`}/>
        </button>
        <button className={`rounded-lg p-2 ${activeButton === 'music' ? 'bg-[#3db670]' : ''}`}  onClick={() => handleActiveButton('music')}>
          <IoMusicalNotesOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer ${activeButton === 'music' ? 'text-white' : ''}`}/>
        </button>
        <button className={`rounded-lg p-2 ${activeButton === 'calendar' ? 'bg-[#3db670]' : ''}`}  onClick={() => handleActiveButton('calendar')}>
          <IoCalendarOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer ${activeButton === 'calendar' ? 'text-white' : ''}`}/>
        </button>
        {/* <IoChatbubbleEllipsesOutline className='text-[#27AE60] text-4xl'/>
        <IoVideocamOutline className='text-[#27AE60] text-4xl'/>
        <IoMusicalNotesOutline className='text-[#27AE60] text-4xl'/>
        <IoCalendarOutline className='text-[#27AE60] text-4xl'/> */}
      </div>

      <div className='flex flex-col items-center gap-6 mt-auto'>
        <IoSettingsOutline className='text-gray-400 text-4xl'/>
        <IoLogOutOutline  className='text-gray-400 text-4xl'/>
      </div>
    </div>
  )
}

export default App
