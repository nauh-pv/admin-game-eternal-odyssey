import React from "react";
import ContentLayout from "@/shared/layout-components/layout/content-layout";
import AuthenticationLayout from "@/shared/layout-components/layout/authentication-layout";
import LandingLayout from "@/shared/layout-components/layout/landing-layout";

const layouts: {
  [key: string]: React.ComponentType<{ children: React.ReactNode }>;
} = {
  Contentlayout: ContentLayout,
  Landinglayout: LandingLayout,
  Authenticationlayout: AuthenticationLayout,
};

interface LayoutWrapperProps {
  children: React.ReactNode;
  layout?: string;
}

const LayoutWrapper = ({ children, layout }: LayoutWrapperProps) => {
  const LayoutComponent = layouts[layout ?? ""] || React.Fragment;
  return <LayoutComponent>{children}</LayoutComponent>;
};

export default LayoutWrapper;
