import React, {useEffect} from "react";
import { useWindowSize } from "react-use";
import {
	CarouselProvider,
	Slider,
	ButtonBack,
	ButtonNext,
	Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { Icons, ThemeBanner } from "../export";
const ThemeTemplate = ({
	banner,
	theme,
	link,
	hotels,
	goToHotelsList,
	className,
}) => {
	const { width } = useWindowSize();
	const goToHotelsListByTheme = () => {
		goToHotelsList({ hotelsListLink: link, breadCrumb: theme.title });
	};
	return (
		<section className={`theme `}>
			{banner && <ThemeBanner {...banner} link='/hotels' />}
			<div className='container-l theme-slider'>
				<div
					onClick={goToHotelsListByTheme}
					className={`container-m theme-card`}>
					<img className='theme-card_img' src={theme.img} alt='theme' />
					<div className={`theme-card_border`} />

					<div className='theme-card_overlay' />
					<h3 className='theme-card_title'> {theme.title} </h3>
					<h4 className='theme-card_subtitle'>{theme.categoryText}</h4>
				</div>

				<CarouselProvider
					infinite={false}
					dragStep={1}
					isIntrinsicHeight={true}
					visibleSlides={width < 1200 ? 2 : 3}
					naturalSlideWidth={100}
					naturalSlideHeight={100}
					totalSlides={hotels?.length}>
					<Slider>
						{hotels.map((hotel, i) => (
							<Slide
								{...hotel}
								index={i}
								goToHotelsListByTheme={goToHotelsListByTheme}
								key={i}
							/>
						))}
					</Slider>
					<ButtonBack className='theme-slider_btn theme-slider_btn-back'>
						<Icons.SliderArrow />
					</ButtonBack>
					<ButtonNext className='theme-slider_btn theme-slider_btn-next'>
						<Icons.SliderArrow />
					</ButtonNext>

					<div className='theme-slider_dots'>
						{new Array(Number(hotels?.length)).fill(0).map((dot, i) => (
							<Dot slide={i} />
						))}
					</div>
				</CarouselProvider>

				<div onClick={goToHotelsListByTheme} className='theme_view-all'>
					View all
				</div>
			</div>
		</section>
	);
};

export default ThemeTemplate;

const Slide = ( slide ) => {
	const className = "theme-slider_slide";

	return (
		<div onClick={slide.goToHotelsListByTheme} className={`${className}`}>
			<img className={`${className}_img`} src={slide['title-image']} alt='hotel preview' />
			<div className={`${className}_content`}>
				<h3 className={`${className}_title`}>{`${slide.name}`}</h3>
				<div className={`${className}_content-bottom`}>
					<h4 className={`${className}_subtitle`}> {slide['location-text']} </h4>
					<p className={`${className}_price`}> {slide['price-static'] + '$'} </p>
				</div>
			</div>
		</div>
	);
};
