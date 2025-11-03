import { App, DocumentViewer, Stack } from "@packages/ui";
import { css } from "@styles";

import Footer from "../../components/footer";
import { AMDHeader } from "../../components/header";
import Separator from "../../components/separator";

import { assets } from "../../assets/assets";

const styles = {
  container: css({
    width: "100%",
    maxWidth: "s.FluxMaxWidth",
  }),
  content: css({
    _mobile: {
      padding: "s.m",
    },
    _desktop: {
      padding: "none",
    },
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
  return (
    <App>
      <Stack grow>
        <AMDHeader />
        <Stack scrollable grow className={styles.scrollable}>
          <Stack alignItems="center">
            <Stack className={styles.container}>
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
