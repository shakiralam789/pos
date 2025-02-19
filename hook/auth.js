import useSWR from "swr";
import { useCallback, useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import apiRequest from "@/lib/apiRequest";
import { getCookieByName } from "@/components/helper/helper";
let userLoading = true;

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "/api/v1/profile",
    () =>
      apiRequest({ url: "/api/v1/profile" })
        .then((data) => {
          userLoading = false;
          let isProfileCompleted = data.data.is_profile_completed || false;
          if (!isProfileCompleted && window.location.pathname !== "/profile") {
            router.push("/profile");
          }
          return data.data;
        })
        .catch((error) => {
          userLoading = false;
          if (error.status !== 409) throw error;

          router.push("/verify-email");
        }),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );
  const csrf = () => apiRequest({ url: "/sanctum/csrf-cookie", method: "GET" });

  const register = async ({ setErrors, setLoading, ...props }) => {
    await csrf();

    setErrors([]);
    setLoading(true);

    apiRequest({ url: "/api/v1/register", method: "POST", data: props })
      .then((data) => {
        mutate();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error?.response?.status === 422) {
          setErrors(error?.response?.data?.errors || {});
        }
      });
  };

  const login = async ({ setErrors, setStatus, setLoading, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);
    setLoading(true);

    apiRequest({
      url: "/api/v1/login",
      method: "POST",
      data: props,
      credentials: "include",
    })
      .then(() => {
        mutate();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error?.response?.status === 422) {
          setErrors(error?.response?.data?.errors || {});
        }
      });
  };

  const OTPLogin = async ({ ...props }) => {
    await csrf();
    return await apiRequest({
      url: "/api/v1/login-otp-send",
      method: "POST",
      data: props,
    });
  };

  const verifyOTP = async ({ ...props }) => {
    await csrf();
    return await apiRequest({
      url: "/api/v1/login-otp-verify",
      method: "POST",
      data: props,
    });
  };

  const verifyForgottenOTP = async ({ ...props }) => {
    await csrf();
    return await apiRequest({
      url: "/api/v1/verify-otp",
      method: "POST",
      data: props,
    });
  };

  const forgotPassword = async ({ email }) => {
    await csrf();

    return await apiRequest({
      url: "/api/v1/forget-password",
      method: "POST",
      data: { email },
    });
  };

  const resetPassword = async (data) => {
    await csrf();
    return await apiRequest({
      url: "/api/v1/reset-password",
      method: "POST",
      data: data,
    });
  };

  const resendEmailVerification = ({ setStatus }) => {
    apiRequest({
      url: "/email/verification-notification",
      method: "POST",
    }).then((data) => setStatus(data.status));
  };

  const logout = useCallback(async () => {
    if (!error) {
      try {
        await apiRequest({
          url: "/api/v1/logout",
          method: "POST",
          credentials: "include",
        });

        // mutate(null);

        // router.push("/login");
        window.location.href = "/login";
      } catch (err) {}
    }
  }, [error, router]);

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      let routePath = getCookieByName("lastRoute");
      if (routePath) {
        router.push(routePath);
      } else {
        router.push("/");
      }
    }
    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error,router]);

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
