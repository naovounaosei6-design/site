# Grupo Potencial — Site Institucional

Site institucional da **Grupo Potencial S/A** — confecção técnica industrial de uniformes profissionais.

## Estrutura

```
potencial-site/
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── hero.jpg         # coloque sua foto industrial aqui
└── README.md
```

## Como visualizar

**Opção 1 — abrir direto**

Duplo clique em `index.html`. Abre no navegador padrão.

**Opção 2 — servidor local (recomendado)**

No terminal, dentro da pasta `potencial-site`:

```bash
# Python 3
python -m http.server 8080

# ou Node.js
npx serve .
```

Depois abre `http://localhost:8080`.

## Personalização

### Imagens

Coloca as fotos em `assets/` e substitui os gradientes no `styles.css`:

```css
.hero { background: url("assets/hero.jpg") center/cover no-repeat, #0D1A30; }
.card-image { background: url("assets/linha-1.jpg") center/cover; }
```

Ou edita o mapa no `script.js`:

```js
const imageMaps = {
  corporate: "url(assets/corporativo.jpg)",
  sports:    "url(assets/esportivo.jpg)",
  // ...
};
```

### Cores

Tudo centralizado no `:root` do `styles.css`. Muda uma vez, reflete no site todo.

### Formulário

Hoje o form só valida no client e mostra mensagem de sucesso.

Pra ligar num backend real, edita o `script.js` (procurar por `Backend real:`):

```js
fetch("/api/briefing", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(Object.fromEntries(data))
}).then(r => r.json()).then(...)
```

## Deploy

Arrasta a pasta inteira pra qualquer host estático: Netlify, Vercel, GitHub Pages, Cloudflare Pages.

Nenhum build step, nenhuma dependência. Só HTML + CSS + JS puro.
