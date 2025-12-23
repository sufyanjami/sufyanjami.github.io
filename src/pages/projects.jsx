import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/projects.css";

const ProjectsPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "projects");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Projects | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="projects" />
				<div className="content-wrapper">
					<div className="projects-logo-container">
						<div>
							<br />
						</div>
					</div>

					<div className="projects-container">
						<div className="title projects-title">
							Projects
						</div>

						<div className="projects-grid">
							{INFO.projects.map((project, index) => (
								project.slug ? (
									<Link
										to={`/project/${project.slug}`}
										className="projects-card"
										key={index}
									>
										<div className="projects-card-title">{project.title}</div>
										<div className="projects-card-description">
											{project.description}
										</div>
										<div className="projects-card-tech">
											{project.tech.map((tech, techIndex) => (
												<span className="projects-tech-tag" key={techIndex}>
													{tech}
												</span>
											))}
										</div>
										<div className="projects-card-link">
											View details
											<FontAwesomeIcon icon={faArrowRight} className="projects-card-arrow" />
										</div>
									</Link>
								) : (
									<div
										className="projects-card projects-card-placeholder"
										key={index}
									>
										<div className="projects-card-title">{project.title}</div>
										<div className="projects-card-description">
											{project.description}
										</div>
										<div className="projects-card-tech">
											{project.tech.map((tech, techIndex) => (
												<span className="projects-tech-tag" key={techIndex}>
													{tech}
												</span>
											))}
										</div>
										<div className="projects-card-coming-soon">Coming Soon</div>
									</div>
								)
							))}
						</div>

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProjectsPage;
