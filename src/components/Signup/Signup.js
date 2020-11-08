import React, { useState } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { AuthHOC } from "../../HOC";
import { handleValidation } from "../../helper";

const Signup = (props) => {
  const { handleInputChange, handleFocusOut } = props;
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  const register = () => {
    const checkErrors = handleValidation(inputFields, "signup");
    if (checkErrors) {
      setErrors(checkErrors);
    } else {
      // Password match check
      if (inputFields["password"] !== inputFields["confirm_password"]) {
        setErrors({ confirm_password: "Password match error" });
      } else {
        setErrors({});
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      <input
        type="text"
        className="form-control full-width mb-2"
        value={inputFields.email}
        onBlur={() =>
          setErrors(handleFocusOut({ inputFields, fieldKey: "signup" }))
        }
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
      <input
        type="password"
        className="form-control full-width mb-2"
        value={inputFields.password}
        onBlur={() =>
          setErrors(handleFocusOut({ inputFields, fieldKey: "signup" }))
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
          setErrors(handleFocusOut({ inputFields, fieldKey: "signup" }))
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
        onClick={register}
      >
        Register
      </button>
    </div>
  );
};

export default compose(withRouter, AuthHOC)(Signup);
