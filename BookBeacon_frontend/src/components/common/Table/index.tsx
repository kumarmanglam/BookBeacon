
import { json } from "react-router-dom";
import "./style.css";
interface prop {
    headerConfig: any,
    data: any
}

const Table: React.FC<prop> = ({ headerConfig, data }) => {
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
