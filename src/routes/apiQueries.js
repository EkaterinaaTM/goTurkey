const headers = {
	method: "GET",
	mode: "cors",
	cache: "no-cache",
	credentials: "same-origin",
	headers: {
		"Content-Type": "application/json",
	},
	redirect: "follow",
	referrerPolicy: "no-referrer",
};

const ENDPOINT = "https://apitest.fun:9595/api/v1";

const fetchApi = async ({ url }) => {
	const response = await fetch(`${ENDPOINT}/${url}`, headers);
	return await response.json();
};
export const getAllHotels = () => fetchApi({ url: "hotels" });

export const getHotelById = (id) => fetchApi({ url: `hotels?id=${id}` });

export const getAllTours = () => fetchApi({ url: "tours" });

export const getHotelImages = (id) =>
	fetchApi({ url: `hotel-images?id=${id}` });

export const getHotelTypes = () => fetchApi({ url: "hotel-types" });

export const getHotelFeatures = () => fetchApi({ url: "hotel-features" });

export const getHotelClasses = () => fetchApi({ url: "hotel-classes" });

export const getHotelChains = () => fetchApi({ url: "hotel-chains" });

export const getHotelsFormats = () => fetchApi({ url: "hotel-formats" });

export const getHotelsDescriptions = () =>
	fetchApi({ url: "hotel-descriptions" });

export const getFlightsByID = (id) => fetchApi({ url: `flights?id=${id}` });

export const flightsSearch = ({
	fly_from,
	fly_to,
	date_from,
	date_to,
	limit = 4,
}) =>
	fetchApi({
		url: `flights/search?fly_from=${fly_from}&fly_to=${fly_to}&date_from=${date_from}&date_to=${date_to}&limit=${limit}`,
	});

export const saveBooking = ({
	bags = 0,
	booking_token,
	currency = "USD",
	lang,
	locale,
	passengers = [
		// {
		// 	birthday,
		// 	cardno,
		// 	category,
		// 	email,
		// 	expiration,
		// 	name: firstName,
		// 	nationality,
		// 	phone,
		// 	surname,
		// 	title,
		// },
	],
}) =>
	fetchApi({
		url: `bookings/save?bags=${bags}&booking_token=${booking_token}&currency=${currency}&passengers=${passengers}`,
	});

const postFetchApi = async ({ url }, req) => {
	const init = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(req)
	};

	const response = await fetch(`${ENDPOINT}/${url}`, init);
	return await response.json();
};

export const getMainData = () => postFetchApi({ url: "commands/microsite" }, {
	command: "GET_HOMEPAGE_STATIC",
	data: ""
});

export const getFooterData = () => postFetchApi({ url: "commands/microsite" }, {
	command: "GET_FOOTER_STATIC",
	data: ""
});

export const getHomeHotelsData = () => postFetchApi({ url: "commands/microsite" }, {
	command: "GET_HOMEPAGE_HOTEL_LIST",
	data: ""
});

export const getOriginList = () => postFetchApi({ url: "commands/microsite" }, {
	command: "GET_ORIGIN_LIST",
	data: ""
});

export const getDestinationList = () => postFetchApi({ url: "commands/microsite" }, {
	command: "GET_DESTINATION_LIST",
	data: ""
});

export const getDurationList = () => postFetchApi({ url: "commands/microsite" }, {
	command: "GET_DURATIONS_LIST",
	data: ""
});

export const getGetPackages = (
	data = "{'beginDate':'2021-09-01','endDate':'2022-09-01', 'beginNight':7, 'endNight':7, 'adultNum':2, 'kidNum':0, 'filter':true, 'sort':true}"
) => postFetchApi({ url: "commands/microsite" }, {
	command: "GET_PACKAGES",
	data: data
});