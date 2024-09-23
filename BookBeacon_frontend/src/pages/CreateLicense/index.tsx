import React, { useState } from "react";
import "./index.css";

const bundleNames = [
  "ariddles24", "ngilderoyy", "kbrandi0", "bgariff3", "ramorta", "kbrandi0", "lironl",
  "cmeir1", "ariddles24", "bgariff3", "msuthren6", "ramorta", "kbrandi0", "smccooked",
  "bgariff3", "bgariff3", "rvickerstaffb", "smccooked", "kbrandi0", "jtonner2", "lironl",
  "bgariff3", "rvickerstaffb", "ramorta", "cmeir1", "mgregoraceo", "lironl", "lironl",
  "rvickerstaffb", "iiskow14", "ngilderoyy", "rblint5", "hflasby1v", "smccooked",
  "rvickerstaffb", "rvickerstaffb", "mgregoraceo", "rblint5", "hflasby1v", "ngilderoyy",
  "kbrandi0"
];

const debounce = (func, delay) => {
  let timeoutId;
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
  const [selectedLicense, setSelectedLicense] = useState("Premium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [query, setQuery] = useState("");
  const [filteredBundles, setFilteredBundles] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState("");

  // Function to handle search and filtering
  const handleSearch = debounce((input: any) => {
    if (input.length < 3) {
      setFilteredBundles([]); // If input is less than 3 characters, don't show suggestions
      return;
    }
    const lowerCaseInput = input.toLowerCase();
    const results = bundleNames.filter((name) =>
      name.toLowerCase().includes(lowerCaseInput)
    );
    setFilteredBundles(results);
  }, 300); // Delay of 300ms for debouncing

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
    handleSearch(event.target.value); // Trigger the debounced search
  };

  const handleBundleClick = (bundle: any) => {
    setSelectedBundle(bundle);
    setQuery(bundle); // Set the input value to the selected bundle
    setFilteredBundles([]); // Clear the suggestions once a bundle is selected
  };

  const today = new Date().toISOString().split("T")[0];

  const handleLicenseSelection = (licenseType: string) => {
    setSelectedLicense(licenseType);
  };

  const handleEndDateChange = (event: any) => {
    const selectedEndDate = event.target.value;
    setEndDate(selectedEndDate);

    // Check if end date is after the start date
    if (startDate && selectedEndDate && selectedEndDate <= startDate) {
      setErrorMessage("End Date must be after Start Date.");
    } else {
      setErrorMessage("");
    }
  };

  // const handleLicenseType = (
  //   _event: React.MouseEvent<HTMLElement>,
  //   newType: string | null
  // ) => {
  //   if (newType !== null) {
  //     setLicenseType(newType);
  //   }
  // };

  return (
    <div className="container">
      <h1>License Details</h1>

      {/* <!-- License Type --> */}
      <div className="license-type">
        <button
          className={`license-btn ${selectedLicense === "Premium" ? "active" : ""
            }`}
          onClick={() => handleLicenseSelection("Premium")}
        >
          Premium
        </button>
        <button
          className={`license-btn ${selectedLicense === "Non Premium" ? "active" : ""
            }`}
          onClick={() => handleLicenseSelection("Non Premium")}
        >
          Non Premium
        </button>
      </div>

      {/* <!-- Toggles --> */}
      {/* <div className="toggles">
        <div className="toggle">
          <label htmlFor="view-online">View Online</label>
          <input type="checkbox" id="view-online" checked />
        </div>
        <div className="toggle">
          <label htmlFor="download">Download</label>
          <input type="checkbox" id="download" />
        </div>
      </div> */}

      <hr />

      {/* <!-- Form Fields --> */}
      <div className="form-section">
        {/* <label htmlFor="application">
          Application <span className="required">*</span>
        </label>
        <select id="application" required>
          <option value="">Select Application</option>
          <option value="app1">App 1</option>
          <option value="app2">App 2</option>
        </select> */}

        <label htmlFor="start-date">
          Select Start Date <span className="required">*</span>
        </label>
        <input
          type="date"
          id="start-date"
          required
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="end-date">
          Select End Date <span className="required">*</span>
        </label>
        <input
          type="date"
          id="end-date"
          required
          value={endDate}
          onChange={handleEndDateChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label htmlFor="order-number">
          Order Number <span className="required">*</span>
        </label>
        <input
          type="text"
          id="order-number"
          placeholder="Enter Order Number"
          required
        />

        <label htmlFor="purchase-date">
          Select Purchase Date <span className="required">*</span>
        </label>
        <input
          type="date"
          id="purchase-date"
          value={today}
          disabled
          required
        />
      </div>

      {/* <!-- Product Bundle --> */}
      <div className="form-section">
        <label htmlFor="bundle-name">Bundle Name</label>
        <input
          type="text"
          id="bundle-name"
          value={query}
          onChange={handleInputChange}
          placeholder="Search by Bundle Name"
        />
        {filteredBundles.length > 0 && (
          <ul className="bundle-list">
            {filteredBundles.map((bundle, index) => (
              <li
                key={index}
                onClick={() => handleBundleClick(bundle)}
                className="bundle-item"
              >
                {bundle}
              </li>
            ))}
          </ul>
        )}
        {selectedBundle && (
          <div className="selected-bundle">
            <strong>Selected Bundle: </strong> {selectedBundle}
          </div>
        )}
        <div className="product-status">
          <span className="available">Available: 2</span>
          <span className="forthcoming">Forthcoming: 0</span>
          <span className="invalid">Invalid: 0</span>
        </div>
      </div>

      {/* <!-- Bulk Upload --> */}
      {/* <div className="form-section bulk-upload">
        <label>Bulk Upload</label>
        <div className="upload-box">
          <button>Click to Upload</button>
          <span>No file uploaded!</span>
        </div>
      </div> */}

      {/* <!-- DRM Policies --> */}
      <div className="form-section drm-policies">
        <h2>DRM Policies</h2>
        <div className="policy">
          <span>Concurrency: 1</span>
          <span>Print/Copy: 20</span>
        </div>
        <a href="#">View/Edit concurrency per title</a>
      </div>

      {/* <!-- Save/Cancel Buttons --> */}
      <div className="form-section buttons">
        <button className="save-btn">Save</button>
        <button className="cancel-btn">Cancel</button>
      </div>
    </div >
  );
};

export default CreateLicense;
