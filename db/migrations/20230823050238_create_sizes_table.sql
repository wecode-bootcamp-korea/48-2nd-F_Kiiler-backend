-- migrate:up
CREATE TABLE sizes(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type varchar(20) NOT NULL
);


-- migrate:down
DROP TABLE sizes;
