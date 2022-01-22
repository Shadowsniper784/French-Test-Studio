import React, { useState } from "react";
export default function Dropdown(props: any) {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative">
        <div className="flex items-center">
          <div
            className="bg-bg-secondary dark:bg-dark-bg-secondary focus-within:rounded-t-lg rounded-lg flex z-10 items-center justify-center cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="h-6 w-6 text-text-secondary dark:text-dark-text-secondary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M7 10l5 5 5-5z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
            <span className="ml-2 whitespace-pre">{props.name} </span>
          </div>
        </div>
        {open && (
          <div className="absolute z-0 left-0 max-w-16 bg-bg-secondary dark:bg-dark-bg-secondary rounded-lg shadow-lg">
            <div className="flex flex-col">

              <div className="flex-1">{props.children}</div>
            </div>
          </div>
        )}
      </div>
    );
}