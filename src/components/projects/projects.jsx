import React from "react";
import { Link } from "react-router-dom";
import { faLaptopCode, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import INFO from "../../data/user";

import "./styles/projects.css";

const Projects = () => {
	return (
		<div className="projects-section">
			<div className="projects-header">
				<FontAwesomeIcon icon={faLaptopCode} className="projects-icon" />
				<span className="projects-title">Projects</span>
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
		</div>
	);
};

export default Projects;
