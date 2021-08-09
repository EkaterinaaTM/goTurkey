import React, { useState, useEffect } from "react";
import useRouter from "use-react-router";
import { Button, ThemeTemplate } from "../components/export";
import {getMainData, getHomeHotelsData} from "./apiQueries";

export const Main = () => {
	const themeColors = ["light-orange", "light-blue", "orange", "blue", "green"];
	const { history } = useRouter();

	const goToHotelsList = ({ hotelsListLink, breadCrumb }) => {
		if (hotelsListLink) {
			const link = `/hotels${hotelsListLink}`;
			history.push(link);

			localStorage.setItem(
				"hotelListPageData",
				JSON.stringify({
					title: breadCrumb,
					link,
				}),
			);
		} else {
			const link = "/all-hotels";
			history.push(link);

			localStorage.setItem(
				"hotelListPageData",
				JSON.stringify({
					title: "All hotels",
					link,
				}),
			);
		}
	};

	const [homeHotels, setHomeHotelsData] = useState([]);
	const [style, setStyle] = useState({})
	useEffect(() => {
		getHomeHotelsData().then(
			(response) => {
				setHomeHotelsData(response.hotels);
				console.log('update hotels')
			},
			(error) => {
				console.error("Error getting home hotels data", error);
			},
		);
	}, []);

	const [homePageStatic, setHomePageStatic] = useState({
		'header-logo-img': '',
		'header-background-color': '',
		'title-1-text': '',
		'title-2-text': '',
		'title-3-text': '',
		'header-img': '',
	});

	const [themes, setThemes] = useState([]);
	useEffect(() => {
		getMainData().then(
			(response) => {
				const mainPageData = response;
				let homePageStaticData = Object.assign({}, homePageStatic);
				let key;
				for (key in homePageStatic)
					homePageStaticData[key] = mainPageData[key];

				setHomePageStatic(homePageStaticData);

				setStyle({
					backgroundImage: `url(${mainPageData['header-img']})`,
					backgroundColor: mainPageData['header-background-color'],
				});

				const themesData = [];
				const categories = mainPageData['categories'];
				const ads = mainPageData['ads'];
				categories.forEach(function (category, i) {
					const categoryText = category['category-text'];
					const hotels = [];
					homeHotels.forEach(function (hotel) {
						if (hotel.category === category["category-name"]) {
							hotel.id = hotels.length + 1;
							hotels.push(hotel);
						}
					});

					const banner = (i === 2) ? ads[0] :
						(i === 4) ? ads[1] : null;

					themesData.push({
						banner: banner,
						theme: {
							categoryText,
							img: category['category-img'],
							title: category['category-name'],
							className: "orange", // todo нет цвета темы
						},
						hotels,
						link: `/${category['category-name'].toLowerCase().replace(/ /g, '-')}`,
					});
				});
				setThemes(themesData);
			},
			(error) => {
				console.error("Error getting main data", error);
			},
		);
	},[homeHotels]);

	return (
		<div className='main'>
			<section className='main_welcome-section' style={ style }>
				<h1 className='main_welcome-section_title'>
					<span>{homePageStatic['title-1-text']}</span>
					<span>{homePageStatic['title-2-text']}</span>
				</h1>
				<Button text='View all' variant='secondary' onClick={goToHotelsList} />
			</section>

			<div className='main-themes'>
				<h2 className='main-themes_title'>{homePageStatic['title-3-text']}</h2>
				{themes.map((theme, i) => {
					return (
						<ThemeTemplate
							{...theme}
							className={themeColors[i]}
							goToHotelsList={goToHotelsList}
							key={i}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Main;
