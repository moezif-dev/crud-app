import { $AppContainer, CreateElement } from '../';

const _dialog = (prompt = false) => {
	_removeExistingDialogs();
	const $dialog = CreateElement('div', `card dialog${prompt ? ' mini': ''}`);
	$AppContainer.appendChild( $dialog );
	return $dialog;
}

// function to remove any existing dialogs
const _removeExistingDialogs = () => {
	const $curDialog = document.querySelector(`#${ $AppContainer.id } .dialog`);
	if( $curDialog ){
		// remove dialog from DOM
		CloseDialog( $curDialog );
	}
};

const ViewDialog = (user) => {
	const $dialog = _dialog();

	// do stuff

	// open dialog
	$dialog.classList.add('open');
};

const CreateDialog = (user, isEdit) => {
	const $dialog = _dialog();

};

const DeleteDialog = (user) => {
	const $dialog = _dialog(true);
};

const CloseDialog = ( $dialog ) => {
	$AppContainer.removeChild( $dialog );
}

export {
	CloseDialog,
	CreateDialog,
	DeleteDialog, 
	ViewDialog,
}