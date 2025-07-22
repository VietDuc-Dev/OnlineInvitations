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
import { loginSchema } from "@/lib/validation/auth.validation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginMutationFn } from "@/lib/api/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        // if (response.data.mfaRequired) {
        //   router.replace(`/verify-mfa?email=${values.email}`);
        //   return;
        // }
        router.replace("/");
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
          <Card className="w-full max-w-md shadow-2xl ">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập</h1>

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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
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

                  <div className="flex items-center space-x-2 text-sm xl:w-xl">
                    <Link
                      href="/"
                      className="underline-offset-4 hover:underline hover:text-primary"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-md shadow hover:opacity-90 transition"
                  >
                    {isPending && <Loader className="animate-spin" />}
                    Đăng nhập
                  </Button>
                </form>
              </Form>
              <p className="text-center text-sm mt-4">
                Bạn chưa có tài khoản?{" "}
                <Link
                  href="/signup"
                  className="text-primary font-medium underline-offset-4 hover:underline"
                >
                  Đăng ký
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
