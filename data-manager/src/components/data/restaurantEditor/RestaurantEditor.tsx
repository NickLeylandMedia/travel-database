/* Library Imports */
//React
import React, { useEffect, useState } from "react";

/* Stylesheet Imports */
import styles from "./RestaurantEditor.module.scss";

/* Image Imports */

/* Component Imports */

/* Module Imports */
import { uploadFile } from "@/modules/firebase/storage";
import { updateRestaurant } from "../../../modules/api";
import { useRouter } from "next/router";

/* Component Interfaces */
interface Props {
  id: string;
  name: string;
  image: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  coord: string;
  description: string;
  active: boolean;
  seasonal: boolean;
  monthClosedNum: number;
  monthClosedText: string;
  yearClosed: number;
  summary: string;
}

/* Component */
const RestaurantEditor: React.FC<Props> = ({
  id,
  name,
  image,
  description,
  city,
  state,
  zip,
  address,
  coord,
  active,
  seasonal,
  monthClosedNum,
  monthClosedText,
  yearClosed,
  summary,
}) => {
  /* State Variables */
  const [imageFile, setImageFile] = useState<any>(null);
  const [imageURL, setImageURL] = useState(image);

  const [nameState, setNameState] = useState(name);
  const [summaryState, setSummaryState] = useState(summary);
  const [descriptionState, setDescriptionState] = useState(description);

  const [cityState, setCityState] = useState(city);
  const [stateState, setStateState] = useState(state);
  const [zipState, setZipState] = useState(zip);
  const [addressState, setAddressState] = useState(address);
  const [coordState, setCoordState] = useState(coord);

  const [activeState, setActiveState] = useState(active);
  const [seasonalState, setSeasonalState] = useState(seasonal);

  const [monthClosedNumState, setMonthClosedNumState] =
    useState(monthClosedNum);
  const [monthClosedTextState, setMonthClosedTextState] =
    useState(monthClosedText);
  const [yearClosedState, setYearClosedState] = useState(yearClosed);

  const [activeChanges, setActiveChanges] = useState(false);

  const router = useRouter();

  /* End State Variables */

  /* Render Variables */
  /* End Render Variables */

  /* Functions */
  async function updateRest() {
    const update = await updateRestaurant(
      id,
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

    console.log(update);

    if (update.message) {
      alert("Restaurant successfully updated!");
      router.push("/data");
    }
  }
  /* End Functions */

  /* Effects */
  //Effect to set active changes state
  useEffect(() => {
    if (
      nameState !== name ||
      summaryState !== summary ||
      cityState !== city ||
      stateState !== state ||
      zipState !== zip ||
      addressState !== address ||
      activeState !== active ||
      seasonalState !== seasonal ||
      monthClosedNumState !== monthClosedNum ||
      monthClosedTextState !== monthClosedText ||
      yearClosedState !== yearClosed ||
      imageURL !== image
    ) {
      setActiveChanges(true);
    } else {
      setActiveChanges(false);
    }
  }, [
    nameState,
    name,
    summaryState,
    summary,
    cityState,
    city,
    addressState,
    address,
    activeState,
    active,
    seasonalState,
    seasonal,
    monthClosedNum,
    monthClosedNumState,
    monthClosedTextState,
    monthClosedText,
    yearClosedState,
    yearClosed,
    stateState,
    state,
    zipState,
    zip,
    image,
    imageURL,
  ]);

  /* End Effects */

  /* Component Return Statement */
  return (
    <div className={styles.RestaurantEditor}>
      <div className="basicInfoGroup">
        <div className={styles.groupTitleBox}>
          <h2 className="primary">Basic Info</h2>
        </div>
        <div className="groupInputBox">
          <img
            className={styles.detailMainImage}
            src={imageURL ? imageURL : image ? image : "/placeholder.jpg"}
            alt=""
          />
          <div className={styles.imageInput}>
            <label className="" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImageFile(e.target!.files![0])}
            />
            <button
              onClick={() =>
                uploadFile("restaurantImages", id, imageFile, true, setImageURL)
              }
              className={styles.imageUploadButton}
              disabled={imageFile ? false : true}
            >
              Upload
            </button>
          </div>
          <div className="formInput">
            <label className="" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={nameState}
              onChange={(e) => setNameState(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label className="" htmlFor="summary">
              Summary
            </label>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              value={summaryState}
              onChange={(e) => setSummaryState(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      {/* <div className="identifierGroup">
        <div className={styles.groupTitleBox}>
          <h2>Identifiers</h2>
        </div>
        <div className="groupInputBox">
          <div className="formInput">
            <label htmlFor="ean">EAN</label>
            <input type="text" id="ean" />
          </div>
          <div className="formInput">
            <label htmlFor="upc">UPC</label>
            <input type="text" id="upc" />
          </div>
          <div className="formInput">
            <label htmlFor="isbn">ISBN</label>
            <input type="text" id="isbn" />
          </div>
        </div>
      </div> */}
      <div className="locationGroup">
        <div className={styles.groupTitleBox}>
          <h2 className="primary">Location Info</h2>
        </div>
        <div className="groupInputBox">
          {/* Form Inputs For City/State/Zip */}
          <div className="formInput">
            <label className="" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              value={cityState}
              onChange={(e) => setCityState(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label className="" htmlFor="state">
              State
            </label>
            <input
              type="text"
              id="state"
              value={stateState}
              onChange={(e) => setStateState(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label className="" htmlFor="zip">
              Zip
            </label>
            <input
              type="text"
              id="zip"
              value={zipState}
              onChange={(e) => setZipState(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label className="" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={addressState}
              onChange={(e) => setAddressState(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="activityGroup">
        <div className={styles.groupTitleBox}>
          <h2 className="primary">Activity</h2>
        </div>
        <div className="groupInputBox">
          {/* Form Inputs For Activity */}
          <div className="rowFormInput">
            <label className="" htmlFor="active">
              Active
            </label>
            <input
              type="checkbox"
              id="active"
              checked={activeState}
              onChange={(e) => {
                setActiveState(e.target.checked);
              }}
            />
          </div>
          <div className="rowFormInput">
            <label className="" htmlFor="seasonal">
              Seasonal
            </label>
            <input
              type="checkbox"
              id="seasonal"
              checked={seasonalState}
              onChange={(e) => {
                setSeasonalState(e.target.checked);
              }}
            />
          </div>
          <div className="formInput">
            <label className="" htmlFor="monthClosedText">
              Month Closed (Text)
            </label>
            <input
              type="text"
              id="monthClosedText"
              disabled={activeState ? true : false}
              value={monthClosedTextState}
              onChange={(e) => setMonthClosedTextState(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label className="" htmlFor="monthClosedNum">
              Month Closed (Numeric)
            </label>
            <input
              type="number"
              min={1}
              max={12}
              id="monthClosedNum"
              disabled={activeState ? true : false}
              value={monthClosedNumState}
              onChange={(e) => setMonthClosedNumState(Number(e.target.value))}
            />
          </div>
          <div className="formInput">
            <label className="" htmlFor="yearClosed">
              Year Closed
            </label>
            <input
              type="text"
              id="yearClosed"
              disabled={activeState ? true : false}
              value={yearClosedState}
              onChange={(e) => setYearClosedState(Number(e.target.value))}
            />
          </div>
          <div className="typeInput">
            <h2 className="primary">Edit Types</h2>
          </div>
          {activeChanges ? (
            <div className={styles.submitAllCont}>
              <button
                className={styles.submitButton}
                onClick={() => updateRest()}
              >
                SAVE CHANGES
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

/* Export Statement */
export default RestaurantEditor;
