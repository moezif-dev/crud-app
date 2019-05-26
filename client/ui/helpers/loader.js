/* fix loader css */
/* a function to add/remove a loading spinner into an element */
const loader = {
	add: ($el) => {
		$el.classList.add('spin-loader');
	},
	remove: ($el) => {
		$el.classList.remove('spin-loader');
	}
};

export default loader;
