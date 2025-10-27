import ListElement from "../../../components/list-element";
import { CategoryLayout } from "../../../layouts/projects";

export const HospitalityStore = () => {
  return (
    <CategoryLayout title="Hospitality & Store - Projets">
      <ListElement label="Hôtel Boutique Paris" />
      <ListElement label="Restaurant Étoilé" />
      <ListElement label="Concept Store Londres" />
      <ListElement label="Spa de Luxe" />
    </CategoryLayout>
  );
};
