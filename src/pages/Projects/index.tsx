import { useNavigate } from "react-router-dom";
import ListElement from "../../components/list-element";
import { CategoryLayout } from "../../layouts/projects";

export const Projects = () => {
  const navigate = useNavigate();

  return (
    <CategoryLayout title="Projets">
      <ListElement
        label="Exceptional & Luxury"
        onClick={() => navigate("/projects/exceptional-luxury")}
      />
      <ListElement
        label="Hospitality & Store"
        onClick={() => navigate("/projects/hospitality-store")}
      />
      <ListElement
        label="3D Projects"
        onClick={() => navigate("/projects/d-projects")}
      />
      <ListElement
        label="Design furniture"
        onClick={() => navigate("/projects/design-furniture")}
      />
    </CategoryLayout>
  );
};
