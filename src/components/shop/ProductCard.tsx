import { Plus, Eye, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Badge, Button } from '../ui';
import { motion } from 'framer-motion';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {product.isNew && (
          <Badge className="absolute left-4 top-4 rounded-none bg-black px-4 py-1.5 font-bold uppercase tracking-widest text-white">
            New Arrival
          </Badge>
        )}

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
          <Button
            onClick={() => addToCart(product)}
            className="w-full gap-2 rounded-none bg-white py-6 text-xs font-bold uppercase tracking-widest text-black shadow-2xl hover:bg-zinc-100"
          >
            <Plus size={16} />
            Quick Add
          </Button>
        </div>

        <div className="absolute right-4 top-4 flex flex-col gap-2 translate-x-12 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
          <button className="flex h-10 w-10 items-center justify-center rounded-none bg-white text-zinc-900 shadow-lg hover:bg-black hover:text-white transition-colors">
            <Heart size={18} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-none bg-white text-zinc-900 shadow-lg hover:bg-black hover:text-white transition-colors">
            <Eye size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{product.category}</p>
            <h3 className="mt-1 text-sm font-bold tracking-tight text-zinc-900 group-hover:underline">{product.name}</h3>
          </div>
          <p className="text-sm font-bold text-zinc-900">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </motion.div>
  );
};