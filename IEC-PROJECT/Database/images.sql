CREATE TABLE images (
	image_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    flyer_id BIGINT NOT NULL UNIQUE,
    image_name VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (flyer_id) REFERENCES flyers(flyer_id)
);