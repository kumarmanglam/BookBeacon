import Table from "../../components/common/Table";
import { fetchLicenses } from "../services/licenseService";
import { TABLE_HEADER_CONFIG_VIEW_lICENSE } from "../../config/tableConfig";
import Navbar from "../../components/common/Navbar";
import "./style.css";
import ButtonGroup from "./create_button";
import { useEffect, useState } from "react";
import { licenseStructure } from "../../utils/interface";

const ViewLicenses = () => {
  const [licenseData, setLicenseData] = useState<licenseStructure[]>([]);
  const callFetchAPI = async () => {
    const data = await fetchLicenses();
    setLicenseData(data);
  };
  useEffect(() => {
    callFetchAPI();
  }, []);
  return (
    <div>
      <Navbar />
      <ButtonGroup />
      <div className="view-license-container">
        <div className="table-container">
          <Table
            headerConfig={TABLE_HEADER_CONFIG_VIEW_lICENSE}
            data={licenseData}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewLicenses;
