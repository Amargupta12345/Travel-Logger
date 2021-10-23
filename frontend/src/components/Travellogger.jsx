import "./travellog.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./Register";
import Login from "./Login";

import { REACT_APP_MAPBOX, REACT_MAP_URL } from "../constant";

function Travellogger() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [image, setImage] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const deletedata = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/pins/delete/${id}`);
      alert("Your log has to be delete");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    var formData = new FormData();

    formData.append("title", title);
    formData.append("username", currentUsername);
    formData.append("lat", newPlace.lat);
    formData.append("long", newPlace.long);
    formData.append("desc", desc); // number 123456 is immediately converted to a string "123456"
    formData.append("rating", star); // number 123456 is immediately converted to a string "123456"
    formData.append("file", image); // number 123456 is immediately converted to a string "123456"

    for (var value of formData.values()) {
      console.log(value);
    }

    try {
      const res = await axios.post("/pins/upload", formData);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle={REACT_MAP_URL}
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={currentUsername && handleAddClick}>
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}>
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color:
                    currentUsername === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left">
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Image</label>
                  <img src={p.image} alt="loading" className="image" />
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                  {/* update button */}

                  {/* delete  button */}

                  <button className=" delete" onClick={() => deletedata(p._id)}>
                    Delete Pin
                  </button>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}>
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left">
              <div>
                <form encType="multipart/form-data">
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <label>Description</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    name="title"
                    onChange={(e) => setDesc(e.target.value)}
                  />

                  <label>Image</label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    name="file"
                  />
                  {/* <label>Add A Image Url Address</label>
                  <textarea
                    placeholder="Image Link"
                    onChange={(e) => setImage(e.target.value)}
                    name="desc"
                  /> */}
                  <label>Rating</label>
                  <select
                    onChange={(e) => setStar(e.target.value)}
                    name="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
        {currentUsername ? (
          <>
            <button className="button logout" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}>
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default Travellogger;
