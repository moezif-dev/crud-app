import { CreateDialog, CreateElement, DeleteDialog, ViewDialog } from '../';
 
const _createContentItems = (contents = []) => {
  return contents.map(content => {
    const $item = CreateElement('li', 'card-content-item');
    const $itemTitle = CreateElement('span', 'item-title text-bold');

    $itemTitle.textContent = content.title;
    $item.appendChild($itemTitle);

    const textValue = document.createTextNode(content.value);
    $item.appendChild(textValue);

    return $item;
  });
}

const _createContentActions = (actions = []) => {
  return actions.map(action => {
  	const {dialog, title, user, classes} = action;
    const $item = CreateElement('li', 'card-action');
    const $itemIcon = CreateElement('i', classes, {title});

    $item.appendChild($itemIcon);

    $item.addEventListener('click', function(){
    	dialog.call(this, user, true);
    });
    return $item;
  });
}

/* HTML Structure:
	<div class="card">
		<div class="card-header">
			<div class="card-img">
				<img src="http://placehold.it/32x32" alt="Picture for ${name}"/>
			</div>
			<h4 class="card-name">Reyna Levy</h4>
			<div class="status float-right"></div>
		</div>
			<ul class="card-content">
				<li class="card-content-item"><span class="item-title text-bold">Age: </span>37</li>
				<li class="card-content-item"><span class="item-title text-bold">Gender: </span>Female</li>
				<li class="card-content-item"><span class="item-title text-bold">Company: </span>ULTRASURE</li>
				<li class="card-content-item"><span class="item-title text-bold">Balance: </span>$2,890.89</li>
			</ul>
			<ul class="card-actions">
				<li class="card-action view"><i class="far fa-address-card text-primary dark-hover"></i></li>
				<li class="card-action edit"><i class="far fa-user-edit text-primary dark-hover"></i></li>
				<li class="card-action delete"><i class="far fa-user-times text-danger dark-hover"></i></li>
			</ul>
	</div>
*/
export default (user) => {
  // destruct user info
  const {
    age,
    balance,
    company,
    gender,
    isActive,
    name,
    picture,
  } = user;

  const cardContent = [
    { title: "Age: ", value: age },
    { title: "Balance: ", value: balance },
    { title: "Company: ", value: company },
    { title: "Gender: ", value: gender },
  ];

  const cardActions = [
    { user, title: "View details", dialog: ViewDialog, classes: 'fas fa-address-card text-primary text-dark-hover'},
    { user, title: "Edit user", dialog: CreateDialog, classes: 'fas fa-user-edit text-primary text-dark-hover' },
    { user, title: "Delete user", dialog: DeleteDialog, classes: 'fas fa-user-times text-danger text-dark-hover' },
  ];

  // create card container
  const $Card = CreateElement('div', 'card');

  // create card header
  const $CardHeader = CreateElement('div', 'card-header');
  const $CardImage = CreateElement('div', 'card-image');
  const $CardImg = CreateElement('img', '', { src: picture, alt: `Picture for ${name}` });
  const $CardName = CreateElement('h4', 'card-name');
  $CardName.textContent = name;

  const $CardStatus = CreateElement('div', `status float-right ${isActive ? 'bg-success' : 'bg-danger'}`);

  // append header items
  $CardImage.appendChild($CardImg);
  $CardHeader.appendChild($CardImage);
  $CardHeader.appendChild($CardName);
  $CardHeader.appendChild($CardStatus);
  $Card.appendChild($CardHeader);

  // create card contents
  const $CardContent = CreateElement('ul', 'card-content');
  const $CardContentItems = _createContentItems(cardContent);
  $CardContentItems.forEach($item => $CardContent.appendChild($item));

  const $CardActions = CreateElement('ul', 'card-actions');
  const $CardContentActions = _createContentActions(cardActions);
  $CardContentActions.forEach($item => $CardActions.appendChild($item));

  // Append header/content into Card element
  $Card.appendChild($CardContent);
  $Card.appendChild($CardActions);

  return $Card;
}