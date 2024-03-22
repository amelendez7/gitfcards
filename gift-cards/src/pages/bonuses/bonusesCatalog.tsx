/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
    Button,
    Label,
    Modal,
    Table,
    TextInput,
    Select,
    Badge,
} from "flowbite-react";

import type { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react"
import CryptoJS from "crypto-js";

import {

    HiHome,

    HiOutlinePlusCircle,
    HiOutlineEye,

} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

import axios from "axios";



const LatestTransactions: FC = function () {

    const user3 = localStorage.getItem("badgeSession") || ""
    const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
    const badge = user2.toString(CryptoJS.enc.Utf8);
    const [datas, setDatas] = useState([] as any[]);



    const userLevel3 = localStorage.getItem("userLevel") || ""
    const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
    const userLevel: string = userLevel2.toString(CryptoJS.enc.Utf8);
    console.log(userLevel)

    const userCompany3 = localStorage.getItem("userCompany") || ""
    const userCompany2 = (userLevel3 ? CryptoJS.AES.decrypt(userCompany3, "Tyrannosaurus") : "")
    const userCompany: string = userCompany2.toString(CryptoJS.enc.Utf8);
    console.log(userCompany)


    // filtramos para los Directores

    if (userLevel === '3' && userCompany === '3') {
        useEffect(() => {
            axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/list_bonus/')
                .then(res => setDatas(res.data))
                .catch(error => {
                    console.error('Error:', error);
                });
        }, []);

        //Filtrando para los bonus de QA
    } else if (userLevel === '5' && userCompany === '1') {
        useEffect(() => {
            axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/list_bonus/')
                .then(res => {
                    // Filtrar los datos para encontrar solo aquellos con id_bonus igual a "QUAL"
                    const filteredData = res.data.filter((item: any) => item.id_bonus === "QUAL");

                    // Establecer los datos filtrados en el estado
                    setDatas(filteredData);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, []);

        //Filtrando para los bonus de Training
    } else if (userLevel === '6' && userCompany === '1') {
        useEffect(() => {
            axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/list_bonus/')
                .then(res => {
                    // Filtrar los datos para encontrar solo aquellos con id_bonus igual a "QUAL"
                    const filteredData = res.data.filter((item: any) => item.id_bonus === "TRAI");

                    // Establecer los datos filtrados en el estado
                    setDatas(filteredData);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, []);

        //Filtrando para los supervisores
    } else {
        useEffect(() => {
            axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_bonus_supervisor/', { badge })
                .then(res => {
                    setDatas(res.data);
                    console.log(">>>>>>>>>>>>>>>>>" + res.data); // Imprimir la respuesta en la consola
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, []);
    }






    return (
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Bonus Catalog
            </h1>
            <div className="bg-white p-4 dark:bg-gray-800 sm:p-6 xl:p-2 flex justify-end">
                {userLevel === '3' && userCompany === '3' ? (
                    <Button color="primary" href="/bonuses/all">
                        <FaPlus className="mr-3 text-sm" />
                        Add Type Bonus
                    </Button>
                ) : null}
            </div>
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                        This is a list of Catalog Bonus
                    </span>
                </div>
                <div className="shrink-0">
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="overflow-x-auto rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow sm:rounded-lg">
                            <Table
                                striped
                                className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
                            >
                                <Table.Head className="bg-gray-50 dark:bg-gray-700">
                                    <Table.HeadCell>Detail</Table.HeadCell>
                                    <Table.HeadCell>Active Bonuses</Table.HeadCell>
                                    <Table.HeadCell>Date</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>

                                    {
                                        userLevel === '2' && userCompany === '2' ? "" : <>
                                            <Table.HeadCell>Action</Table.HeadCell>
                                        </>
                                    }

                                </Table.Head>
                                <Table.Body className="bg-white dark:bg-gray-800">
                                    {
                                        datas.map((bonus, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                                                    <span className="font-semibold">  {bonus.bonus_name} </span>
                                                    <p className="whitespace-nowrap  text-xs font-normal text-gray-500 dark:text-gray-400">    {bonus.id_bonus}
                                                    </p>
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap flex p-4 text-sm font-normal text-white-500 dark:white-400">
                                                    <div className="text-base font-semibold text-white-900 dark:text-white">
                                                        {bonus.count_header >= 1 ?

                                                            <Badge className="bg-danger" color="white" style={{ backgroundColor: '#2CA65A', color: 'white' }}>
                                                                {bonus.count_header} applied
                                                            </Badge> :
                                                            <Badge className="bg-danger" color="white" style={{ backgroundColor: '#2C4B57', color: 'white' }}>
                                                                {bonus.count_header} applied
                                                            </Badge>

                                                        }
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    {bonus.date_created}
                                                </Table.Cell>
                                                <Table.Cell className="flex whitespace-nowrap p-4">
                                                    {bonus.active === 1 ? (
                                                        <Badge color="success">Active</Badge>
                                                    ) : (
                                                        <Badge color="failure">Inactive</Badge>
                                                    )}
                                                </Table.Cell>

                                                {

                                                    userLevel === '2' && userCompany === '2' ? "" : <>
                                                        <Table.Cell className="whitespace-nowrap p-4 text-xs font-semibold m-4 text-gray-900 dark:text-white">
                                                            <div className="flex items-center gap-x-1 text-xs " style={{ zoom: '90%' }}>

                                                                <NewProductModal
                                                                    nameBonus={bonus.bonus_name}
                                                                    idBonus={bonus.id_bonus}
                                                                    statusBonus={bonus.active}
                                                                />
                                                                < GoItHeader nameBonus={bonus.bonus_name}
                                                                    idBonus={bonus.id_bonus}
                                                                    statusBonus={bonus.id_status}
                                                                />
                                                                {/* 
                                                        {badge === '3199' || badge === '3814' ? (
                                                            <EditProductModal
                                                                nameBonus={bonus.bonus_name}
                                                                descriptionBonus={bonus.description}
                                                                idBonus={bonus.id_bonus}
                                                                valueBonus={bonus.value}
                                                                createdUser={badge}
                                                                statusBonus={bonus.id_status}
                                                                bonusStatus={bonus.active}

                                                            />
                                                        ) : null}
                                                        {badge === '3199' || badge === '3814' ? (
                                                            <DeleteProductModal bonusActive={bonus.active} idBonus={bonus.id_bonus} createdUser={badge} />
                                                        ) : null} */}
                                                            </div>
                                                        </Table.Cell>
                                                    </>
                                                }


                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between pt-3 sm:pt-6">
                <div className="shrink-0">
                </div>
            </div>
        </div>
    );
};

const CatalogPage: FC = function () {

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
                            <LatestTransactions />
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

                        </div>
                    </div>
                </div>
            </div>
            {/* <Pagination /> */}
        </NavbarSidebarLayout>
    );

};


const NewProductModal: FC<{
    nameBonus: any;
    idBonus: any;
    statusBonus: any;

}> = ({ nameBonus, idBonus, statusBonus }) => {

    const [isOpen, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(''); // Inicializar como nulo
    const currentDate = new Date(); // Fecha actual
    const targetDate = new Date(); // Clonar la fecha actual
    targetDate.setDate(15); // Establecer el día en 15

    const bonus_type = idBonus;

    // const badge = localStorage.getItem("badgeSession") || undefined;

    const user3 = localStorage.getItem("badgeSession") || ""
    const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
    const badge = user2.toString(CryptoJS.enc.Utf8);


    // const userName = localStorage.getItem("badgeSession") || undefined;


    const [result, setResult] = useState<any>([]); //JSON Axios Data
    const [bonusData, setBonusData] = useState([]);
    const [type_status_bonus, setStatusBonus] = useState("DRAFT");

    const userLevel3 = localStorage.getItem("userLevel") || ""
    const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
    const userLevel: string = userLevel2.toString(CryptoJS.enc.Utf8);
    console.log(userLevel)

    const userCompany3 = localStorage.getItem("userCompany") || ""
    const userCompany2 = (userLevel3 ? CryptoJS.AES.decrypt(userCompany3, "Tyrannosaurus") : "")
    const userCompany: string = userCompany2.toString(CryptoJS.enc.Utf8);
    console.log(userCompany)



    useEffect(() => {
        axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/status/')
            .then((res) => {
                console.log(res.data);
                setBonusData(res.data);
                console.log(result + setResult);
            })
            .catch((error) => {
                console.error('Error al obtener datos de bonus:', error);
            });
    }, []);


    // const url = 'https://bn.glassmountainbpo.com:8080/api/hired/';
    // useEffect(() => {
    //     axios.get(`${url}${badge}`)
    //         .then((response) => {
    //             console.log(response.data);
    //             setResult(response.data);
    //         })
    //         .catch((error) => {
    //             // Manejar errores aquí
    //             console.error('Error en la solicitud a la API:', error);
    //         });
    // }, []);


    useEffect(() => {
        // Lógica para habilitar o deshabilitar las opciones del select
        const selectElement = document.getElementById('productName');
        const selectElement2 = document.getElementById('productName2');

        if (selectElement) {
            const option1 = selectElement.querySelector('option[value="01"]');
            const option2 = selectElement.querySelector('option[value="02"]');

            if (currentDate >= targetDate) {
                // Habilitar el primer periodo y deshabilitar el segundo periodo
                if (option1) {
                    option1.removeAttribute('enable');
                }
                if (option1) {
                    option1.setAttribute('disabled', 'disabled');
                }
                setSelectedValue('02'); // Seleccionar el primer periodo por defecto
            } else {
                // Habilitar el segundo periodo y deshabilitar el primer periodo
                if (option2) {
                    option2.setAttribute('enable', 'enable');
                }
                if (option1) {
                    option1.removeAttribute('disabled');
                }
                setSelectedValue('01'); // Seleccionar el segundo periodo por defecto
            }
        }


        // if (selectElement2) {
        //     const option_1 = selectElement2.querySelector('option[value="01"]');
        //     const option_2 = selectElement2.querySelector('option[value="02"]');
        //     const option_3 = selectElement2.querySelector('option[value="03"]');
        //     const option_4 = selectElement2.querySelector('option[value="04"]');


        //     // Habilitar el primer periodo y deshabilitar el segundo periodo
        //     if (selectElement2 == option_1) {
        //         setSelectedValue('01')
        //     }
        //     if (option_2) {
        //         setSelectedValue('02')
        //     }

        //     // Habilitar el segundo periodo y deshabilitar el primer periodo
        //     if (option_3) {
        //         setSelectedValue('03')
        //     }

        //     if (option_4) {
        //         setSelectedValue('04')
        //     }
        //     ; // Seleccionar el segundo periodo por defecto
        // }

        if (selectElement2) {
            selectElement2.addEventListener('change', (event) => {


                const [selectedValue, setSelectedValue] = useState(null);
                console.log(event);
                setSelectedValue(selectedValue);
            });
        }
        


    }, [currentDate, targetDate]);

    console.log("Current" + currentDate)
    console.log("targe" + targetDate)

    const [category_, setCategory] = useState([]);
    const [categorySelected, setCategorySelected] = useState("");



    useEffect(() => {
        axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/category/')
            .then((resultado) => {
                console.log(resultado.data);
                setCategory(resultado.data);
            })
            .catch((error) => {
                console.error('Error al obtener categorias:', error);
            });
    }, []);

    // Enviar los datos a guardar
    const sendDataHeader = () => {
        const id = bonus_type;
        const type_bonus = bonus_type;
        const payroll = selectedValue;
        const badge_ = badge;
        const status = type_status_bonus;
        const bill_to = categorySelected || '';
        const category = categorySelected || '';
        const id_session = badge;

        // Realiza la solicitud HTTP a la API
        axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_header/', {

            id,
            type_bonus,
            payroll,
            badge_,
            status,
            bill_to,
            category,
            id_session
        })
            .then(response => {
                // Maneja la respuesta de la API si es necesario
                // window.location.reload();
                console.log(response.data);
                window.location.href = `/bonuses/bonusHeader?bonus_type=${bonus_type}`;
                // window.location.href = `/bonuses/bonusHeader?bonus_type=${bonus_type}&category=${result.name_rol}`;

            })
            .catch(error => {
                // Maneja los errores de la solicitud si es necesario
                console.error("Error al enviar la solicitud:", error);
            });
    };


    return (
        <>
            {/* <Button color="primary" href="/bonuses/newhire">
          <HiOutlinePlusCircle className="text-lg" />
        </Button> */}
            <Button
                color="primary"
                onClick={() => setOpen(!isOpen)}
                disabled={statusBonus === 0}
                style={{ pointerEvents: statusBonus === 0 ? 'none' : 'auto' }}
            >
                <HiOutlinePlusCircle className="text-lg" />
            </Button>

            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Apply Bonus</strong>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div>
                                <Label htmlFor="productName">Date</Label>

                                {bonus_type == "WEEK" ? <>

                                    <Select
                                        id="productName2"
                                        name="productName2"
                                        className="mt-1"
                                        value={selectedValue || undefined}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                    >
                                        <option value="0">Selected</option>
                                        {/* <option value="01">First Week</option> */}
                                        <option value="02">Second Week</option>
                                        {/* <option value="03">Third Week</option>
                                        <option value="04">Fourth Week</option> */}

                                    </Select>
                                

                                </> : <>

                                    <Select
                                        id="productName"
                                        name="productName"
                                        className="mt-1"
                                        value={selectedValue || undefined}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                    >
                                        <option value="01">First period</option>
                                        <option value="02">Second Period</option>
                                    </Select>


                                </>}

                            </div>
                            <div>
                                <Label htmlFor="bonus">ID</Label>
                                <TextInput
                                    id="type_bonus"
                                    name="type_bonus"
                                    placeholder="New Hire"
                                    className="mt-1"
                                    value={bonus_type || undefined}
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Bonus Type</Label>
                                <TextInput
                                    id="bonus_type"
                                    name="bonus_type"
                                    placeholder="New Hire"
                                    className="mt-1"
                                    value={nameBonus || undefined}
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Badge user</Label>
                                <TextInput
                                    id="badge"
                                    name="bonus_type"
                                    placeholder="New Hire"
                                    className="mt-1"
                                    value={badge || undefined}
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Departament</Label>
                                <div>

                                    <div className="mt-1">
                                        <div className="mt-1">

                                            {/* <Select
                                                id="departament"
                                                name="departament"
                                                value={categorySelected}
                                                onChange={(event) => setCategorySelected(event.target.value)} // Maneja el cambio de valor
                                            >
                                                {
                                                    category_.map((status, index) => (



                                                        <option key={index} value={(status as any).name}>
                                                            {(status as any).name}
                                                        </option>



                                                    ))
                                                }
                                            </Select> */}
                                            <Select
                                                id="departament"
                                                name="departament"
                                                value={categorySelected}
                                                onChange={(event) => setCategorySelected(event.target.value)} // Maneja el cambio de valor
                                            >
                                                {
                                                    userLevel === '3' && userCompany === '2' ? (
                                                        <>
                                                            <option value="SELECTED">SELECTED</option>
                                                            <option value="SURGEPAYS">SURGEPAYS</option>
                                                        </>
                                                    ) : ((userLevel === '6' || userLevel === '5') && userCompany === '1') ? (
                                                        <>
                                                            <option value="SELECTED">SELECTED</option>
                                                            <option value="GMBPO">GMBPO</option>
                                                        </>
                                                    ) : (bonus_type === 'MANA') ? (
                                                        <>
                                                            <option value="SELECTED">SELECTED</option>
                                                            <option value="GMBPO">GMBPO</option>
                                                        </>
                                                    ) : (
                                                        category_.map((status, index) => (
                                                            <option key={index} value={(status as any).name}>
                                                                {(status as any).name}
                                                            </option>
                                                        ))
                                                    )}
                                            </Select>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="status">Bonus status</Label>
                                <div className="mt-1">
                                    <div className="mt-1">
                                        <Select
                                            id="departament"
                                            name="departament"
                                            value={type_status_bonus}
                                            onChange={(event) => setStatusBonus(event.target.value)} // Maneja el cambio de valor
                                        >
                                            {userLevel === '3' && userCompany === '3' ? (
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
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="primary" onClick={() => { sendDataHeader(); }} >
                        Create
                    </Button>
                    {/* {badge === '3199' ? ( */}
                    {/* <Button color="primary" href={`/bonuses/bonusHeader?bonus_type=${bonus_type}&category=${result.name_rol}`} onClick={() => { setOpen(!isOpen); }} >
                        Go it
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};





const GoItHeader: FC<{
    nameBonus: any;
    idBonus: any;
    statusBonus: any;

}> = ({ idBonus }) => {



    const targetDate = new Date(); // Clonar la fecha actual
    targetDate.setDate(15); // Establecer el día en 15

    const bonus_type = idBonus;

    // const badge = localStorage.getItem("badgeSession") || undefined;

    const user3 = localStorage.getItem("badgeSession") || ""
    const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
    const badge = user2.toString(CryptoJS.enc.Utf8);

    const ui = badge.replace(/\D/g, '');



    // const userName = localStorage.getItem("badgeSession") || undefined;
    //const url = `https://bn.glassmountainbpo.com:8080/api/hired/`;

    // const [result, setResult] = useState<any>([]); //JSON Axios Data
    // const [badge_, setBadge] = useState<any>([badge]); //Badge

    useEffect(() => {
        axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/status/')
            .then((res) => {
                console.log(res.data);
                console.log(ui);

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
    //                 console.log(result)
    //             });
    //         setBadge
    //     } [];
    // };
    // handleTrack();

    return (
        <>
            <Button className="bg-indigo-600 dark:bg-indigo-500  dark:hover:bg-indigo-700" href={`/bonuses/bonusHeader?bonus_type=${bonus_type}`}  >
                <HiOutlineEye className="text-lg" />
            </Button>
        </>
    );
};

export default CatalogPage;
