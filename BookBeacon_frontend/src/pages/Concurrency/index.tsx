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
import { setLicenceBooksInBundle } from '../../store/reducers/License.reducer';

const ConcurrencyPage = () => {
  const dispatch = useDispatch();
  // const [data, setData] = useState<any>([]);
  const resp = useSelector(selectLicenseState);
  const licenceBooksInBundle = resp.licenceBooksInBundle;

  const [bulkEditValue, setBulkEditValue] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isBulkSave, setIsBulkSave] = useState<boolean>(false);
  const [updatedBooksList, setUpdatedBooksList] = useState<any>([]);

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
    // in redux we will update the concurrency
    // dispatch(setConcurrency(Number(bulkEditValue)));
    setShowPopup(false);
  };

  //  when variable concurrency update...........


  const callFetchBunldeByBundleId = async () => {
    console.log("funcation ran")
    const bunldeById = await fetchBooksById(19);
    console.log(bunldeById);
    const bunldeBooks = bunldeById.data.booksInBundle.map((item: any) => {
      item.concurrency = 1;
      return item;
    })
    console.log(bunldeBooks);
    dispatch(setLicenceBooksInBundle(bunldeBooks));
  }

  useEffect(() => {
    callFetchBunldeByBundleId();
  }, [])

  return (
    <div>
      <Navbar />
      <div className='concurrency-action'>
        <a onClick={handleBulkEdit} className="bulk-edit-link">Bulk Edit</a>
        <ButtonGroup />
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
              onChange={(e) => setBulkEditValue(e.target.value)}
              className="popup-input"
            />
            <button onClick={handleBulkSave} className="popup-save-button">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConcurrencyPage;
