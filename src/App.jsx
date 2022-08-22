import Header from './components/Header';
import MediaSection from './components/MediaSection';

const App = () => (
	<div className='p-4'>
		<Header />
		<main className='grid grid-cols-2 gap-4'>
			<MediaSection />
			<MediaSection />
		</main>
	</div>
);

export default App;
