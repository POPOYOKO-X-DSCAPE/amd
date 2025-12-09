import { Button } from "@ariakit/react";
import { Stack } from "@packages/ui";
import { css } from "@styles";
import classNames from "classnames";
import { Route, Routes, href } from "react-router-dom";
import Arrow from "../../assets/svgs/ArrowRight.svg?react";

interface ListElementProps {
  label: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const styles = {
  container: css({
    paddingTop: "s.xs",
    cursor: "pointer",
    textAlign: "right",
    lineHeight: "24px",
    _desktop: {
      lineHeight: "40px",
      marginBottom: "s.xs",
      _last: {
        marginBottom: "0",
      },
    },
    "& .arrow": {
      paddingRight: "10px",
      left: 0,
      top: "42px",
      opacity: 0,
      transition: "all .2s ease-in-out",
      _mobile: {
        display: "none",
      },
    },
    _hover: {
      "& .arrow": {
        opacity: 1,
        top: "-4px",
      },
    },
  }),
  label: css({
    color: "s.fg.default.initial",
    textStyle: "emphasis",
  }),
  arrow: css(),
};

export const ListElement = ({ label, onClick }: ListElementProps) => {
  return (
    <Button
      style={{ justifyContent: "flex-end" }}
      className={styles.container}
      onClick={onClick}
      type="button"
    >
      <Stack direction="row" alignItems="center">
        <Stack className={classNames(styles.arrow, "arrow")}>
          <Arrow />
        </Stack>
        <Stack className={styles.label}>{label}</Stack>
      </Stack>
    </Button>
  );
};

export default ListElement;
