export type User = {
    id:string;
    username:string;
    profilePic:string;
}
  
export type Conversation = {
    id:string;
    users: User[];
    createdAt:string;
    updatedAt:string;
    lastMessage: Message | null;
    unreadMessages?: number | null;
}

export type Message = {
    id: string,
    conversationId: string,
    userId: string,
    text: string,
    createdAt: string,
    updatedAt: string
}

export type LastMessage = {
    id:string,
    text:string,
    createdAt:string
}

export type SubscribedConversation = {
    id:string,
    lastMessage: LastMessage
}

export type Theme = 'light' | 'dark';

export type MenuButton = 'newChat' | 'chat' | 'video' | 'music' | 'calendar';