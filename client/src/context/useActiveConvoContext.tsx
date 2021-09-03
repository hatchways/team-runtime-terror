import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { Conversation } from '../interface/Conversation';

interface IActiveConversation {
  conversations: Conversation | null | undefined;
  updateActiveConversation: (data: any) => void;
}

export const ActiveConversation = createContext<IActiveConversation>({
  conversations: undefined,
  updateActiveConversation: () => null,
});

export const ConversationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation | any | null | undefined>();

  const updateActiveConversation = useCallback((data: any) => {
    setConversations(data);
  }, []);

  return (
    <ActiveConversation.Provider value={{ conversations, updateActiveConversation }}>
      {' '}
      {children}{' '}
    </ActiveConversation.Provider>
  );
};

export function useConversation(): IActiveConversation {
  return useContext(ActiveConversation);
}
