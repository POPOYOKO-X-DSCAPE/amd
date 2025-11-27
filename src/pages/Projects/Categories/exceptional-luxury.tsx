import ListElement from "../../../components/list-element";
import { CategoryLayout } from "../../../layouts/projects";

export const ExceptionalLuxury = () => {
  return (
    <CategoryLayout title="Exceptional & Luxury - Projets">
      <ListElement label="Projet Villa Méditerranée" />
      <ListElement label="Projet Penthouse New York" />
      <ListElement label="Projet Château Français" />
      <ListElement label="Projet Resort Maldives" />
    </CategoryLayout>
  );
};
