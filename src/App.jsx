import Split from 'react-split';
import Header from './components/Header';
import MediaSection from './components/MediaSection';

const App = () => (
	<>
		<Header />
		<main className='hidden md:grid md:grid-cols-2 md:gap-4'>
			<MediaSection />
			<MediaSection />
		</main>
		<Split className='md:hidden' direction='vertical' style={{ height: 'calc(100vh - 8rem)' }}>
			<MediaSection />
			<MediaSection />
		</Split>
	</>
);

export default App;
