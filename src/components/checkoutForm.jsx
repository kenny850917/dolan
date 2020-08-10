import React from "react";
import ProductForm from "./productForm";
import { getGenres } from "../services/genreService";
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row,
} from "reactstrap";

class CheckoutForm extends ProductForm {
  state = {
    data: {
      image: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  selectGenre = (givenId) => {
    let selected = "genre";
    this.state.genres.map((genre) => {
      if (genre._id === givenId) {
        // genre.name = selected;
        selected = genre.name;
        // console.log(genre.name);
      }
    });
    return selected;
  };

  render() {
    return (
      <div>
        <Container>
          <Card>
            <CardImg
              width="100%"
              src={this.state.data.image}
              alt="Card image cap"
            />

            <CardBody>
              <CardTitle>名稱: {this.state.data.title}</CardTitle>
              <CardSubtitle>
                種類: {this.selectGenre(this.state.data.genreId)}
              </CardSubtitle>
              <CardText>內容</CardText>
              <Button>加入購物車</Button>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default CheckoutForm;
