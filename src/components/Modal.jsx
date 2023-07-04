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
  console.log(ourPlace);

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
            <p className="mt-3 mb-1 ">
              {selectedPlace?.vicinity ?? <Skeleton />}
            </p>
            <div className="flex justify-between items-center">
              <p className=" ">
                Ish Vaqti:{" "}
                <b className="text-green-400">
                  {ourPlace?.place?.working_hours ?? <Skeleton />}
                </b>
              </p>
              <span
                className={
                  ourPlace?.place?.isOpenNow
                    ? "bg-green-400 text-white py-1 px-4 rounded-md "
                    : "bg-red-500 text-white py-1 px-4 rounded-md "
                }
              >
                {ourPlace?.place?.isOpenNow ? "Ochiq" : "Yopiq"}
              </span>
            </div>
            <div className="w-full h-auto">
              <div className="flex w-full items-center my-2">
                <div className="text-md font-bold text-gray-700 w-full max-w-[200px]">
                  Yoqilg'i turlari
                </div>
                <div className="text-md font-bold text-gray-700 w-full max-w-[200px]">
                  Narxi (so'm)
                </div>
                <div className="text-md font-bold text-gray-700">Holati</div>
              </div>
              {ourPlace?.fuel?.fuel_types.map(
                ({ id, name, isAvailable, price }, index) => (
                  <div className={`w-full flex items-center my-1`} key={index}>
                    <div className="pl-2 w-full max-w-[200px]">{name}</div>
                    <div className="w-full max-w-[200px]">{price}</div>
                    <div
                      className={
                        isAvailable
                          ? "text-green-400 text-lg"
                          : "text-red-600 text-lg"
                      }
                    >
                      {isAvailable ? "Bor" : "Yo'q"}
                    </div>
                  </div>
                )
              )}
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
