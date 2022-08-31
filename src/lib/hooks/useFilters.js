import { useState } from 'react';
import { MEDIA_LIST_STATUSES } from '../../constants/mediaListStatuses';
import { MEDIA_TYPE } from '../../constants/mediaTypes';

const useFilters = () => {
	const [filters, setFilters] = useState({
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

	const setMediaType = mediaType => setFilters({ ...filters, mediaType });
	const setTitle = title => setFilters({ ...filters, title });
	const setGenres = genre =>
		setFilters({
			...filters,
			genres: filters.genres.includes(genre)
				? filters.genres.filter(g => g !== genre)
				: [genre, ...filters.genres]
		});
	const setList = list => setFilters({ ...filters, list });
	const setShowFormat = showFormat => setFilters({ ...filters, showFormat });
	const setStatus = status => setFilters({ ...filters, status });
	const setCountry = country => setFilters({ ...filters, country });
	const setYear = year => setFilters({ ...filters, year });
	const setSort = sort => setFilters({ ...filters, sort });
	const setDistinct = distinct => setFilters({ ...filters, distinct });

	return {
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
		setDistinct
	};
};

export default useFilters;
