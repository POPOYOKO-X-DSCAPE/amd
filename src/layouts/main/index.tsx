import { App, Stack } from "@packages/ui";
import { css } from "@styles";

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer";
import { AMDHeader } from "../../components/header";

const styles = {
  container: css({
    width: "100%",
    maxWidth: "s.FluxMaxWidth",
    overflowX: "hidden",
  }),
  content: css({
    padding: "s.m",
    _desktop: { padding: "0" },
    "@media screen and (max-width: 2560px)": {
      paddingX: "s.m",
    },
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
  const location = useLocation();
  const scrollableRef = useRef<HTMLDivElement>(null);

  console.log(scrollableRef);

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
              b
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
