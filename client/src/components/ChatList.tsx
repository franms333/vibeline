
import ListHeader from "./ChatList/ListHeader";
import ChatListItem from "./ChatList/ChatListItem";

const ChatList = () => {
    return ( 
        <section className="flex flex-col border-r border-gray-200">

            <ListHeader />

            <div className="flex flex-col mt-6 h-1 grow overflow-y-auto 
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full">
                <ul>
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                </ul>
                <p className="mt-auto py-5 text-xs text-center text-gray-400 border-t border-gray-200">Your personal messages are end-to-end encrypted</p>
            </div>

        </section>
    );
}
 
export default ChatList;