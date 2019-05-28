import { CreateElement } from '../';

const _renderFields = (formFields = []) => {
  const $parent = CreateElement('div', 'user-form');

  formFields.forEach(field => {
    const { label = '', value, type, disabled = false } = field;
    // if name is not provided, use a lower-cased label
    const name = field.name || label.toLowerCase();

    const $input = CreateElement('input', 'user-input', { name, type, value });
    if( disabled ) {
      $input.disabled = true;
    };
    const $label = CreateElement('label', 'user-label');
    const $inputGroup = CreateElement('div', 'user-input-group');

    $label.textContent = label;
    $inputGroup.appendChild($label);
    $inputGroup.appendChild($input);

    $parent.appendChild($inputGroup);
  });

  return $parent;
};

const UserForm = (user, editMode = false) => {
  const defaults = {
    age: 0,
    balance: '$0',
    company: '',
    email: '',
    gender: 'male',
    name: '',
  };

  const formData = user || defaults;
  const formFields = [
    { label: "Name", value: formData.name, type: "text", disabled: editMode},
    { label: "Email", value: formData.email, type: "text", disabled: editMode},
    { label: "Age", value: formData.age, type: "number", },
    { label: "Balance", value: formData.balance, type: "text", },
    { label: "Company", value: formData.company, type: "text", },
    { label: "Gender", value: formData.gender, type: "select", disabled: editMode},
  ];

  // only render ID for edit mode
  if(editMode){
    const _idField = { label: "ID", name: "_id", value: formData._id, type: "text", disabled: true};
    formFields.unshift( _idField );
  }

  const $UserForm = _renderFields(formFields);

  // a function that returns form values in a json format
  $UserForm.json = function(){
  		const $inputNodes = this.querySelectorAll('.user-input');

  		const jsonOutput = {};
  		for(let i = 0; i < $inputNodes.length; i++){
  			const name = $inputNodes[i]['name'];
  			const value = $inputNodes[i]['value'];
  			
  			jsonOutput[name] = value;
  		}

  		return jsonOutput;
  };

  return $UserForm;
};

export default UserForm;