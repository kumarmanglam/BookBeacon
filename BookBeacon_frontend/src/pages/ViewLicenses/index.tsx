
import Table from "../../components/common/Table";
import { licenses } from "./data"
import { TABLE_HEADER_CONFIG, TABLE_HEADER_CONFIG_VIEW_lICENSE } from "../../config/tableConfig";
import Navbar from "../../components/common/Navbar";
import "./style.css"

const ViewLicenses = () => {
    return (
        <div>
            <Navbar />
            <div className="view-license-container">
                <div className="table-container">
                    <Table headerConfig={TABLE_HEADER_CONFIG_VIEW_lICENSE} data={licenses} />
                </div>
            </div>
        </div>
    )
}

export default ViewLicenses;