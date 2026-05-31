-- Run this entire file in Supabase Dashboard → SQL Editor
-- https://supabase.com/dashboard/project/qxhqoczzdnijlairmueq/editor

create table if not exists outfit_item (
  id serial primary key,
  outfit_id int not null references outfit(id) on delete cascade,
  name varchar(300) not null,
  category varchar(100) not null,
  price numeric(10,2) not null check (price > 0),
  image_url varchar(500),
  sizes varchar(100) default 'XS,S,M,L,XL',
  is_available boolean default true
);

alter table outfit_item enable row level security;

create policy "public_items" on outfit_item for select using (true);
