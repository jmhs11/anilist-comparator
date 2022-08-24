import { MEDIA_TYPE } from '../constants/mediaTypes';
import FilterGroup from './forms/FilterGroup';
import InputRangeFilter from './forms/InputRangeFilter';
import InputSearchFilter from './forms/InputSearchFilter';
import ListFilter from './forms/ListFilter';
import SelectFilter from './forms/SelectFilter';

const LISTS = ['Todas', 'Viendo', 'Completadas', 'Pendientes', 'Descartadas', 'Pausadas'];
const FORMATS = ['TV', 'TV Show', 'Movie', 'Special', 'OVA', 'ONA', 'Music'];
const STATUSES = ['Finished', 'Releasing', 'Not Yet Released', 'Cancelled'];
const GENRES = [
	'Action',
	'Adventure',
	'Comedy',
	'Drama',
	'Ecchi',
	'Fantasy',
	'Horror',
	'Hentai',
	'Mahou Shoujo',
	'Mecha',
	'Music',
	'Mystery',
	'Psychological',
	'Romance',
	'Sci-Fi',
	'Slice of Life',
	'Sports',
	'Supernatural',
	'Thriller'
];
const COUNTRIES = ['Japan', 'Shouth Korea', 'China'];
const SORT_OPTIONS = [
	'Title',
	'Score',
	'Progress',
	'Last Updated',
	'Last Added',
	'Start Date',
	'Completed Date',
	'Release Date',
	'Average Score',
	'Popularity'
];

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
	applyFilters
}) => {
	return (
		<div className='fixed top-3 right-5 dropdown dropdown-end z-50'>
			<label tabIndex='0' className='btn'>
				Filters
			</label>
			<form
				tabIndex='0'
				className='dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box border w-max grid grid-cols-2 gap-x-4'
				onSubmit={e => {
					e.preventDefault();
					document.activeElement.blur();
					// applyFilters();
					console.log(filters);
				}}
			>
				<InputSearchFilter
					value={filters.title}
					onChange={ev => setTitle(ev.target.value)}
					placeholder='Introduce un título'
					label='Buscar'
				/>
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
				<ListFilter label='Listas'>
					{LISTS.map(list => (
						<span
							key={list}
							className={`hover:bg-base-200 cursor-pointer px-3 py-1 rounded-lg ${
								filters.list === list
									? 'bg-primary text-white hover:bg-primary-focus'
									: filters.list === '' && list === 'Todas'
									? 'bg-primary text-white hover:bg-primary-focus'
									: ''
							}`}
							onClick={ev => {
								setList(ev.target.textContent);
							}}
						>
							{list}
						</span>
					))}
				</ListFilter>
				<FilterGroup label='Filtros' className='flex flex-col gap-2'>
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
				</FilterGroup>

				<FilterGroup
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
				</FilterGroup>
				<FilterGroup label='Sort'>
					<SelectFilter
						value={filters.sort}
						onChange={ev => setSort(ev.target.value)}
						defaultOption='Score'
					>
						{SORT_OPTIONS.map(sort => (
							<option key={sort} value={sort}>
								{sort}
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
