import { PageManagerProvider } from "@/shared/context/PageManagerContext";

const PageManagerLayout = ({ children }: { children: React.ReactNode }) => {
  return <PageManagerProvider>{children}</PageManagerProvider>;
};

export default PageManagerLayout;
