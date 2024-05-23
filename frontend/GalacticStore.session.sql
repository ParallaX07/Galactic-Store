CREATE TABLE `review` (
  `product_ID` char(36) NOT NULL,
  `Email_ID` varchar(50) NOT NULL,
  `reviewDesc` text NOT NULL,
  `rating` decimal(2,1) NOT NULL CHECK (rating BETWEEN 0 AND 5),
  `post_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_ID`, `Email_ID`),
  CONSTRAINT `review__ibfk_1` FOREIGN KEY (`product_ID`) REFERENCES `product` (`Product_ID`),
  CONSTRAINT `review__ibfk_2` FOREIGN KEY (`Email_ID`) REFERENCES `user` (`Email_ID`)
)