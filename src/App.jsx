import Split from 'react-split';
import Filters from './components/Filters';
import Header from './components/Header';
import MediaSection from './components/MediaSection';
import useFilters from './lib/hooks/useFilters';

const App = () => {
	const { filters, ...setFiltersFunctions } = useFilters();

	return (
		<>
			<Header />
			<Filters filters={filters} {...setFiltersFunctions} />
			<main className='hidden md:grid md:grid-cols-2 md:gap-4'>
				<MediaSection filters={filters} />
				<MediaSection filters={filters} />
			</main>
			<Split className='md:hidden' direction='vertical' style={{ height: 'calc(100vh - 5rem)' }}>
				<MediaSection filters={filters} />
				<MediaSection filters={filters} />
			</Split>
		</>
	);
};

export default App;
