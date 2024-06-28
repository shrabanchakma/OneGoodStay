import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { RiMenuFold2Fill, RiMenuFoldFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import HostOptionsMobile from "../Host/HostOptionsMobile";
import GuestOptionMobile from "../Guest/GuestOptionsMobile";
import AdminOptionsMobile from "../Admin/AdminOptionsMobile";
import useUserData from "../../../Hooks/useUserData";
import CustomTextDisplay from "./CustomTextDisplay";
export const SidebarMobile = ({
  userRole: role,
  handleSignOut,
  handleRequestHost,
}) => {
  const [isActive, setIsActive] = useState(false);
  const { userData } = useUserData();
  const sidebarRef = useRef(null);

  const openSidebar = () => {
    setIsActive(true);
    console.log(isActive);
  };
  const closeSidebar = () => {
    setIsActive(false);
    console.log(isActive);
  };
  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    console.log("from use effect");
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //   todo: add make me host option
  return (
    <>
      <div className="w-full flex  md:hidden justify-between  p-3 mt-6 mb-9">
        <button onClick={openSidebar} className="block md:hidden ">
          <RiMenuFold2Fill size={35} />
        </button>
        <CustomTextDisplay
          pathMatch={"analytics"}
          mainText={"Dashboard"}
          HighlightedText={"Analytics"}
        />
        <CustomTextDisplay
          pathMatch={"all-users"}
          mainText={"List"}
          HighlightedText={"All Users"}
        />
        <CustomTextDisplay
          pathMatch={"profile"}
          mainText={"Profile"}
          HighlightedText={userData?.name}
        />
        <CustomTextDisplay
          pathMatch={"my-bookings"}
          mainText={"List"}
          HighlightedText={"Bookings"}
        />
      </div>
      <aside
        ref={sidebarRef}
        className={` py-10 fixed md:hidden left-0 right-44  top-0 bottom-0 ${
          !isActive && "-translate-x-full"
        } z-10 bg-white transition-position duration-150 ease-in-out `}
      >
        <div className="flex justify-end w-full px-4 pb-2">
          <div
            onClick={closeSidebar}
            className=" flex items-center justify-center rounded-full active:bg-neutral-100 h-12 w-12 "
          >
            <RiMenuFoldFill className="h-8 w-8" />
          </div>
        </div>
        <div
          onClick={closeSidebar}
          className="flex flex-col justify-between h-full"
        >
          <div>
            <p className="px-4 py-2 font-medium">
              <Link to="./profile">My Profile</Link>
            </p>
            {role === "admin" && <AdminOptionsMobile />}
            {role === "host" && <HostOptionsMobile />}
            {role === "guest" && <GuestOptionMobile />}
          </div>
          <div className="mb-10 ">
            {/* request for host */}
            <div>
              {userData?.role === "guest" && (
                <p
                  onClick={handleRequestHost}
                  className="underline text-blue-500 hover:text-blue-600 active:text-blue-700 text-center cursor-pointer font-semibold"
                >
                  Request for Host
                </p>
              )}
              <button
                onClick={handleSignOut}
                className="text-sky-600 font-bold w-full h-12 rounded-3xl hover:text-sky-700 hover:bg-sky-100 active:bg-sky-200 transition-all duration-100 ease-in-out"
              >
                Sing Out
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
