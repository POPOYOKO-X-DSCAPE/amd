import { Stack } from "@packages/ui";
import { css } from "@styles";
import type { ReactNode } from "react";

interface FooterAdressProps {
  title: string;
  children: ReactNode;
}

const styles = {
  container: css({
    width: "260px",
    gap: "s.xs",
  }),
  title: css({
    textStyle: "footer.section.title",
  }),
  content: css({
    textStyle: "body.xs",
  }),
};

const FooterAdress: React.FC<FooterAdressProps> = ({ title, children }) => (
  <Stack className={styles.container}>
    <span className={styles.title}>{title}</span>
    <span className={styles.content}>{children}</span>
  </Stack>
);

export default FooterAdress;
