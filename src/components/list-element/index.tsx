import { Stack } from "@packages/ui";
import { css } from "@styles";
import { assets } from "../../assets/assets";

interface ListElementProps {
  label: string;
  SpeechBalloon?: boolean;
}

const styles = {
  container: css({}),
  icon: css({}),
};

export const ListElement = ({
  label,
  SpeechBalloon = false,
}: ListElementProps) => {
  return (
    <Stack direction="row" className={styles.container}>
      {SpeechBalloon && (
        <img
          src={assets.SpeechBalloon}
          alt="Speech Balloon"
          className={styles.icon}
        />
      )}
      {label}
    </Stack>
  );
};

export default ListElement;
