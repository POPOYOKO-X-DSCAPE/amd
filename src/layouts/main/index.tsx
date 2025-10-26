import { App, DocumentViewer, Stack } from "@packages/ui";
import { css } from "@styles";

import Caroussel from "../../components/caroussel";
import Footer from "../../components/footer";
import { AMDHeader } from "../../components/header";
import Separator from "../../components/separator";
import { Ticker } from "../../components/ticker";

import { assets } from "../../assets/assets";

const styles = {
  content: css({
    padding: "0 16px 10px 16px",
  }),
  scrollable: css({
    backgroundColor: "s.bg.default.initial",
    color: "s.fg.default.initial",
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
      <Stack grow>
        <AMDHeader />
        <Stack scrollable grow className={styles.scrollable}>
          <Stack className={styles.content}>
            <Caroussel>
              {images.map((image) => (
                <img key={image} src={image} alt={image} />
              ))}
            </Caroussel>
            <Ticker />
            <Separator />
            <main>{children}</main>
            <Footer />
          </Stack>
        </Stack>
      </Stack>
    </App>
  );
};
