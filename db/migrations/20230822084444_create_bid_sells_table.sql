-- migrate:up
CREATE TABLE bid_sells (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  seller_id INT NOT NULL,
  bid_product_size_id INT NOT NULL,
  stauts VARCHAR(20) NULL,
  price DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES users (id),
  FOREIGN KEY (bid_product_size_id) REFERENCES bid_product_size (id)
);


-- migrate:down
DROP TABLE bid_sells;