import React, { ReactNode } from "react";


export const getDisplayWarning = (
    {hasWarning}: {hasWarning: boolean}
): string => {
    if(hasWarning) {
        return "Warning"
    }
    return "";
}