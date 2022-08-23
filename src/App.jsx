import Split from 'react-split';
import Header from './components/Header';
import MediaSection from './components/MediaSection';

const App = () => (
	<div className='md:p-4'>
		<Header />
		{/* <main className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<MediaSection />
			<MediaSection />
		</main> */}
		<Split direction='vertical' style={{ height: 'calc(100vh - 8rem)' }}>
			<MediaSection />
			<MediaSection />
		</Split>
	</div>
);

export default App;
