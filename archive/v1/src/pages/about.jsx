import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Socials from "../components/about/socials";

import useScrollToTop from "../hooks/useScrollToTop";
import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/about.css";

const About = () => {
	useScrollToTop();

	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="about" />
				<div className="content-wrapper">
					<div className="about-logo-container">
						<div>
							<br />
						</div>
					</div>

					<div className="about-container">
						<div className="about-main">
							<div className="about-right-side">
								<div className="title about-title">
									{INFO.about.title}
								</div>

								<div className="subtitle about-subtitle">
									{INFO.about.description}
								</div>

								<div className="about-journey">
									<h2 className="about-section-title">Career Journey</h2>
									<div className="about-timeline">
										{INFO.jobs.map((job, index) => (
											<Link
												to={`/experience/${job.slug}`}
												className="about-timeline-item"
												key={index}
											>
												<div className="about-timeline-period">{job.period}</div>
												<div className="about-timeline-content">
													<div className="about-timeline-role">{job.role}</div>
													<div className="about-timeline-company">{job.company}</div>
													<div className="about-timeline-oneliner">{job.oneliner}</div>
												</div>
											</Link>
										))}
									</div>
								</div>
							</div>

							<div className="about-left-side">
								<div className="about-image-container">
									<div className="about-image-wrapper">
										<img
											src="about.jpg"
											alt="about"
											className="about-image"
										/>
									</div>
								</div>

								<div className="about-socials">
									<Socials />
								</div>
							</div>
						</div>

						<div className="about-socials-mobile">
							<Socials />
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

export default About;
