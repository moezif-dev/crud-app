import { CreateElement } from '../';

export default ({msg, type}) => {
	const textMap = {
		"white": 'text-black',
	}
	const textColor = textMap[type] || 'text-white';
	const $Alert = CreateElement('div', `alert bg-${type} ${textColor}`);
	const $Msg = CreateElement('p', 'alert-message');

	$Msg.textContent = msg;

	$Alert.appendChild($Msg);

	return $Alert;
}