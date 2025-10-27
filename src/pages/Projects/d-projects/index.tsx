import ListElement from "../../../components/list-element";
import { CategoryLayout } from "../../../layouts/projects";

export const DProjects = () => {
  return (
    <CategoryLayout title="3D Projects">
      <ListElement label="Projet Villa Médie" />
      <ListElement label="Projet PenthoueNew York" />
      <ListElement label="Projeterançais" />
      <ListElement label="Projet Re Maldives" />
    </CategoryLayout>
  );
};
