CREATE TABLE flyer_records (
	flyer_record_id BIGINT NOT NULL PRIMARY KEY,
    flyer_id BIGINT,
    email VARCHAR(100) NOT NULL,
    status ENUM('pending', 'approved', 'declined', 'deleted') DEFAULT 'pending',
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
 