import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setBooksInBundle, setIsEditing, setLicenseId, setMode, updateLicenseBooksInBundle } from "../../../store/reducers/License.reducer";
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

  function callSetUpdateLicense(id: number, concurrency: number) {
    const data = {
      id: id,
      concurrency: concurrency,
    };
    dispatch(updateLicenseBooksInBundle(data));
  }

  function handleBlur() {
    // Handle blur event here, if necessary
  }

  return (
    <table className="table">
      <thead>
        <tr className="table-row table-head">
          {headerConfig.map((item, index) => (
            <th key={index} className={`${item.classes} table-head-data table-data`}>
              {item.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index} className="table-row">
              {/* {JSON.stringify(item)} */}
              {headerConfig.map((val, i) => {
                const cellData = item[val.key];
                if (val.key === "license_name") {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      {cellData}
                    </td>
                  );
                }
                if (val.key === "mode") {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      {cellData}
                    </td>
                  );
                }
                if (val.key === "start_date") {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      {cellData.slice(0, 10)}
                    </td>
                  );
                }
                if (val.key === "end_date") {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      {cellData.slice(0, 10)}
                    </td>
                  );
                }
                if (val.key === "edit") {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      <button onClick={() => {
                        // set bunlde_books in redux
                        dispatch(setIsEditing(true));
                        dispatch(setLicenseId(item.license_id));
                        dispatch(setMode(item.mode));
                        dispatch(setBooksInBundle(item.booksInBundle));
                        navigate("/license");
                      }}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                  );
                }
                if (val.key === "concurrency") {
                  return (
                    <td key={i} className={`${val.classes} table-data`}>
                      {
                        item.concurrency == -1 ? 'NA' : <input
                          type="number"
                          min="0"
                          max="1000"
                          value={item.concurrency}
                          className="concurrency-input"
                          onBlur={(e) => {
                            if (e.target.value === "") {
                              callSetUpdateLicense(item.book_id, 0);
                            }
                          }}
                          onChange={(e) => callSetUpdateLicense(item.book_id, parseInt(e.target.value))}
                        />
                      }

                    </td>
                  );
                }
                return (
                  <td key={i} className={`${val.classes} table-data`}>
                    {cellData ?? "N/A"}
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
};

export default Table;
