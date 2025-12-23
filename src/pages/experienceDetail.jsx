import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";

import useScrollToTop from "../hooks/useScrollToTop";
import INFO from "../data/user";

import "./styles/experienceDetail.css";

const ExperienceDetail = () => {
	const { slug } = useParams();
	const job = INFO.jobs.find((j) => j.slug === slug);

	useScrollToTop();

	if (!job) {
		return <Navigate to="/404" replace />;
	}

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${job.role} at ${job.company} | Sufyan Jami`}</title>
				<meta
					name="description"
					content={`${job.role} at ${job.company} - ${job.summary}`}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar />
				<div className="content-wrapper">
					<div className="experience-detail-container">
						<Link to="/" className="experience-detail-back">
							<FontAwesomeIcon icon={faArrowLeft} />
							<span>Back to home</span>
						</Link>

						<div className="experience-detail-header">
							<div className="experience-detail-role">{job.role}</div>
							<div className="experience-detail-company">{job.company}</div>
							<div className="experience-detail-duration">{job.duration}</div>
						</div>

						<div className="experience-detail-summary">{job.summary}</div>

						<div className="experience-detail-projects">
							{job.projects.map((project, index) => (
								<div className="experience-detail-project" key={index}>
									<div className="experience-detail-project-title">
										{project.title}
									</div>
									<div className="experience-detail-project-description">
										{project.description}
									</div>
								</div>
							))}
						</div>

						<div className="experience-detail-tech">
							<div className="experience-detail-tech-label">Tech Used</div>
							<div className="experience-detail-tech-list">
								{job.tech.map((tech, index) => (
									<span className="experience-detail-tech-tag" key={index}>{tech}</span>
								))}
							</div>
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

export default ExperienceDetail;
