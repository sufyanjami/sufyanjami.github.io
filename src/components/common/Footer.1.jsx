import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<React.Fragment>
			<div className="footer">
				<div className="footer-links">
					<ul className="footer-nav-link-list">
						<li className="footer-nav-link-item">
							<Link to="/">Home</Link>
						</li>
						<li className="footer-nav-link-item">
							<Link to="/about">About</Link>
						</li>
						<li className="footer-nav-link-item">
							<Link to="/projects">Projects</Link>
						</li>
						<li className="footer-nav-link-item">
							<Link to="/contact">Contact</Link>
						</li>
						<li className="footer-nav-link-item">
							<a
								href="https://www.buymeacoffee.com/sufyanjami"
								target="_blank"
								alt=""
								rel="noreferrer"
							>
								Buy me a Coffee!
							</a>
						</li>
					</ul>
				</div>

				<div className="footer-credits">
					<div className="footer-credits-text">Sufyan Jami</div>
				</div>
			</div>
		</React.Fragment>
	);
};
