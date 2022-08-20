import SearchIcon from '../icons/SearchIcon';

const InputSearch = ({
	className,
	handlerChange,
	handlerClick,
	autocompleteItems,
	error,
	...props
}) => {
	return (
		<div className='dropdown w-full'>
			<div className={`relative ${className || ''}`}>
				<SearchIcon className='absolute top-3 left-4 h-6 w-6 text-slate-200 pointer-events-none' />
				<input
					{...props}
					tabIndex={0}
					className={`input input-bordered pl-12 w-full ${
						error && 'input-error'
					} `}
					type='text'
					onChange={ev => handlerChange(ev.target.value)}
				></input>
				{error && (
					<label className='label'>
						<span className='label-text-alt text-red-400'>{error}</span>
					</label>
				)}
			</div>
			{autocompleteItems && autocompleteItems.users.results.length ? (
				<ul
					tabIndex='0'
					className='dropdown-content dropdown-open border menu p-2 shadow bg-base-100 rounded-box w-full'
				>
					{autocompleteItems.users.results.map(item => (
						<li key={item.id}>
							<a
								onClick={ev => {
									handlerChange(item.name);
									handlerClick(item.name);
								}}
							>
								{item.name}
							</a>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

export default InputSearch;
