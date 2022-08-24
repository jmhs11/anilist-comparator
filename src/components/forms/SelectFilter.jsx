const SelectFilter = ({ className, label, defaultOption, children, ...props }) => {
	return (
		<div className='form-control w-full max-w-xs'>
			{label && (
				<label className='label'>
					<span className='label-text'>{label}</span>
				</label>
			)}
			<select {...props} className={`select select-bordered ${className || ''}`}>
				{defaultOption ? (
					<option value='' disabled>
						{defaultOption}
					</option>
				) : null}
				{children}
			</select>
		</div>
	);
};

export default SelectFilter;
