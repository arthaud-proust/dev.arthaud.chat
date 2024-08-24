import {z} from "zod";

export const SentChatMessageSchema = z.object({
    author: z.string(),
    content: z.string(),
})
export type SentChatMessage = z.infer<typeof SentChatMessageSchema>

export const ChatMessageSchema = SentChatMessageSchema.extend({
    id: z.number(),
    at: z.string().datetime()
})
export type ChatMessage = z.infer<typeof ChatMessageSchema>

