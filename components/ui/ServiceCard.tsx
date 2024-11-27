import { LucideFactory } from "lucide-react";
import React from "react";

type Props = {
  text?: string;
  icon?: React.ReactNode;
};

const ServiceCard = ({
  text = "Mining Services",
  icon = <LucideFactory name="mining" />,
}) => (
  <div className="flex aspect-square flex-col justify-between rounded-3xl bg-lime-100 p-4 text-xl leading-[0.9em] text-lime-700 md:p-8">
    <div>{icon ?? <LucideFactory className="size-8" />}</div>
    <div>{text}</div>
  </div>
);

export default ServiceCard;
