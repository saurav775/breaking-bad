import React, { useState }  from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { AuthHOC } from "../../HOC";
import { handleValidation } from "../../helper";

const VerifyCode = (props) => {
  const { handleInputChange, handleFocusOut, history, location } = props;
  const [inputFields, setInputFields] = useState({ code: "" });
  const [errors, setErrors] = useState({});

  const verifyCode = () => {
    const checkErrors = handleValidation(inputFields, "code");
    if (checkErrors) {
      setErrors(checkErrors);
    } else {
      setErrors({});
      const users = JSON.parse(localStorage.getItem('users'))
      let codeVerified = false
      users.forEach(e => {
        if(e.email === location.state.email && e['code'] === inputFields.code) {
            codeVerified = true
        }
      });
      if(codeVerified) {
        history.push({ pathname: 'reset-password', state: { ...location.state }  })
      } else {
        setErrors({ 'code_match_error': 'Invalid Code' })
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      <input
        type="text"
        className="form-control full-width"
        value={inputFields.email}
        onChange={(e) =>
          setInputFields({
            ...handleInputChange({ key: "code", e, inputFields }),
          })
        }
        onBlur={() =>
          setErrors(handleFocusOut({ inputFields, fieldKey: "code" }))
        }
        placeholder="Enter Code"
      />
      {errors.hasOwnProperty("code") && (
        <span className="text-danger text-align-left mt-2">
          {errors["code"]}
        </span>
      )}
      {errors.hasOwnProperty("code_match_error") && (
        <span className="text-danger text-align-left mt-2">
          {errors["code_match_error"]}
        </span>
      )}
      <button
        type="button"
        className="btn btn-primary full-width mt-4"
        onClick={verifyCode}
      >
        Verify Code
      </button>
    </div>
  );
};

export default compose(withRouter, AuthHOC)(VerifyCode);
