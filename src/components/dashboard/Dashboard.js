import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { TypeContext } from "../../context/Type";

const Dashboard = () => {
  const host = "http://dellunashop.us-east-2.elasticbeanstalk.com/"
  const history = useHistory();
  const [pictures, setPictures] = useState([{ key: 0, value: "" }]);
  const [images, setImages] = useState([]);

  const [menu, setMenu] = useState({
    dashboard: true,
    employee: false,
    product: false,
  });

  const [product, setProduct] = useState({
    id: 0,
    type: {},
    name: "",
    description: "",
    price: 0,
    amount: 0,
    images: [],
    profilePicture: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get("http://dellunashop.us-east-2.elasticbeanstalk.com/admin", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .catch((e) => {
        console.log(e)
        console.log(localStorage.getItem("token"))
        history.push("/login");
        toast("YOU DON'T HAVE PERMISSION");
      });
  });

  const updateMenu = (menu) => {
    switch (menu) {
      case "dashboard":
        setMenu({ dashboard: true, employee: false, product: false });
        break;
      case "employee":
        setMenu({ dashboard: false, employee: true, product: false });
        break;
      case "product":
        setMenu({ dashboard: false, employee: false, product: true });
        break;
      default:
        setMenu({ dashboard: true, employee: false, product: false });
        break;
    }
  };

  const typeHandler = (e) => {
    product.type = { id: e.target.value, name: "" };
  };

  const nameHandler = (e) => {
    product.name = e.target.value;
  };

  const descriptionHandler = (e) => {
    product.description = e.target.value;
  };

  const priceHandler = (e) => {
    product.price = e.target.value;
  };

  const amountHandler = (e) => {
    product.amount = e.target.value;
  };

  const contentHandler = (e) => {
    product.content = e.target.value;
  };

  const updatePicture = (key, value) => {
    images[key] = { key: key, link: value, type: "normal" };
    setImages([...images]);
    product.images = images;

    pictures[key].value = value;
    setPictures([...pictures]);
  };

  const addMorePicture = () => {
    let check = true;

    pictures.forEach((picture) => {
      if (picture.value === "") {
        check = false;
        return;
      }
    });

    if (check) {
      setPictures([...pictures, { key: pictures.length, value: "" }]);
    }
  };

  const selectImage = (key) => {
    images.forEach((image) => (image.type = "normal"));

    images[key].status = "profile";
    setImages([...images]);

    product.profilePicture = images[key].link;
  };

  const submitForm = () => {
    console.log(JSON.stringify(product));

    axios
      .post(host + "product", JSON.stringify(product), {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((res) => console.log("OK: " + res))
      .catch((error) => console.log("ERROR: " + error));
  };

  const resetForm = () => {
    setPictures([{ key: 0, value: "" }]);
    setImages([]);
    setProduct({
      id: 0,
      type: {},
      name: "",
      description: "",
      price: 0,
      amount: 0,
      images: [],
      profilePicture: "",
      content: "",
    });
  };

  return (
    <section className="dashboard grid">
      <div className="dashboard-menu">
        <ul className="dashboard-menu-list">
          <li
            className={menu.dashboard ? "dashboard-menu-item menu-active" : "dashboard-menu-item"}
            onClick={() => updateMenu("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={menu.employee ? "dashboard-menu-item menu-active" : "dashboard-menu-item"}
            onClick={() => updateMenu("employee")}
          >
            Add Employee
          </li>
          <li
            className={menu.product ? "dashboard-menu-item menu-active" : "dashboard-menu-item"}
            onClick={() => updateMenu("product")}
          >
            Add Product
          </li>
        </ul>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-content-title">ADD PRODUCT</div>
        <form action="#" method="post" autoComplete="off">
          <div className="dashboard-content-field">
            <label htmlFor="type" className="dashboard-content-label">
              Type
            </label>
            <select name="" id="" onChange={(e) => typeHandler(e)}>
              <option value="0">Select Product Type</option>
              <TypeContext.Consumer>
                {({ types }) =>
                  types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))
                }
              </TypeContext.Consumer>
            </select>
          </div>
          <div className="dashboard-content-field">
            <label htmlFor="name" className="dashboard-content-label">
              Name
            </label>
            <input type="text" className="dashboard-content-name" onChange={(e) => nameHandler(e)} />
          </div>
          <div className="dashboard-content-field">
            <label htmlFor="description" className="dashboard-content-label">
              Description
            </label>
            <input type="text" className="dashboard-content-description" onChange={(e) => descriptionHandler(e)} />
          </div>
          <div className="dashboard-content-field">
            <label htmlFor="price" className="dashboard-content-label">
              Price
            </label>
            <input type="text" className="dashboard-content-type" onChange={(e) => priceHandler(e)} />
          </div>
          <div className="dashboard-content-field">
            <label htmlFor="amount" className="dashboard-content-label">
              Amount
            </label>
            <input type="text" className="dashboard-content-amount" onChange={(e) => amountHandler(e)} />
          </div>
          <div className="dashboard-content-field">
            <label htmlFor="pictures" className="dashboard-content-label">
              Pictures
            </label>
            <div className="dashboard-content-pictures">
              {pictures.map((picture) => (
                <input
                  key={picture.key}
                  type="text"
                  className="dashboard-content-pictures"
                  id="pictures"
                  name="pictures"
                  value={picture.value}
                  onChange={(e) => updatePicture(picture.key, e.target.value)}
                  onBlur={() => addMorePicture()}
                />
              ))}
            </div>
          </div>
          <div className="dashboard-content-field field-profile-picture">
            <label htmlFor="profilePicture" className="dashboard-content-label">
              Profile Picture
            </label>
            <div className="dashboard-content-profilePicture">
              {images.map((image) => (
                <img
                  key={image.key}
                  src={image.link}
                  alt="#"
                  className={image.status ? "dashboard-content-image image-selected" : "dashboard-content-image"}
                  onClick={() => selectImage(image.key)}
                />
              ))}
            </div>
          </div>
          <div className="dashboard-content-field">
            <label htmlFor="content" className="dashboard-content-label">
              Content
            </label>
            <input type="text" className="dashboard-content-content" onChange={(e) => contentHandler(e)} />
          </div>
          <div className="dashboard-content-button">
            <button type="button" className="dashboard-content-submit" onClick={() => submitForm()}>
              SUBMIT
            </button>
            <button type="reset" className="dashboard-content-reset" onClick={() => resetForm()}>
              RESET
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Dashboard;
