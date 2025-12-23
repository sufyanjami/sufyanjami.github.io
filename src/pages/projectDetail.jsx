import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { faArrowLeft, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";

import useScrollToTop from "../hooks/useScrollToTop";
import INFO from "../data/user";

import "./styles/projectDetail.css";

const ProjectDetail = () => {
	const { slug } = useParams();
	const project = INFO.projects.find((p) => p.slug === slug);

	useScrollToTop();

	if (!project || !project.slug) {
		return <Navigate to="/404" replace />;
	}

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${project.title} | Sufyan Jami`}</title>
				<meta
					name="description"
					content={project.description}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar />
				<div className="content-wrapper">
					<div className="project-detail-container">
						<Link to="/" className="project-detail-back">
							<FontAwesomeIcon icon={faArrowLeft} />
							<span>Back to home</span>
						</Link>

						<div className="project-detail-header">
							<div className="project-detail-title">{project.title}</div>
							<div className="project-detail-description">
								{project.summary}
							</div>
							<div className="project-detail-links">
								{project.link && (
									<a
										href={project.link}
										target="_blank"
										rel="noreferrer"
										className="project-detail-link"
									>
										View Live
										<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
									</a>
								)}
								{project.github && (
									<a
										href={project.github}
										target="_blank"
										rel="noreferrer"
										className="project-detail-link project-detail-link-secondary"
									>
										<FontAwesomeIcon icon={faGithub} />
										Source Code
									</a>
								)}
							</div>
						</div>

						<div className="project-detail-tech">
							<div className="project-detail-tech-label">Built With</div>
							<div className="project-detail-tech-list">
								{project.tech.map((tech, index) => (
									<span className="project-detail-tech-tag" key={index}>{tech}</span>
								))}
							</div>
						</div>

						{project.why && (
							<div className="project-detail-section">
								<div className="project-detail-section-title">Why I Built This</div>
								<div className="project-detail-section-content">
									{project.why}
								</div>
							</div>
						)}

						{project.features && (
							<div className="project-detail-section">
								<div className="project-detail-section-title">Features</div>
								<ul className="project-detail-list">
									{project.features.map((feature, index) => (
										<li key={index}>{feature}</li>
									))}
								</ul>
							</div>
						)}

						{project.highlights && (
							<div className="project-detail-section">
								<div className="project-detail-section-title">Technical Highlights</div>
								<ul className="project-detail-list">
									{project.highlights.map((highlight, index) => (
										<li key={index}>{highlight}</li>
									))}
								</ul>
							</div>
						)}

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProjectDetail;
