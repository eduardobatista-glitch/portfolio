# Portfólio Acadêmico & Profissional — Eduardo da Costa Batista

Portfólio moderno para o pesquisador e graduando em Engenharia Agronômica **Eduardo da Costa Batista**, desenvolvido com excelência em **UI/UX e Motion Design**, inspirado na arquitetura visual e na experiência de usuário do website acadêmico [vdeborto.github.io](https://vdeborto.github.io/) (*al-folio* minimalista).

---

## ✨ Destaques de UI/UX & Motion Design

- **Estética Acadêmica Minimalista:** Tipografia editorial precisa com *Source Serif 4* para títulos, *Inter* para leitura técnica e *IBM Plex Mono* para tags, badges e metadados.
- **Engine de Temas (Claro / Escuro):** Alternância instantânea e fluida entre os temas claro e escuro, respeitando as preferências do sistema operacional (`prefers-color-scheme`) e armazenando a escolha do usuário no `localStorage`.
- **Command Palette Ninja (`Ctrl + K` / `⌘ + K`):** Menu de pesquisa e navegação instantânea com atalhos de teclado, busca em tempo real entre publicações, projetos e seções do site.
- **Barra de Progresso de Leitura:** Indicador sutil e interativo no topo da página calculando a rolagem do usuário.
- **Filtros Interativos de Publicações:** Filtre instantaneamente entre periódicos científicos, conferências internacionais (Portugal), congressos nacionais e projetos de Agrotech sem recarregar a página.
- **BibTeX & Resumos Interativos:** Gavetas retráteis para leitura de resumos e cópia de citações BibTeX com um único clique (feedback tátil via *toast notifications*).
- **100% Responsivo & Acessível:** Layout fluído otimizado para smartphones, tablets e monitores de alta resolução, com suporte a redução de movimento (`prefers-reduced-motion`).

---

## 🗂️ Estrutura de Arquivos

```text
├── index.html                   # Página principal completa em formato SPA (Bio, Trajetória, Projetos, Artigos, Habilidades)
├── 404.html                     # Página de erro 404 personalizada para o GitHub Pages
├── .gitignore                   # Regras de exclusão de arquivos no Git
├── assets/
│   ├── css/
│   │   └── style.css            # Folha de estilo completa, tokens de design, animações e responsividade
│   ├── js/
│   │   ├── main.js              # Controlador de temas, progresso, gavetas e filtros
│   │   └── search.js            # Command palette interativo (Ctrl+K)
│   ├── img/
│   │   ├── eduardo-avatar.jpg   # Avatar quadrado otimizado e centralizado
│   │   ├── eduardo-foto.jpg     # Foto original em alta definição
│   │   └── favicon.svg          # Favicon moderno de Agrotecnologia
│   └── pdf/
│       └── curriculo-lattes.pdf # Currículo Lattes completo em PDF para download
└── README.md                    # Documentação do projeto
```

---

## 🚀 Como Hospedar no GitHub Pages

Este portfólio foi arquitetado em HTML5/CSS3/JavaScript estático em formato **Single Page Application (SPA)**, garantindo **performance máxima, carregamento instantâneo e zero dependência de compilação ou Node.js**.

### Passo a Passo:

1. **Criar ou Usar o Repositório no GitHub:**
   - Crie um novo repositório com o nome `<seu-usuario>.github.io` (para link raiz) ou qualquer outro nome (ex: `portfolio`).

2. **Fazer o Push dos Arquivos:**
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio acadêmico eduardo batista estilo vdeborto.github.io"
   git branch -M main
   git remote add origin https://github.com/<seu-usuario>/<nome-do-repositorio>.git
   git push -u origin main
   ```

3. **Ativar o GitHub Pages:**
   - Acesse o repositório no GitHub.
   - Vá em **Settings** > **Pages** (no menu lateral esquerdo).
   - Em **Build and deployment** > **Source**, escolha `Deploy from a branch`.
   - Selecione a branch `main` e a pasta `/ (root)`.
   - Clique em **Save**. Em 1 ou 2 minutos seu portfólio estará online!

---

## 🔬 Dados Integrados do Lattes

- **ID Lattes:** [7737132952831886](http://lattes.cnpq.br/7737132952831886)
- **ORCID:** [0009-0006-4989-0894](https://orcid.org/0009-0006-4989-0894)
- **Instituições:** Universidade Federal do Amazonas (UFAM), Laboratório de Ictiologia e Ordenamento Pesqueiro (LIOP), Instituto Federal do Amazonas (IFAM), Conselho Federal dos Técnicos Agrícolas (CFTA).
- **Publicações e Artigos:** 11 produções catalogadas, incluindo artigos aceitos na Revista Medicina Ribeirão Preto e Revista SELPER, participação na International FoodTec Conference (Portugal) e CONBRAF.
