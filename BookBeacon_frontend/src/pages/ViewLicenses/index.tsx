
import Table from "../../components/common/Table";
import { licenses } from "./data"
import { TABLE_HEADER_CONFIG } from "../../config/tableConfig";
import Navbar from "../../components/common/Navbar";

const ViewLicenses = () => {
    return (
        <div>
            <Navbar />
            <Table headerConfig={TABLE_HEADER_CONFIG} data={licenses[2].booksInBundle} />
        </div>
    )
}

export default ViewLicenses;