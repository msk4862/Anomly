import UserContextProvider from "@/context/UserContext";
import ChatHome from "@/components/Chat/ChatHome";

const ChatPage = () => {
  return (
    <UserContextProvider>
      <ChatHome />
    </UserContextProvider>
  );
};

export default ChatPage;
