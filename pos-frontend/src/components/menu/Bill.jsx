import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import {
  addOrder,
  createOrderRazorpay,
  updateTable,
  verifyPaymentRazorpay,
} from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { removeAllItems } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";
import Invoice from "../invoice/Invoice";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Bill = () => {
  const dispatch = useDispatch();

  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePrintReceipt = () => {
    if (!cartData || cartData.length === 0) {
      enqueueSnackbar("No items to print receipt for!", {
        variant: "warning",
      });
      return;
    }

    // Create a simple receipt for printing
    const receiptContent = `
      <html>
        <head>
          <title>Order Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .item { display: flex; justify-content: space-between; margin: 5px 0; }
            .total { border-top: 1px solid #333; padding-top: 10px; margin-top: 20px; font-weight: bold; }
            .customer-info { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>RESTRO</h2>
            <p>Order Receipt</p>
            <p>${new Date().toLocaleString()}</p>
          </div>
          
          <div class="customer-info">
            <p><strong>Customer:</strong> ${customerData.customerName || 'N/A'}</p>
            <p><strong>Phone:</strong> ${customerData.customerPhone || 'N/A'}</p>
            <p><strong>Table:</strong> ${customerData.table?.tableId || 'N/A'}</p>
          </div>
          
          <h3>Items:</h3>
          ${cartData.map(item => `
            <div class="item">
              <span>${item.name} x${item.quantity}</span>
              <span>₹${item.price.toFixed(2)}</span>
            </div>
          `).join('')}
          
          <div class="total">
            <div class="item">
              <span>Subtotal:</span>
              <span>₹${total.toFixed(2)}</span>
            </div>
            <div class="item">
              <span>Tax (${taxRate}%):</span>
              <span>₹${tax.toFixed(2)}</span>
            </div>
            <div class="item">
              <span>Total:</span>
              <span>₹${totalPriceWithTax.toFixed(2)}</span>
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", {
        variant: "warning",
      });
      return;
    }

    // Validate required data
    if (!customerData.customerName || !customerData.customerPhone || !customerData.table) {
      enqueueSnackbar("Please complete customer information and select a table!", {
        variant: "warning",
      });
      return;
    }

    if (!cartData || cartData.length === 0) {
      enqueueSnackbar("Please add items to cart before placing order!", {
        variant: "warning",
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Placing order with data:", {
        customerData,
        cartData,
        total,
        tax,
        totalPriceWithTax,
        paymentMethod
      });

      if (paymentMethod === "Online") {
        // Check if Razorpay key is available
        if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
          enqueueSnackbar("Razorpay configuration is missing. Please contact administrator.", {
            variant: "error",
          });
          setIsProcessing(false);
          return;
        }

        // load the script
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          enqueueSnackbar("Razorpay SDK failed to load. Are you online?", {
            variant: "warning",
          });
          setIsProcessing(false);
          return;
        }

        // create order
        const reqData = {
          amount: totalPriceWithTax.toFixed(2),
        };

        console.log("Creating Razorpay order with:", reqData);
        const { data } = await createOrderRazorpay(reqData);
        console.log("Razorpay order created:", data);

        const options = {
          key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "RESTRO",
          description: "Secure Payment for Your Meal",
          order_id: data.order.id,
          handler: async function (response) {
            try {
              console.log("Payment response:", response);
              const verification = await verifyPaymentRazorpay(response);
              console.log("Payment verification:", verification);
              enqueueSnackbar(verification.data.message, { variant: "success" });

              // Place the order
              const orderData = {
                customerDetails: {
                  name: customerData.customerName,
                  phone: customerData.customerPhone,
                  guests: customerData.guests,
                },
                orderStatus: "In Progress",
                bills: {
                  total: total,
                  tax: tax,
                  totalWithTax: totalPriceWithTax,
                },
                items: cartData,
                tableId: customerData.table.tableId,
                paymentMethod: paymentMethod,
                paymentData: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                },
              };

              console.log("Placing order after payment:", orderData);
              setTimeout(() => {
                orderMutation.mutate(orderData);
              }, 1500);
            } catch (error) {
              console.error("Payment verification failed:", error);
              enqueueSnackbar("Payment verification failed!", {
                variant: "error",
              });
              setIsProcessing(false);
            }
          },
          prefill: {
            name: customerData.customerName,
            email: "",
            contact: customerData.customerPhone,
          },
          theme: { color: "#025cca" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Place the order
        const orderData = {
          customerDetails: {
            name: customerData.customerName,
            phone: customerData.customerPhone,
            guests: customerData.guests,
          },
          orderStatus: "In Progress",
          bills: {
            total: total,
            tax: tax,
            totalWithTax: totalPriceWithTax,
          },
          items: cartData,
          tableId: customerData.table.tableId,
          paymentMethod: paymentMethod,
        };
        
        console.log("Placing cash order:", orderData);
        orderMutation.mutate(orderData);
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      enqueueSnackbar("Failed to place order. Please try again.", {
        variant: "error",
      });
      setIsProcessing(false);
    }
  };

  const orderMutation = useMutation({
    mutationFn: (reqData) => {
      console.log("Order mutation called with:", reqData);
      return addOrder(reqData);
    },
    onSuccess: (resData) => {
      console.log("Order mutation success response:", resData);
      const { data } = resData.data;
      console.log("Order created successfully:", data);

      setOrderInfo(data);

      // Update Table
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.tableId,
      };

      console.log("Updating table with:", tableData);
      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("Order Placed Successfully!", {
        variant: "success",
      });
      setShowInvoice(true);
      setIsProcessing(false);
    },
    onError: (error) => {
      console.error("Order creation failed:", error);
      console.error("Error response:", error.response?.data);
      enqueueSnackbar("Failed to place order. Please try again.", {
        variant: "error",
      });
      setIsProcessing(false);
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => {
      console.log("Table update mutation called with:", reqData);
      return updateTable(reqData);
    },
    onSuccess: (resData) => {
      console.log("Table updated successfully:", resData);
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
    onError: (error) => {
      console.error("Table update failed:", error);
      console.error("Error response:", error.response?.data);
      enqueueSnackbar("Failed to update table status.", {
        variant: "error",
      });
    },
  });

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Items({cartData.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ₹{total.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₹{tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Total With Tax
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ₹{totalPriceWithTax.toFixed(2)}
        </h1>
      </div>
      
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          disabled={isProcessing}
          className={`px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold transition-colors ${
            paymentMethod === "Cash" 
              ? "bg-[#383737] text-white" 
              : "bg-[#1f1f1f] hover:bg-[#2a2a2a]"
          } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          disabled={isProcessing}
          className={`px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold transition-colors ${
            paymentMethod === "Online" 
              ? "bg-[#383737] text-white" 
              : "bg-[#1f1f1f] hover:bg-[#2a2a2a]"
          } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Online
        </button>
      </div>

      <div className="flex items-center gap-3 px-5 mt-4">
        <button 
          onClick={handlePrintReceipt}
          disabled={isProcessing || cartData.length === 0}
          className={`px-4 py-3 w-full rounded-lg font-semibold text-lg transition-colors ${
            cartData.length === 0 || isProcessing
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-[#025cca] text-[#f5f5f5] hover:bg-[#024ba3]"
          }`}
        >
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing || !paymentMethod || cartData.length === 0}
          className={`px-4 py-3 w-full rounded-lg font-semibold text-lg transition-colors ${
            isProcessing || !paymentMethod || cartData.length === 0
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-[#f6b100] text-[#1f1f1f] hover:bg-[#e6a100]"
          }`}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </div>

      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
};

export default Bill;
