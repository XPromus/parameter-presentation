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

### Configure Caddy
The caddyfile must contain the IP of the device hosting the frontend. 
If the frontend is only accessed on the same machine this step can be skipped.

Location of the Caddyfile: ./docker/caddy/config/Caddyfile

Change or add another route to the current options.
The presence of http:// before the IP address is important.

```Caddyfile
localhost, http://10.0.0.139, http://10.123.5.8 {
    root * /srv

    file_server
}
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

## Settings in the web app
Change the pocketbase address in the settings to the address that is hosting the service. 
By default this address is the local address.

The settings can be found in the editor and clicking the settings button.
