"use client";
import React, { useEffect } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
export default function SingleSelection({ options, handleStartStateChange }) {
  const [openList, setOpenList] = React.useState(false);
  const [select, setSelecteed] = React.useState();
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

  React.useEffect(() => {
    handleStartStateChange(select);
  }, [select]);

  function handleSelect(option) {
    setSelecteed(option);
  }

  function unSelect(option) {
    select == option && setSelecteed();
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
        <div className="flex-1 p-1 flex flex-inline flex-wrap">{select}</div>
        <ChevronUpDownIcon className="font-medium w-5 h-8 " />
      </div>
      <ul
        className="p-3 text-md rounded-lg shadow-gray-500/50 shadow-lg max-h-60 overflow-auto"
        style={openList ? { display: "block" } : { display: "none" }}
      >
        {options.map((option, index) => {
          const isSelected = select == option;
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
}
