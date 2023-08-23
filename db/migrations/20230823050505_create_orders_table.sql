-- migrate:up
CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  seller_id INT NOT NULL,
  buyer_id INT NOT NULL,
  bid_product_size_id INT NOT NULL,
  order_number VARCHAR(100) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES bid_sells (seller_id),
  FOREIGN KEY (buyer_id) REFERENCES bid_buys (buyer_id),
  FOREIGN KEY (bid_product_size_id) REFERENCES bid_product_size (id)
);


-- migrate:down
DROP TABLE orders;