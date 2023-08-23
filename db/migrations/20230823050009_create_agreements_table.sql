-- migrate:up
CREATE TABLE agreements (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  terms_of_service TEXT NOT NULL,
  personal_information_collection_and_usage_agreement TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE agreements;
