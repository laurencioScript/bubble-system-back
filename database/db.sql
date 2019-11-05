ALTER TABLE IF EXISTS cliente DROP CONSTRAINT FK_CLIENTE_INFO;
ALTER TABLE IF EXISTS cliente DROP CONSTRAINT FK_CLIENTE_ENDERECO;
ALTER TABLE IF EXISTS servico DROP CONSTRAINT FK_SERVICO_PAGAMENTO;
ALTER TABLE IF EXISTS servico DROP CONSTRAINT FK_SERVICO_CLIENTE;
ALTER TABLE IF EXISTS cliente_contato DROP CONSTRAINT FK_CONTATO_CLIENTE;
ALTER TABLE IF EXISTS item DROP CONSTRAINT FK_ITEM_SERVICO;
ALTER TABLE IF EXISTS item DROP CONSTRAINT FK_ITEM_PECA;
ALTER TABLE IF EXISTS cor_item DROP CONSTRAINT FK_COR_ITEM;
ALTER TABLE IF EXISTS defeito_item DROP CONSTRAINT FK_DEFEITO_ITEM;
ALTER TABLE IF EXISTS caracteristica_item DROP CONSTRAINT FK_CARACTERISTICA_ITEM;



DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS cliente_info;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS cliente_endereco;
DROP TABLE IF EXISTS servico;
DROP TABLE IF EXISTS servico_cliente;
DROP TABLE IF EXISTS pagamento;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS cor_item;
DROP TABLE IF EXISTS defeito_item;
DROP TABLE IF EXISTS peca;
DROP TABLE IF EXISTS caracteristica_item;
DROP TABLE IF EXISTS cor;
DROP TABLE IF EXISTS defeito;
DROP TABLE IF EXISTS unidade;
DROP TABLE IF EXISTS caracteristica;


create table usuario(
id_usuario serial primary key,
nome varchar(100) ,
senha varchar(100) ,
email varchar(100) unique ,
nivel int 
);



create table cliente_info(
id_cliente_info serial primary key,
cpf_cnpj varchar(20) UNIQUE,
tipo varchar(1),
nome varchar(100),
razao_social varchar(100),
email varchar(100) unique,
observacao_descricao varchar(300),
observacao_cor varchar(30),
contato text[]
);

create table cliente_endereco(
id_cliente_endereco serial primary key,
endereco varchar(100),
numero varchar(10),
complemento varchar(50),
bairro varchar(50),
cidade varchar(50),
estado varchar(50),
cep varchar(20)
);



create table cliente(
id_cliente serial primary key,
cliente_info_id int,
cliente_endereco_id int
);

alter table cliente add constraint FK_CLIENTE_INFO foreign key (cliente_info_id) references cliente_info(id_cliente_info);

alter table cliente add constraint FK_CLIENTE_ENDERECO foreign key (cliente_endereco_id) references cliente_endereco(id_cliente_endereco);




create table servico(
id_servico serial primary key,
pagamento_id int,
servico_cliente_id int,
data_entrada timestamp,
data_entrega timestamp,
data_pagamento timestamp,
data_retirada timestamp,
observacao varchar(100),
situacao varchar(40)
);

create table servico_cliente(
id_servico_cliente serial primary key,
nome varchar(100),
cpf varchar(20) unique,
cnpj Varchar(20) unique,
contato varchar(20)
);

create table pagamento(
id_pagamento serial primary key,
cartao_debito decimal,
cartao_credito decimal,
cheque decimal,
dinheiro decimal,
desconto int,
valor_pago decimal,
valor_total decimal
);

alter table servico add constraint FK_SERVICO_PAGAMENTO foreign key (pagamento_id) references pagamento(id_pagamento);
alter table servico add constraint FK_SERVICO_CLIENTE foreign key (servico_cliente_id) references servico_cliente(id_servico_cliente);



create table item(
id_item  serial primary key,
servico_id int,
peca_id int,
quantidade int,
unidade varchar(50),
valor_unitario decimal,
valor_total decimal
);

create table cor_item(
id_cor_item  serial primary key,
item_id int,
cor_nome varchar(50),
hexadecimal varchar(20)
);

create table defeito_item(
id_defeito_item  serial primary key,
item_id int,
defeito varchar(50)
);

create table peca(
id_peca  serial primary key,
peca varchar(100),
unidade varchar(50),
valor decimal
);

create table caracteristica_item(
id_caracteristica_item  serial primary key,
item_id int,
caracteristica varchar(50)
);

alter table item add constraint FK_ITEM_SERVICO foreign key (servico_id) references servico(id_servico);
alter table item add constraint FK_ITEM_PECA foreign key (peca_id) references peca(id_peca);

alter table cor_item add constraint FK_COR_ITEM foreign key (item_id) references item(id_item);
alter table defeito_item add constraint FK_DEFEITO_ITEM foreign key (item_id) references item(id_item);
alter table caracteristica_item add constraint FK_CARACTERISTICA_ITEM foreign key (item_id) references item(id_item);



create table cor(
id_cor serial primary key,
cor_nome varchar(20),
hexadecimal varchar(20) unique
);

create table defeito(
id_defeito serial primary key,
defeito varchar(50)
);

create table unidade(
id_unidade serial primary key,
unidade varchar(50) 
);

create table caracteristica(
id_caracteristica serial primary key,
caracteristica varchar(50)
);





