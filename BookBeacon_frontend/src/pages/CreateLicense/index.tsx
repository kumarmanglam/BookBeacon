import React, { useDebugValue, useEffect, useState } from "react";
import "./index.css";
import Navbar from "../../components/common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectbooksInBundle, selectLicenseState } from "../../store/selectors/License.selector";
import { createLicense } from "../../services/license";
import { getBooksbyBundleId, searchBundles } from "../../services/bundle";
import { setBundleName, setCollectUpdatedBooks, setConcurrency, setCustom, setLicenceBooksInBundle, setNewLicenseData, updateLicenseBooksInBundle } from "../../store/reducers/License.reducer";
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
  const concurrency = LicenseReduxState.custom === "default" ? LicenseReduxState.concurrency : "variable";

  const handleSearch = debounce(async (input: any) => {
    if (input.length < 3) {
      setFilteredBundles([]); // If input is less than 3 characters, don't show suggestions
      return;
    }
    const results = await searchBundles(input);
    console.log(results);
    const bundles = results.data;

    setFilteredBundles(bundles);

  }, 300);

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
    dispatch(setLicenceBooksInBundle(response.data.booksInBundle));
    console.log(response.data.booksInBundle);
    setQuery(bundle.bundle_Name);
    setFilteredBundles([])

  };


  const handleLicenseSelection = (licenseType: string) => {
    setMode(licenseType);
    dispatch(setNewLicenseData({ name: "mode", value: licenseType }));
  };

  const handleEndDateChange = () => {
    const selectedEndDate = newLicenseData.end_date;

    setEndDate(selectedEndDate);
    setStartDate(newLicenseData.start_date);
    // console.log(newLicenseData.start_date,'anish');
    console.log(startDate, endDate, "bdcj");
    if (newLicenseData.start_date && newLicenseData.end_date && newLicenseData.end_date <= newLicenseData.start_date) {
      dispatch(setNewLicenseData({ name: "end_date", value: "" }));
      setEndDate("");
      setErrorMessage("");
      // setErrorMessage("End Date must be after Start Date.");
      alert("End Date must be after Start Date.");
    } else {
      setErrorMessage("");
    }
  };
  const handleClearBundle = () => {
    setSelectedBundle("");
    dispatch(setLicenceBooksInBundle([]));
    dispatch(setConcurrency(1));
    dispatch(setBundleName(""));
    dispatch(setNewLicenseData({ name: "bundle_id", value: "" }));
    dispatch(setCustom("default"));
    setQuery("");
  };
  const handleReset = () => {
    handleClearBundle();
    dispatch(setNewLicenseData({ name: "license_name", value: "" }));
    dispatch(setNewLicenseData({ name: "start_date", value: "" }));
    dispatch(setNewLicenseData({ name: "end_date", value: "" }));
    dispatch(setNewLicenseData({ name: "purchase_date", value: today }));
    dispatch(setCollectUpdatedBooks({})); 
    // fix this issue


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

  async function handleSubmit(e: any) {
    handleEndDateChange();

    e.preventDefault();
    const data: any = {
      "license_name": licenseName,
      "bundle_id": selectedBundleId,
      "mode": mode,
      "start_date": startDate,
      "end_date": endDate,
      "purchase_date": purchaseDate,
    }

    if (LicenseReduxState.custom == "variable") {
      let updatedBookList = LicenseReduxState.collectUpdatedBooks; // {bookId: bookOb}
      const data = { ...newLicenseData };
      data["booksInBundle"] = Object.values(updatedBookList);
      await createLicense(data, "variable");
    }
    else {
      const data = { ...newLicenseData };
      data["concurrency"] = LicenseReduxState.concurrency;
      await createLicense(data, "default");
    }
    navigate("/licenses");
    console.log(data);
  }
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
                <span>Concurrency: {concurrency}</span>
                <span>Print/Copy: --</span>
              </div>
              <button onClick={() => navigate("/license")} type="button">View/Edit concurrency per title</button>
            </div>
          )}

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

