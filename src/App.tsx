import {
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import { Main } from "./layouts/main";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { DProjects } from "./pages/Projects/Categories/d-projects";
import { Designfurniture } from "./pages/Projects/Categories/design-furniture";
import { ExceptionalLuxury } from "./pages/Projects/Categories/exceptional-luxury";
import { HospitalityStore } from "./pages/Projects/Categories/hospitality-store";

const AMD = () => {
	return (
		<Router>
			<Main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/projects" element={<Projects />} />
					<Route
						path="/projects/exceptional-luxury"
						element={<ExceptionalLuxury />}
					/>
					<Route
						path="/projects/hospitality-store"
						element={<HospitalityStore />}
					/>
					<Route path="/projects/3d-projects" element={<DProjects />} />
					<Route
						path="/projects/design-furniture"
						element={<Designfurniture />}
					/>
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</Main>
		</Router>
	);
};

export default AMD;
