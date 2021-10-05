import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../loading/Loading";
import Header from "./Header";
import ProductItem, { ProductItemFake } from "./ProductItem";

const ProductType = (props) => {
  const name = props.match.params.name;
  const [products, setProducts] = useState();
  const [pageable, setPageable] = useState({ index: 1, size: 12, total: 1 });

  useEffect(() => {
    axios
      .get(
        "https://dellunashop.herokuapp.com/product/type/" +
          name +
          "?index=" +
          pageable.index +
          "&size=" +
          pageable.size,
        {
          header: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
        setPageable({
          index: pageable.index,
          size: pageable.size,
          total: res.data.total,
        });
      });
  }, [name, pageable.index, pageable.size]);

  const updatePage = (page) => {
    setPageable({ index: page, size: pageable.size, total: pageable.total });
  };

  if (products == null) {
    return <Loading />;
  } else {
    return (
      <section className="section-product-type">
        <div className="visual" />
        <Header title={name} />
        <div className="product-type grid">
          <div className="product-type-list row">
            {products.map((product, index) =>
              product.id !== 0 ? (
                <ProductItem key={index} product={product} animation={true} />
              ) : (
                <ProductItemFake key={index} animation={true} />
              )
            )}
          </div>
        </div>
        <Pagination count={pageable.total} color="primary" onChange={(e, page) => updatePage(page)} />
      </section>
    );
  }
};

export default ProductType;
