import React, { useState } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { AuthHOC } from "../../HOC";
import { handleValidation } from "../../helper";

const Signin = (props) => {
  const { handleInputChange, handleFocusOut } = props;

  const [inputFields, setInputFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const login = () => {
    const checkErrors = handleValidation(inputFields, "signin");
    if (checkErrors) {
      setErrors(checkErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <div className="d-flex flex-column">
      <input
        type="email"
        className="form-control full-width mb-2"
        value={inputFields.email}
        onBlur={() =>
          setErrors(handleFocusOut({ inputFields, fieldKey: "signin" }))
        }
        onChange={(e) =>
          setInputFields({ ...handleInputChange({ key: "email", e, inputFields }) })
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
        className="form-control full-width"
        value={inputFields.password}
        onBlur={() =>
          setErrors(handleFocusOut({ inputFields, fieldKey: "signin" }))
        }
        onChange={(e) =>
          setInputFields({ ...handleInputChange({ key: "password", e, inputFields }) })
        }
        placeholder="Password"
      />
      {errors.hasOwnProperty("password") && (
        <span className="text-danger text-align-left my-2">
          {errors["password"]}
        </span>
      )}
      <button
        type="button"
        className="btn btn-primary full-width mt-4"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
};

export default compose(withRouter, AuthHOC)(Signin);