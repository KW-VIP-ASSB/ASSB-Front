import React from "react";

const Badge = ({ children, className = "" }) => {
    return (
        <span
            className={`inline-block rounded-full bg-gray-200 text-gray-800 text-xs px-3 py-1 ${className}`}
        >
            {children}
        </span>
    );
};

export { Badge };
