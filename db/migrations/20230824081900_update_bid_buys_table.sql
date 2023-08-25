-- migrate:up
alter table bid_buys drop foreign key bid_buys_ibfk_2;
alter table bid_buys add foreign key(bid_product_size_id) references bid_product_size(id);

-- migrate:down
DROP TABLE bid_buys;