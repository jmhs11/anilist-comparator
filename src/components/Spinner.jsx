const Spinner = ({ className }) => {
	return (
		<div
			className={`border-4 border-[rgba(0,0,0,.1)] border-l-transparent w-10 h-10 animate-spin border-l-primary rounded-full ${
				className || ''
			}`}
		></div>
	);
};

export default Spinner;
