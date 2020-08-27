import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";
import Image from "./image";

class ProductsTable extends Component {
  columns = [
    {
      path: "image",
      label: "Image",
      content: (product) => <Image />,
    },
    {
      path: "title",
      label: "Title",
      content: (product) => (
        <Link to={`/checkout/${product._id}`}>{product.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "price", label: "Rate" },
    {
      key: "like",
      content: (product) => (
        <Like
          liked={product.liked}
          onClick={() => this.props.onLike(product)}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (product) => (
      <button
        onClick={() => this.props.onDelete(product)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  adminEditColumn = {
    path: "edit",
    label: "Edit",
    content: (product) => (
      <Link to={`/products/${product._id}`}>{product.title}</Link>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
      this.columns.push(this.adminEditColumn);
    }
  }

  render() {
    const { products, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={products}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProductsTable;
