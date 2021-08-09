import React, { useState, useEffect } from "react";
import cx from "classnames";
import useRouter from "use-react-router";
import ReactPaginate from "react-paginate";
import { useWindowSize, useLockBodyScroll } from "react-use";

import {getGetPackages, getDurationList, getOriginList, getDestinationList} from "./apiQueries";
import {
	BreadCrumbs,
	Icons,
	FilterPopup,
	HotelsFilter,
} from "../components/export";

export const HotelsList = () => {
	const className = "hotels";
	const { history } = useRouter();
	const { width } = useWindowSize();
	const isMobile = width <= 580;
	const [isLoading, setIsLoading] = useState(true);

	const [originList, setOriginList] = useState([{ title: "", id: "", city_code: "" }]);
	useEffect(() => {
		getOriginList().then(
			(response) => {
				const originListData = [];
				let i = 1;
				response['origin-list'].active.forEach((listItem) => {
					if (!!listItem) {
						originListData.push({
							title: listItem,
							id: i,
							city_code: "RIX",
							disable: false
						});
						i += 1;
					}
				});
				response['origin-list'].disable.forEach((listItem) => {
					if (!!listItem) {
						originListData.push({
							title: listItem,
							id: i,
							city_code: "RIX",
							disable: true
						});
						i += 1;
					}
				});
				setOriginList(originListData);
			},
			(error) => {
				console.error("Error getting origin list", error);
			},
		);
	}, []);

	const [destinationList, setDestinationList] = useState([{ title: "", id: "", city_code: "" }]);
	useEffect(() => {
		getDestinationList().then(
			(response) => {
				const destinationListData = [];
				let i = 1;
				response['destination-list'].active.forEach((listItem) => {
					if (!!listItem) {
						destinationListData.push({
							title: listItem,
							id: i,
							city_code: "RIX",
							disable: false
						});
						i += 1;
					}
				});
				response['destination-list'].disable.forEach((listItem) => {
					if (!!listItem) {
						destinationListData.push({
							title: listItem,
							id: i,
							city_code: "RIX",
							disable: true
						});
						i += 1;
					}
				});
				setDestinationList(destinationListData);
			},
			(error) => {
				console.error("Error getting destination list", error);
			},
		);
	}, []);

	const [durations, setDurations] = useState([0]);
	const [date, setDate] = useState(localStorage.getItem('currentDate') || new Date());
	useEffect(() => {
		getDurationList().then(
			(response) => {
				setDurations(response['duration-list']);
			},
			(error) => {
				console.error("Error getting durations data", error);
			},
		);
	}, []);

	const bookingDataLS = JSON.parse(localStorage.getItem("bookingData")) || {
		origin: originList[0],
		destination: destinationList[0],
		date: {
			date: date,
			duration: 7,
		},
		travellers: {
			adults: 2,
			children: 1,
		},
		travellersValues: {
			adults: new Array(Number(2)).fill({}),
			children: new Array(Number(1)).fill({}),
		},
	};

	const [filterActiveTab, setFilterActiveTab] = useState(false);
	const [filterState, setFilterState] = useState(bookingDataLS);
	useLockBodyScroll(isMobile && filterActiveTab);

	useEffect(() => {
		const bookingDataLSNew = bookingDataLS;
		bookingDataLSNew.origin = originList[0];
		setFilterState(bookingDataLSNew);
	}, [originList]);

	useEffect(() => {
		const bookingDataLSNew = bookingDataLS;
		bookingDataLSNew.destination = destinationList[0];
		setFilterState(bookingDataLSNew);
	}, [destinationList]);

	useEffect(() => {
		const bookingDataLSNew = bookingDataLS;
		bookingDataLSNew.date.duration = durations[0];
		setFilterState(bookingDataLSNew);
	}, [durations]);

	const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
	const handleTabClick = ({ tab, value }) => {
		if (tab?.key === filterActiveTab) {
			setFilterActiveTab(false);
			isMobile && setIsFilterPopupOpen(false);
		} else {
			setFilterActiveTab(tab?.key);
			isMobile && setIsFilterPopupOpen(true);
		}

		if (value) {
			let newState = { ...filterState };
			newState[tab.key] = value;
			setFilterState(newState);
			localStorage.setItem("bookingData", JSON.stringify(newState));
			console.log("filterState", tab, newState);
		}
	};

	const layouts = {
		lines: {
			name: "lines",
			hotelsPerPage: 5,
		},
		squares: {
			name: "squares",
			hotelsPerPage: width <= 480 ? 3 : 10,
		},
	};
	const [layout, setLayout] = useState(layouts.lines);

	const [page, setPage] = useState(1);
	const [hotels, setHotels] = useState([]);
	const [hotelsPage, setHotelsPage] = useState([]);
	const pagesCount = Math.ceil(hotels?.length / layout.hotelsPerPage);

	const sliceHotelsArr = ({ hotels, page = 1 }) => {
		const hotelsCount = page * layout.hotelsPerPage;
		const startIndex = page === 1 ? 0 : hotelsCount - layout.hotelsPerPage;
		const hotelsPage = hotels.slice(
			startIndex,
			startIndex + layout.hotelsPerPage,
		);
		setHotelsPage(hotelsPage);

		console.log(
			"page",
			page,
			"hotelsCount",
			hotelsCount,
			"startIndex,endIndex ",
			startIndex,
			startIndex + layout.hotelsPerPage,
			hotelsPage,
		);
	};

	const handlePageChange = ({ selected }) => {
		const newPage = selected + 1;
		setPage(selected + 1);
		sliceHotelsArr({ hotels, page: newPage });
	};

	const getFormatDate = (date) => {
		return `${date.getFullYear()}-` +
		`${(date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth()}-` +
		`${date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()}`
	};

	// клик по карточке
	const handleHotelCardClick = ({ hotel }) => {
		const link = `/hotel-details/${hotel.id}`;
		history.push(link);
		//const win = window.open(link, "_blank");
		//win.focus();

		localStorage.setItem(
			"hotelDetailsPageData",
			JSON.stringify(hotel),
		);

		localStorage.setItem(
			"bookingData",
			JSON.stringify({ ...bookingDataLS, hotel }),
		);
	};

	useEffect(() => {
		setIsLoading(true);
		const beginDate = new Date(filterState.date.date);
		const beginDateFormat = getFormatDate(beginDate)

		let endDate = new Date();
		endDate.setDate(beginDate.getDate() + filterState.date.duration);
		const endDateFormat = getFormatDate(endDate);

		// запрос списка отелей
		const data = JSON.stringify({
			beginDate: beginDateFormat,
			endDate: endDateFormat,
			beginNight: filterState.date.duration,
			endNight: filterState.date.duration,
			adultNum: filterState.travellers.adults,
			kidNum: filterState.travellers.children,
			filter: true,
			sort: true
		});

		getGetPackages(data).then(
			(response) => {
				console.log('hotelsList response',response)
				const keys = Object.keys(response);
				const hotelsList = response[keys[0]];
				if (typeof hotelsList !== 'string') {
					hotelsList.forEach((hotelItem, i) => {
						hotelItem.id = i + 1;
					});
					const filteredHotelsData = filterState.destination.title === ''
						? hotelsList
						: hotelsList.filter(hotelItem => {
							return hotelItem['resort'] === filterState.destination.title;
						});
					setHotels(filteredHotelsData);
					localStorage.setItem('hotelListData', JSON.stringify(filteredHotelsData));
					sliceHotelsArr({ hotels: filteredHotelsData, page });
					setIsLoading(false);
				}
			},
			(error) => {
				console.error("Error while geocoding", error);
			},
		);
	}, [filterState]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page]);

	return (
		<div className={`container-s ${className}`}>
			<FilterPopup isOpen={isFilterPopupOpen}>
				<HotelsFilter
					originList={originList}
					destinationList={destinationList}
					durations={durations}
					filterState={filterState}
					activeTabKey={filterActiveTab}
					handleTabClick={handleTabClick}
				/>
			</FilterPopup>

			{/* хлебные крошки */}
			<BreadCrumbs>
				<div className={`${className}-header_layout`}>
					<Icons.Square
						onClick={() => {
							setFilterActiveTab(false);
							setLayout(layouts.squares);
						}}
						fill={layout.name === "squares" ? "#ED1C24" : "#E7E7E7"}
						className={`${className}-header_layout_squares`}
					/>
					<Icons.Lines
						onClick={() => {
							setFilterActiveTab(false);
							setLayout(layouts.lines);
						}}
						fill={layout.name === "lines" ? "#ED1C24" : "#E7E7E7"}
						className={`${className}-header_layout_lines`}
					/>
				</div>
			</BreadCrumbs>

			{/* список фильтров */}
			<HotelsFilter
				originList={originList}
				destinationList={destinationList}
				durations={durations}
				filterState={filterState}
				activeTabKey={isMobile ? false : filterActiveTab}
				handleTabClick={handleTabClick}
			/>

			{/* затеменение фона */}
			{filterActiveTab && !isMobile && (
				<div className={`${className}-overlay`} />
			)}

			{/* карточки  */}
			<div className={`${className}-list`}>
				{isLoading && <Icons.Preloader/>}
				{!isLoading && hotelsPage.map((hotel, i) => {
					return (
						<HotelCard
							handleHotelCardClick={() => handleHotelCardClick({ hotel })}
							hotel={hotel}
							row={layout.name === "lines"}
							key={i}
						/>
					);
				})}
			</div>

			{/* пагинация */}
			{(!isLoading && hotelsPage.length > 0 &&
			<div className={`${className}-pagination`}>
				<ReactPaginate
					previousLabel={
						<Icons.PaginationArrow
							className={`${className}-pagination_arrow-left`}
						/>
					}
					nextLabel={
						<Icons.PaginationArrow
							className={`${className}-pagination_arrow-right`}
						/>
					}
					breakLabel={"..."}
					pageCount={pagesCount}
					marginPagesDisplayed={1}
					pageRangeDisplayed={2}
					onPageChange={handlePageChange}
					containerClassName={"pagination"}
					pageClassName={"pagination_page"}
					activeClassName='pagination_page--active'
					previousClassName='pagination_prev'
					nextClassName='pagination_next'
				/>
			</div>)}
		</div>
	);
};

