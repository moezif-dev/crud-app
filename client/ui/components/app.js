import { httpReq, removeChildren } from '../../utils';
import { Alert, CreateElement, CreateDialog, UserCard, loader } from '../';

const httpClient = new httpReq();

class UsersApp{
	constructor(container){
		this.$el = document.querySelector(container);
	}

	init(){
		this.render();
	}

	// TODO: update render to re-render user-cards only
	render(){
		// remove all children when re-rendering
		removeChildren( this.$el );

		// add loading spinner while waiting for data
		loader.add( this.$el );

		httpClient.get('/api/users/all', (err, users) => {
			loader.remove( this.$el );

			if(err){
				// display alert message
				const $Alert = Alert({msg: `Error fetching users from the database. ${err}`, type: 'danger'});
				this.$el.appendChild($Alert);
				return;
			}

			const $AppHeader = CreateElement('div', 'app-header');
			const $CreateButton = CreateElement('button', 'btn bg-primary bg-dark-hover text-white');
			$CreateButton.textContent = 'Create new user';

			$CreateButton.addEventListener('click', function(){
				CreateDialog(null, false);
			});

			$AppHeader.appendChild( $CreateButton ); 

			this.$el.appendChild( $AppHeader );

			// remove loading spinner
			users.forEach(user => {
				const $User = UserCard(user)
				this.$el.appendChild( $User );
			});

		});
	}
}

const app = new UsersApp('#users-app');

export default app;