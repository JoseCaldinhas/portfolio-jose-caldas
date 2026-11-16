# José Caldas — Portfólio

Portfólio pessoal com escultura 3D interativa em Canvas, cartões com perspectiva, animações e seção de contato.

## Arquivos

- `index.html`: conteúdo e estrutura.
- `styles.css`: estilos e adaptações para telas menores.
- `script.js`: escultura 3D, animações e contato.
- `vercel.json`: configuração de publicação estática.

## Visualizar

Abra `index.html` no navegador ou use Live Server no VS Code. O botão de copiar e-mail funciona melhor em localhost ou HTTPS. As fontes do Google Fonts precisam de internet; há fontes alternativas locais.

## Colocar no GitHub

1. Extraia este ZIP.
2. Crie um repositório, por exemplo `portfolio-jose-caldas`.
3. Envie os arquivos da pasta extraída para a raiz do repositório. O arquivo `index.html` deve ficar diretamente na raiz.
4. Confirme o envio com um commit.

## Publicar na Vercel

1. Acesse https://vercel.com e entre com sua conta GitHub.
2. Crie um novo projeto e importe o repositório.
3. Use Framework Preset: **Other**.
4. Root Directory: raiz do repositório. Build Command: vazio. Output Directory: `.`.
5. Clique em **Deploy**.

Não é necessário executar npm install ou npm run build. O projeto não depende de Node.js para funcionar.

A Vercel fornecerá um endereço `.vercel.app`, conforme a disponibilidade do nome escolhido. Novos commits na branch conectada geram atualizações do site.

Referência de publicação: https://vercel.com/docs/builds

## Contato

Os botões abrem opções de Gmail, Outlook ou aplicativo de e-mail, com `xboxgoldser@hotmail.com` como destinatário. O visitante escreve e envia a mensagem no serviço escolhido; o site não envia mensagens automaticamente.

## Personalização

Altere os textos e os links em `index.html`, as cores em `styles.css` e o comportamento em `script.js`. As imagens dos cartões são representações ilustrativas dos projetos.

O código exportado não inclui configuração de hospedagem anterior nem depende dela. A versão desktop e o diálogo de contato foram conferidos no navegador. O CSS inclui adaptações responsivas; a validação visual em dispositivos móveis ainda está pendente.
