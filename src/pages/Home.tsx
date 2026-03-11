import { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, Loader2 } from 'lucide-react';
import { Hero } from '../components/layout/Hero';
import { ProductCard } from '../components/shop/ProductCard';
import { products as mockProducts } from '../data/products';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export const Home = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Men' | 'Women' | 'Accessories'>('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setProducts(data as Product[]);
        } else {
          // Fallback to mock products if table is empty
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock products on error
        setProducts(mockProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({ email });

      if (error) {
        if (error.code === '23505') {
          toast.info('You are already subscribed!');
        } else {
          throw error;
        }
      } else {
        toast.success('Successfully subscribed to our newsletter!');
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="animate-in fade-in duration-700">
      <Hero />

      <section id="shop" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
              <span className="h-px w-8 bg-zinc-200" />
              Our Collection
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Minimalist Design, <br /> Maximum Comfort
            </h2>
            <p className="mt-6 text-lg text-zinc-500 leading-relaxed">
              We believe in quality over quantity. Our pieces are crafted to last, using the finest sustainable materials we can find.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {(['All', 'Men', 'Women', 'Accessories'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-none border px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? 'border-black bg-black text-white shadow-xl'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Loader2 className="animate-spin text-zinc-300" size={48} />
            <p className="mt-4 text-zinc-500 font-medium">Loading collection...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="mb-4 rounded-full bg-zinc-50 p-6 text-zinc-300">
                  <ShoppingBag size={48} />
                </div>
                <p className="text-xl font-medium text-zinc-900">No items found</p>
                <p className="mt-2 text-zinc-500">Try selecting a different category or search term.</p>
                <button 
                  onClick={() => setActiveCategory('All')} 
                  className="mt-8 text-sm font-bold uppercase tracking-widest underline underline-offset-4 hover:text-zinc-600"
                >
                  View all products
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Promotion/Story Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-zinc-900 rounded-none px-6 py-24 sm:px-12 sm:py-32">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1523381235312-3a1647fa9921?auto=format&fit=crop&q=80" 
                alt="Fabric texture" 
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="relative flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                The Sustainable Choice
              </h2>
              <p className="mt-6 max-w-xl text-lg text-zinc-300">
                By choosing ESSENTIALS, you are supporting ethical manufacturing and sustainable fabric production. We use 100% organic cotton and recycled materials.
              </p>
              <div className="mt-10">
                <button className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-zinc-300 transition-colors">
                  Learn about our mission
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Join the Inner Circle</h2>
            <p className="mt-4 text-lg text-zinc-500">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe} className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full max-w-sm rounded-none border border-zinc-200 bg-white px-6 py-4 text-sm focus:border-black focus:outline-none sm:w-80"
                required
                disabled={isSubmitting}
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="rounded-none bg-black px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};