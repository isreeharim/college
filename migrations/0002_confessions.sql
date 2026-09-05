create table if not exists confessions (
  id serial primary key,
  college text not null,
  category text not null,
  body text not null,
  upvotes integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists confessions_created_at_idx on confessions (created_at desc);
create index if not exists confessions_college_idx on confessions (college);
create index if not exists confessions_category_idx on confessions (category);
