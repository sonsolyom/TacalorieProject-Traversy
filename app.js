//Storage Controller

//Item Controller
const ItemCtrl =(function(){
  //Item Constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data Structure / State
  const data = {
    items: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Eggs', calories: 300}
    ],
    currentItem: null,
    totalCalories: 0
  }
  
  //Public methods
  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(name, calories){
      let ID;
      //create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Calories to number
      calories = parseInt(calories);

      //Create new otem
      newItem = new Item(ID, name, calories);

      //Add to items array
      data.item.push(newItem);

      return newItem;
    },
    logData: function(){
      return data;
    }
  }

  
})();



//UI Controller
const UICtrl =(function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
  }
  
  //Public methods
  return {
    populateItemList: function(items){
      let html = '';

      items.forEach(function(item){
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>
        `;
      });

      //Insert ist items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function(){
      return {
        name: document.querySelector(UICtrl.itemNameInput).value,
        calories: document.querySelector(UICtrl.itemCaloriesInput).value
      }
    },

    getSelectors: function(){
      return UISelectors;
    }
  }

})();

//App Controller
const App = (function(ItemCtrl, UICtrl){
  //Load event listeners
  const loadEventListeners = function(){
    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //Add item submit
    const itemAddSubmit = function(e){
      //Get form input from UICtrl
      const input = UICtrl.getItemInput();

      //Check for name and calories input
      if(input.name !== '' && input.calories !== ''){
        //Add item
        const newItem = ItemCtrl.addItem(input.name, input.calories);
      }

      e.preventDefault();
    }
  }

  /* console.log(ItemCtrl.logData()); */

  //Public methods
  return {
    init: function() {
      /* console.log('Initializing App...'); */

      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Populate list with item
      UICtrl.populateItemList(items);

      //Load event listeners
      loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl);

//Initialize App
App.init();