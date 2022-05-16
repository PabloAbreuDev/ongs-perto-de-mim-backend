const verifyTemplate = (msg: string) => {
  return `
    <html>
  <head>
    <title>Página de verificação</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      rel="stylesheet"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      padding: 0;
      margin: 0;
      color: #424242;
      font-family: 'Roboto', sans-serif;
      overflow: auto;
    "
  >
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <div
        style="
          height: 100px;
          background-color: coral;
          width: 100%;
          text-align: center;
        "
      >
        <h1 style="color: white">Bem vindo a Ongs perto de Mim</h1>
      </div>
      <h1>🏠 Ongs perto de Mim</h1>
      <div
        style="text-align: center; border: 3px blueviolet dashed; padding: 50px"
      >
        <a href="${msg}" style="color: blue; font-weight: bold; font-size: 1.2rem;">Clique aqui para verificar sua conta</a>
      </div>
      <div
        style="
          height: 100px;
          text-align: center;
          background-color: coral;
          width: 100%;
          position: absolute;
          bottom: 0px;
        "
      >
        <h3 style="color: white">
          Está é uma versão de teste do software, tem apenas intuito
          demonstrativo
        </h3>
      </div>
    </div>
  </body>
</html>
    `;
};

export default verifyTemplate;
