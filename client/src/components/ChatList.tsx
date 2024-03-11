import ListHeader from "./ChatList/ListHeader";
import ChatListItem from "./ChatList/ChatListItem";
import { Conversation } from "../App";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

type ChatListProps = {
    onChatSelected: (chat:Conversation) => void;
    user: string;
}

const ChatList = ({user, onChatSelected}:ChatListProps) => {
    const [chats, setChats] = useState<Conversation[]>([]);
    const CONVERSATIONS = gql`
        query {
            Conversations(userId: "${user}") {
                id
                createdAt
                updatedAt
                users {
                    id
                    profilePic
                    username
                }
            }
        }
    `;

    const {data} = useQuery(CONVERSATIONS);

    useEffect(()=>{
        if(data){
            setChats(data.Conversations)
        }
    },[data])

    return ( 
        <section className="flex flex-col border-r border-gray-200">

            <ListHeader />

            <div className="flex flex-col mt-6 h-1 grow overflow-y-auto 
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-full">
                <ul>
                    {chats && chats.map((chat)=>(
                        <ChatListItem
                        key={chat.id}
                        onSelectedItem={onChatSelected}
                        chatItem={chat} 
                        />
                    ))}
                </ul>
                <p className="mt-auto py-5 text-xs text-center text-gray-400 border-t border-gray-200">Your personal messages are end-to-end encrypted</p>
            </div>

        </section>
    );
}
 
export default ChatList;