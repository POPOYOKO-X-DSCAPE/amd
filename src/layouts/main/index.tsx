import { App } from "@packages/ui";
import Footer from "../../components/footer";
import { AMDHeader } from "../../components/header";

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <App>
      <AMDHeader />
      <main>{children}</main>
      <Footer />
    </App>
  );
};
