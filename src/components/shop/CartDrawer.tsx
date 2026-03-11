import { X, Trash2, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { state, removeFromCart, updateQuantity, totalPrice, checkout } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const success = await checkout();
    if (success) {
      onClose();
      navigate('/checkout-success');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-2xl sm:max-w-md"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <h2 className="text-lg font-bold">Shopping Bag ({state.items.reduce((acc, item) => acc + item.quantity, 0)})</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 text-zinc-400 hover:bg-zinc-100 hover:text-black rounded-full transition-all"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {state.items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 rounded-full bg-zinc-50 p-8 text-zinc-300">
                    <ShoppingBag size={64} />
                  </div>
                  <p className="text-lg font-medium text-zinc-900">Your bag is empty</p>
                  <p className="mt-2 text-sm text-zinc-500">Looks like you haven't added anything to your bag yet.</p>
                  <Button onClick={onClose} variant="outline" className="mt-8 rounded-none px-10">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-6 first:pt-0">
                      <div className="h-32 w-24 flex-shrink-0 overflow-hidden rounded-sm bg-zinc-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-bold uppercase tracking-tight">{item.name}</h3>
                          <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-xs text-zinc-500">Category: {item.category}</p>
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center gap-1 rounded-sm border border-zinc-200 p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center text-zinc-500 hover:text-black disabled:opacity-30"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center text-zinc-500 hover:text-black"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {state.items.length > 0 && (
              <div className="border-t border-zinc-100 bg-zinc-50 px-6 py-8">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Estimated Shipping</span>
                    <span className="text-zinc-900 font-medium">FREE</span>
                  </div>
                  <div className="mt-2 flex justify-between text-xl font-bold text-zinc-900">
                    <p>Total</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-zinc-500 uppercase tracking-widest">Secure checkout by Stripe</p>
                <div className="mt-6">
                  <Button 
                    onClick={handleCheckout} 
                    disabled={state.isCheckingOut}
                    className="w-full rounded-none py-7 text-lg font-bold uppercase tracking-widest"
                  >
                    {state.isCheckingOut ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                      </span>
                    ) : (
                      'Checkout Now'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};