import React from "react";
import { Link } from "react-router-dom";

const ThemeBanner = (banner) => {
	return (
		<Link to={banner['link']} className='container-m theme-banner' style={ {backgroundImage: `url(${banner['background-img']})`} }>
			<h2 className='theme-banner_title'> {banner['title-text']} </h2>
			<p className='theme-banner_subtitle'>{banner['sub-title-text']}</p>
		</Link>
	);
};

export default ThemeBanner;
