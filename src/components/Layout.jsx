import React, { useState } from 'react'; // Import React and useState for state management
import { Link, NavLink } from 'react-router-dom'; // Import Link and NavLink for routing
import TransitionEffect from './TransitionEffect';
import logo from '../../public/logo_udaan.png'

const Layout = ({children}) => {
    const [navbarOpen, setNavbarOpen] = useState(true);

  return (
    <div className='h-screen w-screen'>
        <header className="bg-white text-black h-[10vh]">
            
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 md:px-20">
        <div className="flex lg:flex-1">
            <Link to={"/"} className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src={logo} alt="" />
            </Link>
        </div>

        <div className="flex lg:hidden">
            <button
            type="button"
            onClick={() => setNavbarOpen((prev) => !prev)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
            <span className="sr-only">Open main menu</span>
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
            </svg>
            </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
            <NavLink
            end
            to={"/events"}
            className="text-sm font-semibold leading-6 text-gray-900"
            >
            Campaigns
            </NavLink>
            <NavLink
            end
            to={"/budget"}
            className="text-sm font-semibold leading-6 text-gray-900"
            >
            Expenses
            </NavLink>
            <NavLink
            end
            to={"/grants"}
            className="text-sm font-semibold leading-6 text-gray-900"
            >
            Grants
            </NavLink>
            <NavLink
            end
            to={"/supplier-list"}
            className="text-sm font-semibold leading-6 text-gray-900"
            >
            Suppliers
            </NavLink>
        </div>
        </nav>

        <div
        className={navbarOpen ? "hidden" : ""}
        role="dialog"
        aria-modal="true"
        >
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
            <Link to={"/"} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="/logo.png" alt="" />
            </Link>
            <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
                <span className="sr-only">Close menu</span>
                <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </button>
            </div>
            <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                <NavLink
                    end
                    to="/events"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-500"
                >
                    Campaigns
                </NavLink>
                <NavLink
                    end
                    to="/budget"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-500"
                >
                    Expenses
                </NavLink>
                <NavLink
                    end
                    to="/grants"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-500"
                >
                    Grants
                </NavLink>
                <NavLink
                    end
                    to="/supplier-list"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-500"
                >
                    Suppliers
                </NavLink>

                
                </div>
            </div>
            </div>
        </div>

        </div>
    </header>

    {children}
  </div>
  )
}

export default Layout