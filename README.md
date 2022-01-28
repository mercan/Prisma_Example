## Bilgisayarınızda Çalıştırın

Projeyi klonlayın

```bash
  git clone https://github.com/mercan/Prisma_Example.git
```

Proje dizinine gidin

```bash
  cd my-project
```

Gerekli paketleri yükleyin

```bash
  npm install
```

Sunucuyu çalıştırın

```bash
  npm run start
```

## API Kullanımı

#### Kayıt Ol

```http
  GET /auth/register
```

|  Parametre  |   Tip    |  Açıklama   |
| :---------: | :------: | :---------: |
| `firstName` | `string` | **Gerekli** |
| `lastName`  | `string` | **Gerekli** |
|   `email`   | `string` | **Gerekli** |
| `password`  | `string` | **Gerekli** |

#### Giriş Yap

```http
  POST /auth/login
```

| Parametre  |   Tip    |  Açıklama   |
| :--------: | :------: | :---------: |
|  `email`   | `string` | **Gerekli** |
| `password` | `string` | **Gerekli** |

#### Email Doğrula

```http
  GET /auth/verifyEmail
```

| Parametre |   Tip    |  Açıklama   |
| :-------: | :------: | :---------: |
|  `code`   | `string` | **Gerekli** |

#### Parola Değiştirme

```http
  POST /auth/changePassword
```

|     Header      |     Parametre     |   Tip    |  Açıklama   |
| :-------------: | :---------------: | :------: | :---------: |
| `Authorization` |  `Bearer TOKEN`   | `string` | **Gerekli** |
|                 | `currentPassword` | `string` | **Gerekli** |
|                 |    `password`     | `string` | **Gerekli** |

## Ekler

Swagger Dökümantasyon: http://localhost:3000/documentation

## Kullanılan Teknolojiler

**Sunucu:** Node, Fastify, Prisma, Postgres, Redis, Joi, JsonWebToken

## Ortam Değişkenleri

Bu projeyi çalıştırmak için aşağıdaki ortam değişkenlerini .env dosyanıza eklemeniz gerekecek

`JWT_SECRET`

`JWT_ALGO`

`JWT_EXPIRES_IN`

`DB_HOST`

`DB_PORT`

`POSTGRES_USER`

`POSTGRES_PASSWORD`

`POSTGRES_DB`

`DATABASE_URL` = postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=public

`REDIS_URL`
