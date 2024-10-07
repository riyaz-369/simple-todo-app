// "use client";

import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(3, { message: "Title is must 3 characters." }),
});
