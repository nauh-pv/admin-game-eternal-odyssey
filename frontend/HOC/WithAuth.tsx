import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import LayoutWrapper from "@/shared/layout-components/LayoutWrapper";
import { LoadingComponent } from "@/components/Loading";

interface WithAuthProps {
  requiredRole?: "user" | "partner";
  redirectIfNotAuth?: string;
  layout?: string;
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthProps = {}
) => {
  const { requiredRole, redirectIfNotAuth = "/sign-in", layout } = options;

  const ComponentWithAuth = memo((props: P) => {
    const router = useRouter();
    const { isAuthenticated, user } = useSelector(
      (state: RootState) => state.auth
    );
    const [hasMounted, setHasMounted] = useState(false);

    // Đảm bảo component chỉ mount một lần
    useEffect(() => {
      setHasMounted(true);
    }, []);

    // Điều hướng dựa trên trạng thái xác thực khi `hasMounted` là true
    useEffect(() => {
      if (!hasMounted) return;

      // Điều kiện khi người dùng chưa xác thực và cần quyền truy cập
      if (!isAuthenticated && requiredRole) {
        router.replace(redirectIfNotAuth);
      } else if (
        isAuthenticated &&
        (router.pathname === "/sign-in" || router.pathname === "/sign-up")
      ) {
        // Điều kiện khi người dùng đã xác thực nhưng đang ở trang đăng nhập
        router.replace("/");
      } else if (
        isAuthenticated &&
        requiredRole &&
        user?.role !== requiredRole
      ) {
        // Điều kiện khi người dùng đã xác thực nhưng không có quyền truy cập
        router.replace("/505");
      }
    }, [isAuthenticated, requiredRole, user?.role, hasMounted]);

    if (!hasMounted) {
      return <LoadingComponent />;
    }

    return (
      <LayoutWrapper layout={layout}>
        <WrappedComponent {...props} />
      </LayoutWrapper>
    );
  });

  return ComponentWithAuth;
};

export default withAuth;
