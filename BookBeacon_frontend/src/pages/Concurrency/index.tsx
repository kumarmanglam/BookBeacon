/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/Concurrency/index.tsx

import './style.css';

import { useState } from 'react';

import Navbar from '../../components/common/Navbar';
import Table from '../../components/common/Table';
import { TABLE_HEADER_CONFIG_CONCURRENCY } from '../../config/tableConfig';
import ButtonGroup from './create_button';
import { booksData } from './data';

const ConcurrencyPage = () => {
  const [data, setData] = useState(booksData);
  const [bulkEditValue, setBulkEditValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleConcurrencyChange = (index: number, value: string) => {
    const newData = [...data];
    newData[index].concurrency = Number(value);
    setData(newData);
  };

  const handleBulkEdit = () => {
    setShowPopup(true);
  };

  const handleBulkSave = () => {
    const updatedData = data.map((book: any) => ({
      ...book,
      concurrency: Number(bulkEditValue),
    }));
    setData(updatedData);
    setShowPopup(false);
  };

  return (
    <div>
      <Navbar />
      <ButtonGroup />
      <div className="concurrency-container">
        <div className="table-container">
          <Table
            headerConfig={TABLE_HEADER_CONFIG_CONCURRENCY}
            data={data.map((book: { book_name: any; concurrency: string | number | readonly string[] | undefined; }, index: number) => ({
              book_name: book.book_name,
              concurrency: (
                <input
                  type="number"
                  value={book.concurrency}
                  onChange={(e) => handleConcurrencyChange(index, e.target.value)}
                  className="concurrency-input"
                />
              ),
            }))}
          />
        </div>
        <div className="bulk-edit-container">
          <a onClick={handleBulkEdit} className="bulk-edit-link">Bulk Edit</a>
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
