import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    return (
      <div className="pa4 tr">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-100 h3 w3 dib"
              alt="avatar"
            />
          </DropdownToggle>
          <DropdownMenu
            right
            className="b--transparent shadow-5"
            style={{
              marginTop: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.8)"
            }}
          >
            <DropdownItem onClick={this.props.toggleProfileModal}>
              View Profile
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.props.onRouteChange("signout");
                const token = window.sessionStorage.getItem("token");
                if (token) {
                  fetch(`${window.BACKEND_PATH}/signout`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: token
                    },
                    body: JSON.stringify({})
                  })
                    .then(resp => {
                      console.log("Removed session token from server");
                    })
                    .catch(err => {
                      console.log(err);
                    });
                  window.sessionStorage.removeItem("token");
                }
              }}
            >
              Signout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
export default ProfileIcon;
