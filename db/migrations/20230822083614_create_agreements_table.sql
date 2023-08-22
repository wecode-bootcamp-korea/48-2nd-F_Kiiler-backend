-- migrate:up
CREATE TABLE agreements (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  agree_app BOOLEAN NOT NULL DEFAULT 0,
  agree_sms BOOLEAN NOT NULL DEFAULT 0,
  agree_email BOOLEAN NOT NULL DEFAULT 0
);

-- migrate:down
DROP TABLE agreements;
