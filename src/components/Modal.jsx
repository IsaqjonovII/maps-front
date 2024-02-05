import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DirectionsLink from "./DirectionsLink";
import Loader from "./Loader/index";

import Stream from "./../pages/Stream/index";

const Modal = ({
  ourPlace,
  selectedPlace,
  title,
  isModalOpen,
  setIsModalOpen,
  location,
}) => {
  const [isCameraOpened, setIsCameraOpened] = useState(false);
  return (
    <div className={!isModalOpen ? "disabled" : "modal__fade"}>
      <div className={!isModalOpen ? "disabled" : "modal__wrp"}>
        <div className="modal__header">
          <span className="modal__title">{!title ? <Skeleton /> : title}</span>
          <AiOutlineClose
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="close__icon"
          />
        </div>
        {isCameraOpened ? (
          <>
            <Stream />
            <button
              onClick={() => setIsCameraOpened(!isCameraOpened)}
              className="border border-red-400 rounded-lg text-red-400 mt-5 px-4 py-2 hover:bg-red-400 hover:text-white"
            >
              Ortga qaytish
            </button>
          </>
        ) : (
          <div>
            {" "}
            <p className="my-3 ">
              {selectedPlace?.vicinity ?? "Gas station vicinity"}
            </p>
            <p className=" ">
              {ourPlace?.working_hours ?? "Gas station working hours"}
            </p>
            <div className="flex justify-between items-center my-3">
              <p className=" text-2xl font-bold text-green-400 flex items-center">
                1000 so'm
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
            <button
              onClick={() => setIsCameraOpened(!isCameraOpened)}
              className="border border-green-400 rounded-lg text-green-400 mt-5 px-4 py-2 hover:bg-green-400 hover:text-white"
            >
              Jonli efir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
