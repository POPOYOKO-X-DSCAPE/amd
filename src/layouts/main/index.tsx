import { App, DocumentViewer, Stack } from "@packages/ui";
import { css } from "@styles";

import Caroussel from "../../components/caroussel";
import Footer from "../../components/footer";
import { AMDHeader } from "../../components/header";
import Separator from "../../components/separator";
import { Ticker } from "../../components/ticker";

import { assets } from "../../assets/assets";

const styles = {
  app: css({
    height: "100vh",
    backgroundColor: "s.bg.default.initial",
    color: "s.fg.default.initial",
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    padding: "64px 16px 10px 16px",
  }),
};

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  const images = [
    assets.chaletCine,
    assets.chaletExterieur,
    assets.chaletPiscine,
  ];
  return (
    <App>
      <Stack scrollable direction="column" className={styles.app}>
        <AMDHeader />
        <div className={styles.content}>
          <Stack>
            <Caroussel>
              {images.map((image) => (
                <img key={image} src={image} alt={image} />
              ))}
            </Caroussel>
          </Stack>

          <Ticker />

          <Separator />
          <main>{children}</main>
        </div>
        a
        <Footer />
      </Stack>
    </App>
  );
};
