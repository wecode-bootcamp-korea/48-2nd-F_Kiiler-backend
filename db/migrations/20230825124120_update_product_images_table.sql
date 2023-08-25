-- migrate:up
ALTER TABLE product_images
MODIFY COLUMN url varchar(300);



-- migrate:down
DROP TABLE product_images;
