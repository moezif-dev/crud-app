import { httpReq } from './utils';
import { $AppContainer, UserCard, loader } from './ui';
import './assets/css/index.scss';

const httpClient = new httpReq();

// add loading spinner while waiting for data
loader.add($AppContainer);

httpClient.get('/api/users/all', (err, users) => {
	console.log({users});
	if(err){
		// display alert message
		console.log({err});
		return;
	}
	// remove loading spinner
	loader.remove($AppContainer);
	
	users.forEach(user => {
		const $User = UserCard(user)
		$AppContainer.appendChild( $User );
	});

});