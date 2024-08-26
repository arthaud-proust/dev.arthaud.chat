import {z} from "zod";

export const ChatIdSchema = z.string()
export type ChatId = z.infer<typeof ChatIdSchema>

export const UsernameSchema = z.string()
export type Username = z.infer<typeof UsernameSchema>

export const ChatMessageReactionSchema = z.string().emoji()
export type ChatMessageReaction = z.infer<typeof ChatMessageReactionSchema>
export const ChatMessageIdSchema = z.number()
export type ChatMessageId = z.infer<typeof ChatMessageIdSchema>

export const SentChatMessageSchema = z.object({
    content: z.string(),
    clientId: z.number(),
})
export type SentChatMessage = z.infer<typeof SentChatMessageSchema>

export const ReactToMessageSchema = z.object({
    messageId: ChatMessageIdSchema,
    reaction: ChatMessageReactionSchema,
})
export type ReactToMessage = z.infer<typeof ReactToMessageSchema>

export const ChatMessageSchema = SentChatMessageSchema.extend({
    clientId: z.number(),
    author: UsernameSchema,
    id: ChatMessageIdSchema,
    at: z.string().datetime(),
    reactions: z.record(UsernameSchema, ChatMessageReactionSchema)
})
export type ChatMessage = z.infer<typeof ChatMessageSchema>

