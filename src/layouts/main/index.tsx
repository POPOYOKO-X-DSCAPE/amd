import { App, Stack } from "@packages/ui";
import { css } from "@styles";

import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer";
import { AMDHeader } from "../../components/header";
import Separator from "../../components/separator";

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
  const location = useLocation();
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.pathname && scrollableRef.current) {
      scrollableRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <App>
      <Stack grow>
        <AMDHeader />
        <Stack
          ref={scrollableRef}
          scrollable
          grow
          className={styles.scrollable}
        >
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
