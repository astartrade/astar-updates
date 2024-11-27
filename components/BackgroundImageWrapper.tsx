import React from "react";

type BackgroundImageWrapperProps = {
  backgroundImage: string;
  children?: React.ReactNode; // To allow for nested content
};

const BackgroundImageWrapper: React.FC<BackgroundImageWrapperProps> = ({
  backgroundImage = "/images/farmer3.jpg",
  children,
}) => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        // filter: 'contrast(101%) brightness(101%) saturate(2)',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        minHeight: "100%",
        width: "100%",
        minWidth: "100%",
        position: "absolute",
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundImageWrapper;
