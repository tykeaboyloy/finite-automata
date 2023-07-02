"use client";
import React, { useEffect } from "react";
import { ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/20/solid";

const MultipleSelection = (props) => {
  const [openList, setOpenList] = React.useState(false);
  const [select, setSelecteed] = React.useState([]);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenList(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleSelect(option) {
    setSelecteed((select) => [...select, option]);
  }

  function unSelect(option) {
    const updatedSelect = select.filter((item) => item !== option);
    setSelecteed(updatedSelect);
  }
  const active = openList
    ? "ring-2 ring-inset ring-indigo-600"
    : "ring-1 ring-inset ring-gray-300";
  return (
    <div ref={dropdownRef}>
      <div
        onClick={() => {
          setOpenList(!openList);
        }}
        className={`shadow-sm border border-grey-500 rounded-lg flex justify-end p-1 ${active} items-center`}
      >
        <div className="flex-1 p-1 flex flex-inline flex-wrap">
          {select.map((s, index) => {
            return (
              <span
                key={index}
                className="flex bg-gray-200 rounded-xl pl-2 pr-1 items-center mr-2 my-1"
              >
                <span className="flex-1 mr-3">{s}</span>
                <XMarkIcon
                  onClick={() => {
                    unSelect(s);
                  }}
                  className="w-4 bg-gray-400 rounded-xl hover:bg-gray-500"
                />
              </span>
            );
          })}
        </div>
        <XMarkIcon
          onClick={() => {
            setSelecteed([]);
          }}
          className="font-medium w-5 mx-1 hover:bg-gray-400 rounded-xl"
        />
        <ChevronUpDownIcon className="font-medium w-5 h-8 " />
      </div>
      <ul
        className="p-3 text-md rounded-lg shadow-gray-500/50 shadow-lg max-h-60 overflow-auto"
        style={openList ? { display: "block" } : { display: "none" }}
      >
        {props.options.map((option, index) => {
          const isSelected = select.includes(option);
          const active = isSelected ? "bg-gray-100" : "";
          return (
            <li
              key={index}
              onClick={() => {
                active ? unSelect(option) : handleSelect(option);
              }}
              className={`hover:bg-gray-200 p-1 ${active}`}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultipleSelection;