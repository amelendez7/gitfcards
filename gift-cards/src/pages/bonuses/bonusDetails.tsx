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
import axios from "axios";
import CryptoJS from "crypto-js";
import { FaUserSlash } from "react-icons/fa"
import { FiletypeXlsx } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import * as XLSX from 'xlsx';

import { FaPlus } from "react-icons/fa";


import {


    HiHome,
    HiOutlineExclamationCircle,
    HiCheckCircle,
    HiOutlinePencilAlt,
    HiRefresh,
    HiOutlineUserRemove,
    HiDocumentDownload,



} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";


const ExportModal: FC<any> = function (rawData) {
    const [isOpen, setOpen] = useState(false);
    const data = rawData.data;

    // Function to convert an array to a CSV string
    // const convertToCSV = (data: any) => {
    //     const csvRows = [];
    //     const headers = Object.keys(data[0]);
    //     csvRows.push(headers.join(','));

    //     for (const row of data) {
    //         const values = headers.map(header => row[header]);
    //         csvRows.push(values.join(','));
    //     }

    //     return csvRows.join('\n');
    // };

    // Function to export data to CSV and prompt download
    // const exportToCSV = () => {
    //     console.log(data);
    //     const csvContent = convertToCSV(data);
    //     const blob = new Blob([csvContent], { type: 'text/csv' });
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'bonus.csv';
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //     setOpen(false);
    // };

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
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'bonus.xlsx');
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


