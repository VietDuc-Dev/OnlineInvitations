import z from "zod";

export const registerSchema = z
  .object({
    username: z.string().trim().min(1, {
      message: "Bạn phải nhập tên",
    }),
    email: z.string().trim().min(1, {
      message: "Bạn phải nhập email",
    }),
    password: z.string().trim().min(1, {
      message: "Bạn phải nhập mật khẩu",
    }),
    confirmPassword: z.string().min(1, {
      message: "Bạn phải nhập xác nhận mật khẩu",
    }),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().trim().min(1, {
    message: "Bạn phải nhập email",
  }),
  password: z.string().trim().min(1, {
    message: "Bạn phải nhập mật khẩu",
  }),
});

export const emailSchema = z.object({
  email: z.string().trim().min(1, { message: "Bạn phải nhập email" }),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().trim().min(1, {
      message: "Bạn phải nhập mật khẩu",
    }),
    confirmPassword: z.string().min(1, {
      message: "Bạn phải nhập xác nhận mật khẩu",
    }),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });
