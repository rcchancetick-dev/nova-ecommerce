-- ============================================================
-- NOVA E-commerce — Script de seed reproductible
-- ============================================================
-- Ce script recree le schema complet (products, orders, order_items)
-- avec Row Level Security et insere les produits de demarrage.
-- A executer dans le SQL Editor de votre projet Supabase, ou via:
--   supabase db push  (si vous utilisez la CLI Supabase avec les migrations)
-- ============================================================

-- Nettoyage (optionnel, decommenter si vous voulez repartir de zero)
-- drop table if exists order_items cascade;
-- drop table if exists orders cascade;
-- drop table if exists products cascade;

-- ------------------------------------------------------------
-- Table: products
-- ------------------------------------------------------------
create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  price numeric(10,2) not null,
  category text not null,
  color text,
  rating numeric(2,1) default 4.5,
  image_url text,
  badge text,
  stock integer default 100,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- Table: orders
-- ------------------------------------------------------------
create table if not exists orders (
  id bigint generated always as identity primary key,
  customer_name text not null,
  customer_email text not null,
  shipping_address text not null,
  city text,
  postal_code text,
  total numeric(10,2) not null,
  status text default 'pending',
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- Table: order_items
-- ------------------------------------------------------------
create table if not exists order_items (
  id bigint generated always as identity primary key,
  order_id bigint references orders(id) on delete cascade,
  product_id bigint references products(id),
  quantity integer not null default 1,
  unit_price numeric(10,2) not null
);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Policies (adaptees a une demo publique ; a restreindre en prod
-- avec Supabase Auth pour limiter chaque client a ses propres commandes)
drop policy if exists "Public read access on products" on products;
create policy "Public read access on products"
  on products for select using (true);

drop policy if exists "Public insert on orders" on orders;
create policy "Public insert on orders"
  on orders for insert with check (true);

drop policy if exists "Public read own orders" on orders;
create policy "Public read own orders"
  on orders for select using (true);

drop policy if exists "Public insert on order_items" on order_items;
create policy "Public insert on order_items"
  on order_items for insert with check (true);

-- ------------------------------------------------------------
-- Seed: produits de demarrage
-- ------------------------------------------------------------
insert into products (name, price, category, color, rating, image_url, badge) values
('Aether Sneaker X1', 189, 'Sneakers', 'Violet Nebula', 4.9, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', 'Nouveau'),
('Chrono Watch Zero', 349, 'Accessoires', 'Titane Noir', 4.8, 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80', 'Best-seller'),
('Orbit Backpack', 129, 'Sacs', 'Graphite', 4.7, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', null),
('Flux Hoodie', 89, 'Vetements', 'Fuchsia Glow', 4.9, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', 'Nouveau'),
('Nebula Sunglasses', 149, 'Accessoires', 'Cyan Chrome', 4.6, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', null),
('Voltage Jacket', 259, 'Vetements', 'Electric Blue', 4.8, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 'Best-seller'),
('Pulse Cap', 45, 'Accessoires', 'Noir Mat', 4.5, 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80', null),
('Quantum Runner', 219, 'Sneakers', 'Silver Mirage', 4.9, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', 'Nouveau')
on conflict do nothing;
