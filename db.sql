create database lavanderia;
use lavanderia;

create table usuario(
id_usuario int auto_increment primary key,
nome varchar(100) ,
senha varchar(100) ,
email varchar(100) unique ,
nivel int 
);

# CLIENTE

create table cliente_info(
id_cliente_info int auto_increment primary key,
cpf varchar(20) unique,
cnpj varchar(20) unique,
nome varchar(100),
razao_social varchar(100),
email varchar(100) unique,
observacao_descricao varchar(300),
observacao_cor varchar(30)
);

create table cliente_endereco(
id_cliente_endereco int auto_increment primary key,
endereco varchar(100),
numero varchar(10),
complemento varchar(50),
bairro varchar(50),
estado varchar(50),
cep varchar(20)
);

create table cliente_contato(
id_cliente_contato int auto_increment primary key,
contato varchar(20),
cliente_id int
);

create table cliente(
id_cliente int auto_increment primary key,
cliente_info_id int,
cliente_endereco_id int
);

alter table cliente add constraint FK_CLIENTE_INFO foreign key (cliente_info_id) references cliente_info(id_cliente_info);

alter table cliente add constraint FK_CLIENTE_ENDERECO foreign key (cliente_endereco_id) references cliente_endereco(id_cliente_endereco);

alter table cliente_contato add constraint FK_CONTATO_CLIENTE foreign key (cliente_id) references cliente(id_cliente);


# SERVICO

create table servico(
id_servico int auto_increment primary key,
pagamento_id int,
servico_cliente_id int,
data_entrada datetime,
data_entrega datetime,
data_pagamento datetime,
data_retirada datetime,
observacao varchar(100),
situacao varchar(40)
);

create table servico_cliente(
id_servico_cliente int auto_increment primary key,
nome varchar(100),
cpf varchar(20) unique,
cnpj Varchar(20) unique,
contato varchar(20)
);

create table pagamento(
id_pagamento int auto_increment primary key,
cartao_debito double,
cartao_credito double,
cheque double,
dinheiro double,
desconto int,
valor_pago double,
valor_total double
);

alter table servico add constraint FK_SERVICO_PAGAMENTO foreign key (pagamento_id) references pagamento(id_pagamento);
alter table servico add constraint FK_SERVICO_CLIENTE foreign key (servico_cliente_id) references servico_cliente(id_servico_cliente);

# ITEM

create table item(
id_item int auto_increment primary key,
servico_id int,
peca_id int,
quantidade int,
unidade varchar(50),
valor_unitario double,
valor_total double
);

create table cor_item(
id_cor_item int auto_increment primary key,
item_id int,
cor_nome varchar(50),
hexadecimal varchar(20)
);

create table defeito_item(
id_defeito_item int auto_increment primary key,
item_id int,
defeito varchar(50)
);

create table peca(
id_peca int auto_increment primary key,
peca varchar(100),
unidade varchar(50),
valor double
);

create table caracteristica_item(
id_caracteristica_item int auto_increment primary key,
item_id int,
caracteristica varchar(50)
);

alter table item add constraint FK_ITEM_SERVICO foreign key (servico_id) references servico(id_servico);
alter table item add constraint FK_ITEM_PECA foreign key (peca_id) references peca(id_peca);

alter table cor_item add constraint FK_COR_ITEM foreign key (item_id) references item(id_item);
alter table defeito_item add constraint FK_DEFEITO_ITEM foreign key (item_id) references item(id_item);
alter table caracteristica_item add constraint FK_CARACTERISTICA_ITEM foreign key (item_id) references item(id_item);

# PROPRIEDADES

create table cor(
id_cor int auto_increment primary key,
cor_nome varchar(20),
hexadecimal varchar(20) unique
);

create table defeito(
id_defeito int auto_increment primary key,
defeito varchar(50)
);

create table unidade(
id_unidade int auto_increment primary key,
unidade varchar(50) 
);

create table caracteristica(
id_caracteristica int auto_increment primary key,
caracteristica varchar(50)
);





