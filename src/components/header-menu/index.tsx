import { Stack } from "@packages/ui";
import MenuOption from "../menu-option";
import { css } from "@styles";
import { Button } from "@packages/ui";
import { assets } from "../../assets/assets";
import Separator from "../separator";

const styles = {
  menu: css({
    padding: "24px",
    height: "804px",
    borderBottom: "solid 1px",
    borderColor: "s.bg.default.initial",
  }),
  menuitems: css({
    flex: "1 0 0",

    alignItems: "center",
    alignSelf: "stretch",
  }),
  menuseparator: css({
    width: "100%",
    padding: "16px 0",
  }),
};

interface HeaderMenuProps {
  language: string;
  theme: string;
  onLanguageChange: (language: string) => void;
  onThemeChange: (theme: string) => void;
}

export const HeaderMenu = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
}: HeaderMenuProps) => {
  return (
    <Stack grow className={styles.menu}>
      <MenuOption
        type="language"
        selectedValue={language}
        onSelect={onLanguageChange}
        options={[
          { label: "En", value: "en", icon: assets.English },
          { label: "Fr", value: "fr", icon: assets.French },
        ]}
      />
      <MenuOption
        type="mode"
        selectedValue={theme}
        onSelect={onThemeChange}
        options={[
          { label: "Dark", value: "dark", icon: assets.Dark },
          { label: "Light", value: "light", icon: assets.Light },
        ]}
      />
      <Stack className={styles.menuitems}>
        <Stack className={styles.menuseparator}>
          <Separator />
        </Stack>

        <Button>Home</Button>
        <Button>Projects</Button>
        <Stack className={styles.menuseparator}>
          <Separator />
        </Stack>
        <Button>
          <img src={assets.SpeechBalloon} alt="SpeechBalloon" />
          Contact
        </Button>
      </Stack>
    </Stack>
  );
};

export default HeaderMenu;
