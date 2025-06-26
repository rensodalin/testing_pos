import React, { useState, useRef } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemQuantities, setItemQuantities] = useState({});
  const dispatch = useDispatch();
  const cartItemCounter = useRef(0);

  const increment = (itemId) => {
    setItemQuantities(prev => ({
      ...prev,
      [itemId]: Math.min((prev[itemId] || 0) + 1, 10) // Max 10 items per dish
    }));
  };

  const decrement = (itemId) => {
    setItemQuantities(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = itemQuantities[item.id] || 0;
    if (quantity === 0) return;

    const { name, price } = item;
    
    // Simple counter-based ID
    cartItemCounter.current += 1;
    const uniqueId = `cart_item_${cartItemCounter.current}`;
    
    const newObj = {
      id: uniqueId,
      name,
      pricePerQuantity: price,
      quantity: quantity,
      price: price * quantity,
    };

    console.log('Adding to cart:', newObj); // Debug log
    dispatch(addItems(newObj));
    
    // Reset quantity for this item
    setItemQuantities(prev => ({
      ...prev,
      [item.id]: 0
    }));
  };

  const handleCategorySelect = (menu) => {
    setSelected(menu);
    // Reset all quantities when changing category
    setItemQuantities({});
  };

  return (
    <>
      {/* Menu Categories Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10 py-4 w-full">
        {menus.map((menu) => {
          const isSelected = selected.id === menu.id;
          return (
            <div
              key={menu.id}
              className={`flex flex-col items-start justify-between p-3 sm:p-4 rounded-lg h-[90px] sm:h-[100px] cursor-pointer transition-all duration-200 hover:scale-105 ${
                isSelected ? 'ring-2 ring-yellow-400' : ''
              }`}
              style={{ backgroundColor: menu.bgColor }}
              onClick={() => handleCategorySelect(menu)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCategorySelect(menu);
                }
              }}
              aria-label={`Select ${menu.name} category`}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold flex items-center gap-2">
                  <span className="text-sm sm:text-base">{menu.icon}</span>
                  <span className="truncate">{menu.name}</span>
                </h1>
                {isSelected && (
                  <GrRadialSelected className="text-white flex-shrink-0" size={18} />
                )}
              </div>
              <p className="text-[#ababab] text-xs sm:text-sm font-semibold">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      {/* Menu Items Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10 py-4 w-full">
        {selected?.items.map((item) => {
          const quantity = itemQuantities[item.id] || 0;
          const isMaxQuantity = quantity >= 10;
          
          return (
            <div
              key={item.id}
              className="flex flex-col items-start justify-between p-3 sm:p-4 rounded-lg h-[140px] sm:h-[150px] bg-[#1a1a1a] transition-all duration-200 hover:bg-[#2a2a2a] hover:shadow-lg"
            >
              <div className="flex items-start justify-between w-full mb-2">
                <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold flex-grow pr-2 leading-tight">
                  {item.name}
                </h1>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={quantity === 0}
                  className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                    quantity === 0 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-[#2e4a40] text-[#02ca3a] hover:bg-[#3a5a50] cursor-pointer'
                  }`}
                  aria-label={`Add ${quantity} ${item.name} to cart`}
                >
                  <FaShoppingCart size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between w-full mt-auto">
                <p className="text-[#f5f5f5] text-lg sm:text-xl font-bold">
                  ₹{item.price}
                </p>
                
                {/* Quantity Controls - Responsive */}
                <div className="flex items-center justify-between bg-[#1f1f1f] px-2 sm:px-3 py-2 sm:py-3 rounded-lg gap-2 sm:gap-4 min-w-[100px] sm:min-w-[120px]">
                  <button
                    onClick={() => decrement(item.id)}
                    disabled={quantity === 0}
                    className={`text-xl sm:text-2xl transition-colors w-6 h-6 flex items-center justify-center rounded ${
                      quantity === 0 
                        ? 'text-gray-500 cursor-not-allowed' 
                        : 'text-yellow-500 hover:text-yellow-400 hover:bg-[#2a2a2a]'
                    }`}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    &minus;
                  </button>
                  <span className="text-white font-medium min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    disabled={isMaxQuantity}
                    className={`text-xl sm:text-2xl transition-colors w-6 h-6 flex items-center justify-center rounded ${
                      isMaxQuantity 
                        ? 'text-gray-500 cursor-not-allowed' 
                        : 'text-yellow-500 hover:text-yellow-400 hover:bg-[#2a2a2a]'
                    }`}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    &#43;
                  </button>
                </div>
              </div>
              
              {/* Max quantity warning */}
              {isMaxQuantity && (
                <p className="text-xs text-yellow-400 mt-1 text-center w-full">
                  Max quantity reached
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;