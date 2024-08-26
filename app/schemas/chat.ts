import {z} from "zod";

export const ChatIdSchema = z.string()
export type ChatId = z.infer<typeof ChatIdSchema>

export const UsernameSchema = z.string()
export type Username = z.infer<typeof UsernameSchema>

export const SentChatMessageSchema = z.object({
    content: z.string(),
    clientId: z.number(),
})
export type SentChatMessage = z.infer<typeof SentChatMessageSchema>

export const ChatMessageSchema = SentChatMessageSchema.extend({
    clientId: z.number(),
    author: UsernameSchema,
    id: z.number(),
    at: z.string().datetime()
})
export type ChatMessage = z.infer<typeof ChatMessageSchema>

