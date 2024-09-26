import React, { useDebugValue, useEffect, useState } from "react";
import "./index.css";
import Navbar from "../../components/common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectbooksInBundle, selectLicenseState } from "../../store/selectors/License.selector";
import { createLicense } from "../../services/license";
import { getBooksbyBundleId, searchBundles } from "../../services/bundle";
import { setBooksInBundle, setBundleName, setNewLicenseData } from "../../store/reducers/License.reducer";
import { useNavigate } from "react-router-dom";


const debounce = (func, delay) => {
  let timeoutId = delay;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const CreateLicense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [mode, setMode] = useState("premium");
  const [licenseName, setLicenseName] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(today);
  const [selectedBundle, setSelectedBundle] = useState("");
  const [selectedBundleId, setSelectedBundleID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [filteredBundles, setFilteredBundles] = useState([]);
  const LicenseReduxState = useSelector(selectLicenseState);

  const newLicenseData = LicenseReduxState.newLicenseData;
  const bundleName = LicenseReduxState.bundleName;

  // Function to handle search and filtering
  const handleSearch = debounce(async (input: any) => {
    if (input.length < 3) {
      setFilteredBundles([]); // If input is less than 3 characters, don't show suggestions
      return;
    }
    const results = await searchBundles(input);
    console.log(results);
    const bundles = results.data;

    setFilteredBundles(bundles);

  }, 300); // Delay of 300ms for debouncing

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
    handleSearch(event.target.value); // Trigger the debounced search
  };

  const booksCountInBundle = useSelector(selectbooksInBundle).length;

  const handleBundleClick = async (bundle: any) => {

    setSelectedBundle(bundle.bundle_Name);
    setSelectedBundleID(bundle.bundle_id);

    dispatch(setBundleName(bundle.bundle_Name));

    dispatch(setNewLicenseData({ name: "bundle_id", value: bundle.bundle_id }));
    const response = await getBooksbyBundleId(bundle.bundle_id);
    dispatch(setBooksInBundle(response.data.booksInBundle));
    console.log(response.data.booksInBundle);
    setQuery(bundle.bundle_Name);
    setFilteredBundles([])

  };


  const handleLicenseSelection = (licenseType: string) => {
    setMode(licenseType);
    dispatch(setNewLicenseData({ name: "mode", value: licenseType }));
  };

  const handleEndDateChange = (event: any) => {
    const selectedEndDate = event.target.value;
    setEndDate(selectedEndDate);

    if (startDate && selectedEndDate && selectedEndDate <= startDate) {
      setErrorMessage("End Date must be after Start Date.");
    } else {
      setErrorMessage("");
    }
  };
  const handleClearBundle = () => {
    setSelectedBundle("");
    LicenseReduxState.booksInBundle = [];
    setQuery("");
  };
  const handleReset = () => {
    setLicenseName("");
    setStartDate("");
    setEndDate("");
    setPurchaseDate(today);
    setSelectedBundle("");
    setMode("premium");
    setQuery("");
  }

  useEffect(() => {
    if (bundleName) {
      setQuery(bundleName);
      setSelectedBundle(bundleName);
    }
  }, [])
  // async function handleSubmit(e: any

  async function handleSubmit(e: any) {
    e.preventDefault();
    const data: any = {
      "license_name": licenseName,
      "bundle_id": selectedBundleId,
      "mode": mode,
      "start_date": startDate,
      "end_date": endDate,
      "purchase_date": purchaseDate,
    }


    // "concurrency": LicenseReduxState.concurrency,
    if (LicenseReduxState.custom == "variable") {
      let updatedBookList = LicenseReduxState.collectUpdatedBooks; // {bookId: bookOb}
      const data = { ...newLicenseData };
      data["booksInBundle"] = Object.values(updatedBookList);
      const response = await createLicense(newLicenseData, "variable");
      console.log(response)
      //callCreateLicenseAPI(data, variable);
    }
    else { // single concurrency update 
      const data = { ...newLicenseData };
      data["concurrency"] = LicenseReduxState.concurrency;
      const response = await createLicense(data, "default");
      console.log(response)
    }
    console.log(data);
  }
  // }

  // function callSearchAPI(query) {
  // const filteredList = getBundlesBySearch(query);
  // setFilteredBundles(filteredList)
  // }
  return (
    <>
      <Navbar />
      <h1 className="container-title">LICENSE DETAILS</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container">
          <div className="license-type">
            <button
              className={`license-btn ${mode === "premium" ? "active" : ""
                }`}
              onClick={() => handleLicenseSelection("premium")}
              type="button"
            >
              premium
            </button>
            <button
              className={`license-btn ${mode === "normal" ? "active" : ""
                }`}
              onClick={() => handleLicenseSelection("normal")}
              type="button"
            >
              normal
            </button>
          </div>
          <div className="form-section">
            <label htmlFor="license-name">
              License Name<span className="required"> * </span>
            </label>
            <input
              type="text"
              id="license-name"
              value={newLicenseData.license_name}
              required
              placeholder="Enter License Name"
              onChange={(e) => dispatch(setNewLicenseData({ name: "license_name", value: e.target.value }))}
            />



            <label htmlFor="start-date">
              Select Start Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="start-date"
              required
              value={newLicenseData.start_date}
              onChange={(e) => dispatch(setNewLicenseData({ name: "start_date", value: e.target.value }))}
            />


            <label htmlFor="end-date">
              Select End Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="end-date"
              required
              value={newLicenseData.end_date}
              onChange={(e) => dispatch(setNewLicenseData({ name: "end_date", value: e.target.value }))}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <label htmlFor="purchase-date">
              Select Purchase Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="purchase-date"
              value={newLicenseData.purchase_date}
              max={today}
              onChange={(e) => dispatch(setNewLicenseData({ name: "purchase_date", value: e.target.value }))}

              required
            />
          </div>

        </div>
        <h1 className="container-title">PRODUCT BUNDLE</h1>
        <div className="container">

          {/* <!-- Product Bundle --> */}
          <div className="form-section">
            <label htmlFor="bundle-name">Product Bundle <span className="required">*</span> </label>
            <div className="input-container">
              <input
                type="text"
                id="bundle-name"
                value={query}
                required
                onChange={handleInputChange}
                placeholder="Search by Bundle Name"
                disabled={!!selectedBundle}
              />
              {!selectedBundle && <i className="fa fa-search"></i>}
              {selectedBundle && <i className="clear-icon" onClick={handleClearBundle}>✖</i>}
            </div>
            {filteredBundles.length > 0 && (
              <ul className="bundle-list">
                {filteredBundles.map((bundle, index) => (
                  <li
                    key={index}
                    onClick={() => handleBundleClick(bundle)}
                    className="bundle-item"
                  >
                    {bundle.bundle_Name}
                  </li>
                ))}
              </ul>
            )}
            {selectedBundle && (
              <div className="selected-bundle">
                <strong>Selected Bundle: </strong> {selectedBundle}
              </div>
            )}
            {/* <div className="product-status">
              <span className="available">Available: 2</span>
              <span className="forthcoming">Forthcoming: 0</span>
              <span className="invalid">Invalid: 0</span>
            </div> */}
          </div>

          {/* <!-- DRM Policies --> */}
        </div>
        <h1 className="container-title">DRM POLICES</h1>
        <div className="container">
          {!selectedBundle && (
            <div >
              <p className="required">Please Select a Product Bundle </p>
            </div>
          )}
          {selectedBundle && (
            <div className="form-section drm-policies">
              <div className="content"> {booksCountInBundle} titles are DRM protected. Please review/edit the titles. </div>
              <div className="policy">
                <span>Concurrency: 1</span>
                <span>Print/Copy: --</span>
              </div>
              <button onClick={() => navigate("/license")} type="button">View/Edit concurrency per title</button>
            </div>
          )}
          {/* <div className="form-section drm-policies">
            <div className="content">2 titles are DRM protected. Please review/edit the titles. </div>
            <div className="policy">
              <span>Concurrency: 1</span>
              <span>Print/Copy: --</span>
            </div>
            <a href="/editConcurracy">View/Edit concurrency per title</a>
          </div> */}

          {/* <!-- Save/Cancel Buttons --> */}

        </div >
        <div className="form-section buttons">
          <button className="save-btn" type="submit"> Save</button>
          <button className="cancel-btn" type="reset" onClick={() => handleReset()}> Cancel</button>
        </div>

      </form>
    </>
  );
};

export default CreateLicense;

