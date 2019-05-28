import { App, Alert, CreateElement, UserForm } from '../';
import { httpReq, isString } from '../../utils';

const httpClient = new httpReq();

const _dialog = (options = {}) => {
  const { mini = false } = options;
  _removeExistingDialogs();
  const $dialog = CreateElement('div', `card dialog${mini ? ' mini': ''}`);
  const $dialogTitle = CreateElement('h4', 'dialog-title');
  const $dialogContent = CreateElement('div', 'dialog-content');
  const $CloseDialog = CreateElement('i', 'dialog-close fas fa-times float-right');

  // add event listener to close dialog on click
  $CloseDialog.addEventListener('click', function() {
    CloseDialog($dialog);
  });

  // append dialog header/contents
  $dialogTitle.appendChild($CloseDialog);

  $dialog.appendChild($dialogTitle);
  $dialog.appendChild($dialogContent);

  // expose a function to modify the dialog title 
  $dialog.setTitle = ($title) => {
    // convert strings to text node
    if (isString($title)) {
      $title = document.createTextNode($title);
    };

    $dialogTitle.insertBefore($title, $CloseDialog);
  };

  $dialog.appendContent = ($content) => {
    const $dialogActions = $dialog.querySelector('.dialog-actions');
    if ($dialogActions) {
      $dialogContent.insertBefore($content, $dialogActions);
    } else {
      $dialogContent.appendChild($content);
    }
  };

  App.$el.appendChild($dialog);
  return $dialog;
}

// function to remove any existing dialogs
const _removeExistingDialogs = () => {
  const $curDialog = document.querySelector(`#${ App.$el.id } .dialog`);
  if ($curDialog) {
    // remove dialog from DOM
    CloseDialog($curDialog);
  }
};

const _confirmDialog = (options = {}) => {
  const {
    callback = () => null,
      cancel = ($dialog) => CloseDialog($dialog),
      ...rest
  } = options;

  const $dialog = _dialog(rest);
  const $dialogActions = CreateElement('div', 'dialog-actions');
  const $Confirm = CreateElement('button', 'btn bg-danger bg-dark-hover text-white');
  const $Cancel = CreateElement('button', 'btn bg-warning bg-dark-hover text-white');

  $Confirm.textContent = 'Confirm';
  $Cancel.textContent = 'Cancel';

  // add event listener
  $Confirm.addEventListener('click', callback);

  $Cancel.addEventListener('click', function() {
    cancel($dialog);
  });

  $dialogActions.appendChild($Confirm);
  $dialogActions.appendChild($Cancel);


  $dialog.appendContent($dialogActions);

  return $dialog;
};

const CloseDialog = ($dialog) => {
  App.$el.removeChild($dialog);
}

const ViewDialog = (user) => {
  const $dialog = _dialog();

  $dialog.setTitle(user.name);

  // open dialog
  $dialog.classList.add('open');
};

const CreateDialog = (user, isEdit) => {

  const formTitle = isEdit ? 'Edit user' : 'Create user';
  const $CreateForm = UserForm(user, isEdit);

  const callback = () => {
    const { 
      jsonOutput: userJson,
      validation: { isValid, errors } } = $CreateForm.json();

    // reset error fields on submit
    const _resetErrors = () => {
      const $errors = $CreateForm.querySelectorAll(`.user-input-feedback`);
      
      for( let i = 0; i < $errors.length; i++){
        $errors[i].textContent = '';
      }
    };

    // show feedback messages if form is not valid
    _resetErrors();
    if( !isValid ){
      (Object.keys(errors) || []).forEach( err => {
        const errorNode = document.createTextNode(errors[err]);
        const $el = $CreateForm.querySelector(`[name="${err}"] ~ .user-input-feedback`);
        $el && $el.appendChild( errorNode );
      });
      return; 
    }
  
    httpClient.post(`/api/users/`, userJson, (err, resp) => {
      if (err) {
        console.log(err);
        const errMsg = `Error ${isEdit ? 'updating' : 'creating'} user. ${err}`;
        // display alert message
        const $Alert = Alert({ msg: errMsg, type: 'danger' });
        $dialog.appendContent($Alert);
        return;
      }

      App.render()
    });
  };
  const $dialog = _confirmDialog({ callback });

  $dialog.setTitle(formTitle);
  $dialog.appendContent($CreateForm);

  // open dialog
  $dialog.classList.add('open');
};

const DeleteDialog = (user) => {
  const callback = () => {
    httpClient.delete(`/api/users/${user._id}`, (err, resp) => {
      if (err) {
        // display alert message
        const $Alert = Alert({ msg: `Error deleteing user from the database. ${err}`, type: 'danger' });
        $dialog.appendContent($Alert);
        return;
      }

      App.render()
    });
  };

  const $dialog = _confirmDialog({ callback, mini: true });
  const $ConfirmMessage = CreateElement('p', 'dialog-message');

  // set up dialog content
  $ConfirmMessage.textContent = `Are you sure you want to delete ${user.name}?`;

  $dialog.setTitle('Confirm delete');
  $dialog.appendContent($ConfirmMessage);

  // open dialog
  $dialog.classList.add('open');
};

export {
  CloseDialog,
  CreateDialog,
  DeleteDialog,
  ViewDialog,
}