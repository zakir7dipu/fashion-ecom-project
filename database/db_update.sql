-- 30/06/24
ALTER TABLE users ADD phone VARCHAR(50) NOT NULL AFTER name;
ALTER TABLE users ADD UNIQUE(phone);


ALTER TABLE `order_invoices` ADD `affiliate_profit_id` INT NULL AFTER `coupon_id`;
ALTER TABLE `affiliate_profits` CHANGE `order_invoice` `order_invoice_id` INT NOT NULL;
