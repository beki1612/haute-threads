import { ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-zinc-100">
      <img
        src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f018bcf-635a-4cab-a40f-6d66b2e644a5/modern-fashion-hero-banner-0ac3c756-1773245398244.webp"
        alt="Hero Collection"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-xl text-white"
        >
          <span className="mb-4 inline-block text-xs font-bold tracking-[0.3em] uppercase opacity-80">
            New Season Arrival
          </span>
          <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] sm:text-7xl lg:text-8xl">
            Redefining <br /> Modern <br /> Comfort
          </h1>
          <p className="mb-10 max-w-lg text-lg text-zinc-100 opacity-90 leading-relaxed sm:text-xl">
            Discover our latest collection of minimalist essentials designed for the urban lifestyle. Premium fabrics, timeless silhouettes, and sustainable craft.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="h-14 min-w-[160px] rounded-none bg-white font-bold text-black hover:bg-zinc-200">
              Shop Men
            </Button>
            <Button size="lg" variant="outline" className="h-14 min-w-[160px] rounded-none border-2 border-white font-bold text-white hover:bg-white hover:text-black">
              Shop Women
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};