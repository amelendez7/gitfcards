/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
    Button,
    Checkbox,
    Label,
    Modal,
    Table,
    TextInput,
    Badge,
    Select,
} from "flowbite-react";

import type { FC } from "react";
import { useEffect, useState, SetStateAction, useRef } from "react"
import CryptoJS from "crypto-js";
import { FiletypeXlsx } from 'react-bootstrap-icons';
import {

    HiHome,
    HiOutlineEye,
    HiRefresh,
    HiDocumentDuplicate,
    HiOutlineCalendar,
    HiOutlineDocumentSearch,
    HiDocumentDownload,

} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { FaUserCheck, FaUserSlash } from "react-icons/fa"

import axios from "axios";
import * as XLSX from 'xlsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const AllReports: FC<{}> = () => {



    return (
        <NavbarSidebarLayout isFooter={true}>

            <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex" >
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item href="/dashboard">
                                <div className="flex items-center gap-x-3">
                                    <HiHome className="text-xl" />
                                    <span className="dark:text-white">Home</span>
                                </div>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/bonuses/bonusCatalog">
                                Bonuses Catalog
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>All</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">

                        </h1>
                    </div>

                    <div className="block items-center sm:flex">
                        {/* <SearchForProducts /> */}
                        <div className="hidden space-x-1 border-l border-gray-100 pl-2 dark:border-gray-700 md:flex">
                        </div>
                        <div className="flex w-full items-center sm:justify-end">

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <ProductsTable />
                        </div>
                    </div>
                </div>
            </div>
        </NavbarSidebarLayout>
    );

};

const ProductsTable: FC<{}> = ({ }) => {

    const user3 = localStorage.getItem("badgeSession") || ""
    const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
    const createdUser = user2.toString(CryptoJS.enc.Utf8);
    const [data, setData] = useState([] as any[])


    const [dataAgent] = useState([] as any[]);
    const [numero, setNumero] = useState('');
    const [years, setYear] = useState('');
    let checkboxRef = useRef<HTMLInputElement>(null);
    const [checkBoxes, setCheckBoxes] = useState(false);
    const checkboxArray: string[] = [];
    const [sharedState, setSharedState] = useState(false);

    const userLevel3 = localStorage.getItem("userLevel") || ""
    const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
    const userLevel: string = userLevel2.toString(CryptoJS.enc.Utf8);
    console.log(userLevel)

    const userCompany3 = localStorage.getItem("userCompany") || ""
    const userCompany2 = (userLevel3 ? CryptoJS.AES.decrypt(userCompany3, "Tyrannosaurus") : "")
    const userCompany: string = userCompany2.toString(CryptoJS.enc.Utf8);
    console.log(userCompany)


    const handleSelectChange: any = (event: { target: { value: any; }; }) => {
        const selectedValue = event.target.value; // Obtiene el valor seleccionado en el <select>
        setNumero(selectedValue); // Actualiza el valor de 'numero' a 1 si el valor seleccionado es '1'
        setSearchInput(selectedValue)
    };

    const handleSelectChangeRangeYear: any = (event: { target: { value: any; }; }) => {
        const selectedValue = event.target.value; // Obtiene el valor seleccionado en el <select>
        setYear(selectedValue); // Actualiza el valor de 'numero' a 1 si el valor seleccionado es '1'
        setSearchInput(selectedValue)
    };

    //Armando la consulta
    const date = new Date();
    const year = date.getFullYear();

    const [searchInput, setSearchInput] = useState(numero);

    const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        if (numero != '') {
            setSearchInput(numero)
        } else {
            setSearchInput(e.target.value);
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }
        ;

    useEffect(() => {
        if ((userLevel === '3' && userCompany === '3') || (userLevel === '4' && userCompany === '3') || (userLevel === '3' && userCompany === '1')) {

            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header_admin_report/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))

        } else if ((userLevel === '5' || userLevel === '6') && userCompany === '1') {
            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header_/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))




        } else {

            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });;
        }
    }, [sharedState]);




    // Function to handle "Select All" button click
    const handleSelectAll = () => {

        checkboxRef.current!.checked ? setCheckBoxes(true) : setCheckBoxes(false)
    };

    useEffect(() => {
        const userCheckboxes = document.getElementsByName('usersCheckbox') as NodeListOf<HTMLInputElement>;

        for (let i = 0; i < userCheckboxes.length; i++) {
            const checkbox = userCheckboxes[i];
            if (checkbox) {
                checkbox.checked = checkBoxes;
            }
        }

        if (checkBoxes === false) {
            checkboxArray.splice(0);
        } else {
            for (let i = 0; i < userCheckboxes.length; i++) {
                const checkbox = userCheckboxes[i];
                if (checkbox) {
                    checkboxArray.push(checkbox.value);

                };
            };
        };
    }, [checkBoxes])

    const updateCheckboxArray = (badge: string) => {
        const checkbox = document.getElementById('checkbox-' + badge) as HTMLInputElement;
        if (checkbox.checked) {
            checkboxArray.push(badge);
        } else {
            const indexToRemove = checkboxArray.indexOf(badge);
            checkboxArray.splice(indexToRemove, 1);
        };
    };

    const resetCheckboxes = () => {
        setCheckBoxes(false);
        checkboxArray.splice(0);
        checkboxRef.current!.checked = false;
        const userCheckboxes = document.getElementsByName('usersCheckbox') as NodeListOf<HTMLInputElement>;

        for (let i = 0; i < userCheckboxes.length; i++) {
            const checkbox = userCheckboxes[i];
            if (checkbox) {
                checkbox.checked = false;
            };
        };
    };



    const updateSharedState = (newValue: boolean) => {
        resetCheckboxes();
        setSharedState(newValue);
    }



    //Obtenemos los datos
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: 5 }, (_, index) => currentYear - index);

    console.log(yearsArray);


    // const fromDate = '2023-10-02'; // Reemplaza con tu fecha "desde"
    // const toDate = '2023-10-03'; // Reemplaza con tu fecha "hasta"
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState(''); // Reemplaza con tu fecha "hasta"


    const handleSelectChangeRangeFrom: any = (event: { target: { value: any; }; }) => {
        const selectedValue = event.target.value; // Obtiene el valor seleccionado en el <select>
        setFromDate(selectedValue); // Actualiza el valor de 'numero' a 1 si el valor seleccionado es '1'
        setSearchInput(selectedValue)
    };
    const handleSelectChangeRangeTo: any = (event: { target: { value: any; }; }) => {
        const selectedValue = event.target.value; // Obtiene el valor seleccionado en el <select>
        setToDate(selectedValue); // Actualiza el valor de 'numero' a 1 si el valor seleccionado es '1'
        setSearchInput(selectedValue)
    };

    console.log('-->FROM : ' + years + fromDate)
    console.log('-->TO : ' + years + toDate)

    const _fromDate = years + fromDate;
    const _toDate = years + toDate;

    console.log('-->FROM___SET : ' + _fromDate)
    console.log('-->TO____SET : ' + _toDate)


    const ExportModal: FC<any> = function (rawData) {

        const [isOpen, setOpen] = useState(false);
        const data = rawData.data;

        // Function to convert an array to an XLS file
        const exportToXLS = () => {



            // Reordena las propiedades de cada objeto en data y las convierte a mayúsculas
            const reorderedData = data.map((item: { bonus_name: any; id_bonus: any; badge: any; categoria: any; value: any; count: any; created_user: any; date_created: any; status: any; name: any }) => ({
                ID_BONUS: item.id_bonus,
                BONUS_NAME: item.name,
                BADGE: item.badge,
                CATEGORIA: item.categoria,
                VALUE: item.value,
                COUNT: item.count,
                CREATED_USER: item.created_user,
                DATE_CREATED: item.date_created,
                STATUS: item.status,
            }));

            const ws = XLSX.utils.json_to_sheet(reorderedData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'bonusHeader.xlsx');
            setOpen(false);
        };
        return (
            <>
                <Button onClick={() => setOpen(true)} color="gray">
                    <div className="flex items-center gap-x-3">
                        <HiDocumentDownload className="text-xl" />
                        <span>Export</span>
                    </div>
                </Button>
                <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                    <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                        <strong>Export Bonus Summary</strong>
                    </Modal.Header>
                    <Modal.Body className="flex flex-col items-center gap-y-6 text-center">
                        <div className="flex items-center gap-x-3">
                            {/* <div>
                                <Button onClick={exportToCSV} color="light">
                                    <div className="flex items-center gap-x-3">
                                        <FiletypeCsv className="text-xl" />
                                        <span>Export CSV</span>
                                    </div>
                                </Button>
                            </div> */}
                            <div>
                                <Button onClick={exportToXLS} color="light">
                                    <div className="flex items-center gap-x-3">
                                        <FiletypeXlsx className="text-xl" />
                                        <span>Export XLSX</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }




    const ExportAllModal: FC<any> = function () {

        const [isOpen, setOpen] = useState(false);


        const [dataCuatro, setDataCuatro] = useState("");

        // const data = rawData.data;
        const data: any = dataCuatro;

        useEffect(() => {
            // Primera solicitud POST
            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_details_report/', {
                "": ""
            })
                .then((res) => {
                    setDataCuatro(res.data);
                    console.log(res.data);
                })
                .catch((error) => {
                    console.error('Error en la solicitud POST 1:', error);
                });

        }, [createdUser]);

        // Function to convert an array to an XLS file
        const exportAllToXLS = () => {
            // Reordena las propiedades de cada objeto en data y las convierte a mayúsculas
            const reorderedData = data
                .filter((item: { ok: string; }) => item.ok >= '1')
                .map((item: { bonus_type: any; name_bonus: any; badge_agent: any; name: any; value: any; billto: any; departament: any; badge_sup: any; id_user: any; ok: any; status: any; date_created: any; agent_name: any; }) => {
                    const formattedDate = new Date(item.date_created).toISOString().split('T')[0];
                    const cleanSup = item.name.replace(/\s+/g, ' ').trim();

                    return {
                        ID_BONUS: item.bonus_type,
                        BONUS_NAME: item.name_bonus,
                        AGENT_BADGE: item.badge_agent,
                        AGENT_NAME: item.agent_name,
                        CATEGORY: item.departament,
                        BILL_TO: item.billto,
                        VALUE: item.value,
                        OK: item.ok,
                        ACTIVE: item.status,
                        MANAGEMENT: item.badge_sup,
                        CREATED_USER: item.id_user,
                        DATE_CREATED: formattedDate,
                        CREATED_BY: cleanSup,
                    };
                });

            const ws = XLSX.utils.json_to_sheet(reorderedData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'ALL_REPORT.xlsx');
            setOpen(false);
        };

        return (
            <>
                <Button onClick={() => setOpen(true)} color="gray" className="ml-12">
                    <div className="flex items-center gap-x-3">
                        <HiDocumentDownload className="text-xl" />
                        <span>Export All</span>
                    </div>
                </Button>
                <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                    <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                        <strong>Export Bonus Summary</strong>
                    </Modal.Header>
                    <Modal.Body className="flex flex-col items-center gap-y-6 text-center">
                        <div className="flex items-center gap-x-3">
                            {/* <div>
                                <Button onClick={exportToCSV} color="light">
                                    <div className="flex items-center gap-x-3">
                                        <FiletypeCsv className="text-xl" />
                                        <span>Export CSV</span>
                                    </div>
                                </Button>
                            </div> */}
                            <div>
                                <Button onClick={exportAllToXLS} color="light">
                                    <div className="flex items-center gap-x-3">
                                        <FiletypeXlsx className="text-xl" />
                                        <span>Export XLSX</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

    const ExportModalAgent: FC<{ rawData: any; datas: any; typeBonus: any; billto: any; badge: any; }> = function ({ datas, typeBonus, billto, badge }) {
        const [isOpen, setOpen] = useState(false);
        // const data = datas;
        const [dataTres, setDataTres] = useState("");
        
        const data: any = dataTres ;

        const type_bonus = typeBonus;
        const bill_to = billto;
        const badge_ = badge;



        useEffect(() => {

            if ((userLevel === '3' && userCompany === '3')) {
                axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_details_admin/', {
                    type_bonus,
                    bill_to
                })
                    .then((res) => {
                        setDataTres(res.data);
                        console.log(res.data)
                        console.log(type_bonus)
                        console.log(bill_to)
                        console.log(datas)
                    })

                    .catch((error) => {
                        console.error('Error en la solicitud POST:', error);
                    });

            } else if (userLevel === '3' && userCompany === '1') {

                axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header_admin_sop/', {
                    created_user: createdUser
                })
                    .then(res => setData(res.data))

                    .catch((error) => {
                        console.error('Error en la solicitud POST:', error);
                    });


            } else {
                axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_details_sup/', {
                    type_bonus,
                    bill_to,
                    badge_
                })
                    .then((res) => {
                        setDataTres(res.data);
                        console.log(res.data)
                        console.log(type_bonus)
                        console.log(bill_to)
                        console.log(badge_)
                    })

                    .catch((error) => {
                        console.error('Error en la solicitud POST:', error);
                    });;
            }
        }, [createdUser]);



        // Function to convert an array to an XLS file
        const exportToXLS = () => {


            // Filtra los elementos que tienen 'ok' igual a 1
            const filteredData = data
                .filter((item: { ok: string; }) => item.ok >= '1')
                .map((item: { bonus_type: any; badge_agent: any; agent_name: any; value: any; billto: any; ok: any; departament: any; date_created: any; badge_sup: any; id_user: any; }) => ({
                    BONUS_TYPE: item.bonus_type, // Cambia el nombre de la cabecera a mayúsculas
                    BADGE_AGENT: item.badge_agent,
                    AGENT_NAME: item.agent_name,
                    VALUE: item.value,
                    BILLTO: item.billto,
                    OK: item.ok,
                    DEPARTAMENT: item.departament, // Cambia el nombre de la cabecera a mayúsculas
                    DATE_CREATED: item.date_created,
                    BADGE_SUP: item.badge_sup,
                    ID_USER: item.id_user,
                }));

            console.log(filteredData);

            const ws = XLSX.utils.json_to_sheet(filteredData);
            const wb = XLSX.utils.book_new();
            const nombre_doc = typeBonus;
            //     const nameSingle = nombre_doc.slice(0, -6);

            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, nombre_doc + '.xlsx');
            setOpen(false);
        };

        return (
            <>
                <Button onClick={() => setOpen(true)} color="gray">
                    <div className="flex items-center gap-x-3">
                        <HiDocumentDownload className="text-xl" />
                        <span>Export</span>
                    </div>
                </Button>
                <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                    <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                        <strong>Export Agents</strong>
                    </Modal.Header>
                    <Modal.Body className="flex flex-col items-center gap-y-6 text-center">
                        <div className="flex items-center gap-x-3">
                            {/* <div>
                            <Button onClick={exportToCSV} color="light">
                                <div className="flex items-center gap-x-3">
                                    <FiletypeCsv className="text-xl" />
                                    <span>Export CSV</span>
                                </div>
                            </Button>
                        </div> */}
                            <div>
                                <Button onClick={exportToXLS} color="light">
                                    <div className="flex items-center gap-x-3">
                                        <FiletypeXlsx className="text-xl" />
                                        <span>Export XLSX</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>

                </Modal>
            </>
        )



    }

    return (
        <div className="rounded-lg bg-white  shadow dark:bg-gray-800 sm:p-6 xl:p-8">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-6 pt-2">All Reports
            </h1>
            <div>
                <Tabs>
                    <div className="border-b border-gray-200 dark:border-gray-700" onChange={handleSelectChange}>
                        <TabList className="flex text-base font-normal text-gray-600 dark:text-gray-400 ">
                            <Tab>
                                <a href="" className="inline-flex items-center px-4 py-2 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                    <HiDocumentDuplicate className="mr-1" />All
                                </a>
                            </Tab>
                            <Tab>
                                <a href="#" className="inline-flex items-center px-4 py-2 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 " aria-current="page">

                                    <HiOutlineCalendar className="mr-1" /> Month
                                </a>
                            </Tab>
                            <Tab>
                                <a href="#" className="inline-flex items-center px-4 py-2 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                    <HiOutlineDocumentSearch className="mr-1" />
                                    Range
                                </a>
                            </Tab>
                        </TabList>
                    </div>
                    <TabPanel className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400 ">
                        <h1 className="mt-4 ">The list of applied bonuses corresponds to the current month </h1>
                    </TabPanel>
                    <TabPanel className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400  ">

                        <h1 className="mt-4 ">Select the month for which you want to generate the report. </h1>
                        <div onChange={handleSelectChange} className="grid grid-cols-1 gap-8 lg:grid-cols-6">
                            <Select id="numero" className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">
                                <option value='' className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">Selected</option>
                                <option value={`${year}-01`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">January</option>
                                <option value={`${year}-02`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">February</option>
                                <option value={`${year}-03`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">March</option>
                                <option value={`${year}-04`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">April</option>
                                <option value={`${year}-05`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">May</option>
                                <option value={`${year}-06`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">June</option>
                                <option value={`${year}-07`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">July</option>
                                <option value={`${year}-08`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">August</option>
                                <option value={`${year}-09`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">September</option>
                                <option value={`${year}-10`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">October</option>
                                <option value={`${year}-11`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">November</option>
                                <option value={`${year}-12`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">December</option>
                            </Select>

                        </div>
                    </TabPanel>
                    <TabPanel className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400  ">

                        <h1 className="mt-4 ">Select the date range you want to search for.</h1>
                        <div className="grid grid-cols-1  lg:grid-cols-6 mt-4">

                            <div onChange={handleSelectChangeRangeFrom} className="">
                                <Label>From</Label>
                                <Select className="mt-1 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">
                                    <option value='' className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">Selected</option>
                                    <option value={`-01`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">January</option>
                                    <option value={`-02`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">February</option>
                                    <option value={`-03`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">March</option>
                                    <option value={`-04`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">April</option>
                                    <option value={`-05`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">May</option>
                                    <option value={`-06`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">June</option>
                                    <option value={`-07`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">July</option>
                                    <option value={`-08`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">August</option>
                                    <option value={`-09`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">September</option>
                                    <option value={`-10`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">October</option>
                                    <option value={`-11`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">November</option>
                                    <option value={`-12`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">December</option>
                                </Select>
                            </div>
                            <div onChange={handleSelectChangeRangeTo} className="ml-4">
                                <Label>To</Label>
                                <Select className="mt-1 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">
                                    <option value='' className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">Selected</option>
                                    <option value={`-01`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">January</option>
                                    <option value={`-02`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">February</option>
                                    <option value={`-03`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">March</option>
                                    <option value={`-04`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">April</option>
                                    <option value={`-05`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">May</option>
                                    <option value={`-06`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">June</option>
                                    <option value={`-07`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">July</option>
                                    <option value={`-08`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">August</option>
                                    <option value={`-09`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">September</option>
                                    <option value={`-10`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">October</option>
                                    <option value={`-11`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">November</option>
                                    <option value={`-12`} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">December</option>
                                </Select>
                            </div>
                            <div onChange={handleSelectChangeRangeYear} className="ml-4">
                                <Label>Year</Label>
                                <Select className="mt-1 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">
                                    <option value='' className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">Selected</option>
                                    {yearsArray.map((year) => (
                                        <option key={year} value={year} className="mt-4 mb-4 text-base font-normal text-gray-600 dark:text-gray-400">
                                            {year}
                                        </option>

                                    ))}
                                </Select>

                            </div>
                        </div>

                    </TabPanel>
                    <div className="mt-6 border-b border-gray-200 dark:border-gray-700"></div>
                </Tabs>
            </div>
            <div className="mb-4">

            </div>
            <div className="mb-3 hidden items-center  sm:mb-0 sm:flex">
                <form className="lg:pr-3">
                    <Label htmlFor="users-search" className="sr-only">
                        Search
                    </Label>
                    <div className="relative mt-1 lg:w-64 xl:w-96">
                        <TextInput
                            id="users-search"
                            name="users-search"
                            placeholder="Search for users"
                            onChange={onChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </form>

                <div className="mt-3 flex mr-4 space-x-1 pl-0 sm:mt-0 sm:pl-2">
                    {/* <a
                        href=""
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white pt-2"
                    >
                        <span className="sr-only ml-4">Refresh</span>
                        <HiRefresh className="text-2xl mr-6" />
                    </a> */}

                    <a
                        href=""
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Refresh</span>
                        <HiRefresh className="text-2xl" />
                    </a>

                    {
                        ((userLevel === '3' && userCompany === '3') || (userLevel === '3' && userCompany === '1') || (userLevel === '3' && userCompany === '2') || (userLevel === '2' && userCompany === '1')) ?
                            <DeleteUsersModal
                                users={checkboxArray}
                                created_user={createdUser}
                                sharedState={sharedState}
                                updateSharedState={updateSharedState} />
                            : ""
                    }
                    {
                        ((userLevel === '3' && userCompany === '3') || (userLevel === '3' && userCompany === '1') || (userLevel === '3' && userCompany === '2') || (userLevel === '2' && userCompany === '1')) ?
                            <ActivateUsersModal
                                users={checkboxArray}
                                created_user={createdUser}
                                sharedState={sharedState}
                                updateSharedState={updateSharedState} />
                            : ""
                    }



                </div>

                {
                    ((userLevel === '3' && userCompany === '3') || (userLevel === '4' && userCompany === '3')) ? <div className="pt-2 flex items-right justify-between">
                        <ExportModal data={data} />
                        <ExportAllModal data={data} />
                        {/* Otro contenido o elementos */}
                    </div> : ""
                }

            </div>
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 mt-4">

                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                    <Table.HeadCell>
                        <span className="sr-only">Toggle selected</span>
                        {/* <Checkbox /> */}
                        <Checkbox id="select-all" name="select-all" ref={checkboxRef} onChange={handleSelectAll} />
                    </Table.HeadCell>
                    <Table.HeadCell>Bonus Name</Table.HeadCell>
                    <Table.HeadCell>BILLTO</Table.HeadCell>
                    <Table.HeadCell>Total rewards</Table.HeadCell>
                    <Table.HeadCell>Agent Count</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                    <Table.HeadCell>Active</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {
                        data
                            .filter((user) => !_fromDate || (user.date_created.slice(0, 7) >= _fromDate && user.date_created.slice(0, 7) <= _toDate))
                            .filter((user) => searchInput.length <= 1 || Object.values(user).join('').toLowerCase().includes(searchInput.toLowerCase()))
                            .map((bonus, index) => {

                                function getMonthName(date: any, asText: boolean = false) {
                                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                    const parts = date.split('-');
                                    const monthIndex = parseInt(parts[1]) - 1;

                                    if (asText) {
                                        return months[monthIndex];
                                    } else {
                                        return (monthIndex + 1).toString().padStart(2, '0');
                                    }
                                }

                                // Obtén la fecha de bonus.date_created
                                const bonusDate = bonus.date_created;

                                // Llama a la función getMonthName para obtener el nombre del mes en número
                                const monthNumber = getMonthName(bonusDate);

                                // Llama a la función getMonthName para obtener el nombre del mes en inglés
                                const monthName = getMonthName(bonusDate, true);

                                // Muestra el resultado
                                console.log("Month Number:", monthNumber); // "11"
                                console.log("Month Name:", monthName);
                                console.log('Rollback true : ' + numero)  // "November"



                                return <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Table.Cell className="w-4 p-4">
                                        {/* <Checkbox /> */}

                                        <Checkbox id={"checkbox-" + bonus.id_bonus} value={bonus.id_bonus} name="usersCheckbox" onChange={() => updateCheckboxArray(bonus.id_bonus)} />
                                        <label htmlFor={"checkbox-" + bonus.badge} />
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        <div className="text-base font-semibold text-gray-900 dark:text-white">
                                            {/* {`${bonus.bonus_name} `} */}
                                            {bonus.name}
                                        </div>
                                        <div className="text-xs font-normal text-gray-800 dark:text-gray-400">
                                            {bonus.id_bonus}
                                        </div>
                                        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">created by  {bonus.created_user}</p>
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                        <Badge color='gray'>{bonus.categoria}</Badge>
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                        ${bonus.value}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                        <span className="mr-2 rounded-lg bg-blue-100 py-0.5 px-2.5  text-gray-800 dark:bg-purple-200 text-sm font-bold pd-4"> {bonus.count}</span>

                                    </Table.Cell>
                                    <Table.Cell className=" whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">

                                        {bonus.status === "DRAFT" ? (
                                            <Badge color="failure">{bonus.status}</Badge>
                                        ) : bonus.status === "APPR" ? (
                                            <span className="mr-2 rounded-md bg-purple-100 py-0.5 px-2.5 text-xs font-medium text-purple-800 dark:bg-purple-200">
                                                {bonus.status}
                                            </span>
                                        ) : bonus.status === "DONE" ? (
                                            <Badge color="success">{bonus.status}</Badge>
                                        ) : bonus.status === "REVW" ? (
                                            <span className="mr-2 rounded-md bg-orange-400 py-0.5 px-2.5 text-xs font-medium text-orange-800 dark:bg-orange-300">
                                                {bonus.status}
                                            </span>
                                        ) : (
                                            <Badge color="success">Inactive</Badge>
                                        )}

                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">

                                        <Badge color='gray'> {monthName + " " + bonus.date_created}</Badge>

                                    </Table.Cell>
                                    <Table.Cell className=" whitespace-nowrap p-4">
                                        {bonus.active == '1' ? (
                                            <Badge color="success">Active</Badge>
                                        ) : (
                                            <Badge color="failure">Inactive</Badge>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap p-2 text-base font-medium text-gray-900 dark:text-white">
                                        <div className="flex items-center gap-x-1 text-xs" style={{ zoom: '90%' }}>

                                            <Button
                                                className=" bg-indigo-600 inline-flex items-center justify-center rounded-lg  py-1 px-1 text-sm font-sm text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-indigo-500  dark:hover:bg-indigo-700 dark:focus:ring-green-300"
                                                href={`/bonuses/bonusDetails?&badge=${createdUser}&type_bonus=${bonus.id_bonus}&bill_to=${bonus.bonus_name}`}
                                            >
                                                <HiOutlineEye className="text-lg" />
                                            </Button>
                                            {bonus.status === "DONE" && createdUser === "2160" ? <ExportModalAgent typeBonus={bonus.id_bonus} billto={bonus.bonus_name} badge={createdUser}
                                                datas={dataAgent} rawData={undefined} /> : ""}
                                            {createdUser !== "2160" ? <ExportModalAgent typeBonus={bonus.id_bonus} billto={bonus.bonus_name} badge={createdUser}
                                                datas={dataAgent} rawData={undefined} /> : ""}



                                        </div>
                                    </Table.Cell>

                                </Table.Row>
                            })
                    }
                </Table.Body>
            </Table>
        </div>
    );
};

const DeleteUsersModal: FC<any> = function ({ users, created_user, sharedState, updateSharedState }) {
    const [isOpen, setOpen] = useState(false);
    const dataToSend = users;

    const handleSubmit = async (e: React.FormEvent, dataToSend: string, created_user: any) => {
        e.preventDefault()

        try {
            const response = await axios.post('https://bn.glassmountainbpo.com:8080/api/deactivateReports', {
                dataToSend,
                created_user
            })
            if (response.status == 200) {
                const responseData = response.data;
                updateSharedState(!sharedState);
                setOpen(false);

                if (responseData.message === "Reports successfully deactivated") {
                    setOpen(false);
                } else {
                    console.log('Bad Fail')
                }
            }
        } catch (error) {
            console.log(error);
            setOpen(false);
        }
    };

    return (
        <a
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
            <FaUserSlash className="text-2xl" onClick={() => setOpen(true)} />
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <Modal.Header className="px-6 pt-6 pb-0">
                    <span className="sr-only">Delete user(s)</span>
                </Modal.Header>
                <Modal.Body className="px-6 pt-0 pb-6">
                    <div className="flex flex-col items-center gap-y-6 text-center">
                        <FaUserSlash className="text-7xl text-red-500" />
                        <p className="text-xl text-gray-500">
                            Are you sure you want to deactivate {users.length} bonus?
                        </p>
                        <div className="flex items-center gap-x-3">
                            <Button color="failure" onClick={(e) => handleSubmit(e, dataToSend, created_user)}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setOpen(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </a>
    );
};

const ActivateUsersModal: FC<any> = function ({ users, created_user, sharedState, updateSharedState }) {
    const [isOpen, setOpen] = useState(false);
    const dataToSend = users;

    const handleSubmit = async (e: React.FormEvent, dataToSend: string, created_user: any) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://bn.glassmountainbpo.com:8080/api/activateReports', {
                dataToSend,
                created_user
            })
            if (response.status == 200) {
                const responseData = response.data;
                updateSharedState(!sharedState);
                setOpen(false);

                if (responseData.message === "Reports successfully actived") {
                    setOpen(false);
                } else {
                    console.log('Bad Fail')
                }
            }
        } catch (error) {
            console.log(error);
            setOpen(false);
        }
    };

    return (
        <a
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
            <FaUserCheck className="text-2xl" onClick={() => setOpen(true)} />
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <Modal.Header className="px-6 pt-6 pb-0">
                    <span className="sr-only">Activate user(s)</span>
                </Modal.Header>
                <Modal.Body className="px-6 pt-0 pb-6">
                    <div className="flex flex-col items-center  gap-y-6 text-center">
                        <FaUserCheck className="text-7xl text-green-500" />
                        <p className="text-xl text-gray-500">
                            Are you sure you want to activate {users.length} bonus?
                        </p>
                        <div className="flex items-center gap-x-3">
                            <Button color="success" onClick={(e) => handleSubmit(e, dataToSend, created_user)}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setOpen(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </a>
    );
};

export default AllReports;
