/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Table, useTheme } from "flowbite-react";
import { useState, type FC, useEffect } from "react";
import Chart from "react-apexcharts";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import axios from "axios";
import CountUp from 'react-countup';
import CryptoJS from "crypto-js";

const user3 = localStorage.getItem("badgeSession") || ""
const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
const createdUser = user2.toString(CryptoJS.enc.Utf8);
const created_user: string = (createdUser == '3199' || createdUser == '1193' || createdUser == '3814' || createdUser == '2160' || createdUser == '1195' ? "admin" : createdUser)

const userLevel3 = localStorage.getItem("userLevel") || ""
const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
const userLevel: string = userLevel2.toString(CryptoJS.enc.Utf8);
console.log(userLevel)

const userCompany3 = localStorage.getItem("userCompany") || ""
const userCompany2 = (userLevel3 ? CryptoJS.AES.decrypt(userCompany3, "Tyrannosaurus") : "")
const userCompany: string = userCompany2.toString(CryptoJS.enc.Utf8);
console.log(userCompany)

const DashboardPage: FC = function () {
  return (
    <NavbarSidebarLayout>
      <div className="px-4 pt-6">
        <SalesThisWeek />
        <div className="my-6">
          <LatestTransactions />
        </div>
        <LatestCustomers />
        <div className="my-6">
          <AcquisitionOverview />
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const SalesThisWeek: FC = function () {
  // const currentDateTime = new Date();

  // const year = currentDateTime.getFullYear();
  // const month = currentDateTime.getMonth();
  // const formattedMonth = new Intl.DateTimeFormat('en', { month: 'short' }).format(currentDateTime);
  // const day = String(currentDateTime.getDate()).padStart(2, '0');

  // Get the last day of the current month
  // const lastDay = new Date(year, month + 1, 0);

  // Format the first and last day as "YYYY-MM-DD"
  // const formattedFirstDay = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
  // const formattedMidDay = `${year}-${(month + 1).toString().padStart(2, '0')}-15`;
  // const formattedLastDay = `${year}-${(month + 1).toString().padStart(2, '0')}-${lastDay.getDate()}`;
  // const formattedCurrentDay = `${year}-${(month + 1).toString().padStart(2, '0')}-${day}`;

  // const SecondPeriod = (currentDateTime.getDate() > 15 === true ? true : false)

  // interface BonusesData {
  //   sum: number;
  //   values: string[];
  // };

  // const [bonuses, setBonuses] = useState<BonusesData>({ sum:0, values: [] });

  // useEffect(() => {
  //   const start_date = (SecondPeriod === true ? formattedMidDay : formattedFirstDay);
  //   const end_date = formattedLastDay;

  //   const requestData = {
  //     start_date,
  //     end_date,
  //     created_user
  //   };

  //   axios.post('http://bn.glassmountainbpo.com:8080/api/dashboard/total_bonus', requestData)
  //   .then(res => setBonuses(res.data))
  // }, [formattedFirstDay, formattedLastDay])

  interface Bonus {
    amount: string;
    date: string;
  }

  interface BonusData {
    data: Bonus[];
    amounts: string[];
    dates: string[];
    currentAmount: number;
    ratio: number;
  }

  const [bonusData, setBonusData] = useState<BonusData | null>(null);

  useEffect(() => {
    const requestData = {
      created_user,
      userCompany,
      userLevel
    }
    axios.post('https://bn.glassmountainbpo.com:8080/api/dashboard/term', requestData)
      .then(res => setBonusData(res.data))
  }, [])

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="shrink-0">
          <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
            {/* {bonuses.sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} */}
            <CountUp
              start={0}
              end={bonusData !== null ? bonusData.currentAmount : 0}
              duration={1.5}
              separator=","
              decimals={2}
              decimal="."
              prefix="$"
            ></CountUp>
          </span>
          <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
            Bonuses this period {userCompany == "2" ? "- Surgepays" : userCompany == "3" ? "- All Accounts" : ""}
          </h3>
        </div>
        {bonusData !== null ?
          bonusData.ratio < 0 ?
            <div className="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
              {Math.abs(bonusData.ratio)}%
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            : bonusData.ratio == 0 ?
              <div className="flex flex-1 items-center justify-end text-base font-bold text-yellow-600 dark:text-yellow-400">
                0%
              </div>
              :
              <div className="flex flex-1 items-center justify-end text-base font-bold text-red-600 dark:text-red-400">
                {bonusData.ratio}%
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="-5 1 19 12"
                >
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v12m0 0 4-4m-4 4L1 9" />
                </svg>
              </div>
          : <p></p>}
      </div>
      <SalesChart
        bonusAmounts={bonusData !== null ? bonusData.amounts : null}
        bonusDates={bonusData !== null ? bonusData.dates : null}
      />
      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        {/* <Datepicker /> */}
        <div className="shrink-0">
          {/* <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-00 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            Bonuses Report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
};

const SalesChart: FC<any> = function ({ bonusAmounts, bonusDates }) {
  const { mode } = useTheme();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
  const opacityFrom = isDarkTheme ? 0 : 1;
  const opacityTo = isDarkTheme ? 0 : 1;

  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: "smooth",
    },
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom,
        opacityTo,
        type: "vertical",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
    grid: {
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    markers: {
      size: 5,
      strokeColors: "#ffffff",
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: bonusDates,
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: borderColor,
      },
      axisTicks: {
        color: borderColor,
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    legend: {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: [labelColor],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "Bonuses total",
      data: bonusAmounts,
      color: "#1A56DB",
    },
  ];

  return <Chart height={420} options={options} series={series} type="area" />;
};

// const Datepicker: FC = function () {
//   return (
//     <span className="text-sm text-gray-600">
//       <Dropdown inline label="Last 3 Months">
//         <Dropdown.Item>
//           <strong>Jun 01, 2023 - Sep 01, 2023</strong>
//         </Dropdown.Item>
//         <Dropdown.Divider />
//         <Dropdown.Item>Last Month</Dropdown.Item>
//         <Dropdown.Item>This Month</Dropdown.Item>
//         <Dropdown.Item>Last 3 Months</Dropdown.Item>
//         <Dropdown.Item>Last 6 Moths</Dropdown.Item>
//         <Dropdown.Item>This year</Dropdown.Item>
//         <Dropdown.Divider />
//         <Dropdown.Item>Custom...</Dropdown.Item>
//       </Dropdown>
//     </span>
//   );
// };

const LatestCustomers: FC = function () {
  interface NewHire {
    badge: string;
    first_name: string;
    hired_date: string;
    last_name: string;
    photo: string;
  }

  interface NewHireData {
    newHires: NewHire[];
  }

  const [newHires, setNewHires] = useState<NewHireData | null>(null);

  function formatDate(inputDate: string): string {
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    //@ts-ignore
    const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  function capitalize(str: any) {
    const lower = (str || '').toLowerCase()
    return (str || '').charAt(0).toUpperCase() + lower.slice(1)
  }

  useEffect(() => {
    const requestData = { userCompany }

    axios.post('https://bn.glassmountainbpo.com:8080/api/dashboard/new_hires', requestData)
      .then(res => setNewHires(res.data))
  }, [])

  return (
    <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          New Hires {userCompany == '2' ? "- Surgepays" : ""}
        </h3>
        {/* <a
          href="#"
          className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
        >
          View all
        </a> */}
      </div>
      <div className="flow-root">
        {newHires ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {newHires.newHires.map((newHire, index) => (
              <li key={index} className="py-3 sm:py-4">

                


                <div className="flex items-center space-x-4">
                <div
                  style={{
                    width: '45px',
                    height: '45px',
                    overflow: 'hidden',
                    borderRadius: '50%',
                  }}
                >
                  <img
                    src={`https://hr.glassmountainbpo.com/ap/employee/document/foto/${newHire.photo || 'user.png'}`}
                    alt="user"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                  {/* <div className="shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={`https://hr.glassmountainbpo.com/ap/employee/document/foto/${newHire.photo || 'user.png'}`}
                      alt=""
                    />
                  </div> */}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {newHire.badge} - {capitalize(newHire.first_name)} {capitalize(newHire.last_name)}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      Hired date: {formatDate(newHire.hired_date)}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    $0
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        {/* <Datepicker /> */}
        <div className="shrink-0">
          {/* <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            New Hires Report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
};

const AcquisitionOverview: FC = function () {
  return (
    // <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
    //   <h3 className="mb-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
    //     Bonuses Overview
    //   </h3>
    //   <div className="flex flex-col">
    //     <div className="overflow-x-auto rounded-lg">
    //       <div className="inline-block min-w-full align-middle">
    //         <div className="overflow-hidden shadow sm:rounded-lg">
    //           <Table className="min-w-full table-fixed">
    //             <Table.Head>
    //               <Table.HeadCell className="whitespace-nowrap rounded-l border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
    //                 Bonus
    //               </Table.HeadCell>
    //               <Table.HeadCell className="whitespace-nowrap border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
    //                 Agents
    //               </Table.HeadCell>
    //               <Table.HeadCell className="min-w-[140px] whitespace-nowrap rounded-r border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
    //                 Bonus Acquisition
    //               </Table.HeadCell>
    //             </Table.Head>
    //             <Table.Body className="divide-y divide-gray-100 dark:divide-gray-700">
    //               <Table.Row className="text-gray-500 dark:text-gray-400">
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
    //                   Referral Bonus
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
    //                   132
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
    //                   <div className="flex items-center">
    //                     <span className="mr-2 text-xs font-medium">30%</span>
    //                     <div className="relative w-full">
    //                       <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
    //                         <div
    //                           className="h-2 rounded-sm bg-primary-700"
    //                           style={{ width: "30%" }}
    //                         />
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </Table.Cell>
    //               </Table.Row>
    //               <Table.Row className="text-gray-500 dark:text-gray-400">
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
    //                   Weekend Bonus
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
    //                   40
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
    //                   <div className="flex items-center">
    //                     <span className="mr-2 text-xs font-medium">74%</span>
    //                     <div className="relative w-full">
    //                       <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
    //                         <div
    //                           className="h-2 rounded-sm bg-orange-300"
    //                           style={{ width: "74%" }}
    //                         />
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </Table.Cell>
    //               </Table.Row>
    //               <Table.Row className="text-gray-500 dark:text-gray-400">
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
    //                   Performance Bonus
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
    //                   538
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
    //                   <div className="flex items-center">
    //                     <span className="mr-2 text-xs font-medium">68%</span>
    //                     <div className="relative w-full">
    //                       <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
    //                         <div
    //                           className="h-2 rounded-sm bg-teal-400"
    //                           style={{ width: "68%" }}
    //                         />
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </Table.Cell>
    //               </Table.Row>
    //               <Table.Row className="text-gray-500 dark:text-gray-400">
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
    //                   Attendance Bonus
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
    //                   872
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
    //                   <div className="flex items-center">
    //                     <span className="mr-2 text-xs font-medium">82%</span>
    //                     <div className="relative w-full">
    //                       <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
    //                         <div
    //                           className="h-2 rounded-sm bg-pink-600"
    //                           style={{ width: "82%" }}
    //                         />
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </Table.Cell>
    //               </Table.Row>
    //               <Table.Row className="text-gray-500 dark:text-gray-400">
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
    //                   New Hire Bonus
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
    //                   73
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
    //                   <div className="flex items-center">
    //                     <span className="mr-2 text-xs font-medium">39%</span>
    //                     <div className="relative w-full">
    //                       <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
    //                         <div
    //                           className="h-2 rounded-sm bg-indigo-600"
    //                           style={{ width: "39%" }}
    //                         />
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </Table.Cell>
    //               </Table.Row>
    //               <Table.Row className="text-gray-500 dark:text-gray-400">
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
    //                   Other
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
    //                   11
    //                 </Table.Cell>
    //                 <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
    //                   <div className="flex items-center">
    //                     <span className="mr-2 text-xs font-medium">100%</span>
    //                     <div className="relative w-full">
    //                       <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
    //                         <div
    //                           className="h-2 rounded-sm bg-purple-500"
    //                           style={{ width: "100%" }}
    //                         />
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </Table.Cell>
    //               </Table.Row>
    //             </Table.Body>
    //           </Table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
    //     {/* <Datepicker /> */}
    //     <div className="shrink-0">
    //       <a
    //         href="#"
    //         className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
    //       >
    //         Bonus Acquisition Report
    //         <svg
    //           className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M9 5l7 7-7 7"
    //           />
    //         </svg>
    //       </a>
    //     </div>
    //   </div>
    // </div>
    <div></div>
  );
};

const LatestTransactions: FC = function () {
  function getCurrentFormattedDate(): string {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    //@ts-ignore
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);
    return formattedDate;
  }

  function capitalizeWords(input: string) {
    const words = input.split(' ');

    const capitalizedWords = words.map((word) => {
      if (word.length > 0) {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1).toLowerCase();
        return firstLetter + restOfWord;
      } else {
        return word;
      }
    });

    const resultString = capitalizedWords.join(' ');
    return resultString;
  }

  interface Bonus {
    Amount: string;
    Date: string;
    Department: string;
    ID: string;
    Name: string;
    Status: string;
    State: string;
    Sup_name: string;
  }

  interface latestBonuses {
    latestBonuses: Bonus[];
  }

  const [latestBonuses, setLatestBonuses] = useState<latestBonuses | null>(null);

  useEffect(() => {
    const requestData = { created_user, userCompany, userLevel }

    axios.post('https://bn.glassmountainbpo.com:8080/api/dashboard/latestBonuses', requestData)
      .then(res => setLatestBonuses(res.data))
  }, [])


  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Latest Bonuses Transactions
          </h3>
          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            {getCurrentFormattedDate()}
          </span>
        </div>
        <div className="shrink-0">
          {/* <a
            href="#"
            className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
          >
            View all
          </a> */}
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              {created_user === 'admin' ?
                <Table
                  striped
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
                >
                  <Table.Head className="bg-gray-50 dark:bg-gray-700">
                    <Table.HeadCell>Detail</Table.HeadCell>
                    <Table.HeadCell>Department</Table.HeadCell>
                    <Table.HeadCell>State</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Amount</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                  </Table.Head>
                  {latestBonuses ? (
                    <Table.Body className="bg-white dark:bg-gray-800">
                      {latestBonuses.latestBonuses.map((Bonus, index) => (
                        <Table.Row>
                          <Table.Cell id={index + "table"} className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                            {Bonus.Name}: {" "} <br></br>
                            <span className="font-normal text-gray-400">{Bonus.ID}</span>
                            <br></br>
                            Applied by
                            <span className="font-normal text-gray-400">{" " + Bonus.Sup_name}</span>

                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                            <span className=" pr-2 pl-2 rounded-lg bg-indigo-100  text-sm-12 font-semibold  dark:text-white dark:bg-indigo-900  md-2">
                              {Bonus.Department}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                            {
                              Bonus.State === "DRAFT" ?
                                <span className=" pr-2 pl-2 rounded-lg bg-indigo-100  text-sm-12 font-semibold  dark:text-white dark:bg-yellow-400  md-2">
                                  {Bonus.State}
                                </span> :
                                Bonus.State === "REVW" ?
                                  <span className=" pr-2 pl-2 rounded-lg bg-indigo-100  text-sm-12 font-semibold  dark:text-white dark:bg-blue-600  md-2">
                                    {Bonus.State}
                                  </span> :
                                  Bonus.State === "DONE" ?
                                    <span className=" pr-2 pl-2 rounded-lg bg-indigo-100  text-sm-12 font-semibold  dark:text-white dark:bg-green-500  md-2">
                                      {Bonus.State}
                                    </span> :
                                    <span className=" pr-2 pl-2 rounded-lg bg-indigo-100  text-sm-12 font-semibold  dark:text-white dark:bg-indigo-900  md-2">
                                      {Bonus.State}
                                    </span>
                            }
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                            {Bonus.Date}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                            {Bonus.Amount}
                          </Table.Cell>
                          <Table.Cell className="flex whitespace-nowrap p-4">
                            <Badge color={Bonus.Status === "1" ? 'success' : 'failure'}>{Bonus.Status === "1" ? "ACTIVE" : "DESACTIVED"}</Badge>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  ) : (
                    <p></p>
                  )}
                </Table>
                :
                <Table
                  striped
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
                >
                  <Table.Head className="bg-gray-50 dark:bg-gray-700">
                    <Table.HeadCell>Detail</Table.HeadCell>
                    <Table.HeadCell>Department</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Amount</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                  </Table.Head>
                  {latestBonuses ? (
                    <Table.Body className="bg-white dark:bg-gray-800">
                      {latestBonuses.latestBonuses.map((Bonus, index) => (
                        <Table.Row>
                          <Table.Cell id={index + "table"} className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                            {Bonus.ID} for{" "}
                            <span className="font-semibold">{capitalizeWords(Bonus.Name)}</span>

                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                            <span className=" pr-2 pl-2 rounded-lg bg-indigo-100  text-sm-12 font-semibold  dark:text-white dark:bg-indigo-900  md-2">
                              {Bonus.Department}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                            {Bonus.Date}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                            ${Bonus.Amount}
                          </Table.Cell>
                          <Table.Cell className="flex whitespace-nowrap p-4">
                            <Badge color={Bonus.Status === "1" ? 'success' : 'failure'}>{Bonus.Status === "1" ? "Completed" : "Pending"}</Badge>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  ) : (
                    <span>No data</span>
                  )}
                </Table>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 sm:pt-6">
        {/* <Datepicker /> */}
        <div className="shrink-0">
          {/* <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            Transactions Report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
