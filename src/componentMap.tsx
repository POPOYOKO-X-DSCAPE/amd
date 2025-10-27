import { NotFound } from "./pages/NotFound";
import { Contact } from "./pages/contact";
import { Home } from "./pages/home";
import { DProjects } from "./pages/projects/d-projects";
import { DesignFurniture } from "./pages/projects/design-furniture";
import { ExceptionalLuxury } from "./pages/projects/exceptional-luxury";
import { HospitalityStore } from "./pages/projects/hospitality-store";
import { Projects } from "./pages/projects/index";

export const componentMap: Record<string, React.ComponentType> = {
  "/": Home,
  "/contact": Contact,
  "/projects": Projects,
  "/projects/exceptional-luxury": ExceptionalLuxury,
  "/projects/hospitality-store": HospitalityStore,
  "/projects/d-projects": DProjects,
  "/projects/design-furniture": DesignFurniture,
  "/notfound": NotFound,
};
