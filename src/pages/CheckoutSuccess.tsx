import { useEffect } from 'react';
import { CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export const CheckoutSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center animate-in fade-in zoom-in duration-500">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="mb-8 rounded-full bg-green-50 p-6 text-green-600"
      >
        <CheckCircle2 size={64} />
      </motion.div>
      
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
        Order Confirmed
      </h1>
      
      <p className="mt-6 max-w-md text-lg text-zinc-500 leading-relaxed">
        Thank you for your purchase! We've received your order and we'll notify you as soon as it ships.
      </p>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Link 
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-none bg-black px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>
        <button 
          className="inline-flex items-center justify-center gap-2 rounded-none border-2 border-zinc-900 px-10 py-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white"
        >
          View Order Status
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="mt-20 border-t border-zinc-100 pt-10">
        <p className="text-sm text-zinc-400 font-medium">
          Order #ESS-{Math.floor(Math.random() * 90000) + 10000}
        </p>
      </div>
    </div>
  );
};