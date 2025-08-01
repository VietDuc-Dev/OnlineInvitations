"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { verifyEmailMutationFn } from "@/lib/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { Loader, MailCheckIcon } from "lucide-react";
import Image from "next/image";
import BannerAuth from "@/public/images/banner-auth.jpg";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ConfirmAccount() {
  const router = useRouter();

  const params = useSearchParams();
  const code = params.get("code");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!code) {
      toast.error("Không tìm thất token");
      return;
    }
    mutate(
      { code },

      {
        onSuccess: (data) => {
          toast.success(data.data.message);
          router.replace("/signin");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
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
        <div className="flex flex-col justify-center items-center px-6 py-12">
          <Card className="w-full max-w-md shadow-2xl">
            <CardContent className="p-6">
              <div className="flex md:h-[58vh] flex-col gap-2 items-center justify-center rounded-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                  Xác minh tài khoản
                </h1>
                <div className="size-[60px]">
                  <MailCheckIcon size="60px" className="animate-bounce" />
                </div>

                <p className="text-sm text-muted-foreground dark:text-[#f1f7feb5]">
                  Để xác minh tài khoản của bạn vui lòng bấm vào nút bên dưới.
                </p>

                <form onSubmit={handleSubmit}>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary text-primary-foreground text-center px-6 py-2 rounded-md shadow hover:opacity-90 transition"
                  >
                    {isPending && <Loader className="animate-spin" />}
                    Xác minh tài khoản
                  </Button>
                </form>

                <p className="mt-6 text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
                  Nếu có bất kỳ vấn đề nào về việc xác minh tài khoản, liên hệ
                  qua{" "}
                  <a
                    className="outline-none transition duration-150 ease-in-out 
            focus-visible:ring-2 text-primary hover:underline focus-visible:ring-primary"
                    href="#"
                  >
                    levietduc.dev@gmail.com
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
