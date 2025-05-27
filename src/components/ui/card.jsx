// card.tsx (또는 card.jsx)

import * as React from "react";

export const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-white shadow-md rounded-lg ${className}`}>
            {children}
        </div>
    );
};

export const CardContent = ({ children, className = "" }) => {
    return <div className={`p-6 ${className}`}>{children}</div>;
};
