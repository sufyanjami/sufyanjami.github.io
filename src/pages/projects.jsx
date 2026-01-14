import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";

import useScrollToTop from "../hooks/useScrollToTop";
import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/projects.css";

const ProjectsPage = () => {
	useScrollToTop();
	const [activeFilter, setActiveFilter] = useState(null);

	const currentSEO = SEO.find((item) => item.page === "projects");

	// Get unique tech tags from all projects
	const allTechTags = useMemo(() => {
		const tags = new Set();
		INFO.projects.forEach(project => {
			if (project.slug) {
				project.tech.forEach(tech => tags.add(tech));
			}
		});
		return Array.from(tags).sort();
	}, []);

	// Filter projects based on active filter
	const filteredProjects = useMemo(() => {
		if (!activeFilter) return INFO.projects;
		return INFO.projects.filter(project =>
			project.slug && project.tech.includes(activeFilter)
		);
	}, [activeFilter]);

	const handleFilterClick = (tech) => {
		setActiveFilter(activeFilter === tech ? null : tech);
	};

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
						<div className="subtitle projects-subtitle">
							Side projects and developer tools I've built to solve real problems.
						</div>

						<div className="projects-filter">
							<span className="projects-filter-label">Filter by tech:</span>
							<div className="projects-filter-tags">
								{allTechTags.map((tech) => (
									<button
										key={tech}
										className={`projects-filter-tag ${activeFilter === tech ? 'active' : ''}`}
										onClick={() => handleFilterClick(tech)}
									>
										{tech}
									</button>
								))}
								{activeFilter && (
									<button
										className="projects-filter-clear"
										onClick={() => setActiveFilter(null)}
									>
										Clear filter
									</button>
								)}
							</div>
						</div>

						<div className="projects-grid">
							{filteredProjects.map((project, index) => (
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
												<span className="projects-tech-tag" key={techIndex}>{tech}</span>
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
												<span className="projects-tech-tag" key={techIndex}>{tech}</span>
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
