import { Conversation } from '../../App';
import UserPic from '../../assets/profile_pic.jpg';

type ChatListItemProps = {
    chatItem: Conversation;
    onSelectedItem: (chat:Conversation) => void;
}

const ChatListItem = ({chatItem ,onSelectedItem}:ChatListItemProps) => {
    return ( 
        <li 
        onClick={()=>onSelectedItem(chatItem)}
        className="flex items-center gap-4 max-h-14 py-8 pl-5 pr-6 cursor-pointer hover:bg-gray-300">
            <img src={chatItem.users[0].profilePic} alt="User Picture" className='rounded-full w-10 h-10 object-cover' />


            <div className='flex flex-col grow'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-base font-bold'>{chatItem.users[0].username}</h2>
                    <p className='text-sm text-gray-400'>16:45</p>
                </div>
                <div className='flex justify-between items-center'>
                    <h2 className='text-base text-gray-400'>Welcome!</h2>
                    {/* <p className='text-sm text-gray-400'>16:45</p> */}
                </div>
            </div>
        </li>
    );
}
 
export default ChatListItem;