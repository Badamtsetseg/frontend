const Html = (contextPath, title, initialStates, initialI18nStore, initialLanguage, component) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>${title}</title>
    <meta charset="utf-8" />
<!--    <meta http-equiv='cache-control' content='no-cache'>-->
<!--    <meta http-equiv='expires' content='0'>-->
<!--    <meta http-equiv='pragma' content='no-cache'>-->

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="keyword" content="Astvision,Astvision Starter">

    <!-- OG tags -->
    <meta property="og:title" content="Astvision Starter">
    <meta property="og:description" name="description" content="Astvision Starter">
    <meta property="og:image" content="http://starter.astvision.mn/static/assets/og_image.jpg">
    <meta property="og:url" content="http://starter.astvision.mn">

    <script src="${contextPath}/static/register-service-worker.js"></script>
    <script src="${contextPath}/static/install.js"></script>
    <link rel="shortcut icon" href="${contextPath}/static/assets/favicon.png">
    <link rel="manifest" href="${contextPath}/static/assets/manifest.json">
    <link rel="stylesheet" href="${contextPath}/static/assets/vendors~index.js.css">
    <link rel="stylesheet" href="${contextPath}/static/assets/index.js.css">

    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,200,300,400,500,600,700,800,900&display=swap" rel="stylesheet">

    <!-- tinymce -->
    <!-- <link rel="stylesheet" href="/static/tinymce/content.min.css"> -->
    <link rel="stylesheet" href="${contextPath}/static/tinymce/skin.min.css">

    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialStates)};
      window.initialI18nStore = ${JSON.stringify(initialI18nStore)};
      window.initialLanguage = '${initialLanguage}';
    </script>
    <script src="${contextPath}/static/config.js"></script>
    <!-- <script src="https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image"></script> -->
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"><div style="display: none;">${component}</div></div>
    <script src="${contextPath}/static/vendors~index.js"></script>
    <script src="${contextPath}/static/index.js"></script>
    <!-- tinymce 
    <script src="${contextPath}/static/tinymce/tinymce.min.js"></script>
    <script src="${contextPath}/static/tinymce/theme.min.js"></script>
    <script src="${contextPath}/static/tinymce/plugin.min.js"></script>-->

    <!--<script src="/static/vendors~multipleRoutes.js"></script>
    <script src="/static/multipleRoutes.js"></script>-->

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-HQ6E8WR58D"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
   
      gtag('config', 'G-HQ6E8WR58D');
    </script>
  </body>
  </html>
`

export default Html
