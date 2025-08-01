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
import { emailSchema } from "@/lib/validation/auth.validation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordMutationFn } from "@/lib/api/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { AlertCircleIcon, Loader, MailCheckIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function ForgotPassword() {
  const params = useSearchParams();
  const email = params.get("email");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordMutationFn,
  });

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = (values: z.infer<typeof emailSchema>) => {
    mutate(values, {
      onSuccess: (response: any) => {
        setErrorMessage("");
        setIsAlert(false);
        setIsSubmitted(true);
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
            <CardContent className="p-6">
              <div className="flex md:h-[58vh] flex-col gap-2 items-center justify-center rounded-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                  Đỗi mật khẩu
                </h1>
                <div className="size-[60px]">
                  <MailCheckIcon size="60px" className="animate-bounce" />
                </div>

                {!isSubmitted ? (
                  <>
                    <p className="text-sm text-muted-foreground dark:text-[#f1f7feb5]">
                      Chúng tôi sẽ gửi một email xác minh thay đỗi mật khẩu.{" "}
                      <br />
                      Bạn hãy kiểm tra hộp thư và xác nhận.
                    </p>
                    <Form {...form}>
                      <form
                        className="space-y-4 w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                      >
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="email@gmail.com"
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
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground dark:text-[#f1f7feb5]">
                      Chúng tôi đã gửi một email xác minh thay đỗi mật khẩu.{" "}
                      <br />
                      Bạn hãy kiểm tra hộp thư và xác nhận.
                    </p>
                    <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
                      Kiểm tra email của bạn
                    </h2>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
