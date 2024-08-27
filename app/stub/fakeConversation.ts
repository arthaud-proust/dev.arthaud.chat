import type {ChatMessage} from "@/app/schemas/chat";

export const fakeConversation: Array<ChatMessage> = [
    {
        clientId: 0,
        id: 0,
        author: "Alice",
        content: "Hey",
        at: '2020-01-01T10:00:00',
        reactions: {}
    },
    {
        clientId: 1,
        id: 1,
        author: "Alice",
        content: "you good?",
        at: '2020-01-01T10:00:00',
        reactions: {}
    },
    {
        clientId: 2,
        id: 2,
        author: "Bob",
        content: "fine, you?",
        at: '2020-01-01T10:01:00',
        reactions: {
            'Alice': "❤️"
        }
    },
    {
        clientId: 3,
        id: 3,
        author: "Alice",
        content: "yeah, wanna go to cinema with me?",
        at: '2020-01-01T10:01:00',
        reactions: {}
    },
    {
        clientId: 4,
        id: 4,
        author: "Bob",
        content: "sure",
        at: '2020-01-01T10:03:00',
        reactions: {
            'Alice': "❤️"
        }
    },
    {
        clientId: 5,
        id: 5,
        author: "Bob",
        content: "when?",
        at: '2020-01-01T10:03:00',
        reactions: {}
    },
    {
        clientId: 6,
        id: 6,
        author: "Alice",
        content: "this evening",
        at: '2020-01-01T10:04:00',
        reactions: {
            'Bob': "❤️"
        }
    },
    {
        clientId: 7,
        id: 7,
        author: "Alice",
        content: "Cars?",
        at: '2020-01-01T10:04:00',
        reactions: {}
    },
    {
        clientId: 8,
        id: 8,
        author: "Bob",
        content: "yeah, vroom vroom",
        at: '2020-01-01T10:04:00',
        reactions: {
            'Bob': "😂"
        }
    },
]