/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
  Select,
  Badge
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState, SetStateAction, useRef } from "react"
import axios from "axios";
import CryptoJS from "crypto-js";
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2'

import { FaUserCheck, FaUserSlash } from "react-icons/fa"


import {
  HiUpload,
  HiRefresh,
  HiHome,
  HiOutlineExclamationCircle,
  HiCheckCircle,
  HiOutlinePencilAlt,
  HiOutlinePlusCircle,
  HiOutlineEye,
  HiOutlineMinusCircle,
  HiOutlineDocumentAdd

} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

const NewHeaderBonus: FC = function () {

  const [data, setData] = useState([] as any[]);
  const img = "user.png" || "";
  const user3 = localStorage.getItem("badgeSession") || ""
  const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
  const badge = user2.toString(CryptoJS.enc.Utf8);



  const searchParams = new URLSearchParams(window.location.search);
  // Obtener los valores de las variables desde la cadena de consulta
  const bonusType = searchParams.get('bonus_type');
  const category = (searchParams.get('category') || "").replace(/\s/g, '');

  const type_bonus = bonusType;
  const bill_to = category;
  const badge_ = badge;


  let [filteredResults, setFilteredResults] = useState([] as any[]);
  let [dataTemp, setDataTemp] = useState([] as any[]);


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



  const [searchInput, setSearchInput] = useState('');
  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchInput(e.target.value);
  };

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




  // Function to handle "Select All" button click
  const handleSelectAll = () => {
    // console.log(data)
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





  useEffect(() => {
    if ((userLevel === '3' && userCompany === '3')) {
      axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_header_admin/', {
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
    } else if (userLevel === '3' && userCompany === '2') {

      axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_header_admin_surge/', {
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

    } else if (userLevel === '3' && userCompany === '1') {
      axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_header_admin_NOTsurge/', {
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
      axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_header_sup/', {
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
  }, [sharedState, badge_]);





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
              <Breadcrumb.Item href="/bonuses/bonusCatalog">Bonuses</Breadcrumb.Item>
              <Breadcrumb.Item>New Header Bonus</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              New Header Bonus
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
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                {/* <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </a> */}

                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only ml-4">Refresh</span>
                  <HiRefresh className="text-2xl mt-1" />

                  <DeleteUsersModal
                    users={checkboxArray}
                    created_user={badge}
                    sharedState={sharedState}
                    updateSharedState={updateSharedState} />
                  <ActivateUsersModal
                    users={checkboxArray}
                    created_user={badge}
                    sharedState={sharedState}
                    updateSharedState={updateSharedState} />
                </a>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">

              <div className="flex items-center gap-x-3">

                {/* <HiUpload className="text-xl" />
                  <span>Import</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600" style={{ zoom: 0.8 }}>
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                  <Table.HeadCell>
                    <Label htmlFor="select-all" className="sr-only">
                      Select all
                    </Label>
                    {/* <Checkbox id="select-all" name="select-all" /> */}

                    <Checkbox id="select-all" name="select-all" ref={checkboxRef} onChange={handleSelectAll} />
                  </Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Position</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Active</Table.HeadCell>
                  <Table.HeadCell>Date created</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {
                    (searchInput.length > 1 ? filteredResults : (dataTemp.length === 0 ? data : (data))).map((header, index) => {
                      return <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Table.Cell className="w-4 p-4">
                          <div className="flex items-center">
                            {/* <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                            <label htmlFor="checkbox-1" className="sr-only">
                              {header.id}
                            </label> */}

                            <Checkbox id={"checkbox-" + header.id} value={header.id} name="usersCheckbox" onChange={() => updateCheckboxArray(header.id)} />
                            <label htmlFor={"checkbox-" + header.id} className="sr-only">
                            </label>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://hr.glassmountainbpo.com/ap/employee/document/foto/${img}`}
                            alt="Neil Sims avatar"
                          />

                          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                              {header.nameBonus} <a className="text-sm-16 font-normal text-gray-500 dark:text-gray-400" text-sm-15 font-semibold> applied to </a> <a className="text-sm  font-semibold text-black-800 dark:text-black-800"></a>
                              <span className=" pr-2 pl-2 rounded-lg bg-indigo-100  text-sm-12 font-semibold  dark:text-white dark:bg-indigo-900  md-2">

                                {header.billto.toLowerCase().toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())}
                              </span>
                            </div>
                            <div className="mt-1 text-sm font-normal text-purple-500 dark:text-gray-400">
                              <span className=" pr-2 pl-2 rounded-lg bg-gray-100  text-sm font-semibold  dark:text-gray-300 dark:bg-gray-700  md-2">
                                {header.id}
                              </span>
                              <br></br>
                              <br></br>
                              created by
                              {" " + header.badge_sup + " " + " - "}
                              {header.name}

                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                          <Badge color='gray'>{header.billto}</Badge>
                        </Table.Cell>
                        <Table.Cell className=" whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                          {header.status === "DRAFT" ? (
                            <Badge color="failure">{header.status}</Badge>
                          ) : header.status === "APPR" ? (
                            <span className="mr- rounded-lg bg-purple-100  text-xs font-medium text-purple-800 dark:bg-purple-200">
                              {header.status}
                            </span>
                          ) : header.status === "DONE" ? (
                            <Badge color="success">{header.status}</Badge>
                          ) : header.status === "REVW" ? (

                            <span className="mr-2 rounded-lg bg-orange-400 py-0.5 px-2.5 text-sm pr-2  font-semibold text-orange-800  dark:bg-orange-300">
                              {header.status}
                            </span>

                          ) : (
                            <Badge color="success">Inactive</Badge>
                          )}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                          {header.active == 1 ? (
                            <>
                              <Badge color="success">  <span style={{ color: '#00ff00' }}>✔</span> Active</Badge>
                            </>
                          ) : (
                            <>
                              <Badge color="failure">Inactive<span style={{ color: 'red' }}>✘</span></Badge>
                            </>
                          )}
                        </Table.Cell>

                        <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <div>{new Date(header.date_created).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric' })}</div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-x-3 whitespace-nowrap">
                            <NewUserModal bonusActive={header.active} headerId={header.id} badgeSup={header.badge_sup} Name={header.name} bill_To={header.billto} status={header.status} Active={header.active} />
                            <Button
                              className="bg-indigo-600 inline-flex items-center justify-center rounded-lg  py-1  dark:hover:bg-indigo-700 px-1 text-sm font-sm text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-indigo-500  dark:focus:ring-green-300"
                              href={`/bonuses/bonusDetails?&badge=${badge}&type_bonus=${header.id}&bill_to=`}>
                              <HiOutlineEye className="text-lg" />
                            </Button>
                            <EditUserModal bonusActive={header.active} headerId={header.id} badgeSup={header.badge_sup} Name={header.name} billTo={header.billto} status={header.status} Active={header.active} />
                            <DeleteUserModal bonusActive={header.active} idBonus={header.id} createdUser={header.badge_sup} status={header.status} />
                          </div>
                        </Table.Cell>
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


const EditUserModal: FC<{ bonusActive: any; headerId: any; badgeSup: any; Name: any; billTo: any; status: any; Active: any; }> = function ({ bonusActive, headerId, badgeSup, Name, billTo, status, Active }) {

  const [isOpen, setOpen] = useState(false);
  console.log(bonusActive);
  console.log(Name);
  console.log(status);
  console.log(Active);

  //obtener el badge del user login
  const user3 = localStorage.getItem("badgeSession") || ""
  const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
  const badge = user2.toString(CryptoJS.enc.Utf8);

  const [bonusData, setBonusData] = useState(['']);
  const [id_status_bonus, setIdBonusStatus] = useState(status);
  const [data, setData] = useState([] as any[])

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
      })
      .catch((error) => {
        console.error('Error al obtener datos de bonus:', error);
      });
  }, []);



  useEffect(() => {
    axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/update_header/', {
      id: headerId,
      created_user: badge
    })
      .then(res => setData(res.data))
      .catch((error) => {
        console.error('Error en la solicitud POST:', error);
      });

  }, [badge]);



  //mandare a guardar los datos a la API
  const sendDataStatusHeader = () => {
    const id = headerId;
    const badge_ = badge;
    const status = id_status_bonus;
    const id_session = badge;



    if (badge == '1193') {


      // Realiza la solicitud HTTP a la API para la aprobacion de ambios operations
      axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_header_status_one_one/', {

        id,
        badge_,
        status,
        id_session
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


    } else if (userLevel === '3' && userCompany === '2') {

      // Realiza la solicitud HTTP a la API para la aprobacion de ambios operations
      axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_header_status_one_one/', {

        id,
        badge_,
        status,
        id_session
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

    }  else if ( (userLevel === '6' && userCompany === '1') || (userLevel === '5' && userCompany === '1') ) {

      // Realiza la solicitud HTTP a la API para la aprobacion de ambios operations
      axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_header_status/', {

        id,
        badge_,
        status,
        id_session
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

    } else if (badge == '1195') {
      console.log('Aca vamos hacer las excepciones; ');


      // Realiza la solicitud HTTP a la API para la aprobacion de ambios operations
      axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_header_status_one_one/', {

        id,
        badge_,
        status,
        id_session
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



    } else if(badge == '3199' || badge =='3814') {

      // Realiza la solicitud HTTP a la API
      axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_header_status/', {

        id,
        badge_,
        status,
        id_session
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

    }

  };

  return (
    <>

      <Button color="" className="bg-green-600 dark:bg-green-500 text-xs font-semibold dark:text-white text-white  " onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlinePencilAlt className="text-lg" />

        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit header bonus </strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">Header name </Label>
              <div className="mt-1">
                <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="Bonnie"
                  value={headerId || undefined}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Supervisor badge</Label>
              <div className="mt-1">
                <TextInput id="lastName" name="lastName" placeholder="Green"
                  value={badgeSup || undefined} />
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
            {/* <div>
              <Label htmlFor="phone">Active</Label>
              <div className="mt-1">
                <TextInput
                  id="phone"
                  name="phone"
                  placeholder="1196"
                  type="tel"
                  value={Active ==1 ? 'Active' : 'Inactive' || undefined}
                />
              </div>
            </div> */}
            <div>
              <Label htmlFor="department">Status</Label>
              <div className="mt-1">
                <Select
                  id="department"
                  name="department"
                  placeholder="IT"
                  value={id_status_bonus}
                  onChange={(event) => setIdBonusStatus(event.target.value)}
                >

                  {(userLevel === '3' && userCompany === '3') || (userLevel === '3' && userCompany === '1') || (userLevel === '3' && userCompany === '2') ? (
                    bonusData.map((status, index) => (
                      <option key={index} value={(status as any).status_id}>
                        {(status as any).status_id}
                      </option>
                    ))
                  ) : (
                    status === 'DONE' ? (
                      <>
                        <option value="DONE">DONE</option>
                        <option value="APPR">APPR</option> {/* Nueva opción 'APPR' */}
                      </>
                    ) : (
                      <>
                        <option value="DRAFT">DRAFT</option>
                        {data.some((item) => item.result === 'true') ? (
                          <option value="REVW" disabled={true}>
                            REVW
                          </option>
                        ) : (
                          <>
                            <option value="REVW">REVW</option>
                            <option value="APPR">APPR</option> {/* Nueva opción 'APPR' */}
                          </>
                        )}
                      </>
                    )
                  )}
                </Select>

              </div>
            </div>
            {/* <div>
              <Label htmlFor="company">Position</Label>
              <div className="mt-1">
                <TextInput
                  id="company"
                  name="company"
                  placeholder="Developer"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordCurrent">Current password</Label>
              <div className="mt-1">
                <TextInput
                  id="passwordCurrent"
                  name="passwordCurrent"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">New password</Label>
              <div className="mt-1">
                <TextInput
                  id="passwordNew"
                  name="passwordNew"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => { sendDataStatusHeader(); setOpen(false) }}>
            Update all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


const NewUserModal: FC<{ bonusActive: any; headerId: any; badgeSup: any; Name: any; bill_To: any; status: any; Active: any; }> = function ({ bonusActive, headerId, badgeSup, Name, bill_To, status, Active }) {


  const [isOpen, setOpen] = useState(false);

  const statuActive = Active;
  const [dataSS, setData] = useState([] as any[])

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


  if (userLevel === "6" && userCompany === "1") {

    // Función para cargar los datos
    const fetchData = () => {
      axios.get(`https://bn.glassmountainbpo.com:8080/api/bonus/get_agents_training/${bill_To}`)
        .then(res => setData(res.data))
        .catch(error => console.error(error));
      console.log('-------> datos' + dataSS)
    };


    useEffect(() => {
      // Llama a fetchData automáticamente cuando el componente se monta
      fetchData();
    }, []); // Este efecto se ejecutará cuando el componente se monte


  } else if (headerId.slice(0, 4) === 'MANA') {
    console.log('et');


    const fetchData = () => {
      axios.get(`https://bn.glassmountainbpo.com:8080/api/bonus/get_agents_ma/${bill_To}`)
        .then(res => setData(res.data))
        .catch(error => console.error(error));
      console.log('-------> datos' + dataSS)
    };

    useEffect(() => {
      // Llama a fetchData automáticamente cuando el componente se monta
      fetchData();
    }, []); // Este efecto se ejecutará cuando el componente se monte





  } else if (userLevel === "5" && userCompany === "1") {

    // Función para cargar los datos
    const fetchData = () => {
      axios.get(`https://bn.glassmountainbpo.com:8080/api/bonus/get_agents_qa/${bill_To}`)
        .then(res => setData(res.data))
        .catch(error => console.error(error));
      console.log('-------> datos' + dataSS)
    };

    useEffect(() => {
      // Llama a fetchData automáticamente cuando el componente se monta
      fetchData();
    }, []); // Este efecto se ejecutará cuando el componente se monte


  } else {

    // Función para cargar los datos
    const fetchData = () => {
      axios.get(`https://bn.glassmountainbpo.com:8080/api/bonus/get_agents/${bill_To}`)
        .then(res => setData(res.data))
        .catch(error => console.error(error));
      console.log('-------> datos' + dataSS)
    };



    useEffect(() => {
      // Llama a fetchData automáticamente cuando el componente se monta
      fetchData();
    }, []); // Este efecto se ejecutará cuando el componente se monte




  }


  console.log(Name);
  console.log(status);
  console.log(bonusActive);
  console.log(badge);
  console.log(bill_To);
  const [selectedValue, setSelectedValue] = useState("");
  const [fullname_agent, setFullnameAgent] = useState(""); // Variable para almacenar el nombre completo del agente

  // Api para guardar apilado

  const handleButtonClick = () => {
    // Utiliza consolidadoData en tu solicitud HTTP
    axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_details_all/', consolidadoData)
      .then(response => {
        // Maneja la respuesta de la API si es necesario
        console.log(response.data);
        window.location.reload();
      })
      .catch(error => {
        // Maneja los errores de la solicitud si es necesario
        console.error(error);
      });

  };


  const handleSelectChange = (event: any) => {
    const selectedIndex = event.target.value;
    setSelectedValue(selectedIndex);
    console.log(selectedValue)
    console.log(fullname_agent)

    // Obtener el nombre completo del agente seleccionado
    const selectedAgent = dataSS.find((agent) => agent.badge === selectedIndex);
    if (selectedAgent) {
      setFullnameAgent(selectedAgent.fullname);
    }
  };

  // Buscando subir el excel

  const [consolidadoData, setConsolidado] = useState([]); // Estado para almacenar consolidado

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent: string = e.target.result;

        try {
          const workbook: any = XLSX.read(fileContent, { type: 'binary' });
          const sheetName: any = workbook.SheetNames[0];
          const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          console.log('Contenido del archivo (objeto JSON):', sheetData);
          handleSelectChange(e);

          // Comparación de valores entre sheetData y dataSS
          const consolidado: any = sheetData.map((sheetItem: any) => {
            const dataSSItem = dataSS.find((item: any) => item.badge.toString() === sheetItem.badge.toString());
            const fullname = dataSSItem ? dataSSItem.fullname : sheetItem.fullname;
            const bill_to_training = dataSSItem ? dataSSItem.bill_to : sheetItem.bill_to;
            const bill_to_qa = dataSSItem ? dataSSItem.bill_to : sheetItem.bill_to;
            const bill_to_ma = dataSSItem ? dataSSItem.bill_to : sheetItem.bill_to;

            //Training Bonus

            if (userLevel === "6" && userCompany === "1") {

              return {
                ...sheetItem,
                ok: dataSSItem ? '1' : '0',
                type_bonus: headerId + sheetItem.badge,
                category: bill_to_training,
                user_created: badgeSup,
                name: fullname,

              };

              //QA Bonus

            } else if (headerId.slice(0, 4) === 'MANA') {

              return {
                ...sheetItem,
                ok: dataSSItem ? '1' : '0',
                type_bonus: headerId + sheetItem.badge,
                category: bill_to_ma,
                user_created: badgeSup,
                name: fullname,

              };


            } else if (userLevel === "5" && userCompany === "1") {

              return {
                ...sheetItem,
                ok: dataSSItem ? '1' : '0',
                type_bonus: headerId + sheetItem.badge,
                category: bill_to_qa,
                user_created: badgeSup,
                name: fullname,

              };

            } else {

              return {
                ...sheetItem,
                ok: dataSSItem ? '1' : '0',
                type_bonus: headerId + sheetItem.badge,
                category: bill_To,
                user_created: badgeSup,
                name: fullname,

              };

            }


          });

          // consolidado ahora contendrá los elementos de sheetData con el campo "ok" agregado
          setConsolidado(consolidado);
          console.log(consolidado);

          Swal.fire({
            icon: 'success',
            title: 'File uploaded',
            text: 'The file is ready to be uploaded',
          });
        } catch (error) {
          console.error('No se pudo analizar el archivo como JSON:', error);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <>

      <Button
        className={`bg-${statuActive == 1 ? 'green' : 'gray'}-700`}
        onClick={() => { setOpen(!isOpen); }}
        disabled={statuActive != 1}
      >
        <HiOutlineDocumentAdd className="text-lg" style={{ color: '#ffff' }} />
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>New Bonus Details</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Bonus Type</Label>
                <div className="mt-1">
                  <TextInput
                    id="firstName"
                    name="firstName"
                    placeholder="Bonnie"
                    value={headerId}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Status</Label>
                <TextInput className="mt-2" id="lastName" name="lastName" placeholder="Green" value={Active == 1 ? "Activo" : 'Inactivo'} />
              </div>
              <div>
                <Label htmlFor="phone">Category</Label>
                <div className="mt-1">
                  <TextInput
                    id="Category"
                    name="Category"
                    placeholder="GMBPO"
                    type="tel"
                    value={bill_To}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Badge Supervisor</Label>
                <div className="mt-1">
                  <TextInput
                    id="company"
                    name="company"
                    placeholder="Developer"
                    value={badgeSup}
                  />
                </div>
              </div>
              <div className="mt-1">
              </div>
            </div>
            <div>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        CSV, XLS, XLSX up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => { handleButtonClick(); setOpen(false) }}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  );
};



const DeleteUserModal: FC<{ idBonus: any; bonusActive: any; createdUser: any; status: any }> = function ({ idBonus, bonusActive, createdUser, status }) {
  const [isOpen, setOpen] = useState(false);


  const headerStatus = () => {
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
        disabled={status === 'DONE'}
      >
        {bonusActive == 1 ? (
          <HiOutlineMinusCircle className="text-lg" />
        ) : bonusActive == 0 ? (
          <HiOutlinePlusCircle className="text-lg" />
        ) : (
          <HiOutlineMinusCircle className="text-lg" />
        )}
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

    </div>
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
      <FaUserCheck className="text-2xl" onClick={() => setOpen(true)} />
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-6 pt-6 pb-0">
          <span className="sr-only">Activate user(s)</span>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <FaUserCheck className="text-7xl text-green-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to activate {users.length} user(s)?
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


export default NewHeaderBonus;
