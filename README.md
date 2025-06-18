<p align="center">
  <img src="./public/logo.png" lt="Logo" width="80" />
<p>

# UnAuth API

<p align="center">
  <a href="https://uptime.betterstack.com/?utm_source=status_badge">
    <img src="https://uptime.betterstack.com/status-badges/v3/monitor/10kju.svg" alt="uptime status">
  </a>
</p>

> Global REST API Authentication Service

- 🐋 Containerized
- 🪄 CI/CD (Github Action)
- ⚡️ API Route Caching
- 📐 Analytics

- [ ] Rate Limiting
- [ ] Maintain blocklist

## How to Deploy

1. Initialize Swarm on the Manager Node

```bash
docker swarm init --advertise-addr <MANAGER-IP>
```

2. Join Worker Nodes to the Swarm

```bash
docker swarm join --token <WORKER-TOKEN> <MANAGER-IP>:2377
```

3. Check Node Status

```bash
docker node ls
```

4. Create a docker volume

```bash
docker volume create \
  --name unauth-api_data \
  --driver local \
  --opt type=none \
  --opt device=~/Algostract/unauth-api/.data \
  --opt o=bind
```

5. Use Docker Stack to deploy multi-container application

```bash
docker stack deploy --compose-file docker-compose.prod.yml unauth-api
```

6. Scale service

```bash
docker service scale unauth-api_app=2
```

7. Verify

```bash
docker service ls
docker service ps unauth-api_app
```

## License

Published under the [MIT](https://github.com/shba007/unauth-api/blob/main/LICENSE) license.
<br><br>
<a href="https://github.com/shba007/unauth-api/graphs/contributors">
<img src="https://contrib.rocks/image?repo=shba007/unauth-api" />
</a>
