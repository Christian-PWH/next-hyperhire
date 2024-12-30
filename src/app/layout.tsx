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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("")

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    {
      icon: <FiHome />, label: "Systems", subMenu: [
        { icon: <FiHome />, label: "System Code" },
        { icon: <FiList />, label: "Properties" },
        { icon: <FiRadio />, label: "Menus" },
        { icon: <FiSettings />, label: "API List" },
      ]
    },
    { icon: <FiSearch />, label: "Users & Group" },
    { icon: <FiSearch />, label: "Competition" }
  ];

  return (
    <html lang="en">
      <body className="bg-white">
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside
            className={`bg-black text-gray-100 flex-shrink-0 transition-all duration-300 ease-in-out rounded-lg my-4 mx-4 p-4 ${isCollapsed ? "w-16" : " w-48"
              }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end p-2">
                <button
                  onClick={toggleSidebar}
                  className="text-neon-blue hover:text-neon-pink transition-colors duration-200"
                  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {isCollapsed ? <MdFormatIndentIncrease />
                    : <MdFormatIndentDecrease />}
                </button>
              </div>
              <nav className="flex-1">
                <ul className="space-y-4">
                  {menuItems.map((item, index) => {
                    if (!item.subMenu) {
                      return (<li key={index} onClick={() => setSelected(item.label)}>
                        <a
                          href="#"
                          className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-colors duration-200 ${isCollapsed ? "justify-center" : "space-x-3"
                            }`}
                        >
                          <span className="text-xl text-neon-blue">{item.icon}</span>
                          {!isCollapsed && (
                            <span className="text-neon-pink">{item.label}</span>
                          )}
                        </a>
                      </li>)
                    }
                    return (
                      <div className="bg-gray-800 rounded-lg">
                        <li key={index} onClick={() => setSelected(item.label)}>
                          <a
                            href="#"
                            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-colors duration-200 ${isCollapsed ? "justify-center" : "space-x-3"
                              }`}
                          >
                            <span className="text-xl text-neon-blue">{item.icon}</span>
                            {!isCollapsed && (
                              <span className="text-neon-pink">{item.label}</span>
                            )}
                          </a>
                        </li>
                        {
                          item.subMenu.map((el, idx) => {
                            return (
                              <li key={idx} onClick={() => setSelected(el.label)}>
                                <a
                                  href="#"
                                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-colors duration-200 ${isCollapsed ? "justify-center" : "space-x-3"
                                    }`}
                                >
                                  <span className="text-xl text-neon-blue">{el.icon}</span>
                                  {!isCollapsed && (
                                    <span className="text-neon-pink">{el.label}</span>
                                  )}
                                </a>
                              </li>
                            )
                          })
                        }
                      </div>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>
          <main
            className={`flex-1 p-6 transition-all duration-300 `}
          >
            <header><h1 className="text-black">test</h1></header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
