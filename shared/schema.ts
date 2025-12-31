import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages, {
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
}).omit({
  id: true,
  createdAt: true
}).refine((data) => data.email || data.phone, {
  message: "Email lub numer telefonu jest wymagany",
  path: ["email"],
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
