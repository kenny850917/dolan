import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getProduct,
  getProductCheckout,
  saveProduct,
} from "../services/productService";
import { getGenres } from "../services/genreService";

class ProductForm extends Form {
  state = {
    data: {
      // image: "",
      title: "",
      genreId: "",
      numberInStock: "",
      price: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    // image: Joi.string().label("Image"),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(1000)
      .label("Number in Stock"),
    price: Joi.number().required().min(0).label("Price "),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateProduct() {
    try {
      const productId = this.props.match.params.id;
      if (productId === "new") return;

      const { data: product } = await getProduct(productId);
      this.setState({ data: this.mapToViewModel(product) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async populateProductCheckout() {
    try {
      const productId = this.props.match.params.id;
      if (productId === "new") return;

      const { data: product } = await getProductCheckout(productId);
      this.setState({ data: this.mapToViewModel(product) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateProduct();
    // await this.populateProductCheckout();
  }

  //fetch the info on product
  mapToViewModel(product) {
    return {
      _id: product._id,
      title: product.title,
      genreId: product.genre._id,
      numberInStock: product.numberInStock,
      price: product.price,
    };
  }

  doSubmit = async () => {
    await saveProduct(this.state.data);

    this.props.history.push("/products");
  };

  render() {
    return (
      <div>
        <h1>Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          {/* {this.renderInput("image", "imageUrl")} */}
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("price", "Price")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ProductForm;
