import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Button } from "../../components/button";
import Section from "../../components/section";

const styles = {
  content: css({
    gap: "24px",
  }),
};

interface CategoryLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const CategoryLayout = ({ title, children }: CategoryLayoutProps) => {
  const navigate = useNavigate();

  return (
    <Stack>
      <Section title={title} number={1}>
        <Stack className={styles.content}>{children}</Stack>
      </Section>
      <Button
        level="secondary"
        label="Tous les projets"
        position="left"
        onClick={() => navigate("/projects")}
      >
        <img src={assets.ArrowLeft} alt="Tous les projets" />
      </Button>
    </Stack>
  );
};
