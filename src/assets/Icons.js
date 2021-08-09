import React from "react";

const SliderArrow = ({ className }) => {
	return (
		<svg
			width='30'
			height='26'
			viewBox='0 0 30 26'
			fill='none'
			className={className}
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M28 13.001H2M2 13.001L13.2667 1.73438M2 13.001L13.2667 24.2677'
				stroke='inherit'
				stroke-width='3'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

const ArrowDown = ({ className }) => {
	return (
		<svg
			className={className}
			width='11'
			height='5'
			viewBox='0 0 11 5'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M0 1.05964e-06L11 0L5.5 5L0 1.05964e-06Z' fill='#4D4D4D' />
		</svg>
	);
};

const Lines = ({ fill, className, onClick }) => {
	return (
		<svg
			className={className}
			onClick={onClick}
			width='18'
			height='18'
			viewBox='0 0 18 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<rect width='18' height='4' rx='1' fill={fill} />
			<rect y='7' width='18' height='4' rx='1' fill={fill} />
			<rect y='14' width='18' height='4' rx='1' fill={fill} />
		</svg>
	);
};

const Square = ({ fill, className, onClick }) => {
	return (
		<svg
			onClick={onClick}
			className={className}
			width='18'
			height='18'
			viewBox='0 0 18 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<rect width='8' height='8' rx='1' fill={fill} />
			<rect y='10' width='8' height='8' rx='1' fill={fill} />
			<rect x='10' width='8' height='8' rx='1' fill={fill} />
			<rect x='10' y='10' width='8' height='8' rx='1' fill={fill} />
		</svg>
	);
};

const Plane = () => {
	return (
		<svg
			width='12'
			height='15'
			viewBox='0 0 12 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M9.62429 4.83064L11.6101 1.55274C11.6101 1.55274 12.2701 0.614808 11.8727 0.144513C11.4763 -0.325782 10.6069 0.502327 10.6069 0.502327L7.89793 3.56589L1.40785 3.15848L0.2356 4.52331L5.83746 6.47977L3.11369 11.057C3.04063 11.1579 2.97332 11.2571 2.91585 11.3545L0.834039 10.7363L0 11.8753L2.23943 12.6556L2.33876 12.7406L2.66712 13.0187L2.95362 13.2632L4.04952 15L4.822 13.9443L3.56191 11.893C3.61034 11.8488 3.65549 11.7983 3.69654 11.7425L7.43904 7.72149L7.50143 7.77463L10.9213 13.3553L11.7586 11.971L9.64317 4.84747L9.62429 4.83064Z'
				fill='inherit'
			/>
		</svg>
	);
};

const LocationMarker = () => {
	return (
		<svg
			width='12'
			height='16'
			viewBox='0 0 12 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M6.00006 0.5C2.69181 0.5 6.10835e-05 3.19175 6.10835e-05 6.49625C-0.0216889 11.33 5.77206 15.338 6.00006 15.5C6.00006 15.5 12.0218 11.33 12.0001 6.5C12.0001 3.19175 9.30831 0.5 6.00006 0.5ZM6.00006 9.5C4.34256 9.5 3.00006 8.1575 3.00006 6.5C3.00006 4.8425 4.34256 3.5 6.00006 3.5C7.65756 3.5 9.00006 4.8425 9.00006 6.5C9.00006 8.1575 7.65756 9.5 6.00006 9.5Z'
				fill='inherit'
			/>
		</svg>
	);
};

const Calendar = () => {
	return (
		<svg
			width='13'
			height='15'
			viewBox='0 0 13 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M3.25 0.447749C3.25 0.328739 3.2072 0.214604 3.13101 0.130452C3.05483 0.0462997 2.95149 -0.000976562 2.84375 -0.000976562C2.73601 -0.000976562 2.63267 0.0462997 2.55649 0.130452C2.4803 0.214604 2.4375 0.328739 2.4375 0.447749V0.896474H1.625C1.19402 0.896474 0.780698 1.08558 0.475951 1.42219C0.171205 1.7588 0 2.21534 0 2.69137V3.58882H13V2.69137C13 2.21534 12.8288 1.7588 12.524 1.42219C12.2193 1.08558 11.806 0.896474 11.375 0.896474H10.5625V0.447749C10.5625 0.328739 10.5197 0.214604 10.4435 0.130452C10.3673 0.0462997 10.264 -0.000976562 10.1562 -0.000976562C10.0485 -0.000976562 9.94517 0.0462997 9.86899 0.130452C9.7928 0.214604 9.75 0.328739 9.75 0.447749V0.896474H3.25V0.447749Z'
				fill='inherit'
			/>
			<path
				d='M13 12.5633V4.48628H0V12.5633C0 13.0394 0.171205 13.4959 0.475951 13.8325C0.780698 14.1691 1.19402 14.3582 1.625 14.3582H11.375C11.806 14.3582 12.2193 14.1691 12.524 13.8325C12.8288 13.4959 13 13.0394 13 12.5633Z'
				fill='inherit'
			/>
		</svg>
	);
};

const Person = () => {
	return (
		<svg
			width='13'
			height='16'
			viewBox='0 0 13 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M12.805 10.9752C12.0016 10.0873 11.0266 9.37869 9.94147 8.89404C8.85635 8.40939 7.68459 8.15919 6.5 8.15919C5.31541 8.15919 4.14365 8.40939 3.05853 8.89404C1.9734 9.37869 0.998426 10.0873 0.195 10.9752C0.0709583 11.1151 0.00157114 11.2966 0 11.4852V14.5452C0.00262922 14.7463 0.082806 14.9383 0.223174 15.0796C0.363543 15.2208 0.552808 15.3 0.75 15.3H12.25C12.4489 15.3 12.6397 15.2194 12.7803 15.0759C12.921 14.9325 13 14.7379 13 14.535V11.475C12.996 11.2899 12.9268 11.1125 12.805 10.9752Z'
				fill='inherit'
			/>
			<path
				d='M6.49955 7.14003C8.43255 7.14003 9.99955 5.54168 9.99955 3.57001C9.99955 1.59835 8.43255 0 6.49955 0C4.56655 0 2.99955 1.59835 2.99955 3.57001C2.99955 5.54168 4.56655 7.14003 6.49955 7.14003Z'
				fill='inherit'
			/>
		</svg>
	);
};

const PaginationArrow = ({ className, onClick }) => {
	return (
		<svg
			className={className}
			onClick={onClick}
			width='6'
			height='12'
			viewBox='0 0 6 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M5.65685 0V11.3137L0 5.65685L5.65685 0Z' fill='#333333' />
		</svg>
	);
};

const City = ({ size }) => {
	return (
		<svg
			width='inherit'
			height='inherit'
			viewBox='0 0 25 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M22.9973 23.3903V15.6245H14.6332V23.3903H13.1774V14.1687H18.0874V5.86592H16.4507V2.61307H14.5988V0H13.1429V2.61307H11.2909V5.86592H9.65428V23.3903H8.19845V9.11883H1.84885V23.3903H0V24.8462H24.8462V23.3903H22.9973ZM14.7693 7.663H16.2252V9.11883H14.7693V7.663ZM14.7693 10.9159H16.2252V12.3717H14.7693V10.9159ZM5.71942 22.8194H4.26359V21.3636H5.71942V22.8194ZM5.71942 19.3368H4.26359V17.881H5.71942V19.3368ZM5.71942 15.8543H4.26359V14.3984H5.71942V15.8543ZM5.71942 12.3717H4.26359V10.9159H5.71942V12.3717ZM12.9723 12.3717H11.5165V10.9159H12.9723V12.3717ZM12.9723 9.11883H11.5165V7.663H12.9723V9.11883ZM13.1429 4.4101H14.5987V5.86592H13.1429V4.4101ZM17.9066 23.3903H16.4507V17.5476H17.9066V23.3903ZM21.1798 23.3903H19.724V17.5476H21.1798V23.3903Z'
				fill='#4D4D4D'
			/>
		</svg>
	);
};

const Swimmer = ({ className }) => {
	return (
		<svg
			width='inherit'
			height='inherit'
			viewBox='0 0 26 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M17.7173 13.6107L16.5236 11.6867C17.7764 13.2433 20.0945 13.3207 21.4478 11.8816C22.6835 10.5676 22.6204 8.50409 21.3063 7.26819C19.9929 6.03287 17.9289 6.09552 16.6929 7.40974C15.7434 8.41941 15.5712 9.855 16.1058 11.0134L13.2182 6.35936L17.5033 5.12283C18.8341 4.73883 19.463 3.21555 18.7869 2.00396C18.2959 1.12425 17.2769 0.704872 16.3091 0.984197L9.82172 2.8562C8.13971 3.34162 7.38646 5.2969 8.31004 6.78553L10.2708 9.9458L6.83203 12.0795C10.9692 12.1746 13.9584 13.4342 17.7173 13.6107Z'
				fill='#4D4D4D'
			/>
			<path
				d='M1.08339 15.7565C10.4879 13.0831 14.0397 18.4801 24.4582 15.7606C24.8472 15.6591 25.0802 15.2614 24.9786 14.8724C24.8771 14.4835 24.4794 14.2505 24.0905 14.352C14.081 16.9649 10.5243 11.5592 0.685316 14.3561C0.298648 14.466 0.074256 14.8686 0.184171 15.2553C0.294135 15.6421 0.696866 15.8664 1.08339 15.7565Z'
				fill='#4D4D4D'
			/>
			<path
				d='M24.0905 17.7453C14.0626 20.363 10.5438 14.9469 0.685316 17.7494C0.298648 17.8593 0.074256 18.2619 0.184171 18.6486C0.294086 19.0354 0.696817 19.2597 1.08339 19.1498C10.4879 16.4764 14.0397 21.8734 24.4582 19.1539C24.8472 19.0524 25.0802 18.6547 24.9786 18.2658C24.8771 17.8768 24.4794 17.6438 24.0905 17.7453Z'
				fill='#4D4D4D'
			/>
		</svg>
	);
};

const BigPlane = ({ className }) => {
	return (
		<svg
			width='inherit'
			height='inherit'
			viewBox='0 0 22 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M17.0894 8.00152L20.5518 2.57198C20.5518 2.57198 21.7026 1.01837 21.0098 0.239373C20.3185 -0.539629 18.8027 0.83206 18.8027 0.83206L14.0793 5.90658L2.76331 5.23173L0.719383 7.49245L10.4867 10.7332L5.7376 18.3149C5.61021 18.4821 5.49284 18.6464 5.39265 18.8078L1.76282 17.7838L0.308594 19.6704L4.21324 20.9629L4.38643 21.1037L4.95896 21.5644L5.45849 21.9693L7.3693 24.8462L8.71618 23.0974L6.5191 19.6998C6.60355 19.6264 6.68227 19.5428 6.75384 19.4504L13.2792 12.79L13.388 12.878L19.3509 22.1218L20.8108 19.8289L17.1223 8.02939L17.0894 8.00152Z'
				fill='#4D4D4D'
			/>
		</svg>
	);
};

const DropArrow = ({ className, onClick }) => {
	return (
		<svg
			width='9'
			height='15'
			viewBox='0 0 9 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				opacity='0.5'
				d='M1 1L7.5 7.5L1 14'
				stroke='inherit'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

const DropArrowBig = ({ className, onClick }) => {
	return (
		<svg
			width='14'
			height='8'
			viewBox='0 0 14 8'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M12.9426 0.970703L6.97128 6.94199L1 0.970703'
				stroke='#ED1C24'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

const Preloader = () => {
	const lines = [];
	for (let i = 0; i < 11; i++) {
		lines.push(<div className="preloader-container_preloader-line"></div>);
	}

	return (
		<div className="preloader-container">
			<div className="preloader-container_preloader">
				{lines}
			</div>
		</div>
	);
};

export {
	SliderArrow,
	ArrowDown,
	Lines,
	Square,
	Plane,
	LocationMarker,
	Calendar,
	Person,
	PaginationArrow,
	City,
	Swimmer,
	BigPlane,
	DropArrow,
	DropArrowBig,
	Preloader
};
