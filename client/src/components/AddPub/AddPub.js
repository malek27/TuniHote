import React from "react";
import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { registerPub } from "../../JS/actions/pub";
import axios from "axios";
import "./AddPub.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const AddPub = () => {
  const user = useSelector(state => state.userReducer.user);
  const userId=user&&user._id;
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [region, setRegion] = useState("");

  const [formData, setFormData] = useState("");
  const [info, setInfo] = useState({ imageUrl: "", name: "" });
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: "",
  });

  const upload = ({ target: { files } }) => {
    let data = new FormData();
    data.append("categoryImage", files[0]);
    data.append("name", files.name);
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo({
      image: "",
      name: "",
    });

    setProgressPercent(0);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setProgressPercent(percent);
      },
    };

    axios
      .post("http://localhost:3000/photo/category", formData, options)
      .then((res) => {
        console.log("========res", res);
        setInfo(res.data);
        setProgressPercent(100);
      })
      .catch((err) => {
        console.log(err.response);

        setError({ found: true, message: err.response.data.errors });
        setError({
          found: false,
          message: "",
        });
        setProgressPercent(0);
      });
  };

  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="row">
      <div className="total">
        <div className="card">
          <div className="adding-box">
            <div className="adding-snip">
              <input
                id="tab-2"
                type="radio"
                name="tab"
                className="sign-up"
                defaultChecked
              />
              <label htmlFor="tab-2" className="tab">
                Publication
              </label>

              <div className="adding-space">
                <div className="group">
                  <label htmlFor="user" className="label">
                    Titre
                  </label>
                  <input
                    id="user"
                    type="text"
                    className="input"
                    placeholder="entrer votre Titre"
                    onChange={(e) => setTitre(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="region" className="label">
                    Region
                  </label>
                  <input
                    id="region"
                    type="text"
                    className="input"
                    placeholder="entrer votre region"
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="user" className="label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="bio"
                    rows={3}
                    placeholder="entrer votre Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="user" className="label">
                    Prix
                  </label>
                  <input
                    id="uuser"
                    type="text"
                    className="input"
                    placeholder="entrer votre Prix"
                    onChange={(e) => setPrix(e.target.value)}
                  />
                </div>
                <div>
                  {error.found && (
                    <div className="alert alert-danger" role="alert">
                      {error.message}
                    </div>
                  )}
                  <div
                    className="progress mb-2 w-100"
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {progressPercent}%
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="custom-file mb-3 w-73">
                      <input
                        onChange={upload}
                        id="inputGroupeFile04"
                        type="file"
                        className="custom-file-input"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile04"
                      >
                        Choose file
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      submit
                    </button>
                  </form>
                  {info.imageUrl && (
                    <img
                      width="200px"
                      className="mt-3"
                      src={info.imageUrl}
                      alt={`${info.name}`}
                    />
                  )}
                </div>
                <div className="group">
                  <Link to="/Home" >
                    <button
                      type="submit"
                      className="button"
                      defaultValue="register"
                      onClick={() =>
                        dispatch(
                          registerPub(
                            {
                              titre,
                              description,
                              region,
                              prix,
                              info,
                            },userId,
                            history
                          )
                        )
                      }
                    >
                      Save Pub
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPub;
