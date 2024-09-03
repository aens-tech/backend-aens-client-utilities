
# Docker Compose file example
```yml
version: "3.9"
services:
  munus-front:
    build: .
    ports:
      - "3000:3000"
    environment:
      - ENVIRONMENT=""
      - MASTER_KEY=""
      - MONGODB_URI=""
      - ELEVATE_MASTER_KEY=""
      - JWT_SECRET=""
      - JWT_REFRESH_SECRET=""
```