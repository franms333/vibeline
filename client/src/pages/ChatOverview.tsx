import ChatList from "../components/ChatList";
import ChatLog from "../components/ChatLog";
import { Conversation } from "../shared/Types";

type ChatOverviewProps = {
    activeChat: Conversation | null
}

const ChatOverview = ({activeChat}:ChatOverviewProps) => {

    return ( 
        <>
            <section className='grid w-full h-screen
                    lg:grid-cols-master-detail-desktop'>
            <ChatList/>
            {activeChat && 
                <ChatLog/>
            }
            </section>
        </>
    );
}
 
export default ChatOverview;