import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import useRouter from "use-react-router";
import {getMainData} from "../../routes/apiQueries";

const Header = () => {
	const { history } = useRouter();
	const path = history.location.pathname;

	const [headerLogoImg, setHeaderLogoImg] = useState(localStorage.getItem('headerLogoImg') || '');

	useEffect(() => {
		if (!headerLogoImg) {
			getMainData().then(
				(response) => {
					setHeaderLogoImg(response['header-logo-img']);
					localStorage.setItem('headerLogoImg', response['header-logo-img']);
				},
				(error) => {
					console.error("Error getting main data", error);
				},
			);
		}
	});

	return (
		<header
			className={cx("header", {
				"header--main": path !== "/",
			})}>
			<Link to='/'>
				<img className='header-logo' src={headerLogoImg} alt='logo' />
			</Link>
		</header>
	);
};
export const BreadCrumbs = ({ children, breadCrumb }) => {
	const { history } = useRouter();
	const path = history.location.pathname;

	const isMainPage = path === "/";
	const isAllHotelsPage = path === "/all-hotels";
	const isHotelDetailsPage = path.includes("/hotel-details");

	const isPurchasePage = path.includes("purchase");
	const isTravellersPage = path.includes("travellers");
	const isBooking = isPurchasePage || isTravellersPage;
	const hotelListPageData =
		!isMainPage &&
		!isAllHotelsPage &&
		JSON.parse(localStorage.getItem("hotelListPageData"));

	const hotelDetailsPageData =
		!isMainPage &&
		isHotelDetailsPage &&
		!isPurchasePage &&
		!isTravellersPage &&
		JSON.parse(localStorage.getItem("hotelDetailsPageData"));

	return (
		<div className={`hotels-header`}>
			<div className={`bread-crumbs`}>
				<Link to='/'>Home /</Link>
				{isAllHotelsPage && (
					<Link
						to={"/all-hotels"}
						className={cx({
							"bread-crumbs_item--active": isAllHotelsPage,
						})}>
						All hotels
					</Link>
				)}
				{hotelListPageData && (
					<Link
						to={hotelListPageData.link}
						className={cx({
							"bread-crumbs_item--active": !hotelDetailsPageData && !isBooking,
						})}>
						&nbsp; {`${hotelListPageData.title}  `} &nbsp;
					</Link>
				)}

				{hotelDetailsPageData && (
					<Link
						to={hotelDetailsPageData['HotelName']}
						className={cx({
							"bread-crumbs_item--active": hotelDetailsPageData && !isBooking,
						})}>
						{`/ ${hotelDetailsPageData['HotelName']}  `} &nbsp;
					</Link>
				)}

				{isBooking && (
					<Link
						onClick={() => {
							const chosenHotel = JSON.parse(
								localStorage.getItem("chosenHotel"),
							);
							history.push(`/hotel-details/${chosenHotel?.id}/purchase`);
							const prevhotelDetailsPageDataFromLS = JSON.parse(
								localStorage.getItem("hotelDetailsPageData"),
							);

							localStorage.setItem(
								"hotelDetailsPageData",
								JSON.stringify({
									...prevhotelDetailsPageDataFromLS,
									title: "Purchase",
									bookingForm: true,
									travellersForm: false,
								}),
							);
						}}
						className={cx({
							"bread-crumbs_item--active": isPurchasePage,
						})}>
						{` / Purchase  `} &nbsp;
					</Link>
				)}
				{isTravellersPage && (
					<Link className='bread-crumbs_item--active'>
						{` / Travellers  `} &nbsp;
					</Link>
				)}
			</div>
			{children}
		</div>
	);
};

export default Header;
