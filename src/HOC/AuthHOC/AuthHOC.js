import React from "react";
import { authPage } from "../../static";
import "./AuthHOC.css";

const AuthHOC = (BaseComponent) => (props) => {
  const { title, id, history, location } = props;

  // handling input values
  const handleInputChange = ({ key, e, inputFields }) => {
    const fields = inputFields;
    fields[key] = e.target.value;
    return fields;
  };

  // Redirect to Signin/Signup/ForgotPassword Page
  const handleLinkClick = ({ clicked_from }) => {
    switch (id) {
      case "signup":
        history.push("/");
        break;
      case "signin":
        history.push(
          clicked_from === "forgotPassword" ? "forgot-password" : "register"
        );
        break;
      case "forgotPassword":
        history.push(clicked_from === "signup" ? "register" : "/");
        break;
      default:
        break;
    }
  };

  return (
    <div className="auth-container">
      <div className="card-overlay-black full-width full-height d-flex justify-content-center align-items-center ">
        <div className="card col-md-8 auth-card-container">
          <div className="card-body d-flex">
            <div
              className="bg-image auth-card-image col-md-8"
              style={{ backgroundImage: `url(${authPage})` }}
            />
            <div className="pl-4 full-width d-flex flex-column justify-content-between">
              <div className="d-flex flex-column">
                <div className="card-title mb-4 text-center title-font">
                  {title}
                </div>
                {id === "forgotPassword" && (
                  <div className="cursor-pointer" onClick={handleLinkClick}>
                    <i className="mr-2 fa fa-arrow-left"></i>
                    {"Back to login"}
                  </div>
                )}
              </div>
              <div className="d-flex flex-column">
                <BaseComponent
                  handleInputChange={({ key, e, inputFields }) =>
                    handleInputChange({ key, e, inputFields })
                  }
                  history={history}
                  location={location}
                />
                {id === "signin" && (
                  <div
                    className="text-center cursor-pointer mt-3"
                    onClick={() =>
                      handleLinkClick({ clicked_from: "forgotPassword" })
                    }
                  >
                    {"Forgot Password?"}
                  </div>
                )}
              </div>
              {(id !== "verifyCode" && id !== "resetPassword") ? (
                <div
                  className="text-center cursor-pointer mt-5"
                  onClick={() => handleLinkClick({ clicked_from: "signup" })}
                >
                  {id === "signup" ? "Signin here" : "Create your account"}
                  <i className="ml-2 fa fa-arrow-right"></i>
                </div>
              ) : (<div></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHOC;
