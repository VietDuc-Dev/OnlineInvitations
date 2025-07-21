import API from "./axios-client";
import { LoginType, registerType } from "@/types/auth.types";

export const loginMutationFn = async (data: LoginType) =>
  await API.post("/auth/login", data);

export const registerMutationFn = async (data: registerType) =>
  await API.post("/auth/register", data);
