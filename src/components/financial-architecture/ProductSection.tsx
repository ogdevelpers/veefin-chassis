import { AppState } from "@/lib/constants";
import React from "react";

interface ProductSectionProps {
    title: string;
    subheading: string;
    itemsList: string[];
    selectedItems: string[];
    appState: AppState;
    onItemClick: (item: string) => void;
    color: 'blue' | 'brown' | 'green';
}

const ProductSection: React.FC<ProductSectionProps> = ({
    title,
    subheading,
    itemsList,
    selectedItems,
    onItemClick,
    appState,
    color='blue'
}) => {

    const borderConfig = {
        blue: '#6893FE',
        brown: '#F68763',
        green: '#20A889'
    }

    const isSelected = (item: string) => {
        return selectedItems.includes(item) || false;
    };

    // Step 1: Conditionally filter the items based on appState
    const itemsToDisplay = appState === 'selected'
        ? itemsList.filter(item => isSelected(item))
        : itemsList;


    return (
        <div className={`bg-[#232228] rounded-lg p-4 gradient-${color} min-h-[312px] ${appState === 'selected' ? `border-4 border-[${borderConfig[color]}]` : ''}  `}>
            <h4 className="font-bold text-center mb-2 text-white">{title}</h4>
            <p className="text-xs text-center mb-3 text-white">{subheading}</p>
            <div
                className={
                    (appState === "selected" || appState === "confirmed")
                        ? itemsToDisplay.length < 4 ? "grid grid-cols-1 gap-2" : "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2"
                        :  "grid grid-cols-3 gap-2"
                }
            >
                {itemsToDisplay.map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => onItemClick(item)}
                        className={`
        rounded-lg border-2 border-white flex items-center justify-center px-2 py-2
        text-[13px] text-bold text-white font-medium leading-none text-center
        ${(appState === "selected" || appState === "confirmed")
                                ? `${isSelected(item) ? `clicked-${color}` : ""}`
                                : `bg-[#111] justify-between ${isSelected(item) ? `clicked-${color}` : ""}`}
      `}
                    >
                        {item}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ProductSection;
