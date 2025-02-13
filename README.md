### Specification
- `Laravel 11`
-  `PHP 8.2`
-  `React Js`

### Installation

Installation is simple. It can be install using the following command:
```sh
$ composer install
$ npm install
```
Create New Database & Set App Configuration value in `.env` file:
- `APP_URL=http://localhost:8000`
- `DB_DATABASE=database_name`
- `DB_USERNAME=database_user`
- `DB_PASSWORD=database_pass`

After Set Config, Run:
```sh
$ php artisan migrate --seed
```
```sh
$ php artisan ket:generate
```

Run The Project : 
```sh
$ php artisan serve
```
```sh
$ npm run dev
```

After Run The Project, Open In Browser and Login As a admin :
```sh
$ username: admin
$ password: admin@123
```
