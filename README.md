# Authentication & Security

## JWT Authentication

This application uses JSON Web Tokens (JWT) for authentication.

### Login Flow

1. User submits credentials.
2. Credentials are validated.
3. A JWT access token is generated.
4. The client stores the token.
5. The token is sent in the `Authorization` header for protected requests.

Example:

```http
Authorization: Bearer <jwt-token>
```

### JWT Configuration

* JWT Secret is stored in environment variables.
* Tokens have an expiration time.
* Protected routes use `JwtAuthGuard`.
* User information is extracted through `JwtStrategy`.

Environment Variable:

```env
JWT_SECRET=your-secret-key
```

---

## Security Measures

### Password Security

* Passwords are hashed using bcrypt.
* Plain text passwords are never stored.
* Password verification is performed using bcrypt compare.

### Request Validation

Global validation is enabled using NestJS ValidationPipe.

Features:

* `whitelist: true` removes unexpected fields.
* `forbidNonWhitelisted: true` rejects unknown properties.
* `transform: true` converts payloads to DTO types.

Example:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

### Rate Limiting

Rate limiting is implemented using `@nestjs/throttler`.

Benefits:

* Prevents brute-force attacks.
* Protects authentication endpoints.
* Reduces API abuse.

Example Configuration:

```typescript
ThrottlerModule.forRoot([
  {
    ttl: 60000,
    limit: 100,
  },
]);
```

Global Guard:

```typescript
{
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
}
```

### File Upload Security

Profile image uploads are protected through:

* File size limits
* File type validation
* Unique file names
* Restricted upload directory

Allowed Types:

* image/jpeg
* image/png
* image/webp

Maximum Size:

* 5 MB

### Request Payload Limits

Request body size is restricted to prevent large payload attacks.

Example:

```typescript
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
```

### Environment Variables

Sensitive information is stored in environment variables:

```env
DATABASE=postgres
USERNAME=postgres
PASSWORD=password
JWT_SECRET=secret-key
```

The `.env` file is excluded from source control.

### Security Headers

Helmet middleware is used to add secure HTTP headers.

```typescript
app.use(helmet());
```

### CORS Protection

Cross-Origin Resource Sharing (CORS) is configured to allow only trusted origins.

```typescript
app.enableCors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true,
});
```

### Database Security

* TypeORM is used to prevent SQL injection through parameterized queries.
* Database credentials are stored in environment variables.
* Production deployments should disable `synchronize`.

Production Configuration:

```typescript
synchronize: false
```

### Logging

The application logs:

* Authentication failures
* Validation errors
* Server errors

Sensitive information such as passwords, JWT secrets, and tokens are never logged.

---

## Security Checklist

* JWT Authentication
* Password Hashing (bcrypt)
* DTO Validation
* Global ValidationPipe
* Rate Limiting
* File Upload Validation
* Request Payload Limits
* Environment Variables
* Security Headers (Helmet)
* CORS Restrictions
* SQL Injection Protection
* Secure Logging Practices
* Production-safe Database Configuration
