import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const query = gql`
	query ($id: Int, $name: String) {
		User(id: $id, name: $name) {
			name
			id
			about(asHtml: true)
		}
	}
`;

const App = () => {
	const [getUser, result] = useLazyQuery(query);
	const [user, setUser] = useState();

	const showUser = () => {
		getUser({
			variables: { name: document.querySelector('[name="input"]').value }
		});
	};

	useEffect(() => {
		setUser(result.data);
	}, [result]);

	return (
		<>
			<div className='flex'>
				<div className='m-4'>
					<input
						className='block mb-4 input input-primary'
						text='Button'
						name='input'
					/>
				</div>
				<div className='m-4'>
					<input className='block mb-4 input input-primary' text='Button' />
				</div>
				<button type='button' onClick={showUser}>
					Enviar
				</button>
			</div>
			{user && (
				<>
					<p>{user.User.id}</p>
					<p>{user.User.name}</p>
					<p dangerouslySetInnerHTML={{ __html: user.User.about }}></p>
				</>
			)}
		</>
	);
};

export default App;
