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

let fetched = [];
fetch(itemUrl)
  .then((res) => {
    return res.json();
  })
  .then((jsonData) => {
    jsonData.map((obj) => fetched.push(obj));
    // return fetched;
  })
  .catch((err) => {
    // handle error for example
    console.error(err);
  });
console.log(fetched);

const initState = {
  items: [
    {
      _id: {
        $oid: "5e5dd2b951a00f5db072487b",
      },
      title: "月桃籃禮盒組",
      numberInStock: 10,
      price: 2,
      image: Item1,
      genre: {
        _id: {
          $oid: "5f2a1d3489e8b6be161384e9",
        },
        name: "在地文創＆禮盒",
      },
      __v: 0,
      image: "http://via.placeholder.com/1080x720",
    },
    {
      _id: {
        $oid: "5e5dd2b951a00f5db0724880",
      },
      title: "檳榔潔膚皂",
      numberInStock: 5,
      price: 4,
      genre: {
        _id: {
          $oid: "5f2a1b8789e8b6be161384e6",
        },
        name: "檳菸酒系列",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "5e5dd2b951a00f5db0724882",
      },
      title: "可懸掛式皂球款",
      numberInStock: 5,
      price: 3,
      genre: {
        _id: {
          $oid: "5f2a1d3489e8b6be161384e9",
        },
        name: "在地文創＆禮盒",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "5e5dd2b951a00f5db0724884",
      },
      title: "琉璃珠皂球款",
      numberInStock: 15,
      price: 2,
      genre: {
        _id: {
          $oid: "5f2a1d3489e8b6be161384e9",
        },
        name: "在地文創＆禮盒",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "5e5dd2b951a00f5db072488b",
      },
      title: "海鹽潔膚皂",
      numberInStock: 15,
      price: 2,
      genre: {
        _id: {
          $oid: "5f2a1bb189e8b6be161384e8",
        },
        name: "其他",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "5e5dd2b951a00f5db0724890",
      },
      title: "菸草潔膚皂",
      numberInStock: 10,
      price: 2,
      genre: {
        _id: {
          $oid: "5f2a1b8789e8b6be161384e6",
        },
        name: "檳菸酒系列",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "5e5de00f569e6c561c081404",
      },
      title: "小米酒潔膚皂",
      genre: {
        _id: {
          $oid: "5f2a1b8789e8b6be161384e6",
        },
        name: "檳菸酒系列",
      },
      numberInStock: 11,
      price: 9,
      __v: 0,
    },
    {
      _id: {
        $oid: "5e5de118569e6c561c08142d",
      },
      title: "洛神潔膚皂",
      genre: {
        _id: {
          $oid: "5f2a1ba489e8b6be161384e7",
        },
        name: "老寶貝系列",
      },
      numberInStock: 1,
      price: 2,
      __v: 0,
    },
    {
      _id: {
        $oid: "5e5de126569e6c561c08143e",
      },
      title: "紅藜潔膚皂",
      genre: {
        _id: {
          $oid: "5f2a1ba489e8b6be161384e7",
        },
        name: "老寶貝系列",
      },
      numberInStock: 2,
      price: 2,
      __v: 0,
    },
    {
      _id: {
        $oid: "5e5de12d569e6c561c081450",
      },
      title: "母奶潔膚皂",
      genre: {
        _id: {
          $oid: "5f2a1ba489e8b6be161384e7",
        },
        name: "老寶貝系列",
      },
      numberInStock: 11,
      price: 9,
      __v: 0,
    },
  ],
  addedItems: [],
  total: 0,
};
console.log("initState", initState);
const cartReducer = (state = initState, action) => {
  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find((item) => item._id.$oid === action.id);
    console.log("addedItem", addedItem);

    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(
      (item) => action.id === item._id.$oid
    );
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
    let itemToRemove = state.addedItems.find(
      (item) => action.id === item._id.$oid
    );
    let new_items = state.addedItems.filter(
      (item) => action.id !== item._id.$oid
    );

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
    let addedItem = state.items.find((item) => item._id.$oid === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => item._id.$oid === action.id);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter(
        (item) => item._id.$oid !== action.id
      );
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
