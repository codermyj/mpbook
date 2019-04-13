create table books(
  id int NOT NULL AUTO_INCREMENT primary key,
  isbn varchar(20) not null,
  openid varchar(50) not null,
  title varchar(100) not null,
  image varchar(100),
  author varchar(100) not null,
  publisher varchar(100) not null,
  pages int,
  price varchar(100)
)
