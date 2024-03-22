import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

import {
  HiChartPie,
  HiClipboard,
  HiCurrencyDollar,
  HiInformationCircle,
  HiCollection,
  HiBeaker,
  // HiSearch,
  HiUsers,
  HiFolder,
} from "react-icons/hi";


const ExampleSidebar: FC = function () {
  const token = localStorage.getItem('token');
  const user3 = localStorage.getItem("badgeSession") || ""
  const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
  const createdUser = user2.toString(CryptoJS.enc.Utf8);

  const userLevel3 = localStorage.getItem("userLevel") || ""
  const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
  const userLevel:string = userLevel2.toString(CryptoJS.enc.Utf8);

  const userCompany3 = localStorage.getItem("userCompany") || ""
  const userCompany2 = (userLevel3 ? CryptoJS.AES.decrypt(userCompany3, "Tyrannosaurus") : "")
  const userCompany:string = userCompany2.toString(CryptoJS.enc.Utf8);
  console.log(userCompany)

  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);


  return (
    <div>
      {window.innerWidth >= 768 &&
      token ?
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <div className="flex h-full flex-col justify-between py-2">
            <div>
              {/* <form className="pb-3 md:hidden">
                <TextInput
                  icon={HiSearch}
                  type="search"
                  placeholder="Search"
                  required
                  size={32}
                />
              </form> */}
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="/dashboard"
                    icon={HiChartPie}
                    className={
                      "/dashboard" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                    }
                  >
                    Dashboard
                  </Sidebar.Item>
                  {userLevel == "3" && userCompany == "3"? <Sidebar.Item
                    href="/bonuses/all"
                    icon={HiCurrencyDollar}
                    className={
                      "/bonuses/all" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >   Bonuses
                  </Sidebar.Item> : null}

                  {userLevel == "3" || userLevel == "2" || userLevel == "5" || userLevel == "6"? <Sidebar.Item
                    href="/bonuses/bonusCatalog"
                    icon={HiFolder}
                    className={
                      "/bonuses/bonusCatalog" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                    }
                  // className={
                  //   "/users/list" === currentPage
                  //     ? "bg-gray-100 dark:bg-gray-700"
                  //     : ""
                  // }
                  >
                    Bonus catalog
                  </Sidebar.Item>  : "" }
                 
                  {userLevel == "1" || userLevel == "2" || userLevel == "3" || userLevel == "5" || userLevel == "6"? <Sidebar.Item
                    href="/bonuses/appliedBonuses"
                    icon={HiCollection}
                    className={
                      "/bonuses/appliedBonuses" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                    }
                  // className={
                  //   "/users/list" === currentPage
                  //     ? "bg-gray-100 dark:bg-gray-700"
                  //     : ""
                  // }

                  >
                    Applied Bonuses
                  </Sidebar.Item> : "" }
                  {userLevel == "1" || userLevel == "2" || userLevel == "3" || userLevel == "4"  || userLevel == "5" || userLevel == "6"? 
                  <Sidebar.Item
                    href="/repots/allreports"
                    icon={HiClipboard}
                    className={
                      "/repots/allreports" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                    }
                  // className={
                  //   "/users/list" === currentPage
                  //     ? "bg-gray-100 dark:bg-gray-700"
                  //     : ""
                  // }
                  >
                    Reports
                  </Sidebar.Item> :""}
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  {createdUser === "3199" || createdUser === "3814" ?
                    <Sidebar.Item
                      href="/users/list "
                      icon={HiUsers}
                      className={
                        "/users/list" === currentPage
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }
                    >
                      Users
                    </Sidebar.Item> : null
                  }
                  <Sidebar.Item
                    // href="https://github.com/IT-Admin-GMBPO/gmbpo-bonus"
                    href="/help/info"
                    icon={HiInformationCircle}
                  >
                    Help
                  </Sidebar.Item>
                  {createdUser === "3199" || createdUser === "3814" ?
                  <Sidebar.Item
                    href="/devs/devsDashboard"
                    icon={HiBeaker}
                    className={
                      "/devs/devsDashboard" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                    }
                  >
                    Devs Dashboard
                  </Sidebar.Item>
                  : <></>}
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
          </div>
        </Sidebar>
        : ""
      }
    </div>
  );
};

export default ExampleSidebar;
