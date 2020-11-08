import React, { useState } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { AuthHOC } from "../../HOC";
import { handleValidation } from "../../helper";

const ResetPassword = (props) => {
  const { handleInputChange, handleFocusOut, location } = props;

  const [inputFields, setInputFields] = useState({
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  const resetPassword = () => {
    const checkErrors = handleValidation(inputFields, "resetPassword");
    if (checkErrors) {
      setErrors(checkErrors);
    } else {
      setErrors({});
      // Password match check
      if (inputFields["password"] !== inputFields["confirm_password"]) {
        setErrors({ confirm_password: "Password match error" });
      } else {
        // search for user
        const users = JSON.parse(localStorage.getItem('users'))
        users.forEach(e => {
            if(e.email === location.state.email) {
                e.password = inputFields.password
            }
        });
        localStorage.setItem('users', JSON.stringify(users))
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      <input
        type="password"
        className="form-control full-width mb-2"
        value={inputFields.password}
        onBlur={() =>
          setErrors(handleFocusOut({ inputFields, fieldKey: "resetPassword" }))
        }
        onChange={(e) =>
          setInputFields({
            ...handleInputChange({ key: "password", e, inputFields }),
          })
        }
        placeholder="Password"
      />
      {errors.hasOwnProperty("password") && (
        <span className="text-danger text-align-left mb-3">
          {errors["password"]}
        </span>
      )}
      <input
        type="password"
        className="form-control full-width"
        value={inputFields.confirm_password}
        onBlur={() =>
          setErrors(handleFocusOut({ inputFields, fieldKey: "resetPassword" }))
        }
        onChange={(e) =>
          setInputFields({
            ...handleInputChange({ key: "confirm_password", e, inputFields }),
          })
        }
        placeholder="Confirm Your Password"
      />
      {errors.hasOwnProperty("confirm_password") && (
        <span className="text-danger text-align-left mt-2">
          {errors["confirm_password"]}
        </span>
      )}
      <button
        type="button"
        className="btn btn-primary full-width mt-4"
        onClick={resetPassword}
      >
        Reset
      </button>
    </div>
  );
};

export default compose(withRouter, AuthHOC)(ResetPassword);
