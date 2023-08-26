import * as z from "zod";

export const signupSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(5).max(100),
        confirmPassword: z.string().min(5).max(100),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords do not match",
                path: ["confirmPassword"],
            });
        }
    });

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(100),
});

export type SignupType = z.infer<typeof signupSchema>;
export type LoginType = z.infer<typeof loginSchema>;
