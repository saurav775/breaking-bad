import React, { useState } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { AuthHOC } from "../../HOC";
import { handleValidation } from "../../helper";

const ForgotPassword = (props) => {
  const { handleInputChange, handleFocusOut } = props;

  const [inputFields, setInputFields] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const sendCode = () => {
    console.log(inputFields);
    const checkErrors = handleValidation(inputFields, "forgotPassword");
    if (checkErrors) {
      setErrors(checkErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <div className="d-flex flex-column">
      <input
        type="text"
        className="form-control full-width mb-4"
        value={inputFields.email}
        onChange={(e) =>
          setInputFields({
            ...handleInputChange({ key: "email", e, inputFields }),
          })
        }
        onBlur={() =>
          setErrors(handleFocusOut({ inputFields, fieldKey: "forgotPassword" }))
        }
        placeholder="Email ID"
      />
      {errors.hasOwnProperty("email") && (
        <span className="text-danger text-align-left mb-3">
          {errors["email"]}
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
