import {z} from "zod";

export const SentChatMessageSchema = z.object({
    content: z.string(),
})
export type SentChatMessage = z.infer<typeof SentChatMessageSchema>

export const ChatMessageSchema = z.object({
    id: z.number(),
    content: z.string(),
    at: z.string().datetime()
})
export type ChatMessage = z.infer<typeof ChatMessageSchema>

