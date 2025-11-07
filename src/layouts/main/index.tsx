import { App, DocumentViewer, Stack } from "@packages/ui";
import { css } from "@styles";

import Caroussel from "../../components/caroussel";
import Footer from "../../components/footer";
import { AMDHeader } from "../../components/header";
import Separator from "../../components/separator";
import { Ticker } from "../../components/ticker";

import { assets } from "../../assets/assets";

const styles = {
  container: css({
    width: "100%",
    maxWidth: "s.FluxMaxWidth",
  }),
  content: css({
    padding: "s.m",
  }),
  scrollable: css({
    backgroundColor: "s.bg.default.initial",
    color: "s.fg.default.initial",
    scrollbar: "hidden",
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
          <Stack alignItems="center">
            <Stack className={styles.container}>
              <Caroussel>
                {images.map((image) => (
                  <img key={image} src={image} alt={image} />
                ))}
              </Caroussel>
              <Ticker />
              <Separator />
              <Stack className={styles.content}>
                <main>{children}</main>
                <Footer />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </App>
  );
};
