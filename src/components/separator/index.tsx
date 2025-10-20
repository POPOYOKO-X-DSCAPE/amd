import { css } from "@styles";

const styles = {
  separator: css({
    backgroundColor: "s.fg.default.initial",
    border: "none",
    height: "1px",
    alignItems: "stretch",
    width: "100%",
  }),
};

export const Separator = () => <hr className={styles.separator} />;

export default Separator;
