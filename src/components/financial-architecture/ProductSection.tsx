import { AppState } from "@/lib/constants";
import React from "react";

interface ProductSectionProps {
    title: string;
    subheading: string;
    itemsList: string[];
    selectedItems: string[];
    appState: AppState;
    onItemClick: (item: string) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({
    title,
    subheading,
    itemsList,
    selectedItems,
    onItemClick,
    appState
}) => {


    const isSelected = (item: string) => {
        return selectedItems.includes(item) || false;
    };

    // Step 1: Conditionally filter the items based on appState
    const itemsToDisplay = appState === 'selected'
        ? itemsList.filter(item => isSelected(item))
        : itemsList;


    return (
        <div className="bg-[#232228] rounded-lg p-4 gradient-border min-h-[312px]">
            <h4 className="font-bold text-center mb-2 text-white">{title}</h4>
            <p className="text-xs text-center mb-3 text-white">{subheading}</p>
            <div
                className={
                    (appState === "selected" || appState === "confirmed")
                        ? "grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2"
                        : "grid grid-cols-3 gap-2"
                }
            >
                {itemsToDisplay.map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => onItemClick(item)}
                        className={`
        rounded-lg border-2 border-white flex items-center justify-center px-1 py-3
        text-xs text-white font-medium leading-none
        ${(appState === "selected" || appState === "confirmed")
                                ? `${isSelected(item) ? "clicked" : ""}`
                                : `bg-[#111] justify-between ${isSelected(item) ? "clicked" : ""}`}
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
