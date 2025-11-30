CREATE TABLE flyers(
	flyer_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description MEDIUMTEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    flyer_record_id BIGINT,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (flyer_record_id) REFERENCES flyer_records(flyer_record_id)
);

