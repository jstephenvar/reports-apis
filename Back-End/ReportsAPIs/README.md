# Receipt Generator API

## Getting Started

Este proyecto fue construido como Django Rest API con Python.

### Prerequisites

 * Python 3.8.5
 * Django 3.0.9
 * PostgreSQL Instance

## Download project

`Para comenzar...`

Clonar el proyecto:

```sh
git clone https://github.com/jstephenvar/reports-apis.git
```

### Data Base

- Para comenzar se crea un base de datos en PostgreSQL con el nombre, ejemplo `testdjango`

- Luego sobre el directorio de la aplicacion, ejecutar:

```sh
python manage.py migrate
```

- Esperar un momento mientras se crean las tablas en la db de prueba...

### Scheme 
   El esquema de la base de datos como se muestra a continuacion esta basado en 3 tablas:
   
   - `udes_receipt` : encargada de almacenar los recibos
   - `udes_concept` : encargada de almacenar los conceptos
   - `udes_price` : encargada de almacenar los precios asociados al concepto.
   
   Relaciones;
   
   ![Db](https://github.com/jstephenvar/reports-apis/blob/master/Back-End/images/db_relations.jpg)

### Running project

Para correr el proyecto vamos sobre el directorio de la aplicacion, ejecutar:

```bash
python manage.py runserver 8080
```

## Rest API

### Request Concept

- Request para crear, obtener, editar, y eliminar conceptos asociados a un precio.

Ejemplo obtener todos los conceptos:
  
 - Curl Example local :  `GET /api/v1/receipt-generator/concept`
       
  ```bash
    curl --location --request GET 'http://localhost:8080/api/v1/receipt-generator/concept'
```

* Response satisfactoria

    ```json
  [{
      "id": 1,
      "name": "Test Concepto",
      "description": "Pago Semestre",
      "creation_date": "2018-08-22",
      "last_modified": null,
      "price": {
          "id": 1,
          "title": "Precio Ejemplo",
          "value": 5000,
          "rate": "USD",
          "creation_date": "2018-08-22",
          "last_modified": null
      }
  }]
    ```

### Request Receipt

- Request para crear, obtener, editar, y eliminar recibos asociados a un precio.

Ejemplo obtener todos los request:
  
 - Curl Example local :  `GET /api/v1/receipt-generator`
       
  ```bash
    curl --location --request GET 'http://localhost:8080/api/v1/receipt-generator/concept'
```

* Response Success

    ```json
    [{
    "id": 1,
    "title": "Test delete",
    "description": "test delete",
    "creation_date": "2012-08-22",
    "last_modified": null,
    "concept": {
        "id": 1,
        "name": "Test Concepto",
        "description": "Pago Semestre",
        "creation_date": "2018-08-22",
        "last_modified": null,
        "price": {
            "id": 1,
            "title": "Precio Ejemplo",
            "value": 5000,
            "rate": "USD",
            "creation_date": "2018-08-22",
            "last_modified": null
        }
    }
    }]
    ```
  
 ![Para descargar las colecciones de Postman](https://www.getpostman.com/collections/1376ff807efe116ebbe4)

### Frameworks and Tools

* [Python](https://www.python.org/) - Python JDK
* [Django](https://www.djangoproject.com/) - Web Framework Python

## Version

Actual Version 0.1

## Authors

* Johan Stephen Vargas