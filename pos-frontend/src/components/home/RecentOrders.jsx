// import React from "react";
// import { FaSearch } from "react-icons/fa";
// import OrderList from "./OrderList";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { enqueueSnackbar } from "notistack";
// import { getOrders } from "../../https/index";

// const RecentOrders = () => {
//   const { data: resData, isError } = useQuery({
//     queryKey: ["orders"],
//     queryFn: async () => {
//       return await getOrders();
//     },
//     placeholderData: keepPreviousData,
//   });

//   if (isError) {
//     enqueueSnackbar("Something went wrong!", { variant: "error" });
//   }

//   return (
//     <div className="px-8 mt-6">
//       <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg">
//         <div className="flex justify-between items-center px-6 py-4">
//           <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
//             Recent Orders
//           </h1>
//           <a href="" className="text-[#025cca] text-sm font-semibold">
//             View all
//           </a>
//         </div>

//         <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6">
//           <FaSearch className="text-[#f5f5f5]" />
//           <input
//             type="text"
//             placeholder="Search recent orders"
//             className="bg-[#1f1f1f] outline-none text-[#f5f5f5]"
//           />
//         </div>

//         {/* Order list */}
//         <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
//           {resData?.data.data.length > 0 ? (
//             resData.data.data.map((order) => {
//               return <OrderList key={order._id} order={order} />;
//             })
//           ) : (
//             <p className="col-span-3 text-gray-500">No orders available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentOrders;
// import React from "react";
// import { FaSearch } from "react-icons/fa";
// import OrderList from "./OrderList";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { enqueueSnackbar } from "notistack";
// import { getOrders } from "../../https";

// const RecentOrders = () => {
//   const { data: resData, isError } = useQuery({
//     queryKey: ["orders"],
//     queryFn: async () => await getOrders(),
//     placeholderData: keepPreviousData,
//   });

//   if (isError) {
//     enqueueSnackbar("Something went wrong!", { variant: "error" });
//   }

//   return (
//     <div className="px-8 mt-6">
//       <div className="bg-[#1e2c37] w-full h-[450px] rounded-lg">
//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4">
//           <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
//             Recent Orders
//           </h1>
//           <a href="#" className="text-[#025cca] text-sm font-semibold">
//             View all
//           </a>
//         </div>

//         {/* Search Bar */}
//         <div className="flex items-center gap-4 bg-[#14202d] rounded-[15px] px-6 py-4 mx-6">
//           <FaSearch className="text-[#f5f5f5]" />
//           <input
//             type="text"
//             placeholder="Search recent orders"
//             className="bg-[#14202d] outline-none text-[#f5f5f5] w-full"
//           />
//         </div>

//         {/* Order List */}
//         <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
//           {resData?.data.data.length > 0 ? (
//             resData.data.data.map((order) => (
//               <OrderList key={order._id} order={order} />
//             ))
//           ) : (
//             <p className="text-gray-500">No orders available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentOrders;
import React from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https";

const RecentOrders = () => {
  const { data: resData, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrders(),
    placeholderData: keepPreviousData,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  // Debug logging to see the complete response structure
  console.log("RecentOrders - Full API response:", resData);
  console.log("RecentOrders - Response data:", resData?.data);
  console.log("RecentOrders - Orders array:", resData?.data?.data);

  // Handle different possible response structures
  let orders = [];
  if (resData?.data?.data) {
    orders = resData.data.data;
  } else if (resData?.data && Array.isArray(resData.data)) {
    orders = resData.data;
  } else if (resData && Array.isArray(resData)) {
    orders = resData;
  }

  console.log("RecentOrders - Processed orders:", orders);

  return (
    <div className="px-8 mt-6">
      <div className="bg-[#1e2c37] w-full h-[450px] rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Recent Orders
          </h1>
          <a href="#" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 bg-[#14202d] rounded-[15px] px-6 py-4 mx-6">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search recent orders"
            className="bg-[#14202d] outline-none text-[#f5f5f5] w-full"
          />
        </div>

        {/* Order List */}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
          {isLoading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <OrderList 
                key={order.id || order._id || `order-${index}`} 
                order={order} 
              />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <p>No orders available</p>
              <p className="text-sm mt-2">Orders will appear here after customers place them</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;

