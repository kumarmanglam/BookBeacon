
import Table from "../../components/common/Table";
import { licenses } from "./data"
import { TABLE_HEADER_CONFIG_VIEW_BOOKS_INSIDE_LICENSE } from "../../config/tableConfig";
import Navbar from "../../components/common/Navbar";
import "./style.css"

const ViewBooksInsideLicense = () => {
    return (
        <div>
            <Navbar />
            <div className="view-license-container">
                <div className="view-license-header">
                    <p>License Name</p>
                </div>
                <div className="table-container">
                    <Table headerConfig={TABLE_HEADER_CONFIG_VIEW_BOOKS_INSIDE_LICENSE} data={licenses[2].booksInBundle} />
                </div>
            </div>

        </div>
    )
}

export default ViewBooksInsideLicense;