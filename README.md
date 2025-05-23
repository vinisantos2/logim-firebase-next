# Projeto Login com Firebase e Next.js

Este é um projeto de exemplo que implementa um sistema de login usando Firebase Authentication, integrado com um painel de movimentações em tempo real via Firebase Realtime Database. Construído com Next.js (app router) e React.

---

## Funcionalidades

- Autenticação de usuários com Firebase Authentication (email/senha)
- Redirecionamento de páginas baseado no estado de autenticação
- Listagem em tempo real das movimentações do usuário no Firebase Realtime Database
- Layout simples e moderno com destaque para status das movimentações
- Logout seguro com redirecionamento para página de login

---

## Tecnologias usadas

- [Next.js](https://nextjs.org/) (React + App Router)
- [Firebase](https://firebase.google.com/) (Auth e Realtime Database)
- React hooks (useState, useEffect)
- TypeScript para tipagem estática

---

## Estrutura do projeto

/src
/components
ItemMovimentacao.tsx # Componente para exibir cada movimentação
/lib
firebase.ts # Configuração do Firebase
/pages
index.tsx # Página de login
home.tsx # Página protegida com lista de movimentações
/types
movimentacao.ts # Tipagem TypeScript para movimentação
/styles
globals.css # Estilos globais


## Como rodar o projeto localmente

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/seu-repositorio.git
cd seu-repositorio
#   l o g i m - f i r e b a s e - n e x t 
 
 