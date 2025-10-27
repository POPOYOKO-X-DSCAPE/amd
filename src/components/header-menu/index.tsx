import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Button } from "../button";
import MenuOption from "../menu-option";
import Separator from "../separator";

const styles = {
  menu: css({
    padding: "24px",
    height: "100%",
    borderBottom: "solid 1px",
    borderColor: "s.fg.default.initial",
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
  button: css({
    paddingTop: "4px",
    alignSelf: "stretch",
  }),
};

interface HeaderMenuProps {
  language: string;
  theme: string;
  onLanguageChange: (language: string) => void;
  onThemeChange: (theme: string) => void;
  onCloseMenu?: () => void;
}

export const HeaderMenu = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
  onCloseMenu,
}: HeaderMenuProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onCloseMenu) {
      onCloseMenu();
    }
  };
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

        <Stack alignItems="center" className={styles.button}>
          <Button
            level="secondary"
            label="Home"
            onClick={() => handleNavigation("/")}
          />
        </Stack>
        <Stack alignItems="center" className={styles.button}>
          <Button
            level="secondary"
            label="Projects"
            onClick={() => handleNavigation("/projects")}
          />
        </Stack>

        <Stack className={styles.menuseparator}>
          <Separator />
        </Stack>

        <Stack alignItems="center" className={styles.button}>
          <Button
            level="secondary"
            label="Contact"
            position="left"
            onClick={() => handleNavigation("/contact")}
          >
            <img src={assets.SpeechBalloon} alt="Contact" />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HeaderMenu;
