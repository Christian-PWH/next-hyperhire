"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  FiHome,
  FiSearch,
  FiList,
  FiRadio,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiFile,
  FiGrid,
  FiFolder,
} from "react-icons/fi";
import { useState } from "react";
import { MdFormatIndentDecrease, MdFormatIndentIncrease } from "react-icons/md";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isSideBarShown, setisSideBarShown] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const sidebar = document.getElementById("sidebar");
  const submenu = document.getElementById("submenu");

  const toggleSidebar = () => {
    if (isSideBarShown) {
      if (sidebar == null) return;
      sidebar.classList.toggle("hidden");
      setisSideBarShown(false);
      return;
    }
    setIsCollapsed(!isCollapsed);
  };

  const showSideBar = () => {
    if (sidebar == null) return;
    sidebar.classList.toggle("hidden");
    setisSideBarShown(true);
  };

  const showSubMenu = (itemLabel: string) => {
    console.log("in start");
    setSelected(itemLabel);
    console.log("in 1");
    if (itemLabel == "Systems") {
      console.log("in 2");
      if (submenu == null) return;
      console.log("in 3");
      submenu.classList.toggle("hidden");
      console.log("in finish");
    }
  };

  const menuItems = [
    {
      id: "0",
      icon: <FiFolder />,
      label: "Systems",
      subMenu: [
        {
          id: "0",
          icon: <FiGrid />,
          label: "System Code",
        },
        {
          id: "1",
          icon: <FiGrid />,
          label: "Properties",
        },
        {
          id: "2",
          icon: <FiGrid />,
          label: "Menus",
        },
        {
          id: "3",
          icon: <FiGrid />,
          label: "API List",
        },
      ],
    },
    {
      id: "1",
      icon: <FiFolder />,
      label: "Users & Group",
    },
    {
      id: "2",
      icon: <FiFolder />,
      label: "Competition",
    },
  ];

  return (
    <html lang="en">
      <body className="bg-white">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <button
            onClick={showSideBar}
            className="w-24 h-24 absolute block top-2 left-2 p-2 md:hidden text-black hover:text-white transition-colors duration-200 hover:bg-gray-600"
            type="button"
            aria-label={"Expand sidebar"}
          >
            {<MdFormatIndentIncrease />}
          </button>
          <aside
            id="sidebar"
            className={`fixed sm:fixed md:static hidden md:block bg-black text-gray-100 transition-all duration-300 ease-in-out h-full md:h-auto ${
              isCollapsed ? "w-16" : " w-48"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between p-2">
                <a
                  href="https://www.cloit.com/"
                  className="flex items-center ps-2.5"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTKiPB7Al8DuosXDTmJcCgdrCNGMIKm724Dw&s"
                    className="h-6 me-3 sm:h-7"
                    alt="Flowbite Logo"
                  />
                </a>
                <button
                  onClick={toggleSidebar}
                  className="text-white hover:text-white transition-colors duration-200 hover:bg-gray-600"
                  type="button"
                  aria-label={
                    isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  {isCollapsed ? (
                    <MdFormatIndentIncrease />
                  ) : (
                    <MdFormatIndentDecrease />
                  )}
                </button>
              </div>
              <nav className="flex-1">
                <ul className="space-y-4">
                  {menuItems.map((item, index) => {
                    if (!item.subMenu) {
                      return (
                        <li
                          key={item.id}
                          onClick={() => showSubMenu(item.label)}
                        >
                          <a
                            href="#"
                            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-500 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-colors duration-200 ${
                              isCollapsed ? "justify-center" : "space-x-3"
                            }`}
                          >
                            <span className="text-xl text-white">
                              {item.icon}
                            </span>
                            {!isCollapsed && (
                              <span className="text-white">{item.label}</span>
                            )}
                          </a>
                        </li>
                      );
                    }
                    return (
                      <div className="rounded-lg">
                        <li
                          key={item.id}
                          onClick={() => showSubMenu(item.label)}
                        >
                          <a
                            href="#"
                            className={`flex w-full items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-500 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-colors duration-200 ${
                              isCollapsed ? "justify-center" : "space-x-3"
                            }`}
                          >
                            <span className="text-xl text-white">
                              {item.icon}
                            </span>
                            {!isCollapsed && (
                              <span className="text-white">{item.label}</span>
                            )}
                          </a>
                        </li>
                        <ul
                          id="submenu"
                          className="hidden py-2 space-y-2 transition-all duration-300 ease-in-out"
                        >
                          {item.subMenu.map((el, idx) => {
                            return (
                              <li
                                key={el.id}
                                onClick={() => setSelected(el.label)}
                              >
                                <a
                                  href="#"
                                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-colors duration-200 ${
                                    isCollapsed ? "justify-center" : "space-x-3"
                                  }
                                  `}
                                >
                                  <span className="text-xl text-white">
                                    {el.icon}
                                  </span>
                                  {!isCollapsed && (
                                    <span className="text-white">
                                      {el.label}
                                    </span>
                                  )}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>
          {/* Main Page */}
          <main className={`flex-1 p-6 transition-all duration-300 `}>
            <header></header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
