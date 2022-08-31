const InputCheckbox = ({ label, ...props }) => {
	return (
		<div className='form-control'>
			{label && (
				<label className='label cursor-pointer' htmlFor={label}>
					<span className='label-text'>{label}</span>
				</label>
			)}
			<input {...props} type='checkbox' className='checkbox' id={label || ''} />
		</div>
	);
};

export default InputCheckbox;
