const ListFilter = ({ label, children, ...props }) => {
	return (
		<div>
			{label && (
				<label className='label'>
					<span className='label-text'>{label}</span>
				</label>
			)}
			<div className='flex flex-col gap-1'>{children}</div>
		</div>
	);
};

export default ListFilter;
