create database Cloud;
use Cloud;
create table Users
(
    ID int auto_increment primary key,
    UserName varchar(50),
    Pass varchar(200) ,
	Email varchar(255) ,
    PhoneNumber int null,
    Wallet float,
    Credit float,users
    Address varchar(255),
    Token varchar(255),
    VIPuser varchar(100,
    status bool,
    timestamp Date
);
INSERT INTO Users (Email, UserName, PhoneNumber, Pass, Wallet, Credit, Address, Token, VIPuser, status, timestamp)
VALUES ('khangnguu@gmail.com', 'khang1', 113113116, 'Khangyeuem@123', 0, 0, '', '', '', false, NULL);
SELECT * FROM products_type;


create table admins
(
	ID int auto_increment primary key,
    UserName varchar(50),
    Pass varchar(200) ,
    Email varchar(255) ,
    PhoneNumber int null,
    Address varchar(255),
    VIPuser varchar(100)
);
create table products_type
(
	ID int auto_increment primary key,
    name varchar(255),
    Descriptions varchar(255),
    content varchar(255),
    thumb varchar(255),
    slug varchar(255)
);
create table products
(
	ID int auto_increment primary key,
    name varchar(255),
    Descriptions varchar(255),
    content varchar(255),
    thumb varchar(255),
    slug varchar(255)
    
);
create table productsPackage
(
	ID int auto_increment primary key,
    Name varchar(255),
    RAM varchar(255) null,
    CPU varchar(255) null,
    Storage varchar(255) null,
    Price float,
    ID_Product int,
	Hourly bool,
	Monthly bool,
	Quarterly bool,
	Biannually bool,
	Annually bool,
	Biennially bool,
	Triennially bool,
	Quinquennially bool,
	Decennially bool,
    content varchar(255),
    thumb varchar(255),
    slug varchar(255),
    data_stranfer varchar(45),
    bandwidth varchar(45),
    tax float,
    foreign key (ID_Product) references products (ID)
    
);

create table product_image(
	ID int auto_increment primary key,
    Name varchar(255),
    Descriptions varchar(255),
    Thump varchar(255),
    Type varchar(255),
    content varchar(255),
    slug varchar(255),
    ID_product int,
    foreign key (ID_Product) references products (ID)
);
create table invoice(
	ID int auto_increment primary key,
    Name varchar(255),
    Descriptions varchar(255),
    ID_invoice_item int,
    Created_at DateTime,
    Updated_at DateTime,
    ID_admin int,
    ID_user int,
    Total_price float,
    foreign key (ID_admin) references admins (ID),
    foreign key (ID_user) references users (ID)
);
create table invoice_item(
	ID int auto_increment primary key,
    Name varchar(255),
    Descriptions varchar(255),
    Quantity int,
    Name_packages varchar(255),
    Price float,
    ID_invoice int,
    Circle varchar(255),
    Name_image varchar(255),
    Created_at DateTime,
    Updated_at DateTime,
	foreign key (ID_invoice) references invoice (ID)
    
);
create table discount(
	ID int auto_increment primary key,
    Name varchar(255),
    Descriptions varchar(255),
    Code varchar(255),
    types int,
    value float
);

create table orders(
	ID int auto_increment primary key,
    Name varchar(255),
    Descriptions varchar(255),
    ID_user int,
    Pass varchar(255),
    User_name varchar(255),
    IP varchar(255)
);
create table queue(
	ID int auto_increment primary key,
    Name varchar(255),
    Descriptions varchar(255),
    ID_Package int,
    ID_Image int,
);
SELECT ID, name, Descriptions, content, thumb, slug FROM products_type;
ALTER TABLE productsPackage
DROP FOREIGN KEY productspackage_ibfk_1;

SELECT
    CONSTRAINT_NAME
FROM
    information_schema.KEY_COLUMN_USAGE
WHERE
    TABLE_NAME = 'productsPackage' AND
    TABLE_SCHEMA = 'cloud';
ALTER TABLE productsPackage
ADD CONSTRAINT fk_product
FOREIGN KEY (ID_Product) REFERENCES products(ID);

ALTER TABLE product_image
ADD CONSTRAINT fk_product_image
FOREIGN KEY (ID_Product) REFERENCES products(ID);
INSERT INTO `cloud`.`typeofproducts` (`ID`, `TypeProduct`, `Descriptions`, `parentId`) VALUES ('1', 'VPS Linux', 'Gói Cloud VPS cao cấp, dung lượng từ thấp đến cao phù hợp cho mọi nhu cầu.', '1');
INSERT INTO `cloud`.`typeofproducts` (`ID`, `TypeProduct`, `Descriptions`, `parentId`) VALUES ('2', 'VPS NVMe', 'Gói Cloud VPS NVMe cao cấp, dung lượng từ thấp đến cao phù hợp cho mọi nhu cầu.', '1');
INSERT INTO `cloud`.`typeofproducts` (`ID`, `TypeProduct`, `Descriptions`, `parentId`) VALUES ('3', 'VPS GIÁ RẺ', 'Gói VPS giá rẻ mang đến giải pháp về giá nhưng vẫn đảm bảo về mặt tốc độ.', '1');
INSERT INTO `cloud`.`typeofproducts` (`ID`, `TypeProduct`, `Descriptions`, `parentId`) VALUES ('4', 'CLOUD HOSTING', 'Các gói Hosting dung lượng lớn với giá siêu hạt dẻ - một mức chi phí tối ưu để bạn bắt đầu thực hiện các dự án cá nhân và cho doanh nghiệp..', '2');
INSERT INTO `cloud`.`typeofproducts` (`ID`, `TypeProduct`, `Descriptions`, `parentId`) VALUES ('5', 'WORDPRESS HOSTING', 'Các gói WordPress Hosting cực rẻ, ưu đãi càng nhiều khi đăng ký thời hạn lâu dài.', '2');
INSERT INTO `cloud`.`typeofproducts` (`ID`, `TypeProduct`, `Descriptions`, `parentId`) VALUES ('6', 'Chổ đặt máy chủ', 'Máy chủ luôn được đảm bảo và duy trì trong môi trường ổn định tại FPT, Viettel, VNPT.', '3');
INSERT INTO `cloud`.`typeofproducts` (`ID`, `TypeProduct`, `Descriptions`, `parentId`) VALUES ('7', 'Máy chủ riêng', 'Dành riêng cho doanh nghiệp lớn, có lượng dữ liệu khủng và nhu cầu khởi tạo một máy chủ riêng.', '3');
INSERT INTO `cloud`.`typeofproducts` (`ID`, `TypeProduct`, `parentId`) VALUES ('8', 'Email doanh nghiệp', '4');
INSERT INTO `cloud`.`typeofproducts` (`ID`, `TypeProduct`, `parentId`) VALUES ('9', 'Chứng chỉ SSL', '5');
INSERT INTO `cloud`.`typeofproducts` (`ID`, `TypeProduct`, `parentId`) VALUES ('10', 'CDN', '6');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('1', 'VPS Cheap 1', '1', '1', '20 SSD', '99000', '1');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('2', 'VPS Cheap 2', '2', '1', '20 SSD', '150000', '1');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('3', 'VPS Cheap 3', '2', '2', '40 SSD', '240000', '1');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('4', 'VPS Cheap 4', '4', '2', '40 SSD', '300000', '1');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('5', 'VPS Cheap 5', '4', '4', '40 SSD', '360000', '1');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('6', 'VPS Cheap 6', '6', '4', '60 SSD', '480000', '1');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('7', 'VPS Cheap 7', '6', '6', '60 SSD', '540000', '1');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('8', 'VPS Cheap 8', '8', '6', '60 SSD', '600000', '1');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('9', 'Cloud VPS 1', '1', '1', '20 SSD', '190000', '2');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('10', 'Cloud VPS 2', '2', '1', '20 SSD', '230000', '2');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('11', 'Cloud VPS 3', '2', '2', '40 SSD', '380000', '2');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('12', 'Cloud VPS 4', '4', '2', '40 SSD', '460000', '2');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('13', 'Cloud VPS 5', '4', '4', '60 SSD', '680000', '2');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('14', 'Cloud VPS 6', '6', '4', '60 SSD ', '760000', '2');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('15', 'Cloud VPS 7', '6', '6', '80 SSD', '980000', '2');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('16', 'Cloud VPS 8', '8', '6', '80 SSD', '1060000', '2');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('17', 'Cloud VPS 9', '8', '8', '80 SSD', '1200000', '2');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('18', 'VPS NVMe 1', '1', '1', '20 SSD', '189000', '3');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('19', 'VPS NVMe 2', '2', '1', '20 SSD', '239000', '3');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('20', 'VPS NVMe 3', '2', '2', '40 SSD', '459000', '3');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('21', 'VPS NVMe 4', '4', '2', '40 SSD', '559000', '3');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('22', 'VPS NVMe 5', '4', '4', '40 SSD', '879000', '3');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('23', 'VPS NVMe 6', '6', '4', '60 SSD', '999000', '3');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('24', 'VPS NVMe 7', '6', '6', '60 SSD', '1319000', '3');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('25', 'VPS NVMe 8', '8', '6', '80 SSD', '1439000', '3');
INSERT INTO `cloud`.`productspackage` (`ID`, `NameProduct`, `RAM`, `CPU`, `Storage`, `Price`, `ProductID`) VALUES ('26', 'VPS NVMe 9', '8', '8', '80 SSD', '1639000', '3');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('1', 'VPS Giá Rẻ', 'VPS Giá Rẻ', 'https://kdata.vn/kdata/images/img-service-5.png', 'VPS');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('2', 'VPS Linux', 'VPS Linux', 'https://kdata.vn/kdata/images/img-service-1.png', 'VPS');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('3', 'Cloud VPS NVMe', 'Cloud VPS NVMe', 'https://kdata.vn/kdata/images/img-service-3.png', 'VPS');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('4', 'Linux', 'Linux', 'https://kdata.vn/kdata/images/linux-logo.png', 'Linux');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('5', 'Ubuntu', 'Ubuntu', 'https://s3.kstorage.vn/api-kdata/images/post/300x300_66c2bb910a350.png', 'Linux');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('6', 'Rocky', 'Rorky', 'https://s3.kstorage.vn/api-kdata/images/post/300x300_66bc7d606f032.png', 'Linux');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('7', 'Almalinux', 'Almalinux', 'https://s3.kstorage.vn/api-kdata/images/post/300x300_66bc7d82c4896.png', 'Linux');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('8', 'Debian', 'Debian', 'https://s3.kstorage.vn/api-kdata/images/post/300x300_66c2bc1220869.png', 'Linux');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('9', 'Oracle', 'Oracle', 'https://s3.kstorage.vn/api-kdata/images/post/300x300_66c2bc3adc532.png', 'Linux');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('10', 'Windows', 'Windows', 'https://kdata.vn/kdata/images/windows-logo.png', 'Windows');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('11', 'Windows', 'Windows', 'https://s3.kstorage.vn/api-kdata/images/post/300x300_66c2bb8d3d3f7.png', 'Windows');
INSERT INTO `cloud`.`image` (`ID`, `NameImage`, `Descriptions`, `Thump`, `Type`) VALUES ('12', 'Application', 'Application', 'https://kdata.vn/kdata/images/application_logo.png', 'Application');
