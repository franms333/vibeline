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
import { MenuButton } from "../shared/Types";
import useConversationStore from "../store/conversation-store";


const SideMenu = () => {
    
    // Zustand States
    const loggedUser = useConversationStore((state) => state.loggedUser);
    const setLoggedUser = useConversationStore((state) => state.setLoggedUser);
    const activeButton = useConversationStore((state) => state.activeMenuButton);
    const setActiveButton = useConversationStore((state) => state.setActiveMenuButton);

    const theme = useConversationStore((state) => state.theme);
    const setTheme = useConversationStore((state) => state.setTheme);

    function handleActiveButton(button:MenuButton) {
        setActiveButton(button);
    }    

    const toggleTheme = () => {
        document.querySelector('html')!.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
        setTheme(theme === 'dark' ? 'light' : 'dark');
        handleClick();
    };

    const handleClick = () => {
        const elem = document.activeElement as HTMLElement;
        if (elem) {
          elem?.blur();
        }
    };

    const handleLogout = () => {
        setLoggedUser(null);
    }
    
    return ( 
        <section className={`h-screen max-w-20 flex-col items-center py-5 p-2 
                md:flex xs:hidden`}>
            <div className='flex flex-col gap-3'>
                <FaReact 
                className='text-[#27AE60] text-5xl cursor-pointer'
                />
                <img className='w-12 h-12 rounded-full object-cover cursor-pointer' src={loggedUser?.profilePic} alt="User Profile Pic for chat application" />
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

                {/* <button 
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
                </button> */}
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
                <IoLogOutOutline onClick={handleLogout} className='text-gray-400 text-4xl cursor-pointer transition-colors duration-100 hover:text-gray-500'/>
            </div>
        </section>
    );
}
 
export default SideMenu;