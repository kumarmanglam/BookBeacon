import { useNavigate } from "react-router-dom";

const ButtonGroup: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end mb-4 mt-10 mr-16">
      <button onClick={() => navigate("/create-new")} className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
        Create New
      </button>
      <button  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Download CSV
      </button>
    </div>
  );
};

export default ButtonGroup;