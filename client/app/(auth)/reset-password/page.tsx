"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
import { resetPasswordSchema } from "@/lib/validation/auth.validation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordMutationFn } from "@/lib/api/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { AlertCircleIcon, ArrowLeft, Frown, Loader } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const router = useRouter();
  const [isAlert, setIsAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useSearchParams();
  const code = params.get("code");
  const exp = Number(params.get("exp"));
  const now = Date.now();

  const isValid = code && exp && exp > now;

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordMutationFn,
  });

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    if (!code || typeof code !== "string" || code.trim() === "") {
      router.replace("/forgot-password?email=");
      return;
    }
    const data = {
      password: values.password,
      verificationCode: code,
    };
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        router.replace("/signin");
      },
      onError: (error) => {
        setErrorMessage(error.message);
        setIsAlert(true);
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
            {isValid ? (
              <CardContent className="p-6">
                <div className="flex md:h-[58vh] flex-col gap-2 items-center justify-center rounded-md">
                  <h1 className="text-2xl font-bold text-center mb-6">
                    Đặt mật khẩu mới
                  </h1>

                  <p className="text-sm text-muted-foreground dark:text-[#f1f7feb5]">
                    Đặt lại mật khẩu của bạn phải khác với mật khẩu trước đó.
                  </p>

                  <Form {...form}>
                    <form
                      className="space-y-4 w-full"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
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

                      {isAlert && (
                        <Alert variant="destructive">
                          <AlertCircleIcon />
                          <AlertTitle>{errorMessage}</AlertTitle>
                        </Alert>
                      )}

                      <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-md shadow hover:opacity-90 transition"
                      >
                        {isPending && <Loader className="animate-spin" />}
                        Đổi mật khẩu
                      </Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
            ) : (
              <CardContent className="p-6">
                <div className="flex md:h-[58vh] flex-col gap-2 items-center justify-center rounded-md">
                  <div className="size-[48px]">
                    <Frown
                      size="48px"
                      className="animate-bounce text-red-500"
                    />
                  </div>
                  <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
                    Đường dẫn không hợp lệ hoặc đã hết hạn
                  </h2>
                  <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
                    Bạn cần yêu cầu đặt lại mật khẩu để quay lại trang này
                  </p>
                  <Link href="/forgot-password?email=">
                    <Button className="h-[40px]">
                      <ArrowLeft />
                      Đến trang quên mật khẩu
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
