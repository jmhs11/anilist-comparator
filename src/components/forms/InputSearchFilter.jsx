const InputSearchFilter = ({ label, ...props }) => {
	return (
		<div className='form-control w-full max-w-xs'>
			<label className='label'>
				<span className='label-text'>{label}</span>
			</label>
			<input {...props} type='text' className='input input-bordered w-full max-w-xs' />
		</div>
	);
};

export default InputSearchFilter;
