CREATE TABLE flyers(
	  flyer_id INT NOT NULL AUTO_INCREMENT,
	  title VARCHAR(100) NOT NULL,
	  description MEDIUMTEXT NOT NULL,
	  category VARCHAR(100) NOT NULL,
	  created_by INT NOT NULL,
	  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	  flyer_record_id INT NULL DEFAULT NULL,
	  PRIMARY KEY (`flyer_id`),
	FOREIGN KEY (`flyer_record_id`) REFERENCES flyer_records (flyer_id),
	FOREIGN KEY (`created_by`) REFERENCES  users (`user_id`) ON DELETE CASCADE);
