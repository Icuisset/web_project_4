export default class Section {

        constructor({ data, renderer }, cardContainerSelector) {
          this._renderedItems = data;
          this._renderer = renderer; 
          this._cardContainer = document.querySelector(cardContainerSelector);
        }

        renderItems() {
            this._renderedItems.forEach(item => this._renderer(item));
          }
      
        addCard(card) {
          this._cardContainer.prepend(card);
        }
      }


   
