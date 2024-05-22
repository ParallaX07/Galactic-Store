ALTER TABLE `user`
MODIFY User_Type ENUM('Customer', 'Admin') NOT NULL DEFAULT 'Customer';