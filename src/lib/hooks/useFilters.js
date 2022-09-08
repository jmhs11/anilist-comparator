import { useReducer } from 'react';
import { MEDIA_LIST_STATUSES } from '../../constants/mediaListStatuses';
import { MEDIA_TYPE } from '../../constants/mediaTypes';

const filtersReducer = (state, action) => {
	switch (action.type) {
		case 'media_type_changed':
			return { ...state, mediaType: action.value };
		case 'title_changed':
			return { ...state, title: action.value };
		case 'genres_changed':
			return {
				...state,
				genres: state.genres.includes(action.value)
					? state.genres.filter(g => g !== action.value)
					: [action.value, ...state.genres]
			};
		case 'list_changed':
			return { ...state, list: action.value };
		case 'format_changed':
			return { ...state, showFormat: action.value };
		case 'status_changed':
			return { ...state, status: action.value };
		case 'country_changed':
			return { ...state, country: action.value };
		case 'year_changed':
			return { ...state, year: action.value };
		case 'sort_changed':
			return { ...state, sort: action.value };
		case 'distinct_changed':
			return { ...state, distinct: action.value };

		default:
			throw new Error(`Invalid action type`);
	}
};

const useFilters = () => {
	const [filters, dispatchFilters] = useReducer(filtersReducer, {
		mediaType: MEDIA_TYPE.ANIME, // ANIME or MANGA
		title: '', // search by title
		genres: [], // Array de generos a filtrar (Romance, Action, ...)
		list: MEDIA_LIST_STATUSES.ALL, // Opciones seleccionables (All, Watching, Planned, Reading ...)
		showFormat: '', // Formato del contenido (TV, OVA, Manga, One Shot ...)
		status: '', // Estado del contenido (Finished, NYA, ...)
		country: '', // Pais de origen (Japan, South Korea, China)
		year: '', // Año de publicacion (2019, 2020, ...)
		sort: 'SCORE', // Tipo de ordenado (score, title, last Updated, ...),
		distinct: false // Solo las series que no son comunes entre las 2 listas
	});

	return {
		filters,
		dispatchFilters
	};
};

export default useFilters;
