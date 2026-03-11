-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    price numeric NOT NULL,
    description text,
    image text,
    category text NOT NULL,
    is_new boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to products
CREATE POLICY "Allow public read access" ON public.products
    FOR SELECT USING (true);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    customer_name text,
    customer_email text,
    total_amount numeric NOT NULL,
    status text DEFAULT 'pending',
    created_at timestamptz DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to insert an order (guest checkout support)
CREATE POLICY "Allow public insert access" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Policy for users to see their own orders
CREATE POLICY "Allow users to see their own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id uuid REFERENCES public.products(id) NOT NULL,
    quantity integer NOT NULL,
    price_at_time numeric NOT NULL
);

-- Enable RLS on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policy for public insert access to order_items
CREATE POLICY "Allow public insert access" ON public.order_items
    FOR INSERT WITH CHECK (true);

-- Policy for users to see their own order items
CREATE POLICY "Allow users to see their own order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
        )
    );

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS on newsletter_subscriptions
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to subscribe
CREATE POLICY "Allow public insert access" ON public.newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

-- Seed products
INSERT INTO public.products (name, price, description, image, category, is_new)
VALUES 
('Essential White Tee', 45, 'High-quality organic cotton white t-shirt with a perfect fit.', 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f018bcf-635a-4cab-a40f-6d66b2e644a5/minimalist-white-t-shirt-718cacf6-1773245105565.webp', 'Men', true),
('Premium Grey Hoodie', 95, 'Ultra-soft charcoal grey hoodie, oversized for maximum comfort.', 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f018bcf-635a-4cab-a40f-6d66b2e644a5/premium-hoodie-280f2671-1773245096565.webp', 'Men', false),
('Silk Midi Dress', 180, 'Elegant black silk dress, perfect for evening wear or special occasions.', 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f018bcf-635a-4cab-a40f-6d66b2e644a5/silk-midi-dress-95360f05-1773245096887.webp', 'Women', true),
('Classic City Trench', 250, 'A timeless tan trench coat designed for the modern urban explorer.', 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f018bcf-635a-4cab-a40f-6d66b2e644a5/classic-trench-coat-381dd782-1773245102921.webp', 'Women', false),
('Raw Selvedge Denim', 120, 'Premium raw denim jeans that age beautifully with every wear.', 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f018bcf-635a-4cab-a40f-6d66b2e644a5/raw-denim-jeans-59bd5cc9-1773245102712.webp', 'Men', false),
('Signature Collection Set', 85, 'Curated minimalist accessories including high-end watch and eyewear.', 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f018bcf-635a-4cab-a40f-6d66b2e644a5/accessories-collection-809a7d0f-1773245097243.webp', 'Accessories', false)
ON CONFLICT DO NOTHING;