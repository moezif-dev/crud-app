export default ($el) => {
	let last;
	while (last = $el.lastChild) $el.removeChild(last);
}