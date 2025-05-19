// "use client";

// import { websitesMenuConfig } from "@/app/websitesSetupConfig/websitesMenuConfig";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { websitesDataConfig } from "@/app/websitesDataTypes/websitesData";

// const WebsitesMenu = () => {
//   const [expandedMenus, setExpandedMenus] = useState<{
//     [key: string]: boolean;
//   }>({
//     Websites: true,
//     About: true,
//   });
//   const router = useRouter();

//   const toggleSubmenu = (menuKey: string) => {
//     setExpandedMenus((prev) => ({
//       ...prev,
//       [menuKey]: !prev[menuKey],
//     }));
//   };
//   const renderSubmenuItems = (submenu: any[]) => {
//     return submenu?.map((subItem, index) => (
//       <div
//         key={`${subItem.label}-${index}`}
//         className="submenu-item py-2 px-3 flex items-center gap-3 cursor-pointer hover:bg-lamaSkyLight text-sm text-gray-600"
//         onClick={(e) => {
//           e.stopPropagation();
//           router.push(subItem.href);
//         }}
//       >
//         {subItem.icon && (
//           <Image
//             src={subItem.icon}
//             alt={subItem.label}
//             width={16}
//             height={16}
//           />
//         )}
//         <span>{subItem.label}</span>
//       </div>
//     ));
//   };

//   return (
//     <div className="websites-menu bg-white min-h-screen w-[250px] shadow-lg">
//       <div className="menu-section">
//         <div
//           className="menu-header flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50"
//           onClick={() => toggleSubmenu("Websites")}
//         >
//           <Image src="/websites.png" alt="Websites" width={20} height={20} />
//           <span className="font-medium text-gray-700">Websites</span>
//           <svg
//             className={`w-4 h-4 ml-auto transition-transform duration-200 ${
//               expandedMenus["Websites"] ? "rotate-180" : ""
//             }`}
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </div>{" "}
//         {expandedMenus["Websites"] && (
//           <div className="pl-6">
//             {Object.entries(websitesMenuConfig).map(([key, menuItem]) => (
//               <div key={key} className="menu-section">
//                 <div
//                   className="menu-header flex items-center gap-3 p-3 cursor-pointer hover:bg-lamaSkyLight"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleSubmenu(key);
//                   }}
//                 >
//                   {menuItem.icon && (
//                     <Image
//                       src={menuItem.icon}
//                       alt={menuItem.label}
//                       width={20}
//                       height={20}
//                     />
//                   )}
//                   <span className="font-medium text-gray-700">
//                     {menuItem.label}
//                   </span>
//                   {menuItem.hasSubmenu && (
//                     <svg
//                       className={`w-4 h-4 ml-auto transition-transform duration-200 ${
//                         expandedMenus[key] ? "rotate-180" : ""
//                       }`}
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   )}
//                 </div>{" "}
//                 {menuItem.hasSubmenu && expandedMenus[key] && (
//                   <div
//                     className="submenu pl-6"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     {menuItem.submenu && renderSubmenuItems(menuItem.submenu)}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WebsitesMenu;
