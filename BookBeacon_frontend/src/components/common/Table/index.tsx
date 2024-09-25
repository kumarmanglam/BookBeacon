
// import { json } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import "./style.css";
interface prop {
    headerConfig: any,
    data: any
}

const Table: React.FC<prop> = ({ headerConfig, data }) => {
    const navigate=useNavigate();
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

        </table>
    )
}

export default Table
