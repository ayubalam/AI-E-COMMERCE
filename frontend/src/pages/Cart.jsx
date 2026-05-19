import { FaTrash } from "react-icons/fa";

import useCart from "../hooks/useCart";

const Cart = () => {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalPrice,
  } = useCart();

  return (
    <section className="min-h-screen bg-slate-100 py-16">
      
      <div className="max-w-7xl mx-auto px-6">
        
        <h1 className="text-5xl font-bold mb-12">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center text-2xl font-semibold">
            Your cart is empty
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-3xl flex items-center gap-6 shadow-md"
                >
                  
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-2xl"
                  />

                  <div className="flex-1">
                    
                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-slate-500 mt-2">
                      ${item.price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-4 mt-5">
                      
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="bg-slate-200 px-4 py-2 rounded-lg"
                      >
                        -
                      </button>

                      <span className="text-xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="bg-slate-200 px-4 py-2 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-2xl"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white p-8 rounded-3xl shadow-md h-fit">
              
              <h2 className="text-3xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="flex justify-between text-xl mb-6">
                <span>Total</span>

                <span className="font-bold">
                  ${totalPrice}
                </span>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition">
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;