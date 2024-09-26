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

    function callSetUpdateLicense(id: number, concurrency: number) {
        const data = {
            id: id,
            concurrency: concurrency
        }
        dispatch(updateLicenseBooksInBundle(data));
    }
    function handleBlur() {

    }
    return (
        <table className="table">
            <thead>
                <tr className="table-row table-head">
                    {
                        headerConfig.map((item: any, index: number) => {
                            return <th key={index} className={`${item.classes} table-head-data table-data`}>{item.label}</th>
                        })
                    }
                </tr>

            </thead>
            <tbody>
                {
                    data.map((item: any, index: number) => (
                        <tr key={index} className="table-row">
                            {
                                headerConfig.map((val: any, i: any) => {
                                    const cellData = item[val["key"]];
                                    if (val.key === 'edit') {
                                        return (
                                            <td key={i} className={`${val.classes}  table-data`}>
                                                <button onClick={() => navigate("/license")}><FontAwesomeIcon icon={faEdit} /></button>
                                            </td>
                                        );
                                    } if (val.key === 'concurrency') {
                                        return (
                                            <td key={i} className={`${val.classes} table-data`}>
                                                <input
                                                    type="number"
                                                    value={item.concurrency}
                                                    className="concurrency-input"
                                                    onBlur={(e: any) => {
                                                        if (e.target.value == "") {
                                                            callSetUpdateLicense(item.book_id, 0)
                                                        }
                                                    }}
                                                    onChange={(e: any) => callSetUpdateLicense(item.book_id, e.target.value)}
                                                />
                                            </td>
                                        );
                                    }
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
