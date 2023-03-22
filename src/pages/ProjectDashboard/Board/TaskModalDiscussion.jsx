import { Flex, Paper } from "@mantine/core";
import ChatEditor from "./ChatEditor";
import ChatFormat from "./ChatFormat";

const dummyChat = [
    {
        "postedAt": "10 minutes ago",
        "body": "<p>I use <a href=\"https://heroku.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href=\"https://www.digitalocean.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Digital Ocean</a> VPS to save some cash.</p>",
        "author": {
            "name": "Jacob Warnhalter",
            "image": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
        }
    },
    {
        "postedAt": "10 minutes ago",
        "body": "<p>I use <a href=\"https://heroku.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href=\"https://www.digitalocean.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Digital Ocean</a> VPS to save some cash.</p>",
        "author": {
            "name": "Jacob Warnhalter",
            "image": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
        }
    },
    // {
    //     "postedAt": "10 minutes ago",
    //     "body": "<p>I use <a href=\"https://heroku.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href=\"https://www.digitalocean.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Digital Ocean</a> VPS to save some cash.</p>",
    //     "author": {
    //         "name": "Jacob Warnhalter",
    //         "image": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
    //     }
    // },
];


const TaskModalDiscussion = () => {
    return (
        <>
            <Flex direction={'column'} justify={'end'} h={'100%'}>
                <Flex direction={'column'} justify={'end'} p={20}>
                    {dummyChat.map((chat, index) => (
                        <ChatFormat
                            key={index}
                            postedAt={chat.postedAt}
                            body={chat.body}
                            author={chat.author}
                        />
                    ))}
                </Flex>
                <Paper >
                    <ChatEditor />
                </Paper>

            </Flex>
        </>
    );
}

export default TaskModalDiscussion;