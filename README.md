# 🧭 SisIncidentes

O **SisIncidentes** é um sistema web desenvolvido para registrar, visualizar e gerenciar incidentes de forma simples e organizada.  
A aplicação permite o cadastro e o controle de **categorias** e **incidentes**, com suporte completo às operações **CRUD** (Criar, Ler, Atualizar e Deletar).

---

## 🚀 Tecnologias Utilizadas

- **React.js** — Biblioteca principal para construção da interface.  
- **React Router DOM** — Gerenciamento de rotas e navegação entre páginas.  
- **Bootstrap 5** — Estilização responsiva e moderna.  
- **Firebase Firestore** — Banco de dados NoSQL para armazenamento em nuvem.
  
---

## ⚙️ Funcionalidades

- 📋 Cadastro, listagem, edição e exclusão de **incidentes**  
- 🗂️ CRUD completo de **categorias**  
- 🔍 Filtro de incidentes por categoria ou nome  
- 🔐 Autenticação (opcional, se habilitada no Firebase Auth)  
- 💾 Persistência de dados via **Firebase Firestore**  


---

## 🧩 Configuração e Execução do Projeto

### 🔹 Pré-requisitos

Antes de executar o projeto, você precisa ter instalado:

- [Node.js (>= 18.x)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- Uma conta no [Firebase Console](https://console.firebase.google.com/)

---

### 🔹 Passos para executar localmente

1. **Clone este repositório**

```bash
git clone https://github.com/joanmdrs/sisincidente.git
cd sisincidentes
```

2. **Instale as dependências**

```
npm install
```
3. **Crie as variáveis de ambiente para o Firebase**

> Na raiz do seu projeto, no mesmo nível do package.json, crie um arquivo .env com o seguinte conteúdo. As informações para atribuição a estas variáveis você pode consultar nas configurações do SDK do seu app, que está presente no projeto criado no Firebase.

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

4. **Inicie o servidor local**

```
npm start
```



