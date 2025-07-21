"use client";
import ThemeToggle from "@/components/theme-toggle";
import { toast } from "react-toastify";

export default function Home() {
  const notify = () => {
    toast.success("hello");
  };
  return (
    <div>
      Hello
      <ThemeToggle />
      <button onClick={notify}>Click</button>
    </div>
  );
}
