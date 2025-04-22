# 🗃️ Archiva - Sistema de Preservação Digital

**Archiva** é um sistema completo para preservação digital, integrando com o Archivematica para gerenciar transferências, SIPs e armazenamento de documentos digitais. A stack utilizada é **NestJS + Prisma + PostgreSQL no backend**, e **React** no frontend.

---

## ✨ Funcionalidades

- Upload de documentos digitais (PDFs)
- Criação de pacotes SIP e envio ao Archivematica
- Acompanhamento de status da transferência e ingest
- Interface web para visualização e busca dos documentos preservados
- Integração com serviço de armazenamento digital

---

## 🧱 Tecnologias

- **Backend:** NestJS, Prisma ORM, PostgreSQL
- **Frontend:** React.js
- **Preservação Digital:** Archivematica API
- **Infraestrutura:** Docker

---

## ⚙️ Variáveis de Ambiente (`backend/.env`)

```env
# Archivematica Dashboard API
DASHBOARD_URL=http://localhost:62080
DASHBOARD_USERNAME=test
DASHBOARD_API_KEY=test

# Storage Service (Archivematica)
STORAGE_SERVICE_URL=http://localhost:62081
STORAGE_SERVICE_USERNAME=test
STORAGE_SERVICE_PASSWORD=test

# Localização para envio de SIPs
LOCATION_UUID=4c767270-90dc-444e-b818-4f5be62335f5
OUTPUT_DIR=archivematica/hack/submodules/archivematica-sampledata/archiva/

# Banco de Dados
DATABASE_URL="postgresql://postgres:prisma@db:5432/postgres?schema=public"

# Autenticação
JWT=1234
```


## Como usar

#### SIga as instruções de https://github.com/artefactual/archivematica/blob/qa/1.x/hack/README.md para instalar o archivematica

### Parar rodar o archiva
```bash
git clone https://github.com/seuusuario/archiva.git
cd archiva
docker-compose up --build

```

