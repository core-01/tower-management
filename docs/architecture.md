# System Architecture - Tower360

This document describes the architecture for Tower360 backend.

## Layers
- REST API (Spring Boot)
- Service Layer (Business Logic)
- Data Access Layer (JPA/SQL)
- Integration Layer (Oracle SOA for approvals, workflows)
- Oracle DB (core storage)
- Future React/Angular frontend

## Deployment
- Spring Boot deployed on local or cloud VM
- SOA services deployed on WebLogic Server
- GitHub Actions for build/test pipeline
