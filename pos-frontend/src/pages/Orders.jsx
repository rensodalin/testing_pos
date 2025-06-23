// import React, { useState, useEffect } from "react";
// import BottomNav from "../components/shared/BottomNav";
// import OrderCard from "../components/orders/OrderCard";
// import BackButton from "../components/shared/BackButton";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { getOrders } from "../https/index";
// import { enqueueSnackbar } from "notistack"

// const Orders = () => {

//   const [status, setStatus] = useState("all");

//     useEffect(() => {
//       document.title = "POS | Orders"
//     }, [])

//   const { data: resData, isError } = useQuery({
//     queryKey: ["orders"],
//     queryFn: async () => {
//       return await getOrders();
//     },
//     placeholderData: keepPreviousData
//   })

//   if(isError) {
//     enqueueSnackbar("Something went wrong!", {variant: "error"})
//   }

//   return (
//     <section className="bg-[#1f1f1f]  h-[calc(100vh-5rem)] overflow-hidden">
//       <div className="flex items-center justify-between px-10 py-4">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
//             Orders
//           </h1>
//         </div>
//         <div className="flex items-center justify-around gap-4">
//           <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
//             All
//           </button>
//           <button onClick={() => setStatus("progress")} className={`text-[#ababab] text-lg ${status === "progress" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
//             In Progress
//           </button>
//           <button onClick={() => setStatus("ready")} className={`text-[#ababab] text-lg ${status === "ready" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
//             Ready
//           </button>
//           <button onClick={() => setStatus("completed")} className={`text-[#ababab] text-lg ${status === "completed" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
//             Completed
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-3 px-16 py-4 overflow-y-scroll scrollbar-hide">
//         {
//           resData?.data.data.length > 0 ? (
//             resData.data.data.map((order) => {
//               return <OrderCard key={order._id} order={order} />
//             })
//           ) : <p className="col-span-3 text-gray-500">No orders available</p>
//         }
//       </div>

//       <BottomNav />
//     </section>
//   );
// };

// export default Orders;
// import React, { useState, useEffect } from "react";
// import BottomNav from "../components/shared/BottomNav";
// import OrderCard from "../components/orders/OrderCard";
// import BackButton from "../components/shared/BackButton";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { getOrders } from "../https/index";
// import { enqueueSnackbar } from "notistack";

// const Orders = () => {
//   const [status, setStatus] = useState("all");

//   useEffect(() => {
//     document.title = "POS | Orders";
//   }, []);

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
//     <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] overflow-y-auto pb-20">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-10 py-4 gap-4">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wider">
//             Orders
//           </h1>
//         </div>

//         <div className="flex overflow-x-auto sm:overflow-visible gap-2 sm:gap-4 w-full sm:w-auto py-2 scrollbar-hide">
//           {["all", "progress", "ready", "completed"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setStatus(type)}
//               className={`text-[#ababab] text-sm sm:text-lg ${
//                 status === type ? "bg-[#383838]" : ""
//               } rounded-lg px-3 sm:px-5 py-2 font-semibold whitespace-nowrap flex-shrink-0`}
//             >
//               {type === "all"
//                 ? "All"
//                 : type.charAt(0).toUpperCase() + type.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-10 py-4">
//         {resData?.data.data.length > 0 ? (
//           resData.data.data.map((order) => (
//             <OrderCard key={order._id} order={order} />
//           ))
//         ) : (
//           <p className="col-span-full text-gray-500 text-center">
//             No orders available
//           </p>
//         )}
//       </div>

//       <BottomNav />
//     </section>
//   );
// };

// export default Orders;
// import React, { useState, useEffect } from "react";
// import BottomNav from "../components/shared/BottomNav";
// import OrderCard from "../components/orders/OrderCard";
// import BackButton from "../components/shared/BackButton";
// import { orders } from "../constants";

// const Orders = () => {
//   const [status, setStatus] = useState("all");

//   useEffect(() => {
//     document.title = "POS | Orders";
//   }, []);

//   // Filter orders based on status
//   const filteredOrders = status === "all" 
//     ? orders 
//     : orders.filter(order => {
//         if (status === "progress") return order.status === "In Progress";
//         if (status === "ready") return order.status === "Ready";
//         if (status === "completed") return order.status === "Completed";
//         return false;
//       });

//   return (
//     <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex flex-col">
//       {/* Header Section - Fixed */}
//       <div className="flex-shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-10 py-4 gap-4 border-b border-[#383838]">
//         <div className="flex items-center gap-4">
//           <BackButton />
//           <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wider">
//             Orders
//           </h1>
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex overflow-x-auto sm:overflow-visible gap-2 sm:gap-4 w-full sm:w-auto py-2 scrollbar-hide">
//           {["all", "progress", "ready", "completed"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setStatus(type)}
//               className={`text-[#ababab] text-sm sm:text-lg ${
//                 status === type ? "bg-[#383838]" : ""
//               } rounded-lg px-3 sm:px-5 py-2 font-semibold whitespace-nowrap flex-shrink-0 transition-colors`}
//             >
//               {type === "all"
//                 ? "All"
//                 : type === "progress" 
//                 ? "In Progress"
//                 : type.charAt(0).toUpperCase() + type.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Orders Grid - Scrollable */}
//       <div className="flex-1 overflow-y-auto scrollbar-hide">
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8 pb-8">
//           {filteredOrders.length > 0 ? (
//             filteredOrders.map((order) => (
//               <OrderCard key={order.id} order={order} />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <p className="text-gray-500 text-lg">No orders available</p>
//               <p className="text-gray-600 text-sm mt-2">
//                 {status !== "all" && `No ${status} orders found`}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <BottomNav />
//     </section>
//   );
// };

// export default Orders;
import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https";
import { enqueueSnackbar } from "notistack";

const Orders = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Orders";
  }, []);

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  const filteredOrders =
    status === "all"
      ? resData?.data.data || []
      : resData?.data.data.filter((o) =>
          o.orderStatus?.toLowerCase().includes(status)
        ) || [];

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] overflow-y-auto pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-10 py-4 gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wider">
            Orders
          </h1>
        </div>

        <div className="flex overflow-x-auto sm:overflow-visible gap-2 sm:gap-4 w-full sm:w-auto py-2 scrollbar-hide">
          {["all", "progress", "ready", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setStatus(type)}
              className={`text-[#ababab] text-sm sm:text-lg ${
                status === type ? "bg-[#383838]" : ""
              } rounded-lg px-3 sm:px-5 py-2 font-semibold whitespace-nowrap flex-shrink-0`}
            >
              {type === "all"
                ? "All"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-10 py-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center">
            No orders available
          </p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;


