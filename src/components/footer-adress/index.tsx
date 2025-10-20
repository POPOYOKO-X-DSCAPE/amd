import { Stack } from "@packages/ui";
import { css } from "@styles";

interface FooterAdressProps {
  title: string;
  content: string;
}

const styles = {
  container: css({
    width: "218px",
    gap: "4px",
  }),
  title: css({
    fontFamily: "Helvetica LT Pro",
    fontWeight: 700,
    fontSize: "22px",
  }),
  content: css({
    fontFamily: "Helvetica LT Pro",
    fontWeight: 300,
    fontSize: "16px",
    letterSpacing: "0.32px",
  }),
};

const FooterAdress: React.FC<FooterAdressProps> = ({ title, content }) => (
  <Stack className={styles.container}>
    <span className={styles.title}>{title}</span>
    <span className={styles.content}>{content}</span>
  </Stack>
);

export default FooterAdress;
