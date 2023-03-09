import React from "react";

const DelayAnimation = ({ children, className, style, delay = 100 }) => {

    return (
        <div className={className} style={style}>
            {React.Children.map(children, (child, index) => (
                React.cloneElement(child, {
                    ...child.props,
                    key: index,
                    delay: index * delay,
                  })
            ))}
        </div>
    )
}

export default DelayAnimation;