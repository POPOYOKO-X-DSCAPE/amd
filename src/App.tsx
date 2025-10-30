import { css } from "@styles";
import {
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import { Main } from "./layouts/main";
import { Home } from "./pages/Home";

import type React from "react";
import { Button } from "./components/button";
import Section from "./components/section";
import { editorials } from "./editorials";

type LangKey = keyof typeof editorials;
type EditorialLang = (typeof editorials)[LangKey];
type EditorialRoute = EditorialLang["routes"][number];
type RealPageProp = EditorialRoute["pageProps"][number];

interface IRenderedRoutes {
	pageProps: RealPageProp[];
}

const RouteContent = ({ pageProps }: IRenderedRoutes) => {
	let headingVideoPath: string | null = null;
	let sectionTitle = "";
	let sectionNumber = "";
	let insideSectionTitle = "";
	const sectionContent: React.ReactElement[] = [];

	for (const pageProp of pageProps) {
		switch (pageProp.type) {
			case "section":
				sectionTitle = pageProp.pageProp.title;
				sectionNumber = pageProp.pageProp.number;
				break;
			case "title":
				insideSectionTitle = pageProp.pageProp;
				break;
			case "video":
				headingVideoPath = pageProp.pageProp;
				break;
			case "text":
				sectionContent.push(
					<p className={css({ textStyle: "body.s" })}>
						{pageProp.pageProp}
					</p>,
				);
				break;
			case "button":
				sectionContent.push(<Button label={pageProp.pageProp} />);
				break;
			case "image":
				sectionContent.push(pageProp.pageProp);
				break;
			case "project-list":
				console.log(pageProp.pageProp);
				sectionContent.push(
					<Stack>
						{pageProp.pageProp.map((a, i) => (
							<ListElement label={a.slug} key={i}></ListElement>
						))}
					</Stack>,
				);
				break;
			default:
		}
	}

	return (
		<Section
			title={sectionTitle}
			number={sectionNumber}
			insideTitle={insideSectionTitle}
		>
			{sectionContent}
		</Section>
	);
};

const RenderedRoutes = () => {
	const routes = [];

	for (const [lang, data] of Object.entries(editorials)) {
		if (lang === "FR") {
			for (const route of data.routes) {
				routes.push(
					<Route
						key={route.slug}
						path={route.slug}
						element={<RouteContent pageProps={route.pageProps} />}
					/>,
				);
			}
		}
	}

	if (routes.length === 0) {
		return null;
	}
	return routes;
};

const AMD = () => {
	return (
		<Router>
			<Main>
				<Routes>
					<Route path="/" element={<Home />} />
					{RenderedRoutes()}
				</Routes>
			</Main>
		</Router>
	);
};

export default AMD;
