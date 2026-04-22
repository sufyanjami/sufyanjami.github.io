import React from "react";
import { Link } from "react-router-dom";
import { faBriefcase, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import INFO from "../../data/user";

import "./styles/experience.css";

const Experience = () => {
	return (
		<div className="experience-section">
			<div className="experience-header">
				<FontAwesomeIcon icon={faBriefcase} className="experience-icon" />
				<span className="experience-title">Experience</span>
			</div>

			<div className="experience-grid">
				{INFO.jobs.map((job) => (
					<Link
						to={`/experience/${job.slug}`}
						className="experience-card"
						key={job.slug}
					>
						<div className="experience-card-period">{job.period}</div>
						<div className="experience-card-role">{job.role}</div>
						<div className="experience-card-company">{job.company}</div>
						<div className="experience-card-oneliner">{job.oneliner}</div>
						<div className="experience-card-link">
							View details
							<FontAwesomeIcon icon={faArrowRight} className="experience-card-arrow" />
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Experience;