const NewHeaderBonuses: FC = function () {

    const userLevel3 = localStorage.getItem("userLevel") || ""
    const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
    const userLevel: string = userLevel2.toString(CryptoJS.enc.Utf8);
    console.log(userLevel)

    const userCompany3 = localStorage.getItem("userCompany") || ""
    const userCompany2 = (userLevel3 ? CryptoJS.AES.decrypt(userCompany3, "Tyrannosaurus") : "")
    const userCompany: string = userCompany2.toString(CryptoJS.enc.Utf8);
    console.log(userCompany)

    const [data, setData] = useState([] as any[]);
    const user3 = localStorage.getItem("badgeSession") || ""
    const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
    const badge = user2.toString(CryptoJS.enc.Utf8);
    // const admin = (badge == '1195' || badge == '3199' || badge == '1193' || badge == '3814' || badge == '2366' ? true : false)
    const admin = (((userLevel ==='3' && userCompany === '3') || (userLevel === '3'&& userCompany ==='2') || (userLevel ==='3' && userCompany ==='1')) ? true : false)
    const parker = (badge == '' ? true : false)

    const searchParams = new URLSearchParams(window.location.search);
    // Obtener los valores de las variables desde la cadena de consulta
    const bonusType = searchParams.get('type_bonus');
    const category = searchParams.get('bill_to');
    // const category = (searchParams.get('bill_to') || "").replace(/\s/g, '');
    const type_bonus = bonusType;
    const bill_to = category;
    const badge_ = badge;

    let checkboxRef = useRef<HTMLInputElement>(null);
    const [checkBoxes, setCheckBoxes] = useState(false);

    const checkboxArray: string[] = [];

    const [sharedState, setSharedState] = useState(false);


    let [filteredResults, setFilteredResults] = useState([] as any[]);

    let [dataTemp, setDataTemp] = useState([] as any[]);






    const [searchInput, setSearchInput] = useState('');
    const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchInput(e.target.value);
    };

    const updateSharedState = (newValue: boolean) => {
        resetCheckboxes();
        setSharedState(newValue);
    }



    // useEffect(() => {
    //     axios.get('http://bn.glassmountainbpo.com:8080/api/users')
    //         .then(res => setData(res.data))
    // }, [sharedState])

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

        if (admin) {
            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_details_admin/', {
                type_bonus,
                bill_to
            })
                .then((res) => {
                    setData(res.data);
                    console.log(res.data)
                    console.log(type_bonus)
                    console.log(bill_to)
                })

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });;
        } else {
            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_details_sup/', {
                type_bonus,
                bill_to,
                badge_
            })
                .then((res) => {
                    setData(res.data);
                    console.log(res.data)
                    console.log(type_bonus)
                    console.log(bill_to)
                    console.log(badge_)
                })

                .catch((error) => {
                    console.error('Error en la solicitud POST:', error);
                });;
        }
    }, [sharedState]);



    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

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

    // useEffect(() => {
    //     axios.get('http://bn.glassmountainbpo.com:8080/api/users')
    //         .then(res => setData(res.data))
    // }, [sharedState])

    return (
        <NavbarSidebarLayout isFooter={false}>
            <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item href="/dashboard">
                                <div className="flex items-center gap-x-3">
                                    <HiHome className="text-xl" />
                                    <span className="dark:text-white">Home</span>
                                </div>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/bonuses/bonusCatalog">Bonus Header </Breadcrumb.Item>
                            <Breadcrumb.Item>Bonus Details</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Details Applied bonuses
                        </h1>
                    </div>
                    <div className="sm:flex">
                        <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
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
                            {admin ?
                            <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                            <a
                                href=""
                                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span className="sr-only">Refresh</span>
                                <HiRefresh className="text-2xl" />
                            </a>
                            <DeleteUsersModal
                                users={checkboxArray}
                                created_user={badge}
                                sharedState={sharedState}
                                updateSharedState={updateSharedState} />
                            {/* <ActivateUsersModal
                                users={checkboxArray}
                                created_user={badge}
                                sharedState={sharedState}
                                updateSharedState={updateSharedState} /> */}
                        </div>
                        : <></>}
                        </div>
                        <div className="ml-auto flex items-center space-x-2 sm:space-x-3">

                            <div className="flex items-center gap-x-3">

                                <ExportModal data={data} />
                                {admin && !parker ? <NewSuperAgent /> : parker ? <NewAgent /> : <></> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600" style={{ zoom: 0.9 }}>
                                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                                    <Table.HeadCell>
                                        <Label htmlFor="select-all" className="sr-only">
                                            Select all
                                        </Label>
                                        <Checkbox id="select-all" name="select-all" ref={checkboxRef} onChange={handleSelectAll} />
                                    </Table.HeadCell>
                                    <Table.HeadCell>Name</Table.HeadCell>
                                    <Table.HeadCell>Position</Table.HeadCell>
                                    <Table.HeadCell>Value</Table.HeadCell>
                                    <Table.HeadCell>OK?</Table.HeadCell>
                                    <Table.HeadCell>Date created</Table.HeadCell>
                                    {admin ? 
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                :<></>}
                                </Table.Head>
                                <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {
                                        (searchInput.length > 1 ? filteredResults : (dataTemp.length === 0 ? data : (data))).map((header, index) => {
                                            return <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <Table.Cell className="w-4 p-4">
                                                    <div className="flex items-center">


                                                        <Checkbox id={"checkbox-" + header.id} value={header.id} name="usersCheckbox" onChange={() => updateCheckboxArray(header.id)} />


                                                        <label htmlFor="checkbox-1" className="sr-only">
                                                            {header.id}
                                                        </label>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                                                    <div
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            overflow: 'hidden',
                                                            borderRadius: '50%',
                                                        }}
                                                    >
                                                        <img
                                                            src={`https://hr.glassmountainbpo.com/ap/employee/document/foto/${header.img_agent || 'user.png'}`}
                                                            alt="user"
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                        <div className="text-base font-semibold text-gray-900 dark:text-white">

                                                            {header.agent_name == "" || header.agent_name == null
                                                                ? "Inactive User" : header.agent_name.split(' ')
                                                                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                                    .join(' ')}
                                                        </div>
                                                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                            {header.badge_agent + " " + " - "}
                                                            {" " + "  Created by "}
                                                            {header.name
                                                                .split(' ')
                                                                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                                .join(' ')}
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap p-4  text-sm-16 font-medium text-gray-900 dark:text-white">

                                                    <Badge color={'gray'} className="text-sm-16 font-medium">{header.billto}</Badge>
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                                    ${header.value}
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white">
                                                    {header.ok == 1 ? (
                                                        <>  <Badge color="success">OK? YES<span style={{ color: '#00ff00' }}>✔</span> </Badge>

                                                        </>
                                                    ) : header.ok == 2 ? (
                                                        <>  <Badge color="purple">OK? APP<span style={{ color: '#00ff00' }}>✔</span> </Badge>

                                                        </>

                                                    ) : (
                                                        <><Badge color="failure">OK? NO<span style={{ color: 'red' }}>✘</span> </Badge>

                                                        </>
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                                                    <div className="flex items-center">
                                                        <div>{new Date(header.date_created).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric' })}</div>

                                                    </div>
                                                </Table.Cell>
                                                {admin ? 
                                                <Table.Cell>
                                                <div className="flex items-center gap-x-3 whitespace-nowrap">
                                                    <EditUserModal nameAgent={header.agent_name} bonusActive={header.active} headerId={header.id} badgeSup={header.badge_sup} Name={header.name} billTo={header.billto} status={header.status} Active={header.active} value={header.value} badgeAgent={header.badge_agent} />
                                                    <DeleteUserModal bonusActive={header.status} idBonus={header.id} createdUser={header.badge_sup} />
                                                </div>
                                                </Table.Cell>
                                            : <></>
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
            <Pagination />
        </NavbarSidebarLayout>
    );
};


// Ingresando un nuevo agente de manera indiviudal



const NewAgent: FC<{}> = function ({ }) {

    const [isOpen, setOpen] = useState(false);

    const [badge_, setBadge] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [value_, setValue] = useState<string>('');
    const [category_, setCategory] = useState<string>('');
    const [header, setHeader] = useState<string>('');

    //obtener el badge del user login
    const user3 = localStorage.getItem("badgeSession") || ""
    const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
    const badge = user2.toString(CryptoJS.enc.Utf8);


    const searchParams = new URLSearchParams(window.location.search);
    // Obtener los valores de las variables desde la cadena de consulta
    const bonusType = searchParams.get('type_bonus');

    // const category = (searchParams.get('bill_to') || "").replace(/\s/g, '');
    const type_bonus = bonusType;
    const bill_to = category_;

    const [dataDepartament, setDataDepartament] = useState([] as any[]);


    // useEffect(() => {

    //     axios.post('http://bn.glassmountainbpo.com:8080/api/bonus/departamentAgent/', {
    //         type_bonus,
    //         bill_to
    //     })
    //         .then((res) => {
    //             setDataDepartament(res.data);
    //             console.log(res.data)
    //         })

    //         .catch((error) => {
    //             console.error('Error en la solicitud POST:', error);
    //         });;

    // }, []);




    const handleKeyPress = () => {
       
            if (badge.length !== 0 && dataDepartament.length < 5) {

                axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/departamentAgent/', {
                    type_bonus,
                    bill_to
                })
                    .then((res) => {
                        setDataDepartament(res.data);
                        // console.log(res.data)
                    })
    
                    .catch((error) => {
                        console.error('Error en la solicitud POST:', error);
                    });;
            }
        
    };


    const handleBadgeChange = (value: string) => {
        setBadge(value);

        // Buscar el badge en la data
        const foundAgent = dataDepartament.find(agent => agent.badge === value);

        // Si se encuentra, actualizar los estados correspondientes
        if (foundAgent) {
            setName(foundAgent.name);
           
            setCategory(foundAgent.category);
            setHeader(foundAgent.header);
        } else {
            // Si no se encuentra, resetear los estados
            setName('');
          
            setCategory('');
            setHeader('');
        }
    };

    //mandare a guardar los datos a la API
    const sendDataStatusHeader = () => {


        const bonus_id = header;
        const badge_agent = badge_;
        const fullnameagent = name;
        const category = category_;
        const value = value_;
        const okUser = 1;
        const created_user = badge;

        // Realiza la solicitud HTTP a la API
        axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_details/', {

        bonus_id,
        badge_agent,
        fullnameagent,
        category,
        value, 
        okUser,
        created_user

        })
            .then(response => {
                // Maneja la respuesta de la API si es necesario
                console.log(response.data);

                window.location.reload()

            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Badge duplicated',
                    confirmButtonText: 'OK'
                });
                // Maneja los errores de la solicitud si es necesario
                console.error("Error al enviar la solicitud:", error);
            });
    };

    return (
        <>
            {badge == "2160" ? "": 
            <Button color="primary" onClick={() => setOpen(true)}>
                <FaPlus className="mr-3 text-sm" />
                Add an Agent
            </Button>
            }

            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Add agents </strong>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="firstName">Badge Agent </Label>
                            <div className="mt-1">
                                <TextInput 
                                    id="badgeAddUser"
                                    name="badgeAddUser"
                                    placeholder=""
                                    value={badge_}
                                    onKeyDown={() => handleKeyPress()}
                                    onChange={e => handleBadgeChange(e.target.value)}
                                   
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="lastName">Name Agent</Label>
                            <div className="mt-1">
                                <TextInput id="lastName" name="lastName" placeholder="" value={name} readOnly />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">Departament </Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={category_} readOnly
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="department">Value</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    onChange={e => setValue(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="department">ID Header</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={header.toString()}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="department">Badge Sup</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={badge}
                                    readOnly
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button className="text-white bg-green-400 dark:bg-green-400 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => { sendDataStatusHeader(); setOpen(false) }}>
                        Save
                    </Button> */}
                    <Button className="text-white bg-green-400 dark:bg-green-400 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => {
                            if (header === "") {
                                // Mostrar alerta SweetAlert2
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Badge does not belong to this department or category',
                                    confirmButtonText: 'OK'
                                });
                            } else {
                                // Enviar datos y cerrar modal
                                sendDataStatusHeader();
                                setOpen(false);
                            }
                        }}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const NewSuperAgent: FC<{}> = function ({ }) {

    const [isOpen, setOpen] = useState(false);

    const [badge_, setBadge] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [value_, setValue] = useState<string>('');
    const [category_, setCategory] = useState<string>('');
    const [header, setHeader] = useState<string>('');

    //obtener el badge del user login
    const user3 = localStorage.getItem("badgeSession") || ""
    const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
    const badge = user2.toString(CryptoJS.enc.Utf8);


    const searchParams = new URLSearchParams(window.location.search);
    // Obtener los valores de las variables desde la cadena de consulta
    const bonusType = searchParams.get('type_bonus');

    // const category = (searchParams.get('bill_to') || "").replace(/\s/g, '');
    const type_bonus = bonusType;
    const bill_to = category_;

    const [dataDepartament, setDataDepartament] = useState([] as any[]);

    const [creatorBadge, setCreatorBadge] = useState<string>('');


    useEffect(() => {
        const bonusID = type_bonus
        axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/creatorBadge/', {
            bonusID
        })
            .then((res) => {
                setCreatorBadge(res.data.creatorBadge);
            })

            .catch((error) => {
                console.error('Error en la solicitud POST:', error);
            });;

    }, [type_bonus]);

    const handleKeyPress = () => {
       
            if (badge.length !== 0 && dataDepartament.length < 10) {

                axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/departamentSuperAgent/', {
                    type_bonus,
                    bill_to
                })
                    .then((res) => {
                        setDataDepartament(res.data);
                        // console.log(res.data)
                    })
    
                    .catch((error) => {
                        console.error('Error en la solicitud POST:', error);
                    });;
            }
        
    };


    const handleBadgeChange = (value: string) => {
        setBadge(value);

        // Buscar el badge en la data
        const foundAgent = dataDepartament.find(agent => agent.badge === value);

        // Si se encuentra, actualizar los estados correspondientes
        if (foundAgent) {
            setName(foundAgent.name);
           
            setCategory(foundAgent.category);
            setHeader(foundAgent.header);
        } else {
            // Si no se encuentra, resetear los estados
            setName('');
          
            setCategory('');
            setHeader('');
        }
    };

    //mandare a guardar los datos a la API
    const sendDataStatusHeader = () => {


        const bonus_id = header;
        const badge_agent = badge_;
        const fullnameagent = name;
        const category = category_;
        const value = value_;
        const okUser = 2;
        const created_user = creatorBadge;

        // Realiza la solicitud HTTP a la API
        axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_details/', {

        bonus_id,
        badge_agent,
        fullnameagent,
        category,
        value, 
        okUser,
        created_user

        })
            .then(response => {
                // Maneja la respuesta de la API si es necesario
                console.log(response.data);

                window.location.reload()

            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Badge duplicated',
                    confirmButtonText: 'OK'
                });
                // Maneja los errores de la solicitud si es necesario
                console.error("Error al enviar la solicitud:", error);
            });
    };

    return (
        <>
            <Button color="primary" onClick={() => setOpen(true)}>
                <FaPlus className="mr-3 text-sm" />
                Add New Agent
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Add agents </strong>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="firstName">Badge Agent </Label>
                            <div className="mt-1">
                                <TextInput 
                                    id="badgeAddUser"
                                    name="badgeAddUser"
                                    placeholder=""
                                    value={badge_}
                                    onKeyDown={() => handleKeyPress()}
                                    onChange={e => handleBadgeChange(e.target.value)}
                                   
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="lastName">Name Agent</Label>
                            <div className="mt-1">
                                <TextInput id="lastName" name="lastName" placeholder="" value={name} readOnly />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">Departament </Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={category_} readOnly
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="department">Value</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    onChange={e => setValue(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="department">ID Header</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={header.toString()}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="department">Badge Sup</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={creatorBadge}
                                    readOnly
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button className="text-white bg-green-400 dark:bg-green-400 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => { sendDataStatusHeader(); setOpen(false) }}>
                        Save
                    </Button> */}
                    <Button className="text-white bg-green-400 dark:bg-green-400 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => {
                            if (header === "") {
                                // Mostrar alerta SweetAlert2
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Badge does not belong to this department or category',
                                    confirmButtonText: 'OK'
                                });
                            } else {
                                // Enviar datos y cerrar modal
                                sendDataStatusHeader();
                                setOpen(false);
                            }
                        }}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const EditUserModal: FC<{ bonusActive: any; headerId: any; badgeSup: any; Name: any; billTo: any; status: any; Active: any; nameAgent: any, value: any, badgeAgent: any }> = function ({ bonusActive, headerId, badgeSup, Name, billTo, status, Active, nameAgent, value, badgeAgent }) {

    const [isOpen, setOpen] = useState(false);
    console.log(bonusActive);
    console.log(Name);
    console.log(status);
    console.log(Active);

    //obtener el badge del user login
    const user3 = localStorage.getItem("badgeSession") || ""
    const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
    const badge = user2.toString(CryptoJS.enc.Utf8);

    const [agentValue, setAgentValue] = useState(value)

    //mandare a guardar los datos a la API
    const sendDataStatusHeader = () => {
        const id = headerId;
        const badge_ = badge;
        const id_session = badge;

        // Realiza la solicitud HTTP a la API
        axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_value/', {

            id,
            badge_,
            status,
            id_session,
            badgeSup,
            agentValue,
            nameAgent
        })
            .then(response => {
                // Maneja la respuesta de la API si es necesario
                console.log(response.data);
                console.log(status);
                window.location.reload()

            })
            .catch(error => {
                // Maneja los errores de la solicitud si es necesario
                console.error("Error al enviar la solicitud:", error);
            });
    };

    return (
        <>

            <Button className="text-white bg-green-400 dark:bg-green-400 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiOutlinePencilAlt className="text-lg" />

                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Edit agents bonus </strong>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="firstName">Name Agent </Label>
                            <div className="mt-1">
                                <TextInput
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Bonnie"
                                    value={nameAgent || undefined}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="lastName">Agent badge</Label>
                            <div className="mt-1">
                                <TextInput id="lastName" name="lastName" placeholder="Green"
                                    value={badgeAgent || undefined} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">Departament </Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={billTo || undefined}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="department">Value</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    onChange={(event) => setAgentValue(event.target.value)}
                                    value={agentValue || undefined}
                                />

                                {/* <Select
                                    id="department"
                                    name="department"
                                    placeholder="IT"
                                    value={id_status_bonus}
                                    onChange={(event) => setIdBonusStatus(event.target.value)}
                                >
                                    {badge === '3199' || badge === '3814' ? (
                                        bonusData.map((status, index) => (
                                            <option key={index} value={(status as any).status_id}>
                                                {(status as any).status_id}
                                            </option>
                                        ))
                                    ) : (
                                        <>
                                            <option value="DRAFT">DRAFT</option>
                                            <option value="REVW">REVW</option>
                                        </>
                                    )}
                                </Select> */}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="text-white bg-green-400 dark:bg-green-400 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => { sendDataStatusHeader(); setOpen(false) }}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const DeleteUserModal: FC<{ idBonus: any; bonusActive: any; createdUser: any }> = function ({ idBonus, bonusActive, createdUser }) {
    const [isOpen, setOpen] = useState(false);


    const headerStatus = () => {
        // Supongamos que tienes acceso a los valores necesarios para completar los parámetros
        const id_header = idBonus;
        const status = bonusActive; // bonusActive determina el valor de "status"
        const created_user = createdUser;
        // Realiza la solicitud HTTP a la API
        axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/agent_status_one_one/', {
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
            <Button color={bonusActive === 1 ? "dark" : "gray"} onClick={() => { setOpen(!isOpen); }}>
                <HiOutlineUserRemove className="text-lg" />
            </Button>
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
                            <Button color={bonusActive === 1 ? "failure" : "success"} onClick={() => { setOpen(!isOpen); headerStatus(); }}>
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

export const Pagination: FC = function () {
    return (
        <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
            <div></div>
            <div className="flex items-center space-x-3">
                {/* <a
                    href="#"
                    className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    <HiCheckCircle className="mr-1 text-base" />
                    Submit
                </a> */}
                {/* <a
                    href="#"
                    className="inline-flex flex-1 items-center justify-center rounded-lg bg-green-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-300"
                >
                    <HiClipboardCheck className="mr-1 text-base" />
                    Save
                </a> */}

            </div>
        </div>
    );
};



const DeleteUsersModal: FC<any> = function ({ users, created_user, sharedState, updateSharedState }) {
    const [isOpen, setOpen] = useState(false);
    const dataToSend = users;

    const handleSubmit = async (e: React.FormEvent, dataToSend: string, created_user: any) => {
        e.preventDefault()

        try {
            const response = await axios.post('https://bn.glassmountainbpo.com:8080/api/deactivateAgents', {
                dataToSend,
                created_user
            })
            if (response.status == 200) {
                const responseData = response.data;
                updateSharedState(!sharedState);
                setOpen(false);


                if (responseData.message === "Users successfully deactivated") {
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
                            Are you sure you want to deactivate {users.length} user(s)?
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


export default NewHeaderBonuses;
