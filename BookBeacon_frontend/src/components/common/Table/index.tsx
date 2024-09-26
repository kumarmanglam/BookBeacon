import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { updateLicenseBooksInBundle } from "../../../store/reducers/License.reducer";
import "./style.css";

// Define types for props
interface HeaderConfigItem {
  key: string;
  label: string;
  classes?: string;
}

interface DataItem {
  [key: string]: any;
}

interface TableProps {
  headerConfig: HeaderConfigItem[];
  data: DataItem[];
}

const Table: React.FC<TableProps> = ({ headerConfig, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle changes in the concurrency input
  function handleConcurrencyChange(id: number, value: number) {
    const data = {
      id: id,
      concurrency: value
    };
    dispatch(updateLicenseBooksInBundle(data));
  }

  return (
    <table className="table">
      <thead>
        <tr className="table-row table-head">
          {headerConfig.map((item, index) => (
            <th key={index} className={`${item.classes} table-head-data table-data`}>{item.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index} className="table-row">
              {headerConfig.map((val, i) => {
                const cellData = item[val.key];

                if (val.key === 'license_name') {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      {cellData}
                    </td>
                  );
                }
                if (val.key === 'mode') {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      {cellData}
                    </td>
                  );
                }
                if (val.key === 'start_date') {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      {cellData}
                    </td>
                  );
                }
                if (val.key === 'end_date') {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      {cellData}
                    </td>
                  );
                }
                if (val.key === 'edit') {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      <button onClick={() => navigate('/booksInLicense')}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                  );
                }
                if (val.key === 'concurrency') {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      <input
                        type="number"
                        value={item.concurrency}
                        className="concurrency-input"
                        onChange={(e) => handleConcurrencyChange(item.book_id, parseInt(e.target.value))}
                      />
                    </td>
                  );
                }

                return (
                  <td key={i} className={`${val.classes} table-data`}>
                    {cellData ?? 'N/A'}
                  </td>
                );
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headerConfig.length} className="text-center">
              No data available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
