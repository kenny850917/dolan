import React, { Component } from "react";
import ProductForm from "./productForm";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, addQuantity, subtractQuantity } from "./redux/cartActions";
import Recipe from "./redux/reciepe";
// import { Button, ButtonGroup, Card } from "react-bootstrap";
import {
  CardImg,
  CardSubtitle,
  CardTitle,
  CardBody,
  Card,
  Button,
  ButtonGroup,
} from "reactstrap";

class Cart extends Component {
  //to remove the item completely
  handleRemove = (id) => {
    this.props.removeItem(id);
  };
  //to add the quantity
  handleAddQuantity = (id) => {
    this.props.addQuantity(id);
  };
  //to substruct from the quantity
  handleSubtractQuantity = (id) => {
    this.props.subtractQuantity(id);
  };
  render() {
    let addedItems = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <Card key={item._id}>
            <CardImg src={item.img} alt="image" />
            <CardTitle>{item.title} </CardTitle>

            <CardTitle>Genre: {item.genre.name} </CardTitle>
            <CardBody>
              <CardSubtitle>Price: ${item.price}</CardSubtitle>
              <CardSubtitle>Quantity: {item.quantity}</CardSubtitle>
              <ButtonGroup size="sm">
                <Link to="/customers">
                  {/* button group */}

                  <Button
                    className="btn btn secondary"
                    onClick={() => {
                      this.handleAddQuantity(item._id);
                    }}
                  >
                    +
                  </Button>
                </Link>
                <Link to="/customers">
                  <Button
                    className="btn btn secondary"
                    onClick={() => {
                      this.handleSubtractQuantity(item._id);
                    }}
                  >
                    -
                  </Button>
                </Link>
              </ButtonGroup>
              {/* button group ends */}
              <Button
                className="btn btn-danger"
                onClick={() => {
                  this.handleRemove(item._id);
                }}
              >
                Remove
              </Button>
            </CardBody>
          </Card>
          // <li className="collection-item avatar" key={item._id}>

          //   <div className="item-img">
          //     <img src={item.img} alt={item.img} className="" />
          //   </div>

          //   <div className="item-desc">
          //     <span className="title">{item.title}</span>
          //     <p>{item.genre.name}</p>
          //     <p>
          //       <b>Price: {item.price}$</b>
          //     </p>
          //     <p>
          //       <b>Quantity: {item.quantity}</b>
          //     </p>
          //     <div className="add-remove">
          //       <ButtonGroup size="sm">
          //         <Link to="/customers">
          //           {/* button group */}

          //           <Button
          //             className="btn btn secondary"
          //             onClick={() => {
          //               this.handleAddQuantity(item._id);
          //             }}
          //           >
          //             +
          //           </Button>
          //         </Link>
          //         <Link to="/customers">
          //           <Button
          //             className="btn btn secondary"
          //             onClick={() => {
          //               this.handleSubtractQuantity(item._id);
          //             }}
          //           >
          //             -
          //           </Button>
          //         </Link>
          //         {/* button group ends */}
          //       </ButtonGroup>
          //     </div>
          // <Button
          //   className="btn btn-danger"
          //   onClick={() => {
          //     this.handleRemove(item._id);
          //   }}
          // >
          //   Remove
          // </Button>
          //   </div>
          // </li>
        );
      })
    ) : (
      <p>Nothing.</p>
    );
    return (
      <div className="container">
        <div className="cart">
          <h5>You have ordered:</h5>
          <ul className="collection">{addedItems}</ul>
        </div>
        <Recipe />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    //addedItems: state.addedItems
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => {
      dispatch(removeItem(id));
    },
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: (id) => {
      dispatch(subtractQuantity(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
