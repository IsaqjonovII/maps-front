import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import DirectionsLink from "./DirectionsLink";

const Modal = ({
  ourPlace,
  selectedPlace,
  title,
  isModalOpen,
  setIsModalOpen,
  location,
}) => {
  console.log(selectedPlace);
  return (
    <div className={!isModalOpen ? "disabled" : "modal__fade"}>
      <div className={!isModalOpen ? "disabled" : "modal__wrp"}>
        <div className="modal__header">
          <span className="modal__title">{title}</span>
          <AiOutlineClose
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="close__icon"
          />
        </div>
        <div>
          {" "}
          <p className="my-3 ">{selectedPlace?.vicinity}</p>
          <p className=" ">{ourPlace?.working_hours}</p>
          <div className="flex justify-between items-center my-3">
            <p className=" text-2xl font-bold text-green-400">
              {ourPlace?.fuel_price} so'm
            </p>
            <span
              className={
                ourPlace?.isOpenNow === "true"
                  ? "bg-green-400 text-white py-1 px-4 rounded-md "
                  : "bg-red-500 text-white py-1 px-4 rounded-md "
              }
            >
              {ourPlace?.isOpenNow === "true" ? "Ochiq" : "Yopiq"}
            </span>
          </div>
          <DirectionsLink
            source={location}
            destination={selectedPlace?.geometry.location}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
