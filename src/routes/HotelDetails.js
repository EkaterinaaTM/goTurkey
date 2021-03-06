import React, { useState, useEffect } from "react";
import { useMeasure, useWindowSize } from "react-use";
import cx from "classnames";
import { add, sub, format } from "date-fns";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { CarouselProvider, Slider, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
	BreadCrumbs,
	Icons,
	Button,
	BookingForm,
	hotelItem,
	flightsArr,
} from "../components/export";
import useRouter from "use-react-router";
import { getHotelById, flightsSearch, getHotelImages } from "./apiQueries";

const HotelDetails = () => {
	const className = "hotel-details";
	const { history } = useRouter();
	const { width } = useWindowSize();
	const pathname = history?.location?.pathname;
	const [descRef, { height: descHeight }] = useMeasure();
	const [isDescOpen, setIsDescOpen] = useState(false);

	const cardBottomElements = [
		{
			icon: <Icons.City />,
			key: "centerDistance",
		},
		{
			icon: <Icons.Swimmer />,
			key: "seaDistance",
		},
		{
			icon: <Icons.BigPlane />,
			key: "flyDistance",
		},
	];
	const selectedFlightBlocks = [
		{
			title: "Flight detail",
			subtitle: "title",
			desc: "subtitle",
		},
		{
			title: "Flight detail",
			subtitle: "boarding",
		},
		{
			title: "Room type",
			subtitle: "roomType",
		},
		{
			title: "Transfer",
			subtitle: "transfer",
		},
	];

	// данные буккинга с local storage
	const bookingDataLS = JSON.parse(localStorage.getItem("bookingData"));
	console.log("bookingDataLS", bookingDataLS);

	// информация о конкретном отеле  с json
	const [hotel, setHotel] = useState([]);
	// список рейсов с json
	const [flights, setFlights] = useState([]);

	const [formState, setFormState] = useState({
		isOpen: pathname?.includes("purchase"), // открыта ли форма пассажира
		selectedFlight: flightsArr[0] || {},
	});

	// выбор рейса (клик на кнопку book)
	const handleBookClick = () => {
		history.push(`/hotel-details/${hotel?.id}/purchase`);

		localStorage.setItem(
			"hotelDetailsPageData",
			JSON.stringify({
				title: "Purchase",
				link: `/hotel-details/${hotel?.id}/purchase`,
				bookingForm: true,
				travellersForm: false,
				onClick: () => {
					history.push(`/hotel-details/${hotel?.id}/purchase`);
					JSON.stringify({
						title: "Travellers",
						link: `/hotel-details/${hotel?.id}`,
						bookingForm: true,
						travellersForm: false,
					});
				},
			}),
		);

		localStorage.setItem(
			"bookingData",
			JSON.stringify({ ...bookingDataLS, flight: formState?.selectedFlight }),
		);

		setFormState({ ...formState, isOpen: true });
	};

	let stripeToken = "pk_test_veSmzIOx9GKjWUx92TBwl0Qq00NRw7pDpd";
	const stripePromise = loadStripe(stripeToken);

	// клик на PAY
	const handlePay = async (event) => {
		////  Get Stripe.js instance
		// const stripe = await stripePromise;
		// // Call your backend to create the Checkout Session
		// const response = await fetch("/create-checkout-session", {
		// 	method: "POST",
		// });
		// const session = await response.json();
		// console.log("session", session);
		// // When the customer clicks on the button, redirect them to Checkout.
		// const result = await stripe.redirectToCheckout({
		// 	sessionId: session.id,
		// });
		// if (result.error) {
		// 	// If `redirectToCheckout` fails due to a browser or network
		// 	// error, display the localized error message to your customer
		// 	// using `result.error.message`.
		// }
	};

	useEffect(() => {
		setHotel(hotelItem); // удалить строку после подкл. к апи
		setFlights(flightsArr); // удалить строку после подкл. к апи

		// если надо будет запрашивать доп инфу о отеле по id
		getHotelById(hotel.id).then(
			(response) => {
				console.log("getHotelImages", response);
				setHotel(hotelItem);
			},
			(error) => {
				console.error("Error while geocoding", error);
			},
		);

		getHotelImages(hotel.id).then(
			(response) => {
				console.log("getHotelImages", response);
			},
			(error) => {
				console.error("Error while geocoding", error);
			},
		);

		const date = new Date(bookingDataLS.date.date);
		const dateInterval = bookingDataLS.date.dateInterval;

		const date_from = encodeURIComponent(
			format(
				sub(date, {
					days: dateInterval,
				}),
				"dd/mm/yyyy",
			),
		);

		const date_to = encodeURIComponent(
			format(
				add(date, {
					days: dateInterval,
				}),
				"dd/mm/yyyy",
			),
		);

		flightsSearch({
			fly_from: bookingDataLS.origin.city_code,
			fly_to: bookingDataLS.destination.city_code,
			date_from,
			date_to,
		}).then(
			(response) => {
				console.log("flightsSearch", response);
				setFlights(flightsArr); //response.result ||
			},
			(error) => {
				console.error("Error while geocoding", error);
			},
		);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [formState.isOpen, pathname]);

	return (
		<Elements stripe={stripePromise}>
			<div
				className={cx(`container-s ${className}`, {
					"hotel-details--purchase": pathname.includes("purchase"),
					"hotel-details--travellers": pathname.includes("travellers"),
				})}>
				<BreadCrumbs breadCrumb={hotel.title} />

				<div
					className={cx(`${className}_card`, {
						"hotel-details_card--purchase":
							pathname.includes("purchase") || pathname.includes("travellers"),
					})}>
					<CarouselProvider
						infinite={false}
						dragStep={1}
						isIntrinsicHeight={true}
						visibleSlides={1}
						naturalSlideWidth={100}
						naturalSlideHeight={100}
						totalSlides={hotel?.imgs?.length}>
						<Slider>
							{hotel?.imgs?.map((img, i) => (
								<img
									className={`${className}_card-img`}
									src={img}
									alt='hotel preview'
									key={i}
								/>
							))}
						</Slider>
						<DotGroup className={`slider-dots ${className}_card_slider-dots`} />
					</CarouselProvider>

					<div className={`${className}_card-header`}>
						<h2 className={`${className}_card-header_title`}>{hotel.title}</h2>
						<p className={`${className}_card-header_cities`}> {hotel.cities}</p>
						{width <= 480 && formState.isOpen && (
							<div className={`${className}_card-flight`}>
								<span
									className={`${className}_choice-price price`}>{`${bookingDataLS?.flight?.price}$`}</span>
								<span className={`${className}_choice-date`}>
									{bookingDataLS?.flight?.date}
								</span>
							</div>
						)}
					</div>

					{true && (
						<div className={`${className}_card-bottom`}>
							{cardBottomElements.map((item, i) => (
								<div className='row-bw-center' key={i}>
									{item.icon}
									{hotel && hotel[item.key]}
								</div>
							))}
						</div>
					)}

					{formState.isOpen && width > 480 && (
						<div className={`${className}_card-flight`}>
							<span
								className={`${className}_choice-price price`}>{`${formState?.selectedFlight?.price}$`}</span>
							<span className={`${className}_choice-date`}>
								{formState?.selectedFlight?.date}
							</span>
						</div>
					)}
				</div>

				{!formState.isOpen && (
					<div>
						<section className={`${className}_desc-block`}>
							<div
								style={{
									height: isDescOpen ? `${descHeight}px` : "88px",
								}}
								className={cx(`${className}_desc-block_text`, {
									"hotel-details_desc-block_text--visible": isDescOpen,
								})}>
								<p ref={descRef}> {hotel.desc}</p>
							</div>
							{!isDescOpen && (
								<p
									onClick={() => setIsDescOpen(true)}
									className={`${className}_desc-block_more`}>
									<span>More</span> <Icons.DropArrow />
								</p>
							)}
						</section>

						<section className={`${className}_flight-block`}>
							{selectedFlightBlocks.map((block, i) => {
								const { title, subtitle, desc } = block;
								const selectedFlight = formState.selectedFlight;
								return (
									<div className={`${className}_flight-block_item`} key={i}>
										<p className={`${className}_flight-block_item-title`}>
											{title}
										</p>
										<p className={`${className}_flight-block_item-subtitle`}>
											{selectedFlight[subtitle]}
										</p>
										{desc && (
											<p className={`${className}_flight-block_item-desc`}>
												{selectedFlight[desc]}
											</p>
										)}
									</div>
								);
							})}
						</section>

						<div className={`${className}_more-dates_title`}>
							More dates to this hotel
						</div>
						<section className={`${className}_more-dates`}>
							{flights?.map((flight, i) => {
								const { title, subtitle, price, date } = flight;
								return (
									<div className={`${className}_more-dates_item`} key={i}>
										<div className='row-bw-center'>
											<div>
												<p className={`${className}_more-dates_item-cities`}>
													{title}
												</p>
												<p className={`${className}_more-dates_item-stops`}>
													{subtitle}
												</p>
											</div>
											<div>
												<p className={`${className}_more-dates_item-price`}>
													{`${price}$`}
												</p>
												<p className={`${className}_more-dates_item-date`}>
													{date}
												</p>
											</div>
										</div>

										<Button
											text='Book'
											variant='secondary'
											onClick={() =>
												setFormState({ ...formState, selectedFlight: flight })
											}
										/>
									</div>
								);
							})}
						</section>

						<div className={`${className}_choice`}>
							<div>
								<p
									className={`${className}_choice-price price`}>{`${formState.selectedFlight.price}$`}</p>
								<p className={`${className}_choice-date`}>
									{formState.selectedFlight.date}
								</p>
							</div>

							<Button text='Book' onClick={handleBookClick} />
						</div>
					</div>
				)}
				{formState.isOpen && (
					<BookingForm
						flight={formState.selectedFlight}
						hotel={hotel}
						handlePay={handlePay}
					/>
				)}
			</div>
		</Elements>
	);
};

export default HotelDetails;

const CheckoutPaymentWithStripe = ({ children }) => {
	let stripeToken = "pk_test_veSmzIOx9GKjWUx92TBwl0Qq00NRw7pDpd";
	const stripePromise = loadStripe(stripeToken);

	return <Elements stripe={stripePromise}>{children}</Elements>;
};
