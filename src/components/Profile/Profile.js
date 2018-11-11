import React from "react";
import "./Profile.css";

const Profile = ({
  name,
  entries,
  joined,
  isProfileOpen,
  toggleProfileModal
}) => {
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
            <h1>Faces Detected: {entries}</h1>
            <h1>Memeber Since: {joined}</h1>

            <label className="mt2 fw6 " htmlFor="user-name">
              Name:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder="john"
              type="text"
              name="name"
              id="name"
            />

            <label className="mt2 fw6 " htmlFor="user-age">
              Age:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder="56"
              type="text"
              name="user-age"
              id="age"
            />

            <label className="mt2 fw6 " htmlFor="pet">
              Pet:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder="john"
              type="text"
              name="pet"
              id="pet"
            />
            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">
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
};

export default Profile;
