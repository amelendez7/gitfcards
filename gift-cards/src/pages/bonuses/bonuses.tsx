/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
  Select,
  Badge

} from "flowbite-react";
import type { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react"
import CryptoJS from "crypto-js";


import {
  // HiCog,
  // HiDotsVertical,
  // HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiCheckCircle,
  HiOutlinePencilAlt,
  HiOutlineMinusCircle,
  HiOutlinePlusCircle,
  HiOutlineEye
  // HiUpload,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
// import { Pagination } from "../users/list";
import axios from "axios";

const BonusesPage: FC = function () {
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
              <Breadcrumb.Item href="/bonuses/all">
                Bonuses
              </Breadcrumb.Item>
              <Breadcrumb.Item>All</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All bonuses
            </h1>
          </div>
          <div className="block items-center sm:flex">
            {/* <SearchForProducts /> */}
            <div className="hidden space-x-1 border-l border-gray-100 pl-2 dark:border-gray-700 md:flex">
              {/* <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Configure</span>
                <HiCog className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Delete</span>
                <HiTrash className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Purge</span>
                <HiExclamationCircle className="text-2xl" />
              </a> */}
              {/* <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Settings</span>
                <HiDotsVertical className="text-2xl" />
              </a> */}
            </div>
            <div className="flex w-full items-center sm:justify-end">
              <AddProductModal />
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
      {/* <Pagination /> */}
    </NavbarSidebarLayout>
  );
};

// const SearchForProducts: FC = function () {
//   return (
//     <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
//       <Label htmlFor="products-search" className="sr-only">
//         Search
//       </Label>
//       <div className="relative mt-1 lg:w-64 xl:w-96">
//         <TextInput
//           id="products-search"
//           name="products-search"
//           placeholder="Search"
//         />
//       </div>
//     </form>
//   );
// };

const AddProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [category, setCategory] = useState('');

  const [description, setDescription] = useState('');
  const [id_status_bonus, setIdBbonusStatus] = useState('');
  const [bonusData, setBonusData] = useState([]);

  const user3 = localStorage.getItem("badgeSession") || ""
  const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
  const createdUser = user2.toString(CryptoJS.enc.Utf8);


  const userLevel3 = localStorage.getItem("userLevel") || ""
  const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
  const userLevel: string = userLevel2.toString(CryptoJS.enc.Utf8);
  console.log(userLevel)

  const userCompany3 = localStorage.getItem("userCompany") || ""
  const userCompany2 = (userLevel3 ? CryptoJS.AES.decrypt(userCompany3, "Tyrannosaurus") : "")
  const userCompany: string = userCompany2.toString(CryptoJS.enc.Utf8);
  console.log(userCompany)


  const active = "1";

  const handleAddBonus = async () => {
    const dataToSend = {
      bonus_type: category.substring(0, 4).toUpperCase(),
      name: category,
      description,
      active,
      // value,
      id_status_bonus: active,
      created_user: createdUser
    };

    try {
      console.log(dataToSend);
      console.log(bonusData);

      const response = await axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/bonus_type/', dataToSend);

      // Manejar la respuesta de la API si es necesario

      console.log('Solicitud enviada con éxito', response.data);

      // Cierra el modal u realiza otras acciones necesarias
      setOpen(false);
      window.location.reload()

    } catch (error) {
      // Manejar los errores si ocurren
      console.log(dataToSend);
      console.error('Error al enviar la solicitud:', error);
    }
  };


  // Manejar cambios en el campo category

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setCategory(e.target.value);
  };

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


  return (
    <>
      {userLevel === '3' && userCompany === '3' ? (
        <Button color="primary" onClick={() => setOpen(!isOpen)}>
          <FaPlus className="mr-3 text-sm" />
          Add new bonus
        </Button>
      ) : null}

      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add bonus</strong>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddBonus}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <TextInput
                  id="name"
                  name="name"
                  placeholder='Bonus name'
                  className="mt-1"
                  value={category}
                  onChange={handleCategoryChange}
                />
              </div>
              <div>
                <Label htmlFor="bonus_type">Bonus type</Label>
                <TextInput
                  id="bonus_type"
                  name="bonus_type"
                  placeholder="Bonus id"
                  className="mt-1"
                  value={category.substring(0, 4).toUpperCase()}

                />
              </div>

              <div>
                <Label htmlFor="id_status_bonus">Status bonus</Label>
                <Select
                  id="id_status_bonus"
                  name="id_status_bonus"
                  value={id_status_bonus}
                  onChange={(event) => setIdBbonusStatus(event.target.value)}
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>

                </Select>
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="New bonus approved by ..."
                  rows={6}
                  className="mt-1"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            color="primary"
            onClick={() => {
              handleAddBonus(); // Llama a la función handleAddBonus
              setOpen(false);
            }}
          >
            Add bonus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const EditProductModal: FC<{
  nameBonus: any;
  descriptionBonus: any;
  idBonus: any;
  valueBonus: any;
  createdUser: any;
  statusBonus: any;
  bonusStatus: any;
}> = ({ nameBonus, descriptionBonus, idBonus, createdUser, bonusStatus }) => {

  const [description_bonus, setDescription] = useState(descriptionBonus);
  const [isOpen, setOpen] = useState(false);
  const [bonusData, setBonusData] = useState([]);

  const [bonus_status, setBonusStatus] = useState(bonusStatus);

  useEffect(() => {
    axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/status/')
      .then((res) => {
        console.log(bonusData);
        console.log(res.data);
        setBonusData(res.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de bonus:', error);
      });
  }, []);


  const handleButtonClick = () => {
    // Supongamos que tienes acceso a los valores necesarios para completar los parámetros
    const bonus_type = idBonus;
    const status = bonusStatus; // bonusActive determina el valor de "status"
    const created_user = createdUser;
    // Realiza la solicitud HTTP a la API
    axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/status_type', {
      bonus_type,
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

      <Button color="" className="bg-green-500 " onClick={() => setOpen(!isOpen)}>
        <HiOutlinePencilAlt className="text-lg" color="white" />
      </Button>

      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit bonus</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <TextInput
                  id="name"
                  name="name"
                  placeholder='Bonus name'
                  className="mt-1"
                  value={nameBonus} />
              </div>
              <div>
                <Label htmlFor="bonus_type">Bonus type</Label>
                <TextInput
                  id="bonus_type"
                  name="bonus_type"
                  placeholder="Bonus id"
                  className="mt-1"
                  value={idBonus} />
              </div>

              <div>
                <Label htmlFor="id_status_bonus">Status bonus</Label>
                <Select
                  id="id_status_bonus"
                  name="id_status_bonus"
                  value={bonus_status} // Establece el valor seleccionado en el <Select>
                  onChange={(event) => setBonusStatus(event.target.value)} // Maneja el cambio de valor
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Select>
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="New bonus approved by ..."
                  rows={6}
                  className="mt-1"
                  value={description_bonus}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            color="primary"
            onClick={() => {
              handleButtonClick();
              setOpen(false)

            }}
          >
            Edit bonus
          </Button>

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


  // const userName = localStorage.getItem("badgeSession") || undefined;
  //const url = `https://bn.glassmountainbpo.com:8080/api/hired/`;

  const [result, setResult] = useState<any>([]); //JSON Axios Data
  const [badge_, setBadge] = useState<any>([badge]); //Badge

  useEffect(() => {
    axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/status/')
      .then((res) => {
        console.log(res.data);
        console.log(badge_ + setBadge + setResult);

      })
      .catch((error) => {
        console.error('Error al obtener datos de bonus:', error);
      });

  }, []);

  // const handleTrack = () => {
  //   if (badge_.length !== 0) {
  //     axios.get(url + badge)
  //       .then((response) => {
  //         setResult(response.data)
  //       });
  //     setBadge
  //   } [];
  // };
  // handleTrack();

  return (
    <>
      <Button className="bg-indigo-600 dark:bg-indigo-500  dark:hover:bg-indigo-700" href={`/bonuses/bonusHeader?bonus_type=${bonus_type}&category=${result.name_rol}`}>
        <HiOutlineEye className="text-lg" />
      </Button>
    </>
  );
};


const NewProductModal: FC<{
  nameBonus: any;
  idBonus: any;
  statusBonus: any;

}> = ({ nameBonus, idBonus, }) => {

  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(''); // Inicializar como nulo
  const currentDate = new Date(); // Fecha actual
  const targetDate = new Date(); // Clonar la fecha actual
  targetDate.setDate(15); // Establecer el día en 15

  const bonus_type = idBonus;

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



  //const url = `https://bn.glassmountainbpo.com:8080/api/hired/`;

  const [result, setResult] = useState<any>([]); //JSON Axios Data
  const [bonusData, setBonusData] = useState([]);
  const [category, setCategory] = useState([]);
  const [type_status_bonus, setStatusBonus] = useState("DRAFT");
  const [categorySelected, setCategorySelected] = useState("");

  useEffect(() => {
    axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/status/')
      .then((res) => {
        console.log(res.data);
        setBonusData(res.data); 
        console.log(result);
        console.log(setResult);
      })
      .catch((error) => {
        console.error('Error al obtener datos de bonus:', error);
      });
  }, []);


  // useEffect(() => {
  //   axios.get(`${url}${badge}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setResult(response.data);
  //     })
  //     .catch((error) => {
  //       // Manejar errores aquí
  //       console.error('Error en la solicitud a la API:', error);
  //     });
  // }, []);



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



  useEffect(() => {
    // Lógica para habilitar o deshabilitar las opciones del select
    const selectElement = document.getElementById('productName');

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
  }, [currentDate, targetDate]);

  console.log("Current" + currentDate)
  console.log("targe" + targetDate)



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
        window.location.href = `/bonuses/bonusHeader?bonus_type=${bonus_type}&category=${category}`;

      })
      .catch(error => {
        // Maneja los errores de la solicitud si es necesario
        console.error("Error al enviar la solicitud:", error);
      });
  };


  return (
    <>

      <Button
        color="primary"
        onClick={() => setOpen(!isOpen)}

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
                <div className="mt-1">
                  <div className="mt-1">
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
                        ) : (
                          category.map((status, index) => (
                            <option key={index} value={(status as any).name}>
                              {(status as any).name}
                            </option>
                          ))
                        )}
                    </Select>
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

