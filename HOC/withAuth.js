
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";

const withAuth = (WrappedComponent) => {
  const AuthWrapper = (props) => {
    const { user, userLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!userLoading && !user) {
        router.push("/login");
      }
    }, [user, userLoading]);

    if (userLoading || !user) {
      return (
        <div className="py-6 font-medium font-16 flex justify-center">
          Loading...
          {/* <div className="size-14 shadow-lg rounded-full flex justify-center items-center">
            <Image
              className="mx-auto size-6"
              src="/images/load.gif"
              width={100}
              height={100}
              alt=""
            />
          </div> */}
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthWrapper.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthWrapper;
};

export default withAuth;
