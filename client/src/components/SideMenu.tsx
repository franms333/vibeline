import { FaReact } from "react-icons/fa";
import { IoCalendarOutline, IoChatbubbleEllipsesOutline, IoGlobeOutline, IoLogOutOutline, IoMusicalNotesOutline, IoSettingsOutline, IoVideocamOutline } from "react-icons/io5";
import UserPic from '../assets/profile_pic.jpg';
import useConversationStore from "../store/conversation-store";
import { MenuButton } from "../shared/Types";


const SideMenu = () => {
    const activeButton = useConversationStore((state) => state.activeMenuButton);
    const setActiveButton = useConversationStore((state) => state.setActiveMenuButton);

    function handleActiveButton(button:MenuButton) {
        setActiveButton(button);
    }
    
    return ( 
        <section className='h-screen max-w-20 flex flex-col items-center py-5 p-2 bg-[#FAFAFA] 
                lg:flex sm:hidden'>
            <div className='flex flex-col gap-3'>
                <FaReact 
                className='text-[#27AE60] text-5xl cursor-pointer'
                />
                <img className='w-12 h-12 rounded-full object-cover cursor-pointer' src={UserPic} alt="User Profile Pic for chat application" />
            </div>

            <span className='w-12 border-t-2 bg-slate-400 mt-6'/>

            <nav className='flex flex-col gap-6 pt-6'>
                <button 
                className={`rounded-2xl p-2 ${activeButton === 'globe' ? 'bg-[#3db670] shadow-lg' : ''}`} 
                onClick={() => handleActiveButton('globe')}>
                    <IoGlobeOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer ${activeButton === 'globe' ? 'text-white' : ''}`}/>
                </button>

                <button 
                className={`rounded-2xl p-2 ${activeButton === 'chat' ? 'bg-[#3db670] shadow-lg' : ''}`}  
                onClick={() => handleActiveButton('chat')}>
                    <IoChatbubbleEllipsesOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer ${activeButton === 'chat' ? 'text-white' : ''}`}/>
                </button>

                <button 
                className={`rounded-2xl p-2 ${activeButton === 'video' ? 'bg-[#3db670] shadow-lg' : ''}`}  
                onClick={() => handleActiveButton('video')}>
                    <IoVideocamOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer ${activeButton === 'video' ? 'text-white' : ''}`}/>
                </button>

                <button 
                className={`rounded-2xl p-2 ${activeButton === 'music' ? 'bg-[#3db670] shadow-lg' : ''}`}  
                onClick={() => handleActiveButton('music')}>
                    <IoMusicalNotesOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer ${activeButton === 'music' ? 'text-white' : ''}`}/>
                </button>

                <button 
                className={`rounded-2xl p-2 ${activeButton === 'calendar' ? 'bg-[#3db670] shadow-lg' : ''}`}  
                onClick={() => handleActiveButton('calendar')}>
                    <IoCalendarOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer ${activeButton === 'calendar' ? 'text-white' : ''}`}/>
                </button>
            </nav>

            <div className='flex flex-col items-center gap-6 mt-auto'>
                <IoSettingsOutline className='text-gray-400 text-4xl cursor-pointer transition-colors duration-100 hover:text-gray-500'/>
                <IoLogOutOutline  className='text-gray-400 text-4xl cursor-pointer transition-colors duration-100 hover:text-gray-500'/>
            </div>
        </section>
    );
}
 
export default SideMenu;