import { useEffect, useState } from 'react';
import Split from 'react-split';
import Filters from './components/Filters';
import Header from './components/Header';
import MediaSection from './components/MediaSection';
import useFilters from './lib/hooks/useFilters';

const App = () => {
	const { filters, ...setFiltersFunctions } = useFilters();

	const [split, setSplit] = useState(window.innerWidth <= 768);

	useEffect(() => {
		window.addEventListener('resize', () => setSplit(window.innerWidth <= 768));
	}, []);

	return (
		<>
			<Header />
			<Filters filters={filters} {...setFiltersFunctions} />
			{split ? (
				<Split className='md:hidden' direction='vertical' style={{ height: 'calc(100vh - 5rem)' }}>
					<MediaSection filters={filters} />
					<MediaSection filters={filters} />
				</Split>
			) : (
				<main className='hidden md:grid md:grid-cols-2 md:gap-4'>
					<MediaSection filters={filters} />
					<MediaSection filters={filters} />
				</main>
			)}
		</>
	);
};

export default App;
