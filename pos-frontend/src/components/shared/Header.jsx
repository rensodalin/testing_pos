// import React from "react";
// import { FaSearch, FaUserCircle, FaBell, FaBars } from "react-icons/fa";
// import { MdDashboard } from "react-icons/md";
// import { IoLogOut } from "react-icons/io5";
// import logo from "../../assets/images/logo.png";
// import { useDispatch, useSelector } from "react-redux";
// import { useMutation } from "@tanstack/react-query";
// import { logout } from "../../https";
// import { removeUser } from "../../redux/slices/userSlice";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const userData = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutMutation = useMutation({
//     mutationFn: () => logout(),
//     onSuccess: () => {
//       dispatch(removeUser());
//       navigate("/auth");
//     },
//     onError: (error) => {
//       console.error(error);
//     },
//   });

//   const handleLogout = () => logoutMutation.mutate();

//   return (
//     <header className="w-full bg-[#202d3f] px-4 py-3 sm:px-8 shadow-md">
//       {/* Mobile Layout */}
//       <div className="flex flex-col sm:hidden w-full">
//         {/* Top Row: Hamburger + Logo */}
//         <div className="flex items-center justify-between w-full mb-3">
//           <button className="text-[#f5f5f5] text-2xl p-2" aria-label="Menu">
//             <FaBars />
//           </button>
//           <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer mx-auto">
//             <img src={logo} className="h-8 w-8" alt="restro logo" />
//             <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">Cafio</h1>
//           </div>
//           <div className="w-10" /> {/* Spacer for symmetry */}
//         </div>
//         {/* Search Bar */}
//         <div className="w-full flex items-center gap-3 bg-[#5d5038] rounded-[15px] px-3 py-2 mb-3">
//           <FaSearch className="text-[#f5f5f5]" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="bg-transparent outline-none text-[#f5f5f5] w-full placeholder-[#888]"
//           />
//         </div>
//         {/* User Info */}
//         <div className="flex items-center justify-between gap-2 w-full">
//           {userData.role === "Admin" && (
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="bg-[#50431d] rounded-[15px] p-3 cursor-pointer hover:bg-gray-700 transition"
//               aria-label="Dashboard"
//             >
//               <MdDashboard className="text-[#f5f5f5] text-xl" />
//             </button>
//           )}
//           <button
//             className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer hover:bg-gray-700 transition"
//             aria-label="Notifications"
//           >
//             <FaBell className="text-[#f5f5f5] text-xl" />
//           </button>
//           <div className="flex items-center gap-2 cursor-pointer relative group max-w-[100px]">
//             <FaUserCircle className="text-[#f5f5f5] text-2xl" />
//             <div className="flex flex-col items-start whitespace-nowrap max-w-[60px] truncate">
//               <h1 className="text-sm text-[#f5f5f5] font-semibold tracking-wide truncate">
//                 {userData.name || "TEST USER"}
//               </h1>
//               <p className="text-xs text-[#ababab] font-medium truncate">
//                 {userData.role || "Role"}
//               </p>
//             </div>
//             <IoLogOut
//               onClick={handleLogout}
//               className="text-[#f5f5f5] ml-1 hover:text-red-500 transition"
//               size={22}
//               title="Logout"
//             />
//           </div>
//         </div>
//       </div>
//       {/* Desktop Layout */}
//       <div className="hidden sm:flex w-full items-center justify-between">
//         {/* Logo & Title */}
//         <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer flex-shrink-0">
//           <img src={logo} className="h-8 w-8" alt="restro logo" />
//           <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide whitespace-nowrap">Cafio</h1>
//         </div>
//         {/* Search Bar */}
//         <div className="w-[500px] flex items-center gap-3 bg-[#14202d] rounded-[15px] px-3 py-2 mx-8">
//           <FaSearch className="text-[#f5f5f5]" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="bg-transparent outline-none text-[#f5f5f5] w-full placeholder-[#888]"
//           />
//         </div>
//         {/* User Info */}
//         <div className="flex items-center gap-4 flex-shrink-0">
//           {userData.role === "Admin" && (
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer hover:bg-gray-700 transition"
//               aria-label="Dashboard"
//             >
//               <MdDashboard className="text-[#f5f5f5] text-2xl" />
//             </button>
//           )}
//           <button
//             className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer hover:bg-gray-700 transition"
//             aria-label="Notifications"
//           >
//             <FaBell className="text-[#f5f5f5] text-2xl" />
//           </button>
//           <div className="flex items-center gap-2 cursor-pointer relative group max-w-[120px]">
//             <FaUserCircle className="text-[#f5f5f5] text-4xl" />
//             <div className="flex flex-col items-start whitespace-nowrap max-w-[70px] truncate">
//               <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide truncate">
//                 {userData.name || "TEST USER"}
//               </h1>
//               <p className="text-xs text-[#ababab] font-medium truncate">
//                 {userData.role || "Role"}
//               </p>
//             </div>
//             <IoLogOut
//               onClick={handleLogout}
//               className="text-[#f5f5f5] ml-2 hover:text-red-500 transition"
//               size={30}
//               title="Logout"
//             />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from "react";
import {
  FaSearch,
  FaUserCircle,
  FaBell,
  FaBars,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleLogout = () => logoutMutation.mutate();

  return (
    <header className="w-full bg-[#202d3f] px-4 py-3 sm:px-8 shadow-md">
      {/* Mobile Layout */}
      <div className="flex flex-col sm:hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-3">
          <button className="text-[#f5f5f5] text-2xl" aria-label="Menu">
            <FaBars />
          </button>
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={logo} className="h-8 w-8" alt="Cafio logo" />
            <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
              Cafio
            </h1>
          </div>
          <div className="w-6" /> {/* Spacer */}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#5d5038] rounded-xl px-3 py-2 mb-3">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-[#f5f5f5] w-full placeholder-[#888]"
          />
        </div>

        {/* Icons & User Info */}
        <div className="flex items-center justify-between">
          {userData.role === "Admin" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#50431d] rounded-xl p-3 hover:bg-gray-700 transition"
              aria-label="Dashboard"
            >
              <MdDashboard className="text-[#f5f5f5] text-xl" />
            </button>
          )}
          <button
            className="bg-[#1f1f1f] rounded-xl p-3 hover:bg-gray-700 transition"
            aria-label="Notifications"
          >
            <FaBell className="text-[#f5f5f5] text-xl" />
          </button>
          <div className="flex items-center gap-2 max-w-[120px]">
            <FaUserCircle className="text-[#f5f5f5] text-2xl" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-[#f5f5f5] truncate">
                {userData.name || "TEST USER"}
              </span>
              <span className="text-xs text-[#ababab] truncate">
                {userData.role || "Role"}
              </span>
            </div>
            <IoLogOut
              onClick={handleLogout}
              className="text-[#f5f5f5] hover:text-red-500 transition"
              size={22}
              title="Logout"
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between w-full">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} className="h-8 w-8" alt="Cafio logo" />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
            Cafio
          </h1>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 w-[400px] bg-[#14202d] rounded-xl px-3 py-2 mx-8">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-[#f5f5f5] w-full placeholder-[#888]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {userData.role === "Admin" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#1f1f1f] rounded-xl p-3 hover:bg-gray-700 transition"
              aria-label="Dashboard"
            >
              <MdDashboard className="text-[#f5f5f5] text-2xl" />
            </button>
          )}
          <button
            className="bg-[#1f1f1f] rounded-xl p-3 hover:bg-gray-700 transition"
            aria-label="Notifications"
          >
            <FaBell className="text-[#f5f5f5] text-2xl" />
          </button>
          <div className="flex items-center gap-2 max-w-[150px]">
            <FaUserCircle className="text-[#f5f5f5] text-3xl" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-[#f5f5f5] truncate">
                {userData.name || "TEST USER"}
              </span>
              <span className="text-xs text-[#ababab] truncate">
                {userData.role || "Role"}
              </span>
            </div>
            <IoLogOut
              onClick={handleLogout}
              className="text-[#f5f5f5] hover:text-red-500 transition"
              size={24}
              title="Logout"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;



