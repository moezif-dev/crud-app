const CreateElement = (el, classes = '', attrs = {}) => {
  // Create a new DOM elemenent
  const $newElement = document.createElement(el);

  // Add new classes
  $newElement.className = classes;

  // Add new attributes
  for (let attr in attrs) {
    $newElement.setAttribute(attr, attrs[attr]);
  };

  return $newElement;
}

export default CreateElement;