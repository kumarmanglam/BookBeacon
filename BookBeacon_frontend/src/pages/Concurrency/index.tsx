/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/Concurrency/index.tsx

import './style.css';

import { useEffect, useState } from 'react';

import Navbar from '../../components/common/Navbar';
import Table from '../../components/common/Table';
import { TABLE_HEADER_CONFIG_CONCURRENCY } from '../../config/tableConfig';
import ButtonGroup from './create_button';
import { booksData } from './data';
import { fetchBooksById } from '../../services/bundleRough';
import { useDispatch, useSelector } from 'react-redux';
import { selectLicenseState } from '../../store/selectors/License.selector';
import { setBooksInBundle, setConcurrency, setCustom } from '../../store/reducers/License.reducer';
import { editLicenseCustomDefault, editLicenseCustomVariable } from '../../services/license';
import { useNavigate } from 'react-router-dom';

const ConcurrencyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [data, setData] = useState<any>([]);
  const licenseState = useSelector(selectLicenseState);
  const booksInBundle = licenseState.booksInBundle;
  const license_id = licenseState.licenseId;
  console.log(license_id);
  const mode = licenseState.mode;
  const [bulkEditValue, setBulkEditValue] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isBulkSave, setIsBulkSave] = useState<boolean>(false);
  const updatedBooks = licenseState.collectUpdatedBooks;
  const isEditing = useSelector(selectLicenseState).isEditing;
  // const handleConcurrencyChange = (index: number, value: string) => {
  //   const bundles = [...data];
  //   bundles[index].concurrency = Number(value);

  //   const newBundle = [];
  //   let updatedBook = {};
  //   setUpdatedBooksList((prev: any) => [...prev, updatedBook]);
  //   dispatch(setLicenceBooksInBundle(updatedData));
  // };

  const handleBulkEdit = () => {
    setShowPopup(true);
  };

  const handleBulkSave = () => {
    const updatedData = booksInBundle.map((book: any) => {
      const bookcopy = { ...book };
      if (bookcopy.is_Premium == false) {
        bookcopy.concurrency = -1;
      } else {
        bookcopy.concurrency = Number(bulkEditValue)
      }
      book = bookcopy;
      return book;
    });
    dispatch(setBooksInBundle(updatedData));
    dispatch(setConcurrency(Number(bulkEditValue)));
    setIsBulkSave(true);
    // in redux we will update the concurrency
    // dispatch(setConcurrency(Number(bulkEditValue)));
    setShowPopup(false);
  };

  //  when variable concurrency update...........


  const callFetchBunldeByBundleId = async () => {

    if (licenseState.isEditing) { // true editing 

    }
    else {  // false editing  ------> this saving <-----
      console.log(licenseState.isEditing);
      console.log("is Editing ran");

      let bundleBooks = licenseState.booksInBundle;
      console.log(bundleBooks);
      const books = bundleBooks.map((item: any) => {
        let newItem = { ...item };
        if (newItem.is_Premium) {
          if (newItem.concurrency) {
            return newItem;
          } newItem.concurrency = 1;
        } else {
          newItem.concurrency = -1;
        }
        return newItem;
      })
      console.log(books);
      dispatch(setBooksInBundle(books));
    }
  }

  useEffect(() => {
    console.log("use effect ran")
    callFetchBunldeByBundleId();
  }, [])

  const handleSave = async () => {
    if (isEditing == false) {// Is new License
      if (isBulkSave) { // bulk concurrency save
        dispatch(setCustom("default"));
      } else { // variable update
        dispatch(setCustom("variable"));
      }
      navigate("/createLicense")
    } else { // Is editing
      if (isBulkSave) { // bulk concurrency edit  // custom default
        // call the bulk concurrency update API
        let EditData1 = {
          license_id: license_id,
          concurrency: bulkEditValue
        }
        await editLicenseCustomDefault(EditData1);
      } else { // variable concurrency edit // custom variable
        // call the varibale concurrency update API
        let EditData2 = {
          license_id: license_id,
          booksInBundle: Object.values(updatedBooks),
        }
        console.log(EditData2);
        console.log(license_id);
        await editLicenseCustomVariable(EditData2);
      }
      navigate("/licenses");
    }
  }

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='concurrency-action'>
          {mode != "normal" ?
            <a onClick={handleBulkEdit} className="bulk-edit-link">Bulk Edit</a>
            : null
          }
          <div className="flex justify-end gap-5">
            {mode != "normal" ?
              <button onClick={() => handleSave()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
              </button>
              : null
            }
            <button onClick={() => navigate("/licenses")} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
            {/* <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Download as CSV
            </button> */}
          </div>
        </div>

        <div className="concurrency-container">

          <div className="table-container">
            <Table
              headerConfig={TABLE_HEADER_CONFIG_CONCURRENCY}
              data={booksInBundle}
            />
          </div>
        </div>

        {showPopup && (
          <div className="popup-container">
            <div className="popup">
              <h2>SET CONCURRENCY</h2>
              <p>Please enter concurrency value for all titles:</p>
              <input
                type="number"
                value={bulkEditValue}
                min="1"
                step="1"
                max="1000"
                onChange={(e: any) => {

                  const inputValue = parseInt(e.target.value, 10);
                  const clampedValue = Math.max(1, Math.min(1000, inputValue));
                  setBulkEditValue(clampedValue)
                }}
                className="popup-input"
              />
              <button onClick={handleBulkSave} className="popup-save-button">
                Set
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConcurrencyPage;
