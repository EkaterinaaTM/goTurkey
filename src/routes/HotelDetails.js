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
	flightsArr,
} from "../components/export";
import useRouter from "use-react-router";
import { flightsSearch } from "./apiQueries";

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
			key: "destinatation-to-city",
			unit: ' km'
		},
		{
			icon: <Icons.Swimmer />,
			key: "destinatation-to-beach",
			unit: ' m'
		},
		{
			icon: <Icons.BigPlane />,
			key: "destinatation-to-airport",
			unit: ' km'
		},
	];
	const selectedFlightBlocks = [
		{
			title: "Boarding",
			subtitle: "AirportRoute",
			desc: "subtitle",
		},
		{
			title: "Boarding",
			subtitle: "MealName",
		},
		{
			title: "Room type",
			subtitle: "RoomName",
		},
		{
			title: "Transfer",
			subtitle: "transfer",
		},
	];

	// данные буккинга с local storage
	const bookingDataLS = JSON.parse(localStorage.getItem("bookingData"));

	// информация о конкретном отеле  с json
	const hotel = JSON.parse(localStorage.getItem("hotelDetailsPageData"));

	const flightsList = JSON.parse(localStorage.getItem('hotelListData')).filter(hotelItem => {
		return hotelItem['HotelID'] === hotel['HotelID']
	});
	flightsList.forEach(flightItem => {
		flightItem.transfer = 'Individual';

		const dateFrom = new Date(flightItem['FlightDate']);
		const dateFromFormat = `${dateFrom.getDate()}.${
			(dateFrom.getMonth() + 1) < 10
				? '0' + (dateFrom.getMonth() + 1)
				: dateFrom.getMonth() + 1
		}`;
		const dateTo = new Date(flightItem['BackFlightDate']);
		const dateToFormat = `${dateTo.getDate()}.${
			(dateTo.getMonth() + 1) < 10
				? '0' + (dateTo.getMonth() + 1)
				: dateTo.getMonth() + 1
		}`;
		flightItem.date = `${dateFromFormat} - ${dateToFormat}`;

		const difference = new Date(dateTo - dateFrom);
		flightItem.subtitle = `${difference.getHours()}h ${difference.getMinutes()}m`;
	});

	// список рейсов с json
	const [flights, setFlights] = useState([]);

	const [formState, setFormState] = useState({
		isOpen: pathname?.includes("purchase"), // открыта ли форма пассажира
		selectedFlight: flightsList[0] || {},
	});

	// выбор рейса (клик на кнопку book)
	const handleBookClick = () => {
		history.push(`/hotel-details/${hotel?.id}/purchase`);
		//const win = window.open(`/hotel-details/${hotel?.id}/purchase`, "_blank");
		//win.focus();

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
		const date = new Date(bookingDataLS.date.date);
		const dateDuration = bookingDataLS.date.duration;

		const date_from = encodeURIComponent(
			format(
				sub(date, {
					days: dateDuration,
				}),
				"dd/mm/yyyy",
			),
		);

		const date_to = encodeURIComponent(
			format(
				add(date, {
					days: dateDuration,
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

	const [descriptionText, setDescriptionText] = useState(hotel['description-short']);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [formState.isOpen, pathname]);

	const handleFlightBlockClick = () => {
		const value = popoverState === 'popover--open' ? '' : 'popover--open';
		setPopoverState(value);
	};

	const [popoverState, setPopoverState] = useState('');

	const getPopoverDate = (dateString) => {
		const date = new Date(dateString);
		const getDayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(date);
		const dateFormat = encodeURIComponent(
			format(
				date,
				"dd.MM.yy",
			),
		);

		return `${getDayOfWeek}, ${dateFormat}`;
	};

	const getPopoverTime = (dateStringStart, dateStringEnd) => {
		const dateFlightStart = dateStringStart.slice(0,5);
		const dateFlightEnd = dateStringEnd.slice(0,5);

		return `${dateFlightStart} – ${dateFlightEnd}`;
	};


	const popoverText = {
		to: {
			date: `${getPopoverDate(hotel.FlightDate)}`,
			place: `${bookingDataLS['origin']['title']} - ${hotel['resort']}`,
			time: getPopoverTime(hotel.FlightDateTimeDeparture, hotel.FlightDateTimeArrival)
		},
		from: {
			date: `${getPopoverDate(hotel.BackFlightDate)}`,
			place: `${hotel['resort']} - ${bookingDataLS['origin']['title']}`,
			time: getPopoverTime(hotel.BackFlightDateTimeDeparture, hotel.BackFlightDateTimeArrival)
		}
	};

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
						totalSlides={hotel?.gallery?.length}>
						<Slider>
							{hotel?.gallery?.map((img, i) => (
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
						<h2 className={`${className}_card-header_title`}>{hotel.HotelName}</h2>
						<p className={`${className}_card-header_cities`}> {hotel['location-text']}</p>
						<p className={`${className}_card-header_dates`}>
							{formState.selectedFlight.date}
						</p>
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

					<div className={`${className}_card-bottom`}>
						{cardBottomElements.map((item, i) => (
							<div className='row-bw-center' key={i}>
								{item.icon}
								{hotel && hotel[item.key]}
								{item.unit}
							</div>
						))}
					</div>

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
								/*style={{
									height: isDescOpen ? `${descHeight}px` : "88px",
								}}*/
								className={cx(`${className}_desc-block_text`, {
									"hotel-details_desc-block_text--visible": isDescOpen,
								})}>
								<p ref={descRef}>{descriptionText}</p>
							</div>
							{!isDescOpen && (
								<p
									onClick={() => { setIsDescOpen(true); setDescriptionText(hotel['description-long']); }}
									className={`${className}_desc-block_more`}>
									<span>More</span> <Icons.DropArrow />
								</p>
							)}
						</section>

						<section className={`${className}_desc-block`}>
							<div className={`${className}_choice`}>
								<div>
									<p
										className={`${className}_choice-price price`}>{`${formState.selectedFlight['PackagePrice']}$`}</p>
								</div>

								<Button text='Book' onClick={handleBookClick} />
							</div>
						</section>

						<section className={`${className}_flight-block`}>
							{selectedFlightBlocks.map((block, i) => {
								const { title, subtitle, desc } = block;
								const selectedFlight = formState.selectedFlight;
								const isAirportRoute = subtitle === 'AirportRoute';
								return (
									<div
										onClick={() => isAirportRoute ?  handleFlightBlockClick() : null}
										className={`${className}_flight-block_item`}
										key={i}>
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
										{isAirportRoute && (
											<div className={`${className}_flight-block_item-popover ${popoverState}`}>
												<span onClick={() => handleFlightBlockClick()} className="close"></span>
												<p className={'popover-header'}>TO THE BEACH:</p>
												<p className={'popover-text'}>{popoverText.to.date}</p>
												<p className={'popover-text'}>{popoverText.to.place}</p>
												<p className={'popover-text'}>{popoverText.to.time}</p>

												<p className={'popover-header'}>BACK HOME:</p>
												<p className={'popover-text'}>{popoverText.from.date}</p>
												<p className={'popover-text'}>{popoverText.from.place}</p>
												<p className={'popover-text'}>{popoverText.from.time}</p>
											</div>
										)}
									</div>
								);
							})}
						</section>

						<div className={`${className}_more-dates_title`}>
							More dates to this hotel
						</div>
						<section className={`${className}_more-dates`}>
							{flightsList?.map((flight, i) => {
								const { title, subtitle, price, date } = flight;
								return (
									<div className={`${className}_more-dates_item`} key={i}>
										<div className='row-bw-center'>
											<div>
												<p className={`${className}_more-dates_item-cities`}>
													{flight['AirportRoute']}
												</p>
												<p className={`${className}_more-dates_item-stops`}>
													{subtitle}
												</p>
											</div>
											<div>
												<p className={`${className}_more-dates_item-price`}>
													{`${flight['PackagePrice']}$`}
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
