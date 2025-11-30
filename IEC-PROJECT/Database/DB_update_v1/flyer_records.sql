CREATE TABLE flyer_records (
	flyer_record_id BIGINT NOT NULL,
    flyer_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    status ENUM('pending', 'approved', 'declined') DEFAULT 'pending',
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
 