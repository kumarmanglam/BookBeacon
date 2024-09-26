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
import { setConcurrency, setCustom, setLicenceBooksInBundle } from '../../store/reducers/License.reducer';
import { editLicenseCustomDefault, editLicenseCustomVariable } from '../../services/license';
import { useNavigate } from 'react-router-dom';

const ConcurrencyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [data, setData] = useState<any>([]);
  const licenseState = useSelector(selectLicenseState);
  const licenceBooksInBundle = licenseState.licenceBooksInBundle;

  const [bulkEditValue, setBulkEditValue] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isBulkSave, setIsBulkSave] = useState<boolean>(false);
  const [updatedBooksList, setUpdatedBooksList] = useState<any>([]);

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
    const updatedData = licenceBooksInBundle.map((book: any) => ({
      ...book,
      concurrency: Number(bulkEditValue),
    }));
    dispatch(setLicenceBooksInBundle(updatedData));
    dispatch(setConcurrency(Number(bulkEditValue)));
    setIsBulkSave(true);
    // in redux we will update the concurrency
    // dispatch(setConcurrency(Number(bulkEditValue)));
    setShowPopup(false);
  };

  //  when variable concurrency update...........


  const callFetchBunldeByBundleId = async () => {
    console.log("funcation ran")
    // const bunldeById = await fetchBooksById(19);
    // console.log(bunldeById);
    const bundleBooks = licenseState.booksInBundle;
    const bunldeBooks = bundleBooks.data.booksInBundle.map((item: any) => {
      item.concurrency = 1;
      return item;
    })
    console.log(bunldeBooks);
    dispatch(setLicenceBooksInBundle(bunldeBooks));
  }

  useEffect(() => {
    callFetchBunldeByBundleId();
  }, [])

  const handleSave = async () => {
    if (isEditing == false) {// Is new License
      if (isBulkSave) { // bulk concurrency save
        dispatch(setCustom("default"));
        navigate("/createLicense");
        // 
      } else { // variable update
        dispatch(setCustom("variable"));
        navigate("/createLicense");
      }
      navigate("/createLicense")
    } else { // Is editing
      if (isBulkSave) { // bulk concurrency edit  // custom default
        // call the bulk concurrency update API
        let EditData1 = {
          licenseId: "",
          concurrency: bulkEditValue
        }
        await editLicenseCustomDefault(EditData1);
      } else { // variable concurrency edit // custom variable
        // call the varibale concurrency update API
        let EditData2 = {
          licenseId: "",
          booksInBUndle: updatedBooksList,
        }
        await editLicenseCustomVariable(EditData2);
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='concurrency-action'>
          <a onClick={handleBulkEdit} className="bulk-edit-link">Bulk Edit</a>
          <div className="flex justify-end gap-5">
            <button onClick={() => handleSave()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Save
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Download as CSV
            </button>
          </div>
        </div>

        <div className="concurrency-container">

          <div className="table-container">
            <Table
              headerConfig={TABLE_HEADER_CONFIG_CONCURRENCY}
              data={licenceBooksInBundle}
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
                onChange={(e: any) => setBulkEditValue(e.target.value)}
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
