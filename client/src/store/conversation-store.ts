import { create } from 'zustand'
import { Conversation, MenuButton } from '../shared/Types'

interface ConversationsState {
    loggedUser: string | null,
    setLoggedUser: (user:string) => void,
    conversations: Conversation[],
    setConversations: (conversations:Conversation[]) => void,
    activeChat: Conversation | null,
    setActiveChat: (conversation:Conversation) => void,
    activeMenuButton: MenuButton;
    setActiveMenuButton: (button:MenuButton) => void
}

const useConversationStore = create<ConversationsState>((set) => ({
        loggedUser: null,
        setLoggedUser: (user:string) => set(() => ({ loggedUser: user })),
        conversations: [],
        setConversations: (conversations:Conversation[]) => set(() => ({ conversations: [...conversations] })),
        activeChat: null,
        setActiveChat: (conversation:Conversation) => set(() => ({ activeChat: conversation })),
        activeMenuButton: 'chat',
        setActiveMenuButton: (button:MenuButton) => set(()=>({activeMenuButton:button}))
    }
));

export default useConversationStore;

