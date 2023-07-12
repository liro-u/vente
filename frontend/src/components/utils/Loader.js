import React, { useEffect, useState } from "react";

const Loader = ({ delay = 3000 }) => {
  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const circleStyle = {
    width: "50px",
    height: "50px",
    border: "4px solid #ccc",
    borderTopColor: "#000",
    borderRadius: "50%",
    animation: "rotation 1s linear infinite",
  };

  const keyframes = `
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  const [serverStarting, setServerStarting] = useState(false);

  useEffect(() => {
    const delayFunctionCall = setTimeout(() => {
      setServerStarting(true);
    }, delay);

    return () => {
      clearTimeout(delayFunctionCall);
    };
  }, []);

  return (
    <div>
      <style>{keyframes}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          ...loaderStyle,
        }}
      >
        <div style={{ margin: "30px" }}>
          <div style={circleStyle}></div>
        </div>
        {serverStarting && (
          <>
            <h1 style={{ margin: 0 }}>Server is Certainly Starting</h1>
            <h3 style={{ margin: 0 }}>it can take 1 minute</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Loader;
