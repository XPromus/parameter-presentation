# Parameter Presentation

## Deployment

### Deploying to amd64 machine
Uncomment the pocketbase_amd64 service in the compose.yml and comment out the pocketbase_arm64 service.
```yaml
services:
  caddy:
    build:
      context: .
      dockerfile: ./frontend/Dockerfile
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"

#   pocketbase_arm64:
#     build:
#       context: ./docker/pocketbase/arm64
#       dockerfile: Dockerfile
#     ports:
#       - "8080:8080"
#     volumes:
#       - ./docker/pocketbase/pb_data:/pb/pb_data

  pocketbase_amd64:
    build:
      context: ./docker/pocketbase/amd64
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    volumes:
      - ./docker/pocketbase/pb_data:/pb/pb_data
```

### Deploying to arm64 machine
Uncomment the pocketbase_arm64 service in the compose.yml and comment out the pocketbase_amd64 service.

```yaml
services:
  caddy:
    build:
      context: .
      dockerfile: ./frontend/Dockerfile
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"

  pocketbase_arm64:
    build:
      context: ./docker/pocketbase/arm64
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    volumes:
      - ./docker/pocketbase/pb_data:/pb/pb_data

  # pocketbase_amd64:
  #   build:
  #     context: ./docker/pocketbase/amd64
  #     dockerfile: Dockerfile
  #   ports:
  #     - "8080:8080"
  #   volumes:
  #     - ./docker/pocketbase/pb_data:/pb/pb_data
```

### Deploy
```sh
docker compose up
```

## Authentication with Pocketbase
Sometimes Pocketbase needs a superuser login at first to work, 
after starting a new container. So if the webpage isn't working,
it can help to open the Pocketbase admin panel once and login with the default credentials, 
specified in the Dockerfile

URL of the Admin Panel: [http://0.0.0.0:8080/_/](http://0.0.0.0:8080/_/)
- Email: mohn@tech.as
- Password: admin12345