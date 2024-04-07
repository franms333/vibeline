import { CiCircleInfo } from "react-icons/ci";
import { IoVideocamOutline, IoArrowBack } from "react-icons/io5";
import useConversationStore from "../../store/conversation-store";

const ChatLogHeader = () => {
    const activeChat = useConversationStore((state) => state.activeChat);
    const setActiveChat = useConversationStore((state) => state.setActiveChat);

    function handleGoToChatList () {
        setActiveChat(null);
    }
    
    return ( 
        <section className="flex items-center justify-between w-full border-b border-[--borders-secondary]">
            <div className="flex items-center gap-4 p-4 cursor-pointer">
                <IoArrowBack 
                onClick={handleGoToChatList}
                className={`text-2xl text-gray-500 cursor-pointer transition-colors duration-100 hover:text-gray-700
                            lg:hidden sm:${activeChat ? 'block' : 'hidden'}`}
                />
                <img src={activeChat!.users[0].profilePic} alt="User Picture" className='rounded-full w-12 h-12 object-cover' />
                <div className='flex flex-col'>
                    <h2 className='text-base font-bold'>{activeChat!.users[0].username}</h2>
                    <p className='text-sm text-[#52be80] font-normal'>Online</p>
                </div>
            </div>
            <div className='flex items-center gap-6 md:mr-10 xs:mr-3'>
                <IoVideocamOutline className='text-4xl text-[#52be80] cursor-pointer transition-colors duration-100 hover:text-[#27ae60]'/>
                <CiCircleInfo className='text-4xl text-gray-500 cursor-pointer transition-colors duration-100 hover:text-gray-700'/>
            </div>
        </section>
    );
}
 
export default ChatLogHeader;