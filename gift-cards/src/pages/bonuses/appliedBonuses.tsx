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
} from "flowbite-react";

import type { FC } from "react";
import { useEffect, useState, SetStateAction, useRef } from "react"
import CryptoJS from "crypto-js";
import { FiletypeXlsx } from 'react-bootstrap-icons';
import {

    HiHome,
    HiOutlineExclamationCircle,
    HiCheckCircle,
    HiOutlinePlusCircle,
    HiOutlineEye,
    HiRefresh,
    HiOutlineMinusCircle,
    HiDocumentDownload,
    HiPencilAlt

} from "react-icons/hi";
import { FaUserCheck, FaUserSlash } from "react-icons/fa"

import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

import axios from "axios";
import * as XLSX from 'xlsx';



const CatalogBonuses: FC = function () {

    const user3 = localStorage.getItem("badgeSession") || ""
    const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
    const createdUser = user2.toString(CryptoJS.enc.Utf8);
    const [data, setData] = useState([] as any[])

    let [filteredResults, setFilteredResults] = useState([] as any[]);
    let [dataTemp, setDataTemp] = useState([] as any[]);

    let checkboxRef = useRef<HTMLInputElement>(null);
    const [checkBoxes, setCheckBoxes] = useState(false);
    const checkboxArray: string[] = [];

    const [sharedState, setSharedState] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchInput(e.target.value);
    };


    const userLevel3 = localStorage.getItem("userLevel") || ""
    const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
    const userLevel: string = userLevel2.toString(CryptoJS.enc.Utf8);
    console.log(userLevel)

    const userCompany3 = localStorage.getItem("userCompany") || ""
    const userCompany2 = (userLevel3 ? CryptoJS.AES.decrypt(userCompany3, "Tyrannosaurus") : "")
    const userCompany: string = userCompany2.toString(CryptoJS.enc.Utf8);
    console.log(userCompany)




    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    const updateSharedState = (newValue: boolean) => {
        resetCheckboxes();
        setSharedState(newValue);
    }


    useEffect(() => {
        if (searchInput !== '') {
            const foo = data;
            let filteredRawData = foo.filter((user) => {
                return Object.values(user).join('').toLowerCase().includes(searchInput.toLowerCase());
            })

            setFilteredResults(filteredRawData);

        } else {
            let foo = data;

            setDataTemp(foo);
        }
    }, [searchInput, dataTemp, data]);


    useEffect(() => {
        if (userLevel === '3' && userCompany === '3') {

            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header_admin/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });
            //listado de administradores con privilegios de subir data
        } else if ((userLevel === '3') && userCompany === '1') {

            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header_admin_sop/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });


        } else if ((userLevel === '3' && userCompany === '2') || (userLevel === '1' && userCompany === '2')) {
            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header_admin_surge/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });



        } else if (userLevel === '2' && userCompany === '2') {
            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header_admin_surge/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });


        } else if (userLevel === '2' && userCompany === '1') {

            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });

        } else if (userLevel === '1' && userCompany === '1') {

            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header_supervisores/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });


            //Esto es para el caso de los bonus para QA
        } else if (userLevel === '5' && userCompany === '1') {

            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header_supervisores_qa/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });

        } else if (userLevel === '6' && userCompany === '1') {

            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_all_header_supervisores_training/', {
                created_user: createdUser
            })
                .then(res => setData(res.data))

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });

        }
    }, [sharedState]);



    // Function to handle "Select All" button click
    const handleSelectAll = () => {
        console.log(data)
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
        const checkbox = document.getElementById('checkbox-' + { badge }) as HTMLInputElement;
        if (checkbox.checked) {
            checkboxArray.push(badge);
            console.log(checkBoxes)
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

    const GoItHeader: FC<{
        nameBonus: any;
        idBonus: any;
        statusBonus: any;

    }> = ({ nameBonus }) => {



        const targetDate = new Date(); // Clonar la fecha actual
        targetDate.setDate(15); // Establecer el día en 15

        const bonus_type = nameBonus;

        // const badge = localStorage.getItem("badgeSession") || undefined;

        const user3 = localStorage.getItem("badgeSession") || ""
        const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
        const badge = user2.toString(CryptoJS.enc.Utf8);


        const userLevel3 = localStorage.getItem("userLevel") || ""
        const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
        const userLevel: string = userLevel2.toString(CryptoJS.enc.Utf8);
        console.log(userLevel)

        const userCompany3 = localStorage.getItem("userCompany") || ""
        const userCompany2 = (userLevel3 ? CryptoJS.AES.decrypt(userCompany3, "Tyrannosaurus") : "")
        const userCompany: string = userCompany2.toString(CryptoJS.enc.Utf8);
        console.log(userCompany)



        // const userName = localStorage.getItem("badgeSession") || undefined;
       // const url = `https://bn.glassmountainbpo.com:8080/api/hired/`;

        const [result, setResult] = useState<any>([]); //JSON Axios Data
        const [badge_, setBadge] = useState<any>([badge]); //Badge

        useEffect(() => {
            axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/status/')
                .then((res) => {
                    console.log(res.data);
                    console.log(result);
                    console.log(badge_ + setBadge + setResult)

                })
                .catch((error) => {
                    console.error('Error al obtener datos de bonus:', error);
                });

        }, []);

        // const handleTrack = () => {
        //     if (badge_.length !== 0) {
        //         axios.get(url + badge)
        //             .then((response) => {
        //                 setResult(response.data)
        //             });
        //         setBadge
        //     } [];
        // };
        // handleTrack();

        return (
            <>
                <Button className="bg-green-600 dark:bg-green-500  m-2 dark:hover:bg-green-700" href={`/bonuses/bonusHeader?bonus_type=${bonus_type}`}  >
                    <HiPencilAlt className="text-lg" />
                </Button>
            </>
        );
    };

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
                            <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
                                <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4 pt-4">Applied bonuses
                                </h1>
                                <div className="mb-4">
                                    <span className="text-base font-normal text-gray-600 dark:text-gray-400 mb-4">
                                        The list of applied bonuses corresponds to the current month
                                    </span>
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


                                    {(userLevel === '3' && userCompany === '3') || (userLevel === '3' && userCompany === '1') ?

                                        <>
                                            <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 ">
                                                <a
                                                    href=""
                                                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white pt-2"
                                                >
                                                    <span className="sr-only">Refresh</span>
                                                    <HiRefresh className="text-2xl " />
                                                </a>


                                                <DeleteUsersModal
                                                    users={checkboxArray}
                                                    created_user={createdUser}
                                                    sharedState={sharedState}
                                                    updateSharedState={updateSharedState} />
                                                <ActivateUsersModal
                                                    users={checkboxArray}
                                                    created_user={createdUser}
                                                    sharedState={sharedState}
                                                    updateSharedState={updateSharedState} />
                                            </div>
                                            <div className="pl-4 pt-2 flex items-left justify-between">
                                                <ExportModal data={data} />
                                                {/* Otro contenido o elementos */}
                                            </div>


                                        </>
                                        : ""

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
                                            (searchInput.length > 1 ? filteredResults : (dataTemp.length === 0 ? data : (data))).map((bonus, index) => {
                                                return <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <Table.Cell className="w-4 p-4">
                                                        {/* <Checkbox />
                                                        
                                                        */}

                                                        <Checkbox id={"checkbox-" + bonus.id_bonus} value={bonus.id_bonus} name="usersCheckbox" onChange={() => updateCheckboxArray(bonus.id_bonus)} />

                                                        <label htmlFor={"checkbox-" + bonus.id_bonus} className="sr-only">
                                                        </label>

                                                    </Table.Cell>
                                                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                        <div className="text-base font-semibold text-blue-900 dark:text-white mb-2">
                                                            {/* {`${bonus.bonus_name} `} */}
                                                            <span className="mr-2 rounded-lg bg-blue-100 py-0.5 px-2.5  text-gray-800 dark:bg-purple-200 text-sm font-bold pd-4"> {bonus.name}</span>
                                                        </div>
                                                        <div className="text-xs font-normal text-gray-800 dark:text-gray-400">
                                                            {bonus.id_bonus}
                                                        </div>
                                                        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">created by  {bonus.created_user}</p>
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                                        <Badge color={'gray'}>{bonus.categoria}</Badge>
                                                    </Table.Cell>
                                                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                                        ${bonus.value}
                                                    </Table.Cell>
                                                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                                        {bonus.count >= 1 ? <span className="mr-2 rounded-lg bg-blue-100 py-0.5 px-2.5  text-gray-800 dark:bg-purple-200 text-sm font-bold pd-4"> {bonus.count}</span> : bonus.count}
                                                    </Table.Cell>
                                                    <Table.Cell className=" whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">

                                                        {
                                                            userLevel === '3' && userCompany === '3' ? (
                                                                <>{bonus.categoria === "SURGEPAYS" && bonus.appr_surge === "DONE" ? (
                                                                    <Badge color={"info"} className="mt-2">SurgePays: {bonus.appr_surge}</Badge>
                                                                ) : (
                                                                    bonus.categoria === "SURGEPAYS" && bonus.appr_surge !== "DONE" ? (
                                                                        <Badge className="mt-2">SurgePays: PENDING</Badge>
                                                                    ) : null
                                                                )}

                                                                    <br />

                                                                    {bonus.appr_arita === "DONE" ? (
                                                                        <Badge className="mt-2"> Melvin: {bonus.appr_arita} </Badge>
                                                                    ) : (
                                                                        <Badge> Melvin: PENDING</Badge>
                                                                    )}

                                                                    {bonus.appr_anne === "DONE" ? (
                                                                        <Badge className="mt-2">Anne: {bonus.appr_anne} </Badge>
                                                                    ) : (
                                                                        <Badge className="mt-2"> Anne: PENDING</Badge>
                                                                    )}
                                                                    <br />
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
                                                                </>
                                                            ) : userLevel === '3' && userCompany === '1' ? (
                                                                <>
                                                                    {bonus.appr_arita === "DONE" ? (
                                                                        <Badge className="mt-2"> Melvin: {bonus.appr_arita} </Badge>
                                                                    ) : (
                                                                        <Badge> Melvin: PENDING</Badge>
                                                                    )}

                                                                    {bonus.appr_anne === "DONE" ? (
                                                                        <Badge className="mt-2">Anne: {bonus.appr_anne} </Badge>
                                                                    ) : (
                                                                        <Badge className="mt-2"> Anne: PENDING</Badge>
                                                                    )}
                                                                    <br />
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
                                                                </>
                                                            ) : ((userLevel === '3' && userCompany === '2') || (userLevel === '2' && userCompany === '2')) ? (
                                                                <>
                                                                    {bonus.appr_surge === "DONE" ? (
                                                                        <Badge className="mt-2"> SurgePay: {bonus.appr_surge} </Badge>
                                                                    ) : (
                                                                        <Badge> SurgePays: PENDING</Badge>
                                                                    )}

                                                                    {bonus.appr_anne === "DONE" ? (
                                                                        <Badge className="mt-2">Anne: {bonus.appr_anne} </Badge>
                                                                    ) : (
                                                                        <Badge className="mt-2"> Anne: PENDING</Badge>
                                                                    )}
                                                                    <br />
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
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {bonus.appr_arita === "DONE" ? (
                                                                        <Badge className="mt-2"> Melvin: {bonus.appr_arita} </Badge>
                                                                    ) : (
                                                                        <Badge> Melvin: PENDING</Badge>
                                                                    )}

                                                                    {bonus.appr_anne === "DONE" ? (
                                                                        <Badge className="mt-2">Anne: {bonus.appr_anne} </Badge>
                                                                    ) : (
                                                                        <Badge className="mt-2"> Anne: PENDING</Badge>
                                                                    )}
                                                                    <br />
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
                                                                </>
                                                            )
                                                        }




                                                        {/* {  
                                                            <>
                                                                {bonus.appr_arita == "DONE" ? <Badge className="mt-2"> Melvin:   {bonus.appr_arita} </Badge>
                                                                    : <Badge>Melvin: PENDING</Badge>}

                                                                {bonus.appr_anne == "DONE" ? <Badge className="mt-2">Anne:  {bonus.appr_anne} </Badge> : <Badge className="mt-2"> Anne: PENDING</Badge>}
                                                                <br></br>
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
                                                            </>
                                                        } */}

                                                    </Table.Cell>
                                                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400"> {bonus.date_created}</p>
                                                    </Table.Cell>

                                                    <Table.Cell className=" whitespace-nowrap p-4">
                                                        {bonus.active == '1' ? (
                                                            <Badge color="success">Active</Badge>
                                                        ) : (
                                                            <Badge color="failure">Inactive</Badge>
                                                        )}
                                                    </Table.Cell>

                                                    {/* Restricciones para finanzas  */}


                                                    {(userLevel === '3' && userCompany === '3') || (userLevel === '3' && userCompany === '1') || (userLevel === '2' && userCompany === '1') || (userLevel === '3' && userCompany === '2') || (userLevel === '5' && userCompany === '1')  || (userLevel === '6' && userCompany === '1') ?

                                                        <Table.Cell className="whitespace-nowrap p-2 text-base font-medium text-gray-900 dark:text-white">
                                                            <div className="flex items-center gap-x-1 text-xs" style={{ zoom: '90%' }}>
                                                                <Button
                                                                    className=" bg-indigo-600 inline-flex items-center justify-center rounded-lg  py-1 px-1 text-sm font-sm text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-indigo-500  dark:hover:bg-indigo-700 dark:focus:ring-green-300"
                                                                    href={`/bonuses/bonusDetails?&badge=${createdUser}&type_bonus=${bonus.id_bonus}&bill_to=${bonus.bonus_name}`}                  >
                                                                    <HiOutlineEye className="text-lg" />
                                                                </Button>

                                                                < GoItHeader nameBonus={bonus.id_bonus}
                                                                    idBonus={bonus.bonus_name}
                                                                    statusBonus={bonus.id_status}
                                                                />
                                                                <DeleteProductModal bonusActive={bonus.active} idBonus={bonus.id_bonus} createdUser={createdUser} statusBonus={bonus.status} />

                                                            </div>
                                                        </Table.Cell> :

                                                        <Table.Cell className="whitespace-nowrap p-2 text-base font-medium text-gray-900 dark:text-white">
                                                            <div className="flex items-center gap-x-1 text-xs" style={{ zoom: '90%' }}>
                                                                <Button
                                                                    className=" bg-indigo-600 inline-flex items-center justify-center rounded-lg  py-1 px-1 text-sm font-sm text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-indigo-500  dark:hover:bg-indigo-700 dark:focus:ring-green-300"
                                                                    href={`/bonuses/bonusDetails?&badge=${createdUser}&type_bonus=${bonus.id_bonus}&bill_to=${bonus.bonus_name}`}                  >
                                                                    <HiOutlineEye className="text-lg" />
                                                                </Button>



                                                            </div>
                                                        </Table.Cell>

                                                    }



                                                </Table.Row>
                                            })
                                        }
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Pagination /> */}
        </NavbarSidebarLayout>
    );

};


const DeleteProductModal: FC<{ bonusActive: any; idBonus: any; createdUser: any; statusBonus: any }> = function ({ bonusActive, idBonus, createdUser, statusBonus }) {

    const [isOpen, setOpen] = useState(false);

    const handleButtonClick = () => {
        // Supongamos que tienes acceso a los valores necesarios para completar los parámetros


        const id_header = idBonus;
        const status = bonusActive; // bonusActive determina el valor de "status"
        const created_user = createdUser;
        // Realiza la solicitud HTTP a la API
        axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_active/', {
            id_header,
            status,
            created_user
        })
            .then(response => {
                // Maneja la respuesta de la API si es necesario
                window.location.reload();
                console.log(response.data);
            })
            .catch(error => {
                // Maneja los errores de la solicitud si es necesario
                console.error(error);
            });


    };

    return (
        <>
            <Button
                color={bonusActive === 1 ? "dark" : "gray"}
                onClick={() => {
                    setOpen(!isOpen);
                }}
                disabled={statusBonus === 'DONE'}
            >
                {statusBonus != 'DONE' ? (
                    <HiOutlineMinusCircle className="text-lg" />
                ) : bonusActive === 1 ? (
                    <HiOutlineMinusCircle className="text-lg" />
                ) : (
                    <HiOutlinePlusCircle className="text-lg" />
                )}
            </Button>

            {/* <Button color="failure" onClick={() => setOpen(!isOpen)}> */}

            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <Modal.Header className="px-3 pt-3 pb-0">
                    <span className="sr-only">Delete product</span>
                </Modal.Header>
                <Modal.Body className="px-6 pb-6 pt-0">
                    <div className="flex flex-col items-center gap-y-6 text-center">
                        {bonusActive == 1 ? <HiOutlineExclamationCircle className="text-7xl text-red-600" /> : <HiCheckCircle className="text-7xl text-green-600" />}
                        {bonusActive == 1 ? <p className="text-lg text-gray-500 dark:text-gray-300">
                            Are you sure you want to inactive this bonus?
                        </p> : <p className="text-lg text-gray-500 dark:text-gray-300">
                            Are you sure you want to activate this bonus?
                        </p>}
                        <div className="flex items-center gap-x-3">
                            <Button color={bonusActive === 1 ? "failure" : "success"} onClick={() => { setOpen(!isOpen); handleButtonClick(); }}>
                                {/* <Button color="failure" onClick={() => { setOpen(!isOpen); handleButtonClick(); }}> */}
                                Yes, I'm sure
                                {/* <p>Estado del bono: {bonusActive ? "Activo" : "Inactivo"}</p>
                  <p>Id del bono: {idBonus} </p>  
                  <p>Id del user: {createdUser} </p>   */}
                            </Button>
                            <Button color="gray" onClick={() => setOpen(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};


const DeleteUsersModal: FC<any> = function ({ users, created_user, sharedState, updateSharedState }) {
    const [isOpen, setOpen] = useState(false);
    const dataToSend = users;

    const handleSubmit = async (e: React.FormEvent, dataToSend: string, created_user: any) => {
        e.preventDefault()


        try {
            const response = await axios.post('https://bn.glassmountainbpo.com:8080/api/deactivateHeaders', {
                dataToSend,
                created_user
            })
            if (response.status == 200) {
                const responseData = response.data;
                updateSharedState(!sharedState);
                setOpen(false);


                if (responseData.message === "Headers successfully deactivated") {
                    setOpen(false);
                } else {
                    console.log('Bad Fail');

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
            <FaUserSlash className="text-2xl mt-2" onClick={() => setOpen(true)} />
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <Modal.Header className="px-6 pt-6 pb-0">
                    <span className="sr-only">Delete user(s)</span>
                </Modal.Header>
                <Modal.Body className="px-6 pt-0 pb-6">
                    <div className="flex flex-col items-center gap-y-6 text-center">
                        <FaUserSlash className="text-7xl text-red-500" />
                        <p className="text-xl text-gray-500">
                            Are you sure you want to desactivate {users.length} bonus?
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
            const response = await axios.post('https://bn.glassmountainbpo.com:8080/api/activateHeaders', {
                dataToSend,
                created_user
            })
            if (response.status == 200) {
                const responseData = response.data;
                updateSharedState(!sharedState);
                setOpen(false);

                if (responseData.message === "Headers successfully activated") {
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
            <FaUserCheck className="text-2xl mt-2" onClick={() => setOpen(true)} />
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <Modal.Header className="px-6 pt-6 pb-0">
                    <span className="sr-only">Activate user(s)</span>
                </Modal.Header>
                <Modal.Body className="px-6 pt-0 pb-6">
                    <div className="flex flex-col items-center gap-y-6 text-center">
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

export default CatalogBonuses;
