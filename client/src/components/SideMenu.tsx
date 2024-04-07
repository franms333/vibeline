import { FaReact } from "react-icons/fa";
import {
    IoCalendarOutline,
    IoChatbubbleEllipsesOutline,
    IoInvertMode,
    IoLogOutOutline,
    IoMusicalNotesOutline,
    IoSettingsOutline,
    IoVideocamOutline
} from "react-icons/io5";
import { RiChatNewLine } from "react-icons/ri";

import { useEffect, useState } from "react";
import UserPic from '../assets/profile_pic.jpg';
import { MenuButton, Theme } from "../shared/Types";
import useConversationStore from "../store/conversation-store";

const SideMenu = () => {
    const [theme, setTheme] = useState<Theme>('dark');
    const activeButton = useConversationStore((state) => state.activeMenuButton);
    const setActiveButton = useConversationStore((state) => state.setActiveMenuButton);

    function handleActiveButton(button:MenuButton) {
        setActiveButton(button);
    }    

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        handleClick();
    };
    // initially set the theme and "listen" for changes to apply them to the HTML tag
    useEffect(() => {
        document.querySelector('html')!.setAttribute('data-theme', theme);
    }, [theme]);

    const handleClick = () => {
        const elem = document.activeElement as HTMLElement;
        if (elem) {
          elem?.blur();
        }
    };
    
    return ( 
        <section className={`h-screen max-w-20 flex-col items-center py-5 p-2 
                md:flex xs:hidden`}>
            <div className='flex flex-col gap-3'>
                <FaReact 
                className='text-[#27AE60] text-5xl cursor-pointer'
                />
                <img className='w-12 h-12 rounded-full object-cover cursor-pointer' src={UserPic} alt="User Profile Pic for chat application" />
            </div>

            <span className='w-12 border-t-2 border-[--borders] mt-6'/>

            <nav className='flex flex-col gap-6 pt-6'>
                <button 
                className={`rounded-2xl p-2 ${activeButton === 'newChat' ? 'bg-[#3db670] shadow-lg' : ''}`} 
                onClick={() => handleActiveButton('newChat')}>
                    <RiChatNewLine className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer 
                    ${activeButton === 'newChat' ? 'text-[--icons-primary]' : ''}`}/>
                </button>

                <button 
                className={`rounded-2xl p-2 ${activeButton === 'chat' ? 'bg-[#3db670] shadow-lg' : ''}`}  
                onClick={() => handleActiveButton('chat')}>
                    <IoChatbubbleEllipsesOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer 
                    ${activeButton === 'chat' ? 'text-[--icons-primary]' : ''}`}/>
                </button>

                <button 
                className={`rounded-2xl p-2 ${activeButton === 'video' ? 'bg-[#3db670] shadow-lg' : ''}`}  
                onClick={() => handleActiveButton('video')}>
                    <IoVideocamOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer 
                    ${activeButton === 'video' ? 'text-[--icons-primary]' : ''}`}/>
                </button>

                <button 
                className={`rounded-2xl p-2 ${activeButton === 'music' ? 'bg-[#3db670] shadow-lg' : ''}`}  
                onClick={() => handleActiveButton('music')}>
                    <IoMusicalNotesOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer 
                    ${activeButton === 'music' ? 'text-[--icons-primary]' : ''}`}/>
                </button>

                <button 
                className={`rounded-2xl p-2 ${activeButton === 'calendar' ? 'bg-[#3db670] shadow-lg' : ''}`}  
                onClick={() => handleActiveButton('calendar')}>
                    <IoCalendarOutline className={`text-[#27AE60] text-4xl transition-colors duration-100 cursor-pointer 
                    ${activeButton === 'calendar' ? 'text-[--icons-primary]' : ''}`}/>
                </button>
            </nav>

            <div className='flex flex-col items-center gap-6 mt-auto'>
                <div className="dropdown dropdown-right dropdown-end">
                    <IoSettingsOutline tabIndex={0} role="button" className='text-gray-400 text-4xl cursor-pointer transition-colors duration-100 hover:text-gray-500'/>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52">
                        <li onClick={toggleTheme}>
                            <div className="flex items-center justify-between">
                                <p>Switch Theme</p>
                                <IoInvertMode
                                className="text-base"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <IoLogOutOutline  className='text-gray-400 text-4xl cursor-pointer transition-colors duration-100 hover:text-gray-500'/>
            </div>
        </section>
    );
}
 
export default SideMenu;