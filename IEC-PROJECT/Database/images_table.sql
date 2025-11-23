CREATE TABLE  images(
  image_id INT NOT NULL AUTO_INCREMENT,
  flyer_id INT NOT NULL,
  image_name VARCHAR(100) NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  PRIMARY KEY (image_id),  
  FOREIGN KEY (flyer_id) REFERENCES flyers (flyer_id) ON DELETE CASCADE);
