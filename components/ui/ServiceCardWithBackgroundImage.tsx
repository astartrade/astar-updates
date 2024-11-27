import React from "react";

type BackgroundImageProps = {
  backgroundImage?: string;
};

const ServiceCardWithBackgroundImage: React.FC<BackgroundImageProps> = ({
  backgroundImage = "farmer4.jpg",
}) => {
  return (
    <div className="relative rounded-3xl">
      <div
        className="absolute inset-0 z-0 rounded-3xl"
        style={{
          backgroundImage: `url("/images/${backgroundImage}")`,
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
      />
    </div>
  );
};

export default ServiceCardWithBackgroundImage;
