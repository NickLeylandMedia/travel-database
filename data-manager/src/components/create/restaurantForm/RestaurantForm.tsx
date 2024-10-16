/* Library Imports */
//React
import React, { useEffect, useState } from "react";

/* Stylesheet Imports */
import styles from "./RestaurantForm.module.scss";

/* Image Imports */

/* Component Imports */

/* Module Imports */
import { uploadFile } from "@/modules/firebase/storage";
import { postNewRestaurant } from "../../../modules/api";

/* Component Interfaces */
interface Props {}

/* Component */
const RestaurantForm: React.FC<Props> = () => {
  /* State Variables */
  const [imageFile, setImageFile] = useState<any>(null);
  const [imageURL, setImageURL] = useState(null);

  const [nameState, setNameState] = useState("");
  const [summaryState, setSummaryState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");

  const [cityState, setCityState] = useState("");
  const [stateState, setStateState] = useState("");
  const [zipState, setZipState] = useState("");
  const [addressState, setAddressState] = useState("");
  const [coordState, setCoordState] = useState("");

  const [activeState, setActiveState] = useState(false);
  const [seasonalState, setSeasonalState] = useState(false);
  const [monthClosedTextState, setMonthClosedTextState] = useState("");
  const [monthClosedNumState, setMonthClosedNumState] = useState<any>(null);
  const [yearClosedState, setYearClosedState] = useState<any>(null);

  const [postSuccessful, setPostSuccessful] = useState(false);

  /* End State Variables */

  /* Render Variables */
  /* End Render Variables */

  /* Functions */
  //Function To Post Restaurant
  async function createRestaurant() {
    const post = await postNewRestaurant(
      nameState,
      cityState,
      stateState,
      coordState,
      descriptionState,
      imageURL,
      zipState,
      addressState,
      activeState,
      seasonalState,
      monthClosedTextState,
      monthClosedNumState,
      yearClosedState,
      summaryState
    );

    if (post.message) {
      setPostSuccessful(true);
    }
  }

  //Function to clear form
  function clearForm() {
    setPostSuccessful(false);
    setImageFile(null);
    setImageURL(null);
    setNameState("");
    setSummaryState("");
    setDescriptionState("");
    setCityState("");
    setStateState("");
    setZipState("");
    setAddressState("");
    setCoordState("");
    setActiveState(false);
    setSeasonalState(false);
    setMonthClosedTextState("");
    setMonthClosedNumState(null);
    setYearClosedState(null);
    setPostSuccessful(false);
  }

  /* End Functions */

  /* Effects */
  //Effect to upload image to firebase storage
  useEffect(() => {
    if (imageFile) {
      uploadFile(
        "restaurantImages",
        String(Math.random()),
        imageFile,
        true,
        setImageURL
      );
    }
  }, [imageFile]);

  /* End Effects */

  /* Component Return Statement */
  return (
    <div className={styles.RestaurantForm}>
      <h1 className="formTitle">Create A Restaurant</h1>
      <img
        src={imageURL ? imageURL : "/placeholder.jpg"}
        alt=""
        className={styles.restaurantFormImage}
      />
      <div className="formInput">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e: any) => setImageFile(e.target.files[0])}
          className="whiteInputBlackOutline"
        />
      </div>
      <div className="basicInfoGroup">
        <h2 className="primary">Basic Info</h2>
        <div className="formInput">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={nameState}
            onChange={(e) => setNameState(e.target.value)}
            className="whiteInputBlackOutline"
          />
        </div>
        <div className="formInput">
          <label htmlFor="summary">Summary</label>
          <textarea
            name="summary"
            id="summary"
            value={summaryState}
            onChange={(e) => setSummaryState(e.target.value)}
            className="whiteInputBlackOutline"
          />
        </div>
        <div className="formInput">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={descriptionState}
            onChange={(e) => setDescriptionState(e.target.value)}
            className="whiteInputBlackOutline"
          />
        </div>
      </div>
      <div className="locationGroup">
        <h2 className="primary">Location Info</h2>
        <div className="formInput">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={cityState}
            onChange={(e) => setCityState(e.target.value)}
            className="whiteInputBlackOutline"
          />
        </div>
        <div className="formInput">
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            id="state"
            value={stateState}
            onChange={(e) => setStateState(e.target.value)}
            className="whiteInputBlackOutline"
          />
        </div>
        <div className="formInput">
          <label htmlFor="zip">Zip</label>
          <input
            type="text"
            name="zip"
            id="zip"
            value={zipState}
            onChange={(e) => setZipState(e.target.value)}
            className="whiteInputBlackOutline"
          />
        </div>
        <div className="formInput">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={addressState}
            onChange={(e) => setAddressState(e.target.value)}
            className="whiteInputBlackOutline"
          />
        </div>
        <div className="formInput">
          <label htmlFor="coord">Coord</label>
          <input
            type="text"
            name="coord"
            id="coord"
            value={coordState}
            onChange={(e) => setCoordState(e.target.value)}
            className="whiteInputBlackOutline"
          />
        </div>
      </div>
      <div className="activityGroup">
        <h2 className="primary">Activity Info</h2>
        <div className="rowFormInput">
          <label htmlFor="active">Active</label>
          <input
            type="checkbox"
            name="active"
            id="active"
            checked={activeState}
            onChange={(e) => setActiveState(e.target.checked)}
            className="whiteInputBlackOutline"
          />
        </div>
        <div className="rowFormInput">
          <label htmlFor="seasonal">Seasonal</label>
          <input
            type="checkbox"
            name="seasonal"
            id="seasonal"
            checked={seasonalState}
            onChange={(e) => setSeasonalState(e.target.checked)}
            className="whiteInputBlackOutline"
          />
        </div>
        {/* Input for month closed */}
        <div className="formInput">
          <label htmlFor="monthClosedText">Month Closed Text</label>
          <input
            type="text"
            name="monthClosedText"
            id="monthClosedText"
            disabled={activeState ? true : false}
            value={monthClosedTextState}
            onChange={(e) => setMonthClosedTextState(e.target.value)}
            className="whiteInputBlackOutline"
          />
        </div>
        {/* Input for month closed Numeric */}
        <div className="formInput">
          <label htmlFor="monthClosedNumeric">Month Closed Numeric</label>
          <input
            type="number"
            min="1"
            max="12"
            name="monthClosedNumeric"
            id="monthClosedNumeric"
            disabled={activeState ? true : false}
            value={Number(monthClosedNumState)}
            onChange={(e) => setMonthClosedNumState(Number(e.target.value))}
            className="whiteInputBlackOutline"
          />
        </div>
        {/* input for year closed */}
        <div className="formInput">
          <label htmlFor="yearClosed">Year Closed</label>
          <input
            type="number"
            name="yearClosed"
            id="yearClosed"
            disabled={activeState ? true : false}
            value={Number(yearClosedState)}
            onChange={(e) => setYearClosedState(Number(e.target.value))}
            className="whiteInputBlackOutline"
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className="wideRoundedBlue" onClick={() => createRestaurant()}>
          CREATE
        </button>
      </div>
      {postSuccessful ? (
        <div className={styles.actionWindow}>
          <h2>Restaurant Upload Successful</h2>
          <button className="wideRoundedBlue" onClick={() => clearForm()}>
            ADD ANOTHER
          </button>
          <button className="wideRoundedBlue">HOME</button>
          <button className="wideRoundedBlue">DATA</button>
        </div>
      ) : null}
    </div>
  );
};

/* Export Statement */
export default RestaurantForm;
