import React from "react";
import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet
    };
  }

  onFormChange = event => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-pet":
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = data => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch(`${window.BACKEND_PATH}/profile/${this.props.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          formInput: data
        })
      })
        .then(resp => {
          if (resp.status === 200 || resp.status === 304) {
            this.props.toggleProfileModal();
            this.props.loadUser({ ...this.props.user, ...data });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    const { isProfileOpen, toggleProfileModal, user } = this.props;
    const { name, age, pet } = this.state;

    if (isProfileOpen && toggleProfileModal) {
      return (
        <div className="profile-modal">
          <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
            <main className="pa4 black-80 modal-main">
              <img
                src="http://tachyons.io/img/logo.jpg"
                className="br-100 h3 w3 dib"
                alt="avatar"
              />
              <h1>Name: {name}</h1>
              <h1>Faces Detected: {user.entries}</h1>
              <h1>Memeber Since: {user.joined}</h1>

              <label className="mt2 fw6 " htmlFor="user-name">
                Name:
              </label>
              <input
                onChange={this.onFormChange}
                className="pa2 ba w-100"
                placeholder={name}
                type="text"
                name="user-name"
                id="name"
              />

              <label className="mt2 fw6 " htmlFor="user-age">
                Age:
              </label>
              <input
                onChange={this.onFormChange}
                className="pa2 ba w-100"
                placeholder="56"
                type="text"
                name="user-age"
                id="age"
              />

              <label className="mt2 fw6 " htmlFor="user-pet">
                Pet:
              </label>
              <input
                onChange={this.onFormChange}
                className="pa2 ba w-100"
                placeholder="john"
                type="text"
                name="user-pet"
                id="pet"
              />
              <div
                className="mt4"
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <button
                  onClick={() =>
                    this.onProfileUpdate({ name: name, age: age, pet: pet })
                  }
                  className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                >
                  Save
                </button>
                <button
                  onClick={toggleProfileModal}
                  className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                >
                  Cancel
                </button>
              </div>
              <div className="modal-close pointer" onClick={toggleProfileModal}>
                &times;
              </div>
            </main>
          </article>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Profile;
