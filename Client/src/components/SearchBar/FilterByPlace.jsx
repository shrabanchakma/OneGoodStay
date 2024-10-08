import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Input,
  Field,
  DialogPanel,
  Dialog,
  Button,
  DialogBackdrop,
  CloseButton,
} from "@headlessui/react";
import { IoLocationSharp } from "react-icons/io5";
import "./SearchBar.css";
import { useEffect, useRef, useState } from "react";
import { BangladeshCities } from "./BangladeshCities";
import { MdCancel } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import City from "./City";
import { RxCross2 } from "react-icons/rx";
const FilterByPlace = ({ saveSearchData, searchData, errMsg, setErrMsg }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();
  const panelRef = useRef();
  const removeTextBtn = useRef();
  // console.log("searchText -->", searchText);
  // console.log("filtered cities -->", filteredCities);
  const handleInputText = (e) => {
    if (e.target.value.length === 0) {
      setFilteredCities([]);
    }
    setSearchText(e.target.value);
  };
  const clearSearchText = (e) => {
    if (
      (panelRef.current && !panelRef.current.contains(e.target)) ||
      removeTextBtn.current
    ) {
      inputRef.current.value = "";
      setSearchText("");
      setFilteredCities([]);
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = BangladeshCities.filter((city) =>
        new RegExp(searchText, "i").test(city)
      );
      setFilteredCities(filtered);
    }
  }, [searchText]);
  useEffect(() => {
    document.addEventListener("mousedown", clearSearchText);
    return () => {
      document.removeEventListener("mousedown", clearSearchText);
    };
  }, []);
  return (
    <div className="w-full flex-grow">
      <Popover className={"relative hidden lg:block"}>
        <PopoverButton
          className={`text-xl w-full h-12 border-gray-400 rounded-lg text-start flex items-center gap-1 px-4 data-[active]:border-none data-[active]:outline data-[active]:outline-[#e41b43] ${
            errMsg ? "outline outline-[#e41b43] mb-1" : "border"
          } `}
        >
          <IoLocationSharp />
          <div>
            <span>Where to?</span>
            {searchData && searchData?.city && (
              <p className="text-sm ">{searchData?.city}</p>
            )}
          </div>
        </PopoverButton>
        {/* error message */}
        {errMsg && (
          <span className="text-rose-600 text-[14px] ml-[.4rem]">{errMsg}</span>
        )}
        <PopoverPanel
          transition
          ref={panelRef}
          anchor="bottom"
          className={
            "flex origin-top-left flex-col transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 [--anchor-gap:-3.2rem] [--anchor-offset:1rem] w-[22rem] shadow bg-white"
          }
        >
          <div className=" rounded-lg">
            <Field className="border-b flex items-center justify-between mt-3 px-3">
              <Input
                ref={inputRef}
                placeholder="Going to?"
                onChange={handleInputText}
                className={
                  " py-3 px-4  block w-full rounded-lg border-none bg-white/5 text-3xl font-bold text-gray-800  outline-none"
                }
              />
              {searchText.length > 0 && (
                <button ref={removeTextBtn}>
                  <MdCancel
                    onClick={clearSearchText}
                    size={17}
                    className="cursor-pointer"
                  />
                </button>
              )}
            </Field>
          </div>

          <div className=" h-[20rem] overflow-y-auto overflow-x-hidden">
            {filteredCities && filteredCities.length > 0 ? (
              filteredCities.map((city, idx) => (
                <City
                  key={idx}
                  city={city}
                  setErrMsg={setErrMsg}
                  icon={IoLocationSharp}
                  closeModal={closeModal}
                  saveSearchData={saveSearchData}
                />
              ))
            ) : searchText.length > 0 && filteredCities == 0 ? (
              <div className="flex flex-col items-center justify-center mt-10">
                <IoSearch size={35} />
                <p className="text-gray-700">Not found</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-10">
                <IoSearch size={35} />
                <p className="text-gray-700">Search by cities</p>
              </div>
            )}
          </div>
        </PopoverPanel>
      </Popover>
      {/* for small screens */}
      <div className="relative block lg:hidden">
        <Button
          onClick={openModal}
          className={`text-xl w-full h-12   border-gray-400 rounded-lg text-start flex items-center gap-1 px-4 data-[active]:border-none data-[active]:outline data-[active]:outline-[#e41b43] ${
            errMsg ? "outline outline-[#e41b43] mb-1" : "border"
          } `}
        >
          <IoLocationSharp />
          <div>
            <span>Where to?</span>
            {searchData && searchData?.city && (
              <p className="text-sm ">{searchData?.city}</p>
            )}
          </div>
        </Button>
        {/* error message */}
        {errMsg && (
          <span className="text-rose-600 text-[14px] ml-[.4rem]">{errMsg}</span>
        )}
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={closeModal}
        >
          <DialogBackdrop className={"fixed inset-0 bg-black/30"} />
          <div className="fixed inset-0 z-10  overflow-y-auto ">
            <div className="flex h-full items-center justify-center p-0 md:p-4">
              <DialogPanel className="h-full w-full md:w-[35rem] md:h-[42rem] md:rounded-xl bg-white  p-6 backdrop-blur-2xl  overflow-y-auto overflow-x-hidden">
                <button
                  onClick={closeModal}
                  className="flex items-center justify-center bg-white hover:bg-blue-200  h-8 w-8 rounded-full absolute left-3 top-3"
                >
                  <RxCross2 className="text-blue-500  text-[1.5rem]" />
                </button>

                <div className="border-b flex items-center justify-between mt-3 px-3">
                  <Input
                    ref={inputRef}
                    placeholder="Going to?"
                    onChange={handleInputText}
                    className={
                      " py-3 px-4  block w-full rounded-lg border-none bg-white/5 text-3xl font-bold text-gray-800  outline-none"
                    }
                  />
                  {searchText.length > 0 && (
                    <button ref={removeTextBtn}>
                      <MdCancel
                        onClick={clearSearchText}
                        size={17}
                        className="cursor-pointer"
                      />
                    </button>
                  )}
                </div>
                <div>
                  {filteredCities && filteredCities.length > 0 ? (
                    filteredCities.map((city, idx) => (
                      <City
                        key={idx}
                        city={city}
                        setErrMsg={setErrMsg}
                        icon={IoLocationSharp}
                        closeModal={closeModal}
                        saveSearchData={saveSearchData}
                      />
                    ))
                  ) : searchText.length > 0 && filteredCities == 0 ? (
                    <div className="flex flex-col items-center justify-center mt-10">
                      <IoSearch size={35} />
                      <p className="text-gray-700">Not found</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center mt-10">
                      <IoSearch size={35} />
                      <p className="text-gray-700">Search by cities</p>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default FilterByPlace;