export default HotelsList;

const HotelCard = ({ hotel, row, handleHotelCardClick }) => {
	const className = "hotels-list_card";
	const dateFrom = new Date(hotel['FlightDate']);
	const dateFromFormat = `${dateFrom.getDate()}.${
		(dateFrom.getMonth() + 1) < 10
			? '0' + (dateFrom.getMonth() + 1)
			: dateFrom.getMonth() + 1
	}`;
	const dateTo = new Date(hotel['BackFlightDate']);
	const dateToFormat = `${dateTo.getDate()}.${
		(dateTo.getMonth() + 1) < 10
			? '0' + (dateTo.getMonth() + 1)
			: dateTo.getMonth() + 1
	}`;
	const date = `${dateFromFormat} - ${dateToFormat}`;

	return (
		<div
			onClick={handleHotelCardClick}
			className={cx(className, {
				"hotels-list_card-row": row,
				"hotels-list_card-col": !row,
			})}>
			<img className={`${className}-img`} src={hotel['title-image']} alt='hotel preview' />
			<div className={`${className}-content`}>
				<div className={`${className}-content_top`}>
					<h3 className={`${className}-title`}>{`${hotel['HotelName']}`}</h3>
					<p className={`${className}-subtitle`}> {hotel['location-text']} </p>
				</div>

				<div className={`${className}-content_bottom`}>
					<p className={`${className}-date`}>{date}</p>
					<p className={`${className}-price`}>{hotel['PackagePrice']}$</p>
				</div>
			</div>
		</div>
	);
};
