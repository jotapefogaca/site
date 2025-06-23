import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface AccordionProps {
   title: string;
   content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleAccordion = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div className="w-full">
         <span
            className={`flex justify-between w-full ${isOpen ? 'rounded-t-2xl' : 'rounded-full'}  p-6 border-primary border text-primary cursor-pointer`}
            onClick={toggleAccordion}
         >
            <p>{title}</p>
            <KeyboardArrowDownIcon sx={{ color: '#272b37' }} />
         </span>
         <div
            className={`overflow-hidden transition-max-height duration-500 ease-in-out border-primary  ${isOpen ? 'max-h-40 border border-t-0 rounded-b-2xl' : 'max-h-0'}`}
         >
            <p className="p-6">{content}</p>
         </div>
      </div>
   );
};

export default Accordion;
