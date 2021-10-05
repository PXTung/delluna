import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const host = "https://dellunashop.herokuapp.com/";
  const history = useHistory();

  const [register, setRegister] = useState({
    email: { value: "", valid: true },
    password: { value: "", valid: true },
    confirmPassword: { value: "", valid: true },
    name: { value: "", valid: true },
    city: { value: "", valid: true },
    district: { value: "", valid: true },
    subDistrict: { value: "", valid: true },
    detailAddress: { value: "", valid: true },
    postalCode: { value: "", valid: true },
    phoneNumber: { value: "", valid: true },
  });

  const confirmPasswordHandler = (e) => {
    if (e.target.value !== register.password.value) {
      register.confirmPassword.valid = false;
    } else {
      register.confirmPassword.valid = true;
    }
    setRegister({ ...register });
  };

  const registerHandler = () => {
    const data = {};
    Array.from(Object.keys(register)).forEach((key) => {
      data[key] = register[key].value;
    });

    axios
      .post(host + "register", JSON.stringify(data), {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then(() => {
        toast("REGISTER SUCCESSFUL");
        history.push("/login");
      })
      .catch((error) => {
        Array.from(error.response.data).forEach((field) => (register[field].valid = false));
        setRegister({ ...register });
        toast("REGISTER FAIL!!!");
      });
  };

  return (
    <>
      <div className="visual" />
      <div className="grid register">
        <div className="register-header">
          <div className="register-header-branch">SHOPEE</div>
          <div className="register-header-title">JOIN US</div>
          <p className="register-header-description">Create a new account. It's quickly and easy</p>
          <div className="register-header-separate"></div>
        </div>
        <div className="register-info">
          <div className="register-info-main">INFORMATION</div>
          <div className="register-info-description">ALL FIELD ARE REQUIRED</div>
        </div>
        <div className="register-field">
          <div className="register-label">Name</div>
          <input
            type="text"
            className={register.name.valid ? "register-name" : "register-name field-error"}
            onChange={(e) => (register.name.value = e.target.value)}
          />
        </div>
        <div className="register-field">
          <div className="register-label">Email</div>
          <input
            type="text"
            className={register.email.valid ? "register-email" : "register-email field-error"}
            onChange={(e) => (register.email.value = e.target.value)}
          />
          <div className="register-description">Input Email using for ID login</div>
        </div>
        <div className="register-field">
          <div className="register-label">Password</div>
          <input
            type="password"
            className={register.password.valid ? "register-password" : "register-password field-error"}
            onChange={(e) => (register.password.value = e.target.value)}
          />
          <div className="register-description">
            10 - 16 character which have to consist Lower/Upper case, special character and number
          </div>
        </div>
        <div className="register-field">
          <div className="register-label">Confirm Password</div>
          <input
            type="password"
            className={
              register.confirmPassword.valid ? "register-confirm-password" : "register-confirm-password field-error"
            }
            onChange={(e) => {
              confirmPasswordHandler(e);
            }}
          />
        </div>
        <div className="register-field">
          <div className="register-label">City / District / Sub-District</div>
          <input
            type="text"
            className={register.city.valid ? "register-city" : "register-city field-error"}
            onChange={(e) => (register.city.value = e.target.value)}
          />
          <input
            type="text"
            className={register.district.valid ? "register-district" : "register-district field-error"}
            onChange={(e) => (register.district.value = e.target.value)}
          />
          <input
            type="text"
            className={register.subDistrict.valid ? "register-sub-district" : "register-sub-district field-error"}
            onChange={(e) => (register.subDistrict.value = e.target.value)}
          />
        </div>
        <div className="register-field">
          <div className="register-label">Detail Address</div>
          <input
            type="text"
            className={register.detailAddress.valid ? "register-detail-address" : "register-detail-address field-error"}
            onChange={(e) => (register.detailAddress.value = e.target.value)}
          />
        </div>
        <div className="register-field">
          <div className="register-label">Postal Code</div>
          <input
            type="text"
            className={register.postalCode.valid ? "register-postal-code" : "register-postal-code field-error"}
            onChange={(e) => (register.postalCode.value = e.target.value)}
          />
        </div>
        <div className="register-field">
          <div className="register-label">Phone Number</div>
          <input
            type="text"
            className={register.phoneNumber.valid ? "register-phone-number" : "register-phone-number field-error"}
            onChange={(e) => (register.phoneNumber.value = e.target.value)}
          />
        </div>

        <div className="register-btn">
          <button className="register-btn-register" onClick={() => registerHandler()}>
            REGISTER
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
