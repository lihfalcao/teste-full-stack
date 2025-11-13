# Instalação da Autenticação com Laravel Sanctum

## ⚠️ IMPORTANTE: Requisitos

Este código foi desenvolvido para **Laravel 7+** com **Laravel Sanctum**. 

Se você estiver usando **Laravel 5.4** (versão atual detectada), você precisa:

### Opção 1: Atualizar o Laravel (Recomendado)
```bash
composer update laravel/framework
```

### Opção 2: Instalar Laravel Sanctum (requer Laravel 7+)
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

## 📋 Passos de Instalação

### 1. Instalar Laravel Sanctum
```bash
composer require laravel/sanctum
```

### 2. Publicar configurações do Sanctum
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 3. Executar migrations
```bash
php artisan migrate
```

### 4. Criar e popular banco com usuário de teste
```bash
php artisan db:seed --class=UserSeeder
```

### 5. Configurar .env
Adicione ao arquivo `.env`:
```
SANCTUM_STATEFUL_DOMAINS=localhost:4200
```

### 6. Iniciar servidor
```bash
php artisan serve
```

## 🧪 Testando a API

### Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "senha123"
  }'
```

### Obter usuário autenticado
```bash
curl -X GET http://localhost:8000/api/user \
  -H "Accept: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Logout
```bash
curl -X POST http://localhost:8000/api/logout \
  -H "Accept: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 📝 Credenciais de Teste

- **Email:** teste@exemplo.com
- **Senha:** senha123

## ⚙️ Arquivos Criados/Modificados

- ✅ `app/Http/Controllers/AuthController.php` - Controller de autenticação
- ✅ `routes/api.php` - Rotas da API
- ✅ `app/Http/Kernel.php` - Middleware do Sanctum
- ✅ `config/cors.php` - Configuração CORS
- ✅ `database/seeds/UserSeeder.php` - Seeder para usuário de teste
- ✅ `database/migrations/2014_10_12_000000_create_users_table.php` - Migration atualizada

