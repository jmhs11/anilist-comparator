import { MEDIA_LIST_STATUSES } from '../constants/mediaListStatuses';
import { MEDIA_TYPE } from '../constants/mediaTypes';
import { SORT_OPTIONS } from '../constants/sortOptions';
import FilterGroup from './forms/FilterGroup';
import InputCheckbox from './forms/InputCheckbox';
import ListFilter from './forms/ListFilter';
import SelectFilter from './forms/SelectFilter';

// const FORMATS = ['TV', 'TV Show', 'Movie', 'Special', 'OVA', 'ONA', 'Music'];
// const STATUSES = ['Finished', 'Releasing', 'Not Yet Released', 'Cancelled'];
// const GENRES = [
// 	'Action',
// 	'Adventure',
// 	'Comedy',
// 	'Drama',
// 	'Ecchi',
// 	'Fantasy',
// 	'Horror',
// 	'Hentai',
// 	'Mahou Shoujo',
// 	'Mecha',
// 	'Music',
// 	'Mystery',
// 	'Psychological',
// 	'Romance',
// 	'Sci-Fi',
// 	'Slice of Life',
// 	'Sports',
// 	'Supernatural',
// 	'Thriller'
// ];
// // const COUNTRIES = ['Japan', 'Shouth Korea', 'China'];

const Filters = ({
	filters,
	setMediaType,
	setTitle,
	setGenres,
	setList,
	setShowFormat,
	setStatus,
	setCountry,
	setYear,
	setSort,
	setDistinct,
	applyFilters
}) => {
	return (
		<div className='dropdown dropdown-end ml-auto'>
			<label
				tabIndex='0'
				className='btn'
				id='filters-btn'
				onClick={ev => {
					const el = document.querySelector('label#filters-btn:focus ~ .dropdown-content');
					const isFocused = window.getComputedStyle(el).getPropertyValue('opacity') === '1';
					if (isFocused) {
						ev.currentTarget.blur();
					}
				}}
			>
				Filters
			</label>
			<form
				tabIndex='0'
				className='dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box border w-[90vw] md:w-max grid grid-cols-2 gap-x-4'
				onSubmit={e => {
					e.preventDefault();
					document.activeElement.blur();
					applyFilters(filters);
				}}
			>
				{/* <InputSearchFilter
					value={filters.title}
					onChange={ev => setTitle(ev.target.value)}
					placeholder='Introduce un título'
					label='Buscar'
				/> */}
				<SelectFilter
					value={filters.mediaType}
					onChange={ev => setMediaType(ev.target.value)}
					label='Tipo de contenido'
				>
					{Object.keys(MEDIA_TYPE).map(type => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</SelectFilter>
				<InputCheckbox
					checked={filters.distinct}
					onChange={ev => setDistinct(ev.target.checked)}
					label='Sólo series distintas'
				/>
				<ListFilter label='Listas'>
					{Object.entries(MEDIA_LIST_STATUSES).map(([key, value]) => (
						<span
							key={key}
							className={`hover:bg-base-200 cursor-pointer px-3 py-1 rounded-lg ${
								value === filters.list ||
								(filters.list === undefined && value === MEDIA_LIST_STATUSES.ALL)
									? 'bg-primary text-primary-content hover:bg-primary-focus'
									: ''
							}`}
							onClick={ev => {
								setList(MEDIA_LIST_STATUSES[ev.target.textContent]);
							}}
						>
							{key}
						</span>
					))}
				</ListFilter>

				{/* <FilterGroup label='Filtros' className='flex flex-col gap-2'>
					<SelectFilter
						value={filters.showFormat}
						onChange={ev => setShowFormat(ev.target.value)}
						defaultOption='Formato'
					>
						{FORMATS.map(format => (
							<option key={format} value={format}>
								{format}
							</option>
						))}
					</SelectFilter>
					<SelectFilter
						value={filters.status}
						onChange={ev => {
							setStatus(ev.target.value);
						}}
						defaultOption='Status'
					>
						{STATUSES.map(status => (
							<option key={status} value={status}>
								{status}
							</option>
						))}
					</SelectFilter>
					<SelectFilter
						className='scrollbar ml-[0!important]'
						multiple
						value={filters.genres}
						onChange={ev => {
							setGenres(ev.target.value);
						}}
						defaultOption='Géneros'
					>
						{GENRES.map(genre => (
							<option
								key={genre}
								value={genre}
								className={`${filters.genres.includes(genre) ? 'bg-[primary!important]' : ''}`}
							>
								{genre}
							</option>
						))}
					</SelectFilter>
					<SelectFilter
						value={filters.country}
						onChange={ev => setCountry(ev.target.value)}
						defaultOption='País'
					>
						{COUNTRIES.map(country => (
							<option key={country} value={country}>
								{country}
							</option>
						))}
					</SelectFilter>
				</FilterGroup> */}

				{/* <FilterGroup
					label='Year'
					className='my-2'
					altLabel={filters.year <= '1950' ? '' : filters.year}
				>
					<InputRangeFilter
						value={filters.year === '1950' ? '1949' : filters.year}
						min='1950'
						max={new Date().getFullYear() + 1}
						onChange={ev => {
							setYear(ev.target.value);
						}}
					/>
				</FilterGroup> */}
				<FilterGroup label='Sort'>
					<SelectFilter value={filters.sort || 'SCORE'} onChange={ev => setSort(ev.target.value)}>
						{Object.entries(SORT_OPTIONS).map(([key, value]) => (
							<option key={key} value={value}>
								{key}
							</option>
						))}
					</SelectFilter>
				</FilterGroup>

				<button className='btn btn-primary mt-2 col-span-2'>Aplicar</button>
			</form>
		</div>
	);
};

export default Filters;
