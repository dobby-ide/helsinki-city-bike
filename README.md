## Helsinki-city-bike App
### SQL code to create stations table
CREATE TABLE stations(  
    FID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ID INT,
    name VARCHAR(60),
    address VARCHAR(80),
    city VARCHAR(40),
    capacity INT,
    x_coord FLOAT(10,6),
    y_coord FLOAT(10,6)
);


## known bugs
#### <code>position:sticky </code> has not been supported in IE previous versions than Microsoft Edge