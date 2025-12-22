import React from "react";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import INFO from "../../data/user";

import "./styles/techStack.css";

const TechStack = () => {
	const categories = [
		{ key: "frontend", label: "Frontend" },
		{ key: "backend", label: "Backend" },
		{ key: "cloud", label: "Cloud & DevOps" },
		{ key: "cms", label: "CMS & Legacy" },
		{ key: "integrations", label: "Integrations" },
		{ key: "tools", label: "Tools" },
	];

	return (
		<div className="techstack-section">
			<div className="techstack-header">
				<FontAwesomeIcon icon={faCode} className="techstack-icon" />
				<span className="techstack-title">Tech Stack</span>
			</div>
			<div className="techstack-grid">
				{categories.map((category) => (
					<div className="techstack-category" key={category.key}>
						<div className="techstack-category-label">{category.label}</div>
						<div className="techstack-items">
							{INFO.techStack[category.key].map((tech, index) => (
								<span className="techstack-item" key={index}>
									{tech}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TechStack;
