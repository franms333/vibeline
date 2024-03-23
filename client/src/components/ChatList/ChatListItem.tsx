import { Conversation } from '../../shared/Types';
import useConversationStore from '../../store/conversation-store';

type ChatListItemProps = {
    chatItem: Conversation;
}

const ChatListItem = ({chatItem}:ChatListItemProps) => {
    const setActiveChat = useConversationStore((state) => state.setActiveChat);

    const Conversations = useConversationStore((state) => state.conversations);
    const setConversations = useConversationStore((state) => state.setConversations);

    function handleChatSelect() {
        setActiveChat(chatItem);

        const chatListItem = Conversations.find((conversation)=>conversation.id === chatItem.id);
        const index = Conversations.indexOf(chatListItem!);

        const updatedChat:Conversation = {
            ...chatListItem!,
            unreadMessages:0
        };

        let conversationsCopy = Conversations;

        conversationsCopy[index] = updatedChat;

        setConversations(conversationsCopy);
    }

    return ( 
        <li 
        onClick={handleChatSelect}
        className="flex items-center gap-4 max-h-14 py-8 pl-5 pr-6 cursor-pointer hover:bg-gray-300">
            <img src={chatItem.users[0].profilePic} alt="User Picture" className='rounded-full w-10 h-10 object-cover shrink-0' />


            <div className='flex flex-col grow'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-base font-bold'>{chatItem.users[0].username}</h2>
                    <p className='text-sm text-gray-400'>{`${new Date(chatItem.lastMessage.createdAt).getHours()}:${new Date(chatItem.lastMessage.createdAt).getMinutes()}`}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <h2 className='text-base text-gray-400 whitespace-nowrap truncate'>{chatItem.lastMessage.text}</h2>
                    <p className={`py-0.5 px-1.5 bg-[#27AE60] text-[10px] text-white rounded-full ${chatItem.unreadMessages && chatItem.unreadMessages !== 0 ? 'block' : 'hidden'}`}>
                        {chatItem.unreadMessages}
                    </p>
                    {/* <p className='text-sm text-gray-400'>{`${new Date(chatItem.lastMessage.createdAt).getUTCHours()}:${new Date(chatItem.lastMessage.createdAt).getUTCMinutes()}`}</p> */}
                </div>
            </div>
        </li>
    );
}
 
export default ChatListItem;