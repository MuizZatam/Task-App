# Task-App

A simple CRUD API built as an example to practice development with Node, Express and PostgreSQL.

---

## Running the Application Locally

**1. Through Docker**

```sh

# Build the container with a useful tag name
$ docker build -t tag_name .

# Run the container with a useful container name
$ docker run -d -p 3000:3000 --name container_name tag_name

# Test the Application
$ curl localhost:3000/health
> "2025-12-03T13:58:29.274Z"
```

---

## Progress

- [x] Test express app (GET methods for / and /health)
- [x] Docker setup
- [ ] PostgreSQL connectivity with schema creation
- [ ] Express Server, Middleware
- [ ] Database connection pool and utility functions
- [ ] API Endpoints
- [ ] Documentation
