CREATE TABLE flyer_records(
  flyer_record_id INT NOT NULL AUTO_INCREMENT,
  flyer_id INT NOT NULL,
  email VARCHAR(100) NOT NULL,
  status ENUM('pending', 'approved', 'declined') NULL DEFAULT 'pending',
  modified_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`flyer_record_id`));
