## Trainer new English words and phrases

MySQL
```
CREATE TABLE `phrases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eng` text,
  `rus` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Installation
```
 npm install
```

Build
```
./node_modules/.bin/webpack
```

Start http server
```
npm start
```