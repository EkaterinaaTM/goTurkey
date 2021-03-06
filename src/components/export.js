import Header, { BreadCrumbs } from "./Header/Header";
import Footer from "./Footer/Footer";
import Button from "./Buttons/Button";

import LayoutApp from "./LayoutApp/LayoutApp";

import RadioButton from "./Inputs/RadioButton";
import Input from "./Inputs/Input";
import Checkbox from "./Inputs/Checkbox";

// main page
import ThemeTemplate from "./ThemeTemplate/ThemeTemplate";
import ThemeBanner from "./ThemeTemplate/ThemeBanner";

// listing page
import HotelsFilter from "./HotelsList/HotelsListFilter";
import FilterPopup from "./Popup/FilterPopup";

// purchase
import BookingForm from "./HotelDetails/BookingForm";

import * as Icons from "../assets/Icons";
import * as apiMethods from "../routes/apiQueries";

import HotelImg from "../assets/hotel-img.png";
import ThemeCardBgImg from "../assets/theme-card_bg-img.png";
import FamilyResorts from "../assets/family-resorts.png";
import SingularMoments from "../assets/singular-moments.png";
import PopularClassics from "../assets/popular-classics.png";
import CityVibes from "../assets/city-vibes.png";

const cities = "Turkey, Kemer, Beldibi";
export const citiesArr = [
	{ title: "Cyprus", id: "1", city_code: "LON" },
	{ title: "Tallinn", id: "2", city_code: "PGA" },
	{ title: "Cyprus", id: "3", city_code: "LON" },
	{ title: "Tallinn", id: "4", city_code: "PGA" },
	{ title: "Cyprus", id: "5", city_code: "LON" },
];
const hotelItem = {
	price: "2500$",
	img: HotelImg,
	date: "3.05 - 8.05",
	title: "Movenpick Recort & Spa El Gouna",
	cities,
	centerDistance: "15 km",
	seaDistance: "500 m",
	flyDistance: "150 km",
	desc: "Perfectly located right on the pedestrian avenue with taverns and shops, this hotel offers a high standard of service. Perfectly located right on the pedestrian avenue with taverns and shops, this hotel offers a high standard of service. Perfectly located right on the pedestrian avenue with taverns and shops, this hotel offers a high standard of service. Perfectly located right on the pedestrian avenue with taverns and shops, this hotel offers a high standard of service",
	imgs: [HotelImg, HotelImg],
	id: 1,
};

const getHotelsArr = (count) => {
	const arr = new Array(Number(count)).fill(hotelItem);
	return arr.map((hotel, i) => ({ ...hotel, id: i + 1 }));
};
const hotels = getHotelsArr(6);

const flight = {
	fly_from: "LON",
	fly_to: "PGA",
	date_from: 1609891200,
	date_to: 1610236800,
	price: 2500,
	conversion: {
		EUR: 13,
	},
	local_arrival: "2021-06-28T10:15:00Z",
	utc_arrival: "2021-06-28T08:15:00Z",
	local_departure: "2021-06-27T18:25:00Z",
	utc_departure: "2021-06-27T16:25:00Z",
	title: "LED - GRE",
	subtitle: "2 Stops, 12h 35m",
	date: "21.05 - 27.05",
	boarding: "All Inclusive",
	roomType: "Sea View",
	transfer: "Individual",
};

const flightsArr = [
	{ ...flight, price: 2501 },
	{ ...flight, price: 2502 },
	{ ...flight, price: 2503 },
	{ ...flight, price: 2504 },
	{ ...flight, price: 2505 },
];

const themes = [
	{
		theme: {
			cities,
			img: ThemeCardBgImg,
			title: "Popular Classics",
			className: "orange",
		},
		hotels,
		link: "/popular-classics",
	},
	{
		theme: {
			img: FamilyResorts,
			title: "Family resorts",
			className: "light-blue",
		},
		hotels,
		link: "/family-resorts",
	},
	{
		banner: {
			title: "Turkish airlines",
			subtitle:
				"FREE 30kg baggage 8 kg cabbin bag. FREE meal on board. MORE space between seats",
		},
		theme: {
			cities,
			img: SingularMoments,
			title: "Singular Moments",
			className: "blue",
		},
		hotels,
		link: "/singular-moments",
	},
	{
		theme: {
			cities,
			img: PopularClassics,
			title: "Popular Classics",
			className: "dark-orange",
		},
		hotels,
		link: "/popular-classics",
	},
	{
		banner: {
			title: "Late Checkout",
			subtitle: "Special offer for selected hotels. Make your holidays longer",
		},
		theme: {
			cities,
			img: CityVibes,
			title: "City Vibes",
			className: "green",
		},
		hotels,
		link: "/late-checkout",
	},
];
export {
	Header,
	BreadCrumbs,
	Footer,
	Button,
	LayoutApp,
	Input,
	RadioButton,
	Checkbox,
	ThemeTemplate,
	ThemeBanner,
	HotelsFilter,
	FilterPopup,
	BookingForm,
	apiMethods,
	Icons,
	hotelItem,
	getHotelsArr,
	themes,
	HotelImg,
	flightsArr,
};
