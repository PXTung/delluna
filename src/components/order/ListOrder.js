import { Pagination } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { ConstantContext } from "../../context/Constant";
import Header from "../product/Header";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ListOrder = () => {
  const constant = useContext(ConstantContext);
  const host = constant.host_api;
  const history = useHistory();
  const [orders, setOrders] = useState(null);
  const [pageable, setPageable] = useState({ index: 1, size: 10, total: 1 });

  useEffect(() => {
    axios
      .get(host + "order?index=" + pageable.index + "&size=" + pageable.size, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setOrders(Array.from(res.data));
        setPageable({
          index: pageable.index,
          size: pageable.size,
          total: Array.from(res.data)[0].totalPage,
        });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        if (error.response) {
        if (error.response.status === 403) {
          history.push("./login");
        }
      }
      });
  }, [pageable.index, pageable.size, host, history]);

  console.log(orders);
  console.log(pageable);

  const updatePage = (page) => {
    setPageable({ index: page, size: pageable.size, total: pageable.total });
  };

  if (orders == null) {
    return "";
  } else {
    return (
      <>
        <div className="visual" />
        <Header title={"List Orders"} />
        <div className="ordered grid">
          {orders.map((order, index) => {
            return (
              <div className="ordered-content" key={index}>
                <div className="ordered-person">
                  <div className="ordered-person-index col-s1">{index + 1 + (pageable.index - 1) * pageable.size}</div>
                  <div className="ordered-person-name col-s3">{order.name}</div>
                  <div className="ordered-person-phone col-s2">{order.phone}</div>
                  <div className="ordered-person-address col-s7">{order.address}</div>
                  <div className="ordered-person-email col-s3">{order.createBy}</div>
                  <div className="ordered-person-date col-s3">{order.createDate}</div>
                  <div className="ordered-person-total col-s2">{order.total} VND</div>
                </div>
                {order.carts.map((item, index) => {
                  return (
                    <div className="ordered-item" key={index}>
                      <div className="ordered-item-index col-s1">{index + 1}</div>
                      <div className="ordered-item-name col-s4">
                        <Link to={"/product/" + item.product.id}>{item.product.name}</Link>
                      </div>
                      <div className="order-item-quantity col-s1">{item.quantity}</div>
                      <div className="ordered-item-price col-s2">{item.product.price} VND</div>
                      <div className="ordered-item-total col-s2">{item.quantity * item.product.price} VND</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <Pagination count={pageable.total} color="primary" onChange={(e, page) => updatePage(page)} />
        </div>
      </>
    );
  }
};

export default ListOrder;
