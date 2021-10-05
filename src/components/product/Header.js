const Header = (props) => {
  return (
    <div className="product-header">
      <span className="product-header-branch">Shopee Mall</span>
      <h2 className="product-header-type product-header-wave">{props.title}</h2>
    </div>
  );
};

export default Header;
