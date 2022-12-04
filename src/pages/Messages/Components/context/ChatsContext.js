import { createContext, useContext, useReducer  } from "react";
export const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
    // const [chat, setChat] = useState({});
    
    const INITIAL_STATE = {
        text: "",
        senderName: "",
        senderId: "",
        date: "",
    }
    const ChatsReducer = (state, action) => {
        console.log("context",action.payload)
        switch (action.type) {
        case "CHANGE_CHAT":
            return {
                ...state,
                text: action.payload.text,
                senderName: action.payload.senderName,
                senderId: action.payload.senderId,
                date: action.payload.date,
            };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(ChatsReducer, INITIAL_STATE);

    return (
        <ChatsContext.Provider value={{ chat: state, dispatch }}>
        {children}
        </ChatsContext.Provider>
    );
    }
