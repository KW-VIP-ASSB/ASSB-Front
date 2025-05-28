import React from "react";

const RadioGroup = ({ children, className = "", value, onValueChange }) => {

    const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.value !== undefined) {
            return React.cloneElement(child, {
                checked: child.props.value === value,
                onChange: () =>
                    onValueChange && onValueChange(child.props.value),
            });
        }
        return child;
    });

    return <div className={`flex gap-2 ${className}`}>{enhancedChildren}</div>;
};

const RadioGroupItem = ({ id, value, className = "", ...props }) => {
    return (
        <input
            type="radio"
            id={id}
            name="radio-group"
            value={value}
            className={`accent-black ${className}`}
            {...props}
        />
    );
};

export { RadioGroup, RadioGroupItem };
