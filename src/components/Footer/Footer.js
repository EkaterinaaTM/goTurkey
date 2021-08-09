import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import useRouter from "use-react-router";
import cx from "classnames";
import {getFooterData} from "../../routes/apiQueries";

const Footer = () => {
	const { history } = useRouter();
	const isMain = history.location.pathname === "/";

	const initFooter = JSON.parse(localStorage.getItem('footerData'));
	const [footerStatic, setFooterStatic] = useState(initFooter || {
		'footer-logo-img': '',
		'footer-background-color': '',
		'footer-tel-text': '',
		'footer-email-text': '',
		'footer-copyright-text': '',
		'footer-date-text': '',
	});

	useEffect(() => {
		if (!initFooter) {
			getFooterData().then(
				(response) => {
					setFooterStatic(response);
					localStorage.setItem('footerData', JSON.stringify(response));
				},
				(error) => {
					console.error("Error getting main data", error);
				},
			);
		}
	});

	return (
		<footer
			className={cx("footer", {
				"footer--main": isMain,
			})}
			style={{backgroundColor: footerStatic['footer-background-color']}}
		>
			<Link to='/'>
				<img
					className='footer-logo'
					src={footerStatic['footer-logo-img']}
					alt='logo' />
			</Link>
			<div className='row-bw-center footer-contacts'>
				<a className='footer-phone' href={'tel:' + footerStatic['footer-tel-text'].replace(/ /g, '')}>
					{footerStatic['footer-tel-text']}
				</a>
				<a className='footer-email' href={'maiilto:' + footerStatic['footer-email-text']}>
					{footerStatic['footer-email-text']}
				</a>
			</div>
			<p className='footer-rights'>{footerStatic['footer-copyright-text']}</p>
			<p className='footer-year'>{footerStatic['footer-date-text']}</p>
		</footer>
	);
};

export default Footer;
