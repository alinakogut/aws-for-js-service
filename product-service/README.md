# product service

## Endpoint
1. **GET**  Get Products List `/products` : https://abzfadapjd.execute-api.eu-west-1.amazonaws.com/dev/products
2. **GET** Get Product By Id `/products/{id}` : https://abzfadapjd.execute-api.eu-west-1.amazonaws.com/dev/products/63e44026-d125-4e19-ba2f-a0235ce3119e
3. **POST** Create Product By Id `/products` : https://abzfadapjd.execute-api.eu-west-1.amazonaws.com/dev/products
    Example product schema:
    ```
        {
            "description": "Become monster slayer Geralt of Rivia and take on the most important contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.",
            "price": 245,
            "title": "Witcher 3: Wild Hunt",
            "count": 2
        }
    ```