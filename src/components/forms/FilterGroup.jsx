const FilterGroup = ({ className, altLabel, label, children }) => {
	return (
		<div>
			<label className='label'>
				<span className='label-text'>{label}</span>
				<span className='label-text'>{altLabel}</span>
			</label>
			<div className={`${className || ''}`}>{children}</div>
		</div>
	);
};

export default FilterGroup;
