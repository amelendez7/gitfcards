/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from 'react';

import NavbarSidebarLayout from '../../layouts/navbar-sidebar';
import BonusTemplate from '../../../src/templates/BonusTemplate.xlsx';


const InfoUsers: FC = function () {
    const [openSection, setOpenSection] = useState<number | null>(null);

    const handleSectionClick = (sectionIndex: number) => {
        setOpenSection((prevSection) => (prevSection === sectionIndex ? null : sectionIndex));
    };

    const handleDownload = () => {
        const anchor = document.createElement('a');
        anchor.href = BonusTemplate
        anchor.download = 'BonusTemplate.xlsx'
        anchor.click()
    }

    return (
        <NavbarSidebarLayout isFooter={true}>

            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-4xl mb-4 pt-4">

                                Bonus System Brand Manual

                            </h1>
                            <div className="mt-8 mb-4">
                                <span className="text-base font-normal text-gray-600 dark:text-gray-100 mb-4">
                                    Section 1: Registering a New User
                                </span>
                            </div>

                            <div>
                                <div id="accordion-open" data-accordion="open">
                                    {/* Acordeón 1 */}
                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 1 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 1 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(1)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                1.1 Registering a New User
                                            </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 1 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            If you wish to register a new user, please send a request via email to{" "}
                                            <a
                                                href={`mailto:devs@glassmountainbpo.com`}
                                                className="text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                devs@glassmountainbpo.com
                                            </a>{" "}
                                            attaching their respective badge and name. The IT team will provide the username and password.
                                        </p>

                                    </div>

                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 1 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 1.1 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(1.1)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                1.2 User types
                                            </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 1.1 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            <b>Directors:</b> Directors, including those from the Finance Department, are the highest-level users responsible for overseeing and approving all applied bonuses. They play a crucial role in the review and authorization of bonus requests. They are able to add new users.
                                            <br />
                                            <br />
                                            <b>Manager:</b> Managers are operational leaders responsible for supervising bonus applications within their respective accounts. They have the authority to apply bonuses and ensure their proper implementation.
                                            <br />
                                            <br />
                                            <b>Supervisor:</b> Supervisors are designated individuals assigned to manage and oversee operations within each account. They play a key role in coordinating and facilitating activities related to bonuses for their assigned accounts.
                                        </p>

                                    </div>

                                    {/* ACA VAN LOS ACORDIONES */}

                                    <div className="mt-8 mb-4">
                                        <span className="text-base font-normal text-gray-600 dark:text-gray-100 mb-4">
                                            Section 2: Bonus Submission Process
                                        </span>
                                    </div>

                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 1 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 2 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(2)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                2.1 Prerequisites
                                            </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>


                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 2 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            •	Have a properly registered user (see "Registering a New User" section 1.1, user type must be "Manager").

                                        </p>

                                    </div>

                                    {/* Aca va un item dentro de un item modal */}

                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 2 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 3 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(3)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                2.2 Submitting a New Bonus
                                            </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>


                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 3 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            1.	Access the "Bonus Catalog" section.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            2.	All bonus types created by the Supervisor will be listed.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            3.	Select the type of bonus to apply.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            4.	Click the "Add (+)" button to register a new bonus header.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            5.	Complete the required fields in the pop-up screen:
                                            <p>•	Date: Biweekly periods for each month.</p>
                                            <p>•	ID, Bonus Type and Badge user are automatically filled and cannot be manually changed.</p>
                                            <p>•	Department: Select the account to which the bonus will be applied.</p>
                                            <p>•	Bonus Status: By default, it is "DRAFT" and will change based on the Director's review.</p>
                                            <br>
                                            </br>
                                            <p>*Important: The status will change as the information is reviewed by the "Directors".</p>
                                            <br />
                                            <p>6.	Once the bonus header is created, all created headers for that selected bonus type can be viewed.</p>

                                        </p>

                                    </div>



                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 3 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 4 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(4)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                2.3 Adding the List of Agents                                          </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>


                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 4 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            1.	Click the "+" button to upload the list of agents from an Excel file.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            2.	Select the Excel file containing agent information and the corresponding account. Ensure to include the required fields: badge and value. (Fullname is optional, the column can be left blank but not deleted).
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            3.	Click "Save All."                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            4.	In the bonus detail view, all agents to whom bonuses were applied will appear.
                                        </p>
                                        <br>
                                        </br>
                                        <p className="mb-2 text-gray-500 font-bold dark:text-gray-400">
                                            Note: You can download the template file <button className='no-underline hover:underline text-primary-500' onClick={handleDownload}>here.</button>
                                        </p>


                                    </div>



                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 5 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 5 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(5)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                2.4 Agent Management                                            </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>


                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 5 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            1.		To remove an agent, click "(user -)."
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            2.		To delete multiple agents, select the users using the check and then click the "(user -)" button.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            3.		In the "Search for users" box, users can be filtered by position, value, or name.
                                        </p>
                                        <br>
                                        </br>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            Note: Once a user is deactivated, it cannot be recovered unless contacted with the "Administrator" for reactivation.                        </p>
                                        <br></br>


                                    </div>




                                    <div className="mt-8 mb-4">
                                        <span className="text-base font-normal text-gray-600 dark:text-gray-100 mb-4">
                                            Section 3:  Applied Bonuses
                                        </span>
                                    </div>

                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 8 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 8 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(8)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                3.1 Login to your account using credentials                            </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 8 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            1.	Log in to your account using the credentials provided by the administrator.

                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            2. Go to the report section to see the bonuses approved

                                        </p>

                                    </div>


                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 9 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 9 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(9)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                3.2 Approve or deny bonuses.
                                            </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>


                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 9 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-4 text-gray-500 dark:text-gray-400">

                                            1.  Navigating to "Applied Bonuses" will display all active bonuses corresponding to each month and period.


                                        </p>

                                        <p className="mb-4 text-gray-500 dark:text-gray-400">
                                            2.  Choose the bonus for which you wish to change the status for approval.
                                            <p className="mb-4 mt-4 ml-4"> Status options:</p>

                                            <p className="mb-4 mt-2 ml-4">
                                                <b>DONE:</b> The process has been completed and it is ready for finance to issue.
                                            </p>
                                            <p className="mb-4 mt-4 ml-4">
                                               <b>DRAFT: </b> Newly created bonus.
                                            </p>
                                            <p className="mb-4 mt-4 ml-4">
                                                <b>APPR: </b> If you want to send it to the Directors (Anne and Melvin) for review.
                                            </p>
                                            <p className="mb-4 mt-4 ml-4">
                                                <b>REVW:</b> Indicates that the selected bonus is in progress and is pending a transition.
                                            </p>
                                        </p>

                                        <p className="mb-4 text-gray-500 dark:text-gray-400">

                                            3. Approve the bonus (Managers should change the status to APPR) </p>


                                        <p className="mb-4 text-gray-500 dark:text-gray-400">
                                            4.	If the results of the bonuses applied to each agent are correct, then the status should be changed to "DONE" to finalize the approval process, or it will be changed to "REVW" for Managers to update the information loaded into the system.
                                        </p>

                                        <p className="mb-4 text-gray-500 dark:text-gray-400">
                                            5.	When the status is changed to "DONE," an email will be sent to finance for them to proceed with downloading the information; otherwise, finance will not be able to download the reports to issue the bonuses.
                                        </p>



                                        <br></br>
                                        <p className="mb-4 text-gray-500 dark:text-gray-400">
                                            Note: Only Directors have the authority to change the status of the bonuses; no one else is authorized to modify the status to ensure the validation of all bonuses applied by Management.
                                        </p>
                                    </div>
                                    <div className="mt-8 mb-4">
                                        <span className="text-base font-normal text-gray-600 dark:text-gray-100 mb-4">
                                            Section 4: Obtaining Reports of Applied Bonuses
                                        </span>
                                    </div>

                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 6 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 6 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(6)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                4.1 General Report of Applied Bonuses                            </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 6 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            1.	Click on "Applied Bonuses."
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            2.	Filter bonuses by dates (currently only shows those of the current month).
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            3.	Download a general report of each applied bonus by clicking "Export."
                                        </p>
                                    </div>


                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 7 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 7 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(7)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                4.2 Specific Report per Account                           </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>


                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 7 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            1.	In the applied bonus table, click "Export" to obtain a specific report per account.
                                        </p>
                                        <br></br>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        The system correctly records bonuses only if the agent belongs to the selected department or account. If the agent doesn't correspond, it will be recorded as "OK? No." Additionally, duplicate bonuses will not be applied. In case of exceptions where a badge needs to be added under the approval of the Manager, a request should be submitted to the user Directors (Anne) to add that agent with the consent of the Director.
                                        </p>
                                    </div>





                                    <div className="mt-8 mb-4">
                                        <span className="text-base font-normal text-gray-600 dark:text-gray-100 mb-4">
                                            Section 5: Account Settings
                                        </span>
                                    </div>

                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 10 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 10 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(10)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                5.1 Change Password                           </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 10 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            1.	Click on your profile picture (or the GlassMountain logo in case you do not have one) on the top right corner.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            2.	Click on settings.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            3.	Fill both password fields and click save.
                                        </p>
                                        <br />
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">Note: if you want to change your username contact an Administrator or send a request to {" "}
                                            <a
                                                href={`mailto:devs@glassmountainbpo.com`}
                                                className="text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                devs@glassmountainbpo.com
                                            </a>{" "}</p>
                                    </div>
                                    <div className="mt-8 mb-4">
                                        <span className="text-base font-normal text-gray-600 dark:text-gray-100 mb-4">
                                            Section 6: Dashboard
                                        </span>
                                    </div>

                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 11 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 11 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(11)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                6.1 Overview Graph                           </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 11 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            This graph shows the total amounts of bonuses applied within the last 10 months. It is account(s) specific for Supervisors and Managers, Administrators see the grand total for all accounts.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            Note: You can zoom in by clicking and dragging the cursor on the graph area.
                                        </p>
                                    </div>
                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 12 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 12 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(12)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                6.2 Latest Bonuses Transactions                           </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 12 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            This section provides an overview of the latest bonuses headers applied, their department, status, and amount.</p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">It is account(s) specific for Supervisors and Managers, Administrators see all accounts.</p>
                                    </div>
                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 13 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 13 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(13)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                6.3 New hires                          </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 13 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >

                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            This section provides an overview of the latest 5 new hires.</p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">It is not account(s) specific.</p>
                                    </div>
                                    <div className="mt-8 mb-4">
                                        <span className="text-base font-normal text-gray-600 dark:text-gray-100 mb-4">
                                            Section 7: Flowchart
                                        </span>
                                    </div>

                                    <h1 id="accordion-open-heading-1">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${openSection === 14 ? 'bg-gray-100 dark:bg-gray-800' : ''
                                                }`}
                                            data-accordion-target="#accordion-open-body-1"
                                            aria-controls="accordion-open-body-1"
                                            aria-expanded={openSection === 14 ? 'true' : 'false'}
                                            onClick={() => handleSectionClick(14)}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 me-2 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>{" "}
                                                7.1 Flowchart                          </span>

                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h1>
                                    <div
                                        id="accordion-open-body-1"
                                        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${openSection === 14 ? '' : 'hidden'
                                            }`}
                                        aria-labelledby="accordion-open-heading-1"
                                    >
                                        <img
                                        alt="Flowchart Light"
                                        src="/images/flowchart.png"
                                        className="h-full dark:hidden"
                                        />
                                        <img
                                        alt="Flowchart Dark"
                                        src="/images/flowchart-dark.png"
                                        className="h-full hidden dark:block"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pl-4 pt-2 flex items-left justify-between"></div>
                        </div>
                    </div>
                </div>
            </div>
        </NavbarSidebarLayout >
    );
};

export default InfoUsers;