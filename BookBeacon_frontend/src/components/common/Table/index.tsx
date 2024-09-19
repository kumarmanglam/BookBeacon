/* eslint-disable @typescript-eslint/no-explicit-any */
//import { json } from "react-router-dom";

interface prop {
    headerConfig: any,
    data: any
}

const Table: React.FC<prop> = ({ headerConfig, data }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {
                            headerConfig.map((item: any, index: number) => {
                                return <td key={index}>{item.label}</td>
                            })
                        }
                    </tr>

                </thead>
                <tbody>
                    {
                        data.map((item: any, index: number) => (
                            <tr key={index}>
                                {
                                    headerConfig.map((val: any, i: any) => {
                                        const cellData = item[val["key"]];
                                        console.log(JSON.stringify(item))
                                        return (
                                            <td key={i} className={val.classes}>
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
        </div>
    )
}

export default Table
