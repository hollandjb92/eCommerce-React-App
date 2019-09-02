import React from "react";

import "./collection-item.styles.scss";

const CollectionItem = ({ id, name, price, imageUrl }) => {
  return (
    <div className="collectionItem">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collectionFooter">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
};

export default CollectionItem;
