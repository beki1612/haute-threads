import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { Button } from '../ui';

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900">ESSENTIALS</h3>
            <p className="mt-4 text-sm text-zinc-500">
              Modern minimalist apparel designed for everyday life. High quality, sustainably sourced, and ethically made.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-black">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-zinc-400 hover:text-black">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-zinc-400 hover:text-black">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest">Shop</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-zinc-500 hover:text-black">New Arrivals</a></li>
              <li><a href="#" className="text-sm text-zinc-500 hover:text-black">Best Sellers</a></li>
              <li><a href="#" className="text-sm text-zinc-500 hover:text-black">Men</a></li>
              <li><a href="#" className="text-sm text-zinc-500 hover:text-black">Women</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest">Support</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-zinc-500 hover:text-black">Contact Us</a></li>
              <li><a href="#" className="text-sm text-zinc-500 hover:text-black">Shipping & Returns</a></li>
              <li><a href="#" className="text-sm text-zinc-500 hover:text-black">Size Guide</a></li>
              <li><a href="#" className="text-sm text-zinc-500 hover:text-black">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest">Newsletter</h4>
            <p className="mt-4 text-sm text-zinc-500">
              Subscribe to get special offers and first look at new arrivals.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md border border-zinc-200 px-4 py-2 text-sm focus:border-zinc-900 focus:outline-none"
              />
              <Button className="rounded-l-none px-4">
                <ArrowRight size={18} />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-100 pt-8 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} ESSENTIALS Clothing Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};