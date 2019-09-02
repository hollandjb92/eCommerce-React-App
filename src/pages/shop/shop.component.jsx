import React, { Component } from "react";
import ShopData from "./shop.data";
import PreviewCollection from "../../components/preview-collection/preview-collection.component";

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = { collections: ShopData };
  }
  render() {
    const { collections } = this.state;
    return (
      <div className="shopPage">
        {collections.map(({ id, ...otherCollectionProps }) => (
          <PreviewCollection key={id} {...otherCollectionProps} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