const DeleteProductModal: FC<{ bonusActive: any; idBonus: any; createdUser: any }> = function ({ bonusActive, idBonus, createdUser }) {

  const [isOpen, setOpen] = useState(false);

  const handleButtonClick = () => {
    // Supongamos que tienes acceso a los valores necesarios para completar los parámetros
    const bonus_type = idBonus;
    const status = bonusActive; // bonusActive determina el valor de "status"
    const created_user = createdUser;
    // Realiza la solicitud HTTP a la API
    axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/status_type', {
      bonus_type,
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
      {/* <Button color="failure" onClick={() => setOpen(!isOpen)}> */}
      {bonusActive == '1' ?
        <Button color={bonusActive === 1 ? "dark" : "gray"} onClick={() => { setOpen(!isOpen); }}>
          <HiOutlineMinusCircle className="text-lg" />
        </Button> : <Button color={bonusActive === 1 ? "dark" : "gray"} onClick={() => { setOpen(!isOpen); }}>
          <HiOutlinePlusCircle className="text-lg" />
        </Button>
      }

      {/* <Button color={bonusActive === 1 ? "dark" : "gray"} onClick={() => { setOpen(!isOpen); }}>
        <HiTrash className="text-lg" />
      </Button> */}
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

const ProductsTable: FC = function () {



  //Capturamos el idUser del localStore
  // const createdUser = JSON.parse(localStorage.getItem("badgeSession") || "")

  const user3 = localStorage.getItem("badgeSession") || ""
  const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
  const createdUser = user2.toString(CryptoJS.enc.Utf8);

  const [data, setData] = useState([] as any[])
  const badge = createdUser;

  const userLevel3 = localStorage.getItem("userLevel") || ""
  const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
  const userLevel: string = userLevel2.toString(CryptoJS.enc.Utf8);
  console.log(userLevel)

  const userCompany3 = localStorage.getItem("userCompany") || ""
  const userCompany2 = (userLevel3 ? CryptoJS.AES.decrypt(userCompany3, "Tyrannosaurus") : "")
  const userCompany: string = userCompany2.toString(CryptoJS.enc.Utf8);
  console.log(userCompany)

  useEffect(() => {
    if ((userLevel === '3' || userLevel === '4') && (userCompany === '3')) {
      axios.get('https://bn.glassmountainbpo.com:8080/api/bonus/list_bonus/')
        .then(res => setData(res.data))
    } else {
      axios.post('https://bn.glassmountainbpo.com:8080/api/bonus/list_bonus_supervisor/', { badge })
        .then(res => setData(res.data))
    }
  }, []); // <- Este arreglo vacío indica que el efecto solo se ejecutará una vez
  


  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <span className="sr-only">Toggle selected</span>
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell>Bonus Name</Table.HeadCell>
        <Table.HeadCell>Active bonuses</Table.HeadCell>
        <Table.HeadCell>Date</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        {/* <Table.HeadCell>Value</Table.HeadCell> */}

        {((userLevel === '4' &&  userCompany === '3') || (userLevel === '2' && userCompany ==='2')) ? "" :

          <Table.HeadCell>Actions</Table.HeadCell>
        }
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {
          data.map((bonus, index) => {
            return <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Table.Cell className="w-4 p-4">
                <Checkbox />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {bonus.bonus_name}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {bonus.id_bonus}
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap flex p-4 text-sm font-normal text-white-500 dark:white-400">
                <div className="text-base font-semibold text-white-900 dark:text-white">
                  {bonus.count_header >= 1 ?
                    <Badge className="bg-danger" color="white" style={{ backgroundColor: '#2CA65A', color: 'white', textAlign: 'center' }}>
                      {bonus.count_header} applied
                    </Badge> :
                    <Badge className="bg-danger" color="white" style={{ backgroundColor: '#2C4B57', color: 'white', textAlign: 'center' }}>
                      {bonus.count_header} applied
                    </Badge>
                  }

                </div>
              </Table.Cell>

              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {bonus.date_created}
                {bonus.coun}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                <div>
                  <div>
                    {
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {bonus.active === 1 ? (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#31C48D',
                                marginRight: '8px', // Espacio entre el círculo y el texto
                              }}
                            ></div>
                            Active
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#F98080',
                                marginRight: '8px', // Espacio entre el círculo y el texto
                              }}
                            ></div>
                            Inactive
                          </div>
                        )}
                      </div>
                    }
                  </div>

                </div>
              </Table.Cell>
              {/* <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                ${bonus.value}
              </Table.Cell> */}

              {((userLevel === '4' )|| (userLevel === '2' && userCompany ==='2')) ? "" :

                <Table.Cell className="space-x-2 whitespace-nowrap p-4">
                  <div className="flex items-center gap-x-3">
                    {userLevel === '4' ? "" :
                      <NewProductModal
                        nameBonus={bonus.bonus_name}
                        idBonus={bonus.id_bonus}
                        statusBonus={bonus.active}
                      />
                    }
                    {userLevel === '4' ? "" : < GoItHeader nameBonus={bonus.bonus_name}
                      idBonus={bonus.id_bonus}
                      statusBonus={bonus.id_status}
                    />
                    }
                    {userLevel === '3' && userCompany === '3' ? (
                      <EditProductModal
                        nameBonus={bonus.bonus_name}
                        descriptionBonus={bonus.description}
                        idBonus={bonus.id_bonus}
                        valueBonus={bonus.value}
                        createdUser={createdUser}
                        statusBonus={bonus.id_status}
                        bonusStatus={bonus.active}
                      />
                    ) : null}
                    {userLevel === '3' && userCompany === '3' ? (
                      <DeleteProductModal bonusActive={bonus.active} idBonus={bonus.id_bonus} createdUser={createdUser} />
                    ) : null}

                  </div>
                </Table.Cell>
              }

            </Table.Row>
          })
        }
      </Table.Body>
    </Table>
  );

};

export default BonusesPage;
