import React, { useState } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";
import { AuthHOC } from "../../HOC";
import { handleValidation } from "../../helper";

const ForgotPassword = (props) => {
  const { handleInputChange, history } = props;

  const [inputFields, setInputFields] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const sendCode = () => {
    const checkErrors = handleValidation(inputFields, "forgotPassword");
    if (checkErrors) {
      setErrors(checkErrors);
    } else {
      setErrors({});
      const users = JSON.parse(localStorage.getItem("users"));
      let userExist = false;
      users.forEach((e) => {
        // checking for user in local storage
        if (e.email === inputFields.email) {
          userExist = true;
        }
      });
      if (!userExist) {
        setErrors({ invalid_user: "Invalid user" });
      } else {
        const uuid = uuidv4()
        const templateParams = {
          to_name: inputFields.email,
          from_name: "breaking bad",
          message: `Use this code to reset password - ${uuid}`,
        };

        emailjs
          .send(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID,
            templateParams,
            process.env.REACT_APP_USER_ID
          )
          .then(
            (response) => {
              if (response.status === 200) {
                let currentUser;
                // Adding code to local storage
                users.forEach((e) => {
                  if (e.email === inputFields.email) {
                    e.code = uuid;
                    currentUser = e;
                  }
                });
                localStorage.setItem("users", JSON.stringify(users));
                history.push({
                  pathname: "verify-code",
                  state: { ...currentUser },
                });
              }
            },
            (error) => {
              setErrors({ 'mail_failed': error })
            }
          );
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      <input
        type="email"
        className="form-control full-width mb-4"
        value={inputFields.email}
        onChange={(e) =>
          setInputFields({
            ...handleInputChange({ key: "email", e, inputFields }),
          })
        }
        placeholder="Email ID"
      />
      {errors.hasOwnProperty("email") && (
        <span className="text-danger text-align-left mb-3">
          {errors["email"]}
        </span>
      )}
      {errors.hasOwnProperty("invalid_user") && (
        <span className="text-danger text-align-left mb-3">
          {errors["invalid_user"]}
        </span>
      )}
      {errors.hasOwnProperty("mail_failed") && (
        <span className="text-danger text-align-left mb-3">
          {errors["mail_failed"]}
        </span>
      )}
      <button
        type="button"
        className="btn btn-primary full-width"
        onClick={sendCode}
      >
        Send Code
      </button>
    </div>
  );
};

export default compose(withRouter, AuthHOC)(ForgotPassword);
