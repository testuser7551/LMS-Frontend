import React ,{useState,useEffect}from "react";
import MyCard from "../Components/MyCard";
import { useNavigate } from "react-router-dom";

const DigitalCardForm = ({ content, setContent, onContinue, onBack, isEditMode}) => {
const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToCardDesign = () => {
    navigate("/courses/mycard");
  };

  // Validate form fields
  useEffect(() => {
    const newErrors = {};

    if (!content.qrName || content.qrName.trim() === "") {
      newErrors.qrName = "QR Name is required";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [content]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };
  // Handler to receive card ID from MyCard and update content state
  const handleCardIdUpdate = (cardId) => {
    setContent((prevContent) => ({
      ...prevContent,
      webCardId: cardId|| "",
    }));
  };
  return (

    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-6">Add Digital Card Details</h2>
      {/* QR Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">QR Name</label>
        <input
          type="text"
          value={content.qrName || ""}
          onChange={(e) => setContent({ ...content, qrName: e.target.value })}
          onBlur={() => handleBlur("qrName")}
          placeholder="Enter QR Name"
          className={`w-full border rounded-md px-4 py-2 ${errors.qrName && touched.qrName ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.qrName && touched.qrName && (
          <p className="text-red-500 text-sm mt-1">{errors.qrName}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Digital Card ID / Link</label>
        <input
          type="text"
          value={`${window.location.origin}/cardview?id=${content.webCardId}`|| ""}
          disabled={true}
          onChange={(e) => setContent({ ...content, webCardId: e.target.value })}
          placeholder="Your digital link"
          className="w-full border border-gray-300 rounded-md px-4 py-2 disabled:opacity-50 cursor-not-allowed"
        />
      </div>
      
      <MyCard onCardIdFetched={handleCardIdUpdate} />
      <p className="block text-sm font-medium text-gray-700 mb-5">Note : You can edit your card in {" "}
          <span
            className="text-black cursor-pointer underline"
            onClick={handleNavigateToCardDesign} // On click, navigate to /card-design
          >
            Card Designer
          </span>{" "} Section.</p>
      <div className="flex justify-center gap-4">
         {!isEditMode && (
        <button onClick={onBack} className="w-40 border border-black py-2 rounded-md hover:bg-gray-100 cursor-pointer">
          Go Back
        </button>
        )}
        <button onClick={onContinue}
          disabled={!isValid}
          className={`w-40 py-2 rounded-md ${
            isValid
              ? "bg-black text-white hover:bg-gray-800 cursor-pointer "
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}>
          Continue
        </button>
      </div>
    </div>
  )
};

export default DigitalCardForm;
