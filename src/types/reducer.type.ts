export interface IRootReducer {
  conversations: IConversation[];
  conversationActive: string | null;
  menuOpen: boolean;
}

export interface IConversation {
  uuid: string;
  title: string;
  messages: IMessage[];
}

export interface IMessage {
  isPerson: boolean;
  content: string;
}
