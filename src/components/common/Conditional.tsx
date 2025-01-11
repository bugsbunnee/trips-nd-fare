import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    visible: boolean;
}

const Conditional: React.FC<Props> = ({ children, visible }) => {
    if (visible) return children;

    return null;
};
 
export default Conditional;