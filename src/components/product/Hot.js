import Header from "./Header";
import Item from "../product/ProductItem";

const Hot = (props) => {
  const hot = props.product;

  return (
    <section className="hot grid">
      <Header title="Hot Product" />
      <div className="hot-list row">
        {hot.map((product) => (
          <Item key={product.id} product={product} animation={false} />
        ))}
      </div>
    </section>
  );
};

export default Hot;
