import { MEDIA_TYPE } from '../../constants/mediaTypes';
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
		<div className='w-full my-2 dropdown'>
			<div className={`relative ${className || ''}`} tabIndex='0'>
				<SearchIcon className='absolute w-6 h-6 pointer-events-none top-3 left-4 text-slate-200' />
				<input
					{...props}
					tabIndex={0}
					className={`input input-bordered pl-12 w-full ${error && 'input-error'} `}
					type='text'
					onChange={ev => handlerChange(ev.target.value)}
				></input>
				{error && (
					<label className='label'>
						<span className='text-red-400 label-text-alt'>{error}</span>
					</label>
				)}
			</div>
			{autocompleteItems && autocompleteItems.users.results.length ? (
				<ul
					tabIndex='0'
					className='w-full mt-2 p-2 border shadow dropdown-content dropdown-open menu bg-base-100 rounded-box'
				>
					{autocompleteItems.users.results.map(item => (
						<li key={item.id}>
							<a
								onClick={ev => {
									const { setName, setList } = handlerClick;
									setName(item.name);
									setList(MEDIA_TYPE.ANIME);
									document.activeElement.blur();
									console.log(item.name, 'clicked');
								}}
								className='flex gap-4'
							>
								<img src={item.avatar.medium} alt={`${item.name}'s Avatar`} className='w-8 h-8' />
								<span className='text-base'>{item.name}</span>
							</a>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

export default InputSearch;
