import { useState } from "react";
import Transition from "./Transition.js";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative ...">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group text-gray-500 inline-flex items-center space-x-2 text-base leading-6 font-medium hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
      >
        <span>Profile</span>

        <svg
          className="text-gray-400 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className=" left-1/2 transform -translate-x1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
          <div className="rounded-lg shadow-lg">
            <div className="rounded-lg shadow-xs overflow-hidden">
              <div className="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                <a
                  href="#"
                  className="-m-3 p-3 block space-y-1 rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                >
                  <p className="text-base leading-6 font-medium text-gray-900">
                    Current Balance
                  </p>
                  <p className="text-sm leading-5 text-gray-500">
                    You have <span>this many</span> coins.
                  </p>

                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="rounded-md shadow-sm">
                        <button
                          id="pay10"
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-grey-900 bg-indigo-400 hover:bg-orange-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-600 active:bg-indigo-600 transition duration-150 ease-in-out"
                        >
                          <svg
                            className="-ml-1 mr-2 h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>Current balance: 0</span>
                        </button>
                      </span>
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="-m-3 p-3 block space-y-1 rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                >
                  <p className="text-base leading-6 font-medium text-gray-900">
                    Badges
                  </p>
                  <p className="text-sm leading-5 text-gray-500">
                    You have aquired the <span>id</span> badge.
                  </p>
                </a>
                <a
                  href="#"
                  className="-m-3 p-3 block space-y-1 rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                >
                  <p className="text-base leading-6 font-medium text-gray-900">
                    Button
                  </p>
                  <p className="text-sm leading-5 text-gray-500">
                    To buy coins
                  </p>

                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="rounded-md shadow-sm">
                        <button
                          id="pay10"
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-grey-900 bg-orange-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-600 active:bg-indigo-600 transition duration-150 ease-in-out"
                        >
                          <svg
                            className="-ml-1 mr-2 h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>Buy 10 Coins</span>
                        </button>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
