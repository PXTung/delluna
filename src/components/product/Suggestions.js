import Header from "./Header";
import ImgArrow from "../../assets/imgs/arrow.gif";
import { useHistory } from "react-router";

const Suggestions = (props) => {
  const history = useHistory();
  const suggetsions = props.product;

  const readmoreHandler = (name) => {
    history.push("/product/type/" + name);
  };

  const Suggestion = (props) => {
    const product = props.product;
    return (
      <div className="suggestion-item col-3 item-animation">
        <div className="suggestion-frame">
          <div className="suggestion-content">
            <div className="suggestion-description">{product.description}</div>
            <div className="suggestion-name">{product.name}</div>
            <button className="suggestion-more" onClick={() => readmoreHandler(product.type.name)}>
              Read More
              <span>
                <img src={ImgArrow} alt="#" />
              </span>
            </button>
          </div>
          <div className="suggestion-image">
            <img src={product.profilePicture} alt="" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="suggestion grid">
      <Header title="Product Suggestion" />
      <div className="suggestion-list row">
        {suggetsions.map((product) => {
          return <Suggestion key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};

export default Suggestions;
