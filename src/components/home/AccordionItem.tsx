import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const AccordionItem = ({ headerTitle, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full px-4 py-4 text-left border-b border-gray-200 focus:outline-none"
      >
        <span  className="text-start text-lg sm:text-xl font-semibold  text-gray-800">{headerTitle}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 border-b border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
