import { AppState } from "@/lib/constants";
import React, { useState, useEffect } from "react";

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
    const [prevAppState, setPrevAppState] = useState<AppState>(appState);
    const [animatingOut, setAnimatingOut] = useState(false);

    useEffect(() => {
        if (prevAppState !== appState && (appState === 'selected' || appState === 'confirmed')) {
            setAnimatingOut(true);
            const timer = setTimeout(() => {
                setAnimatingOut(false);
                setPrevAppState(appState);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setPrevAppState(appState);
        }
    }, [appState, prevAppState]);

    const borderConfig = {
        blue: 'outline-[#6893FE]',
        brown: 'outline-[#F68763]',
        green: 'outline-[#20A889]'
    }

    const isSelected = (item: string) => {
        return selectedItems.includes(item) || false;
    };

    // Step 1: Conditionally filter the items based on appState
    const itemsToDisplay = appState === 'selected'
        ? itemsList.filter(item => isSelected(item))
        : itemsList;

    console.log(`border-[${borderConfig[color]}]`)

    return (
        <>
            <style>{`
                @keyframes expand {
                    0% {
                        transform: scale(0.8);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-expand {
                    animation: expand 0.4s ease-out;
                }
            `}</style>
            <div className={`bg-[#232228] rounded-lg p-4 gradient-${color} min-w-[450px] max-w-[460px] min-h-[312px]   ${(appState === 'selected' || appState === 'confirmed' || (appState === 'picking' && selectedItems.length > 0)) ? ` outline-4 ${borderConfig[color]}` : ''}`}>
                <h4 className="font-bold text-center mb-2 text-white">{title}</h4>
                <p className="text-xs text-center mb-3 text-white">{subheading}</p>
                <div
                    className={
                        (appState === "selected" || appState === "confirmed")
                            ? itemsToDisplay.length < 4 ? "grid grid-cols-1 gap-2" : itemsToDisplay.length < 8 ?  "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2" : "grid grid-cols-3 gap-2"
                            :  "grid grid-cols-3 gap-2"
                    }
                >
                    {itemsToDisplay.map((item, idx) => {
                        const selected = isSelected(item);
                        const shouldAnimateOut = animatingOut && !selected;
                        
                        return (
                            <div
                                key={idx}
                                onClick={() => onItemClick(item)}
                                className={`
        rounded-lg border-2 border-white flex items-center justify-center px-2 py-2
        text-[13px] text-bold text-white font-medium leading-none text-center
        transition-all duration-300 ease-in-out
        ${shouldAnimateOut ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
        ${selected && (appState === "selected" || appState === "confirmed") ? 'animate-expand' : ''}
        ${(appState === "selected" || appState === "confirmed")
                                        ? `${selected ? `clicked-${color}` : ""}`
                                        : `bg-[#111] justify-between ${selected ? `clicked-${color}` : ""}`}
      `}
                                style={{
                                    transformOrigin: 'center'
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>

            </div>
        </>
    );
};

export default ProductSection;