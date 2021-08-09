import React, { useEffect, useState } from "react";
import cx from "classnames";
import { format } from "date-fns";

import { Icons, Button, RadioButton, citiesArr } from "../export";
import DatePicker from "react-datepicker";
import { subMonths, addMonths } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
const HotelsFilter = ({originList, destinationList, durations, filterState, activeTabKey, handleTabClick }) => {
	const className = "hotels-filter";

	const [state, setState] = useState(filterState);
	const updateState = ({ key, value }) => {
		let newState = { ...state };
		newState[key] = value;
		setState(newState);

		console.log("updateState", key, value, newState);
	};
	const closeTab = () => {
		handleTabClick({ tab: false });
		setState(filterState);
	};

	let date = new Date(filterState.date.date);
	const getFormattedDate = (selectedDate) => {
		const newDate = new Date(selectedDate)
		return selectedDate ? format(newDate, "MMM dd") : format(date, "MMM dd");
	};

	const getTravellersTitle = () => {
		const travellers = filterState.travellers;
		const adultsCount = travellers.adults;
		const childrenCount = travellers.children;

		const childrenTitle = `${childrenCount} Kid`;
		const adultsTitle = `${adultsCount} Adults`;

		if (adultsCount === 0) {
			return childrenTitle;
		} else if (childrenCount === 0) {
			return adultsTitle;
		} else {
			return `${adultsTitle}, ${childrenTitle}`;
		}
	};

	const [filters, setFilters] = useState([
		{
			icon: <Icons.Plane />,
			title: "Origin",
			value: filterState.origin.title,
			key: "origin",
		},
		{
			icon: <Icons.LocationMarker />,
			title: "Destination",
			value: filterState.destination.title,
			key: "destination",
		},
		{
			icon: <Icons.Calendar />,
			title: "Date",
			value: `${getFormattedDate(filterState.date.date)} - ${filterState.date.duration} days`,
			key: "date",
		},
		{
			icon: <Icons.Person />,
			title: "Travellers",
			value: getTravellersTitle(),
			key: "travellers",
		},
	]);

	useEffect(() => {
		const filtersNew = filters;
		filtersNew[0].value = filterState.origin.title;
		filtersNew[1].value = filterState.destination.title;
		filtersNew[2].value = `${getFormattedDate(filterState.date.date)} - ${filterState.date.duration} days`;
		filtersNew[3].value = getTravellersTitle();
		setFilters(filtersNew);
		closeTab();
	}, [filterState]);

	return (
		<div
			className={cx(`${className}`, {
				"hotels-filter--open": activeTabKey,
			})}>
			<ul
				className={cx(`${className}_tabs`, {
					"hotels-filter_tabs--open": activeTabKey,
				})}>
				{filters.map((tab, i) => {
					const { icon, title, value, key } = tab;
					const isTabOpen = activeTabKey === key;
					const handleClick = () => handleTabClick({ tab });
					return (
						<li
							onClick={handleClick}
							className={cx(`${className}_item`, {
								"hotels-filter_item--active": isTabOpen,
							})}
							key={i}>
							<div>
								{icon}
								<p className={`${className}_item-title`}>{title}</p>
								<p className={`${className}_item-value`}>{value}</p>
							</div>

							<Icons.ArrowDown
								className={cx(`${className}_item-arrow`, {
									"hotels-filter_item-arrow--active": isTabOpen,
								})}
							/>
						</li>
					);
				})}
			</ul>
			{activeTabKey && (
				<ul className={`${className}_content`}>
					{activeTabKey === "origin" &&
					originList.map((city, i) => {
						const { title, id, disable } = city;
						const isActive = state && state[activeTabKey].id === id;
						return (
							<li
								onClick={() => disable
                  ? null
                  : updateState({ key: activeTabKey, value: city })
                }
								className={cx(`${className}_city`, {
									"hotels-filter_city--active": isActive,
								}, {
								  "hotels-filter_city--disabled": disable
                })}
								key={i}>
								{title}
							</li>
						);
					})}

					{activeTabKey === "destination" &&
					destinationList.map((city, i) => {
							const { title, id, disable } = city;
							const isActive = state && state[activeTabKey].id === id;
							return (
								<li
									onClick={() =>
										updateState({ key: activeTabKey, value: city })
									}
									className={cx(`${className}_city`, {
										"hotels-filter_city--active": isActive,
									}, {
                    "hotels-filter_city--disabled": disable
                  })}
									key={i}>
									{title}
								</li>
							);
						})}

					{activeTabKey === "travellers" && (
						<div
							className={cx(`${className}_travellers`, {
								"hotels-filter_travellers": false,
							})}>
							<TravellersItem
								title='Adults'
								state={state.travellers}
								updateState={updateState}
							/>
							<TravellersItem
								title='Children'
								state={state.travellers}
								updateState={updateState}
							/>
						</div>
					)}

					{activeTabKey === "date" && (
						<DateTab durations={durations} state={state} updateState={updateState} />
					)}

					<div className={`${className}_content_btn-group`}>
						<Button text='CANCEL' variant='gray' onClick={closeTab} />
						<Button
							text='OK'
							onClick={() =>
								handleTabClick({
									tab: { key: activeTabKey },
									value: state[activeTabKey],
								})
							}
						/>
					</div>
				</ul>
			)}
		</div>
	);
};

