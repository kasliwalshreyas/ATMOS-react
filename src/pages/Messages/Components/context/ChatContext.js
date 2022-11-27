import { createContext, useContext, useReducer  } from "react";
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    // const [chat, setChat] = useState({});
    
    const INITIAL_STATE = {
        chatId : null,
        user: {}
    }
    const ChatReducer = (state, action) => {
        console.log("context",action.payload)
        const currentUser = action.payload.currentuser.id.toString();
        const selectedUser = action.payload.searchUser.id.toString();
        const combinedId = currentUser > selectedUser ? currentUser + selectedUser : selectedUser + currentUser;
        // const combinedId = "1113"
        console.log("context",action.payload)
        switch (action.type) {
        case "CHANGE_USER":
            return {
                user: action.payload.searchUser,
                chatId : combinedId
            };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(ChatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
        {children}
        </ChatContext.Provider>
    );
    }
