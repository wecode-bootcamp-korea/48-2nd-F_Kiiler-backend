-- migrate:up
CREATE TABLE bid_product_size (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  size_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (size_id) REFERENCES sizes (id)
);

-- migrate:down
DROP TABLE bid_product_size;