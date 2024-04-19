import useConversationStore from "../store/conversation-store";
import ChatListItem from "./ChatList/ChatListItem";
import ListHeader from "./ChatList/ListHeader";

import { IoChatboxEllipsesOutline } from "react-icons/io5";

const ChatList = () => {
    const Chats = useConversationStore((state) => state.conversations);
    const activeChat = useConversationStore((state) => state.activeChat);
    
    return ( 
        <section className={`flex flex-col border-r border-[--borders-secondary] relative lg:flex xs:${!activeChat ? 'flex' : 'hidden'}`}>

            <ListHeader />

            <div className="flex flex-col mt-6 min-h-1 grow overflow-y-auto 
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full">
                <ul>
                    {Chats.length > 0 && Chats.map((chat)=>(
                        <ChatListItem
                        key={chat.id}
                        chatItem={chat} 
                        />
                    ))}
                </ul>
                <p className="mt-auto py-5 text-xs text-center text-gray-400 border-t 
                              lg:border-gray-200 sm:border-gray-400">
                    Your personal messages are end-to-end encrypted
                </p>
            </div>

            {/* START NEW CHAT BUTTON FOR MOBILE */}
            <div className={`rounded-2xl p-2 bg-[#3db670] absolute bottom-16 right-2 transition-colors duration-100 hover:bg-[#31925a]
                            md:hidden`}>
                <IoChatboxEllipsesOutline 
                className="text-4xl text-white hover:"
                />
            </div>

        </section>
    );
}
 
export default ChatList;