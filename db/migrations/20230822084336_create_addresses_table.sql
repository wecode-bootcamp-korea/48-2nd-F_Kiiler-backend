-- migrate:up
CREATE TABLE addresses (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  address_name varchar(50) NOT NULL,
  reciever_name varchar(50) NOT NULL,
  phone_number varchar(20) NOT NULL,
  address1 varchar(200) NOT NULL, 
  address2 varchar(200) NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);


-- migrate:down
DROP TABLE addresses;