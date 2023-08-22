-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  brand_id INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  serial_num VARCHAR(100) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  release_date DATE NOT NULL,
  color VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE current_timestamp,
  FOREIGN KEY(category_id) REFERENCES categories (id) ,
  FOREIGN KEY(brand_id) REFERENCES brands (id)
);
-- migrate:down
DROP TABLE products;