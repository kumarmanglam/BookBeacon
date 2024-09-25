
<<<<<<< HEAD
// import { json } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom"; 
=======
import { json } from "react-router-dom";
import { Link } from "react-router-dom";
>>>>>>> upstream/dev
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import "./style.css";
import { useDispatch } from "react-redux";
import { updateLicenseBooksInBundle } from "../../../store/reducers/License.reducer";
interface prop {
    headerConfig: any,
    data: any
}

const Table: React.FC<prop> = ({ headerConfig, data }) => {
<<<<<<< HEAD
    const navigate=useNavigate();
=======
    const dispatch = useDispatch();

    function callSetUpdateLicense(id: number, concurrency: number) {
        const data = {
            id: id,
            concurrency: concurrency
        }
        dispatch(updateLicenseBooksInBundle(data));
    }
>>>>>>> upstream/dev
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
<<<<<<< HEAD
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
                    if (val.key === 'start') {
                        return (
                            <td key={i} className={`${val.classes} table-data`}>
                             {cellData}
                            </td>
                        );
                    }
                    if (val.key === 'end') {
                        return (
                            <td key={i} className={`${val.classes} table-data`}>
                             {cellData}
                            </td>
                        );
                    }
                    

                    if (val.key === 'edit') {
                        return (
                            <td key={i} className={`${val.classes} table-data`}>
                                
                                    <button onClick={() => navigate("/create-new")}  >
                                        {/* <FontAwesomeIcon icon={faEllipsis} /> */}
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                
                            </td>
                        );
                    }

                    return (
                        <td key={i} className={`${val.classes} table-data`}>
                            {cellData !== undefined && cellData !== null ? cellData : 'N/A'}
                        </td>
                    );
                })}
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={headerConfig.length} className="text-center">No data available.</td>
        </tr>
    )}
</tbody>

=======
                {
                    data.map((item: any, index: number) => (
                        <tr key={index} className="table-row">
                            {
                                headerConfig.map((val: any, i: any) => {
                                    const cellData = item[val["key"]];
                                    if (val.key === 'license_name') {
                                        return (
                                            <td key={i} className={`${val.classes} table-data`}>
                                                <Link to={`/licenses/${item.id}`} className="text-blue-500 hover:underline">
                                                    {cellData}
                                                </Link>
                                            </td>
                                        );
                                    }
                                    if (val.key === 'edit') {
                                        return (
                                            <td key={i} className={`${val.classes} table-data`}>
                                                <button ><FontAwesomeIcon icon={faEllipsis} /></button>
                                            </td>
                                        );
                                    } if (val.key === 'concurrency') {
                                        return (
                                            <td key={i} className={`${val.classes} table-data`}>
                                                <input
                                                    type="number"
                                                    value={item.concurrency}
                                                    className="concurrency-input"
                                                    onChange={(e: any) => callSetUpdateLicense(item.book_id, e.target.value)}
                                                />
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={i} className={`${item.classes} table-data`}>
                                            {cellData !== -1 ? cellData : 'N/A'}
                                        </td>
                                    );
                                })
                            }
                        </tr>
                    ))
                }
            </tbody>
>>>>>>> upstream/dev
        </table>
    )
}

export default Table
