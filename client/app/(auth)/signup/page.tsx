"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import BannerAuth from "@/public/images/banner-auth.jpg";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { registerSchema } from "@/lib/validation/auth.validation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerMutationFn } from "@/lib/api/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    if (!acceptedTerms) {
      toast.warning("Bạn cần đồng ý với điều khoản để tiếp tục.");
      return;
    }
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-3/4 grid md:grid-cols-2 bg-secondary border rounded-xl">
        {/* Left panel with astronaut */}
        <div className="hidden md:flex items-center justify-center relative overflow-hidden rounded-xl">
          <Image
            src={BannerAuth}
            alt="Astronaut"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right panel with form */}

        <div className="flex flex-col justify-center items-center px-6 py-12">
          <Card className="w-full max-w-md shadow-2xl">
            {!isSubmitted ? (
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-center mb-6">
                  Tạo tài khoản
                </h1>

                <div className="flex justify-between mb-4">
                  <Button variant="outline" className="w-full">
                    <FaGoogle /> Đăng nhập với Google
                  </Button>
                  {/* <Button variant="outline" className="w-[48%]">
                          <FaFacebook />
                          Đăng nhập với Facebook
                        </Button> */}
                </div>
                <Form {...form}>
                  <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Tên đăng nhập" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Mật khẩu"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Xác nhận mật khẩu"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) =>
                          setAcceptedTerms(!!checked)
                        }
                      />
                      <Label htmlFor="terms" className="text-sm">
                        Tôi đồng ý với các điều khoản và chính sách bảo mật
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isPending || !acceptedTerms}
                      className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-md shadow hover:opacity-90 transition"
                    >
                      {isPending && <Loader className="animate-spin" />}
                      Đăng ký
                    </Button>
                  </form>
                </Form>
                <p className="text-center text-sm mt-4">
                  Đã có tài khoản?{" "}
                  <Link
                    href="/signin"
                    className="text-primary font-medium underline-offset-4 hover:underline"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </CardContent>
            ) : (
              <CardContent className="p-6">
                <div className="flex md:h-[58vh] flex-col gap-2 items-center justify-center rounded-md">
                  <div className="size-[60px]">
                    <MailCheckIcon size="60px" className="animate-bounce" />
                  </div>
                  <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
                    Kiểm tra email của bạn
                  </h2>
                  <p className="text-sm text-muted-foreground dark:text-[#f1f7feb5]">
                    Chúng tôi đã gửi một email xác minh đến địa chỉ{" "}
                    <span className="font-medium text-foreground">
                      {form.getValues().email}
                    </span>
                    . Hãy kiểm tra hộp thư và xác nhận.
                  </p>
                  <Link href="/signin">
                    <Button>
                      Đăng nhập
                      <ArrowRight />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
