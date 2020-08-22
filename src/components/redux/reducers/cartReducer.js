import Item1 from "../../images/item1.jpg";
import Item2 from "../../images/item2.jpg";
import Item3 from "../../images/item3.jpg";
import Item4 from "../../images/item4.jpg";
import Item5 from "../../images/item5.jpg";
import Item6 from "../../images/item6.jpg";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
} from "../action-types/cartActionInit";

const itemUrl = `${process.env.REACT_APP_API_URL}/products`;
// console.log(itemUrl);

let items = [];
fetch(itemUrl)
  .then((res) => {
    return res.json();
  })
  .then((jsonData) => {
    jsonData.map((obj) => items.push(obj));
    // return items;
  })
  .catch((err) => {
    // handle error for example
    console.error(err);
  });
console.log(items);

const initState = {
  items: items,
  addedItems: [],
  total: 0,
};
console.log("initState", initState);
const cartReducer = (state = initState, action) => {
  //INSIDE HOME COMPONENT
  console.log("state", state.items);
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find((item) => item._id === action.id);
    console.log("addedItem", addedItem);

    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find((item) => action.id === item._id);
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price,
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find((item) => action.id === item._id);
    let new_items = state.addedItems.filter((item) => action.id !== item._id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    console.log("itemToRemove", itemToRemove);
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
    };
  }
  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find((item) => item._id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => item._id === action.id);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter((item) => item._id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal,
      };
    }
  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      total: state.total + 6,
    };
  }

  if (action.type === "SUB_SHIPPING") {
    return {
      ...state,
      total: state.total - 6,
    };
  } else {
    return state;
  }
};

export default cartReducer;
