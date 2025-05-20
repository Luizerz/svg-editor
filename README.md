# SVG Editor 

## 🧩 Descrição

Este projeto é um editor gráfico interativo baseado em SVG, desenvolvido com **Angular 19**. O objetivo é permitir que o usuário adicione, visualize, mova, redimensione e exclua formas vetoriais (retângulos e estrelas) em um canvas SVG de forma intuitiva.

O projeto foi desenvolvido como solução para um desafio técnico, com foco em boas práticas de engenharia de software, arquitetura em Angular e manipulação direta de SVG.

---

## 🎨 Funcionalidades

### ✅ Funcionalidades obrigatórias implementadas

- #### Estrutura da Aplicação:
    - [x] Utilizar Angular: (**v19 utilizada**).
    - [x] A aplicação deve ser Single Page Application (SPA).
    - [x] Estrutura de componentes bem definida e modular: **Modularização com Standalone**.  
- #### Canvas SVG:
    - [x] Deve haver uma área de desenho (canvas) implementada com um elemento `<svg>`.
    - [x] Os elementos gráficos adicionados pelo usuário devem ser renderizados dentro deste canvas SVG.
- #### Adição de Elementos:
    - [x] O usuário deve ser capaz de adicionar dois tipos de elementos ao canvas:
        - [x] Retângulo: Adicionado como um elemento <rect> no SVG.
        - [x] Estrela: Adicionada como um elemento <polygon> ou <path> no SVG.
    - [x] Deve haver controles claros (ex: botões "Adicionar Retângulo", "Adicionar Estrela") para acionar a adição de novos elementos.
    - [x] Novos elementos podem ser adicionados em uma posição padrão ou permitir que o usuário clique no canvas para definir a posição (opcional, mas desejável para boa UX).
- #### Configuração do Retângulo
    - [x]  Ao adicionar ou selecionar um retângulo, o usuário deve poder configurar:
        - [x] Arredondamento dos Cantos: Um input numérico (ou slider) para definir o raio de arredondamento dos cantos do retângulo. 
    - [x] As alterações devem ser refletidas visualmente no elemento no canvas em tempo real.
- #### Configuração da Estrela:
    - [x] Ao adicionar ou selecionar uma estrela, o usuário deve poder configurar:
        - [x] Número de Pontas: Um input numérico (ex: 5, 6, 7...). Mínimo de 3 pontas.
        - [x] Comprimento das Pontas (ou "Profundidade"): Um input numérico ou slider para controlar o quão "pontudas" são as estrelas (ex: relação entre o raio externo e o raio interno da estrela).
    - [x] As alterações devem ser refletidas visualmente no elemento no canvas em tempo real.
- #### Interatividade Básica:
    - [x] As configurações aplicadas a um elemento devem ser visíveis imediatamente no canvas SVG.
    - [x] O usuário deve poder selecionar um elemento já existente no canvas para reconfigurá-lo.
---  

### 💡 Funcionalidades opcionais implementadas  

- #### Configurações Visuais Adicionais:
    - [x] Cor de preenchimento (fill) dos elementos.
    - [x] Cor da borda (stroke) dos elementos.
    - [x] Espessura da borda (stroke-width) dos elementos.
- #### Manipulação Avançada:
    - [x] Capacidade de selecionar elementos no canvas clicando neles.
    - [x] Capacidade de mover elementos selecionados no canvas.
    - [x] Capacidade de deletar elementos do canvas.
    - [x] Capacidade de redimensionar elementos (mantendo suas propriedades configuráveis).
- #### Gerenciamento de Estado:
    - [x] Persistência do estado da aplicação (elementos e suas configurações) usando localStorage ou sessionStorage, para que o desenho seja mantido ao recarregar a página: **Usei o localStorage**
- #### UX/UI Melhorada:
    - [x] Um painel de propriedades que aparece contextualmente ao selecionar um elemento.
    - [x] Feedback visual claro para seleção e interações.
    - [x] Design responsivo básico.
- #### Testes:
    - [x] Testes unitários para componentes ou serviços críticos (ex: lógica de geração da estrela).

---
## 💻 Observações e decisões técnicas.

#### Árvore do projeto.

```
src/
├── app/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── canvas.component.css
│   │   │   ├── canvas.component.html
│   │   │   └── canvas.component.ts
│   │   ├── editing-toolbar/
│   │   │   ├── editing-toolbar.component.css
│   │   │   ├── editing-toolbar.component.html
│   │   │   └── editing-toolbar.component.ts
│   │   └── toolbar/
│   │   │   └── toolbar.component.css
│   │   │   └── toolbar.component.html
│   │   │   └── toolbar.component.ts
│   ├── models/
│   │   └── shape.model.ts
│   ├── services/
│   │   └── shape.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.css
├──index.html
├──styles.css
└── main.ts
```

#### Detalhes

Pensei em uma estrutura em que teríamos o `Canvas`, para poder renderizar e pegar algumas ações do usuário, a `Toolbar`, para ter a opção de adicionar as formas (retângulos e estrelas), e a `EditingToolbar`, a qual é utilizada para fazer a edição na forma selecionada no canvas.

Tanto o `Canvas` quanto a `Toolbar` compartilham da injeção do `ShapeService`. Dessa forma, facilitando o gerenciamento de estados dos shapes, pois na camada de serviço utilizo objetos observáveis com o `BehaviorSubject`.

Por outro lado, tentei deixar o `EditingToolbar` o mais desacoplado possível, uma vez que ele poderia tranquilamente ser integrado em uma outra tela.

---

## 🚀 Como executar

### Pré-requisitos

- Node.js `v18.19` ou superior
- Angular CLI `v19.2.12` ou superior

### Passos para rodar localmente

```bash
# Clone o repositório
git clone https://github.com/Luizerz/svg-editor
cd svg-editor

# Instale as dependências
npm install

# Rode a aplicação localmente
npm start  

# Teste unitarios podem ser executados pelo comando
npm run test
```