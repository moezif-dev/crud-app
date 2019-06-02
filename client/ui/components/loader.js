import { CreateElement } from '../';

/* a component to add/remove a loading intindicator to an element */
class Loader {
  constructor($el, center){
    const $Loader = CreateElement('div', 'loader');
    const $loadingDot1 = CreateElement('span', 'loading-dot');
    const $loadingDot2 = CreateElement('span', 'loading-dot');
    const $loadingDot3 = CreateElement('span', 'loading-dot');

    $Loader.appendChild($loadingDot1);
    $Loader.appendChild($loadingDot2);
    $Loader.appendChild($loadingDot3);

    this.$el = $el;
    this.center = center;
    this.$loader = $Loader;
  };

  add(){
    this.toggleCenter();
    this.$el.prepend( this.$loader );
  };

  remove(){
    this.$el.contains( this.$loader ) && this.$el.removeChild( this.$loader );
  }

  toggleCenter(){
  	if(this.center){
  		this.$loader.classList.add('center');
  	} else {
  		this.$loader.classList.remove('center');
  	}
  }
};

export default Loader;