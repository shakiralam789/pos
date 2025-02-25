import useSWR from "swr";
import { useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import { getCookieByName } from "@/components/helper/helper";
import { useForm } from "./_customUseForm";

let userLoading = true;

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const { get, processing, apiErrors } = useForm();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/v1/profile", () => get("/api/v1/profile"));

  const csrf = get("/sanctum/csrf-cookie");

  const register = async ({ post, data }) => {
    await csrf();
    return await post("/api/v1/register", data);
  };

  const login = async ({ post, data }) => {
    await csrf();
    return await post("/api/v1/login", data);
  };

  const OTPLogin = async ({ post, data }) => {
    await csrf();
    return await post("/api/v1/login-otp-send", data);
  };

  const verifyOTP = async ({ post, data }) => {
    await csrf();
    return await post("/api/v1/login-otp-verify", data);
  };

  const verifyForgottenOTP = async ({ post, data }) => {
    await csrf();
    return await post("/api/v1/verify-otp", data);
  };

  const forgotPassword = async ({ post, data }) => {
    await csrf();
    return await post("/api/v1/forget-password", data);
  };

  const resetPassword = async ({ post, data }) => {
    await csrf();
    return await post("/api/v1/reset-password", data);
  };

  const resendEmailVerification = async ({ post, data }) => {
    return await post("/email/verification-notification", data);
  };

  const logout = async ({ post, data }) => {
    await csrf();
    return await post("/api/v1/logout", data);
  };

  useEffect(() => {
    // if (middleware === "guest" && redirectIfAuthenticated && user) {
    //   let routePath = getCookieByName("lastRoute");
    //   if (routePath) {
    //     router.push(routePath);
    //   } else {
    //     router.push("/");
    //   }
    // }
    // if (window.location.pathname === "/verify-email" && user?.email_verified_at)
    //   router.push(redirectIfAuthenticated);
    // if (middleware === "auth" && error) logout();
  }, [user, error, router]);

  return {
    userLoading,
    user,
    register,
    login,
    OTPLogin,
    verifyForgottenOTP,
    verifyOTP,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
