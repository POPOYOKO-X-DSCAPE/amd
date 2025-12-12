import { Stack } from "@packages/ui";
import { css } from "@styles";

interface FooterAdressProps {
  title: string;
  content: string;
}

const styles = {
  container: css({
    width: "218px",
    gap: "s.xs",
  }),
  title: css({
    textStyle: "footer.section.title",
  }),
  content: css({
    textStyle: "body.xs",
  }),
};

const FooterAdress: React.FC<FooterAdressProps> = ({ title, content }) => (
  <Stack className={styles.container}>
    <span className={styles.title}>{title}</span>
    <span className={styles.content}>{content}</span>
  </Stack>
);

export default FooterAdress;