export default HotelsFilter;

const TravellersItem = ({ state, title, updateState }) => {
	const className = "hotels-filter_travellers-item";
	const key = `${title.toLowerCase()}`;
	const prevCounter = state[key];

	let newState = { ...state };

	return (
		<div className={`${className}`}>
			<div className={`${className}_left`}>
				<p className={`${className}_title`}> {title}</p>
				<p> {state[key]} </p>
			</div>
			<div className='row-bw-center'>
				<Button
					text='-'
					variant='round'
					onClick={() => {
						newState[key] = prevCounter - 1;

						console.log("counter", prevCounter, "newState", newState);
						updateState({
							key: `travellers`,
							value: newState,
						});
						//	}
					}}
				/>
				<Button
					text='+'
					variant='round'
					onClick={() => {
						newState[key] = prevCounter + 1;
						console.log("counter", prevCounter, "newState", newState);

						updateState({
							key: "travellers",
							value: newState,
						});
					}}
				/>
			</div>
		</div>
	);
};

const DateTab = ({ durations, state, updateState }) => {
	const className = "hotels-filter_date";
	console.log(state);
	const [startDate, setStartDate] = useState(
		new Date(state.date.date) || new Date(),
	);

	const handleDatechange = (date) => {
		setStartDate(date);
		updateState({ key: "date", value: { ...state.date, date } });
	};

	const [duration, setDuration] = useState(state.date.duration);
	const durationsRadioBtns = [];
	durations.forEach(item => {
		durationsRadioBtns.push({
			label: `${item} days`,
			name: `${item} days`,
			value: item,
			checked: duration === item,
		});
	});
	const [durationsData, setDurationsData] = useState(durationsRadioBtns);


	const handleDurationRadioBtnClick = (duration) => {
		setDuration(duration);
		const durationsRadioBtns = [];
		durations.forEach(item => {
			durationsRadioBtns.push({
				label: `${item} days`,
				name: `${item} days`,
				value: item,
				checked: duration === item,
			});
		});
		setDurationsData(durationsRadioBtns);
		const date = startDate;
		updateState({ key: "date", value: { ...state.date, date, duration } });
	};

	return (
		<div className={`${className}`}>
			<div className={`${className}-calendar`}>
				<DatePicker
					selected={startDate}
					onChange={(date) => handleDatechange(date)}
					inline
					showMonthYearDropdown
					minDate={subMonths(new Date(), 5)}
					maxDate={addMonths(new Date(), 6)}
				/>
			</div>

			<div className={`${className}_filters`}>
				<div className={`${className}_radio-btns`}>
					<p className={`${className}_title`}>Duration</p>

					<div className='row-start-start'>
						{durationsData.map((btn, i) => (
							<RadioButton
								{...btn}
								onClick={() => handleDurationRadioBtnClick(btn.value)}
								key={i}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
