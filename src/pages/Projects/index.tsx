import { Stack } from "@packages/ui";
import { css } from "@styles";
import ListElement from "../../components/list-element";
import Section from "../../components/section";

const styles = {
  content: css({
    gap: "24px",
  }),
};

export const Projects = () => {
  return (
    <Stack>
      <Section title="Projets" number={1}>
        <Stack className={styles.content}>
          <ListElement label="Exceptional & Luxury" />
          <ListElement label="Hospitality & Store" />
          <ListElement label="3D Projects" />
          <ListElement label="Design furniture" />
        </Stack>
      </Section>
    </Stack>
  );
};
