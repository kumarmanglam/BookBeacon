
import Table from "../../components/common/Table";
import { licenses } from "./data"
import { TABLE_HEADER_CONFIG_VIEW_lICENSE } from "../../config/tableConfig";
import Navbar from "../../components/common/Navbar";
import "./style.css"
import ButtonGroup from "./create_button";

const ViewLicenses = () => {
    return (
        <div>
            <Navbar />
            <ButtonGroup/>
            <div className="view-license-container">
                <div className="table-container">
                    <Table headerConfig={TABLE_HEADER_CONFIG_VIEW_lICENSE} data={licenses} />
                </div>
            </div>
        </div>
    )
}

export default ViewLicenses;