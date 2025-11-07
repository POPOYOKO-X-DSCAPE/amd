import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useNavigate } from "react-router-dom";
import ListElement from "../../components/list-element";
import Section from "../../components/section";

const styles = {
  content: css({
    gap: "24px",
  }),
};

export const Projects = () => {
  const navigate = useNavigate();

  const categories = [
    { label: "Exceptional & Luxury", path: "/projects/exceptional-luxury" },
    { label: "Hospitality & Store", path: "/projects/hospitality-store" },
    { label: "3D Projects", path: "/projects/3d-projects" },
    { label: "Design furniture", path: "/projects/design-furniture" },
  ];
  return (
    <Stack>
      <Section title="Projets" number={1}>
        <Stack className={styles.content}>
          {categories.map((category) => (
            <ListElement
              key={category.path}
              label={category.label}
              onClick={() => navigate(category.path)}
            />
          ))}
        </Stack>
      </Section>
    </Stack>
  );
};
