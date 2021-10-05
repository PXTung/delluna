import ImgLicense from "../../assets/imgs/license.png";

const Footer = () => {
  return (
    <footer className="footer grid-full">
      <ul className="footer-menu">
        <li className="footer-item">Order</li>
        <li className="footer-separate"></li>
        <li className="footer-item">Award</li>
        <li className="footer-separate"></li>
        <li className="footer-item">Trader</li>
        <li className="footer-separate"></li>
        <li className="footer-item">
          About Us
          <i className="fab fa-facebook fa-lg fab-about"></i>
          <i className="fab fa-instagram fa-lg fab-about"></i>
        </li>
      </ul>
      <div className="footer-infor">
        <span>Tel: 0984074310</span>
        <span>Email: phamxuantung2789@gmail.com</span>
        <span>
          Copyright <i className="far fa-copyright fa-xs"></i> 2021 SHOPEE MALL.
          All rights reserved
        </span>
        <img src={ImgLicense} alt="#" />
      </div>
    </footer>
  );
};

export default Footer;
