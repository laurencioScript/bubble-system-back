ALTER TABLE IF EXISTS client DROP CONSTRAINT FK_CLIENT_INFO;
ALTER TABLE IF EXISTS client DROP CONSTRAINT FK_CLIENT_ADDRESS;
ALTER TABLE IF EXISTS service DROP CONSTRAINT FK_SERVICE_PAYMENT;
ALTER TABLE IF EXISTS item DROP CONSTRAINT FK_ITEM_SERVICE;

DROP TABLE IF EXISTS userx;
DROP TABLE IF EXISTS client_info;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS client_address;
DROP TABLE IF EXISTS service;
DROP TABLE IF EXISTS service_client;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS color_item;
DROP TABLE IF EXISTS defect_item;
DROP TABLE IF EXISTS piece;
DROP TABLE IF EXISTS characteristic_item;
DROP TABLE IF EXISTS color;
DROP TABLE IF EXISTS defect;
DROP TABLE IF EXISTS unidade;
DROP TABLE IF EXISTS characteristic;


create table userx(
id_user uuid primary key,
name_user varchar(100) ,
password_user varchar(100) ,
email varchar(100) unique ,
level_user int 
);



create table client_info(
id_client_info uuid primary key,
cpf_cnpj varchar(20) UNIQUE,
type_client varchar(1),
name_client varchar(100),
corporate_name varchar(100),
email varchar(100) unique,
observation_description varchar(300),
observation_color varchar(30),
contact text[]
);

create table client_address(
id_client_address uuid primary key,
address_client varchar(100),
phone_number varchar(10),
complement varchar(50),
neighborhood varchar(50),
city varchar(50),
state_city varchar(50),
cep varchar(20)
);



create table client(
id_client uuid primary key,
client_info_id uuid,
client_address_id uuid
);

alter table client add constraint FK_CLIENT_INFO foreign key (client_info_id) references client_info(id_client_info);
alter table client add constraint FK_CLIENT_ADDRESS foreign key (client_address_id) references client_address(id_client_address);

create table service(
id_service uuid primary key,
payment_id uuid,
date_input timestamp,
date_ouput timestamp,
date_payment timestamp,
date_removed timestamp,
observation varchar(100),
situation varchar(40),
client json
);

create table payment(
id_payment uuid primary key,
debit_card decimal,
credit_card decimal,
check_pay decimal,
money_pay decimal,
discount int,
amount_paid decimal,
value_total decimal
);

alter table service add constraint FK_SERVICE_PAYMENT foreign key (payment_id) references payment(id_payment);

create table item(
id_item  uuid primary key,
service_id uuid,
piece varchar(30), 
amount int,
unity varchar(50),
value_unity decimal,
value_total decimal,
colors JSON,
defects JSON,
characteristics JSON
);

create table piece(
id_piece  uuid primary key,
piece_name varchar(100),
unity varchar(50),
value decimal
);

alter table item add constraint FK_ITEM_SERVICE foreign key (service_id) references service(id_service);

create table color(
id_color uuid primary key,
color_name varchar(20),
hexadecimal varchar(20) unique
);

create table defect(
id_defect uuid primary key,
defect_name varchar(50)
);

create table unity(
id_unity uuid primary key,
unity_name varchar(50) 
);

create table characteristic(
id_characteristic uuid primary key,
characteristic_name varchar(50)
);





