import { create } from 'zustand'
import { Conversation, MenuButton, Theme, User } from '../shared/Types'

interface ConversationsState {
    loggedUser: User | null,
    setLoggedUser: (user:User|null) => void,
    conversations: Conversation[],
    setConversations: (conversations:Conversation[]) => void,
    activeChat: Conversation | null,
    setActiveChat: (conversation:Conversation | null) => void,
    activeMenuButton: MenuButton;
    setActiveMenuButton: (button:MenuButton) => void,

    theme: Theme | null,
    setTheme: (theme:Theme) => void
}

const useConversationStore = create<ConversationsState>((set) => ({
        loggedUser: null,
        setLoggedUser: (user:User|null) => set(() => ({ loggedUser: user })),
        conversations: [],
        setConversations: (conversations:Conversation[]) => set(() => ({ conversations: [...conversations] })),
        activeChat: null,
        setActiveChat: (conversation:Conversation | null) => set(() => ({ activeChat: conversation })),
        activeMenuButton: 'chat',
        setActiveMenuButton: (button:MenuButton) => set(()=>({activeMenuButton:button})),

        theme: 'dark',
        setTheme: (theme:Theme) => set(()=>({theme:theme}))
    }
));

export default useConversationStore;

