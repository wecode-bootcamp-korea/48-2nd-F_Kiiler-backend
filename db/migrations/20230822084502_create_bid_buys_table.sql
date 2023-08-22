-- migrate:up
CREATE TABLE bid_buys (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  buyer_id INT NOT NULL,
  bid_product_size_id INT NOT NULL,
  stauts VARCHAR(20) NULL,
  price DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (buyer_id) REFERENCES users (id),
  FOREIGN KEY (bid_product_size_id) REFERENCES products (id)
);


-- migrate:down
DROP TABLE bid_buys;