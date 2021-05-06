function getTemplate(title, content) {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Photo sharing app">
    <link rel='stylesheet' href='style.css'>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Reem+Kufi&display=swap" rel="stylesheet">
    <title>${title}</title>
  </head>
  <body class = 'center stack'>
 
    <h1 class = 'margin-top'>${title}</h1>
    ${content}
    
    
  </body>
  </html>`;
  return html;
}

module.exports = getTemplate;