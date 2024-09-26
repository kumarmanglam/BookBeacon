
import { json } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import "./style.css";
import { useDispatch } from "react-redux";
import { updateLicenseBooksInBundle } from "../../../store/reducers/License.reducer";
interface prop {
    headerConfig: any,
    data: any
}

const Table: React.FC<prop> = ({ headerConfig, data }) => {
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
        </table>
    )
}

export default Table
