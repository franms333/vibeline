import { CiCircleInfo } from "react-icons/ci";
import UserPic from '../../assets/profile_pic.jpg';
import { IoVideocamOutline } from "react-icons/io5";
import { Conversation } from "../../App";

type ChatLogHeaderProps = {
    activeChat:Conversation
}

const ChatLogHeader = ({activeChat}:ChatLogHeaderProps) => {
    return ( 
        <section className="flex items-center justify-between w-full border-b border-gray-200">
            <div className="flex items-center gap-4 p-4 cursor-pointer">
                <img src={activeChat.users[0].profilePic} alt="User Picture" className='rounded-full w-12 h-12 object-cover' />
                <div className='flex flex-col'>
                    <h2 className='text-base font-bold'>{activeChat.users[0].username}</h2>
                    <p className='text-sm text-[#52be80] font-normal'>Online</p>
                </div>
            </div>
            <div className='flex items-center gap-6 mr-10'>
                <IoVideocamOutline className='text-4xl text-[#52be80] cursor-pointer transition-colors duration-100 hover:text-[#27ae60]'/>
                <CiCircleInfo className='text-4xl text-gray-500 cursor-pointer transition-colors duration-100 hover:text-gray-700'/>
            </div>
        </section>
    );
}
 
export default ChatLogHeader;