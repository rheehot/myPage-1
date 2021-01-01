let http = require('http');
let fs = require('fs');
let url = require('url');

let app = http.createServer(function(request, response){
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let title = queryData.id;
  let template = '';
  let pathname = url.parse(_url, true).pathname;

  if(pathname === '/'){ //메인페이지일시
    if(queryData.id === undefined){
      fs.readdir('./tab', function(error, filelist){
        console.log(filelist);
        let list = '';
        let i = 0;
        while(i < filelist.length){
          list = list + `<a href='?id=${filelist[i]}' id="menu-${i+2}" class="menu">${filelist[i]} </a>`
          i = i + 1;
        }
        template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="icon" href="./img/favicon.ico">
          <link rel="shortcut icon" href="./img/favicon.ico">
          <meta property="og:image" content="kakao.png">
          <meta property="og:title" content="@iamdooddi">
          <meta property="og:description" content="wachu lookin">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
          <link rel="stylesheet" href="style.css">
          <script type="text/javascript" src="index.js"></script>
          <script src="https://s3.ap-northeast-2.amazonaws.com/materials.spartacodingclub.kr/xmas/snow.js"></script>
          <title>@iamdooddi</title>
        </head>
        <body>
          <div class="container">
            <div class="top"></div>
            <div class="left">
            <a href="/" id="menu-1" class="menu">home</a>
            ${list}
            </div>
            <div class="middle">
              <a href="/" id="title-link"><img id="title" class="main-img" src="./img/normal/title.png" alt="title"></a>
              <img id="contact" class="main-img" src="./img/normal/contact.png" alt="contact">
              <button onclick="theme()"><img id="wave" src="./img/normal/themeButton.png" alt="wave" value="normal" cite="wave by Phoenix Dungeon from the Noun Project"></button>
            </div>
            <div class="right">
              <h1>
                <a href="https://www.instagram.com/iamdooddi/" target="_blank"><img class="icon" id="icon-instagram" src="./img/normal/icon-instagram.png" alt="instagram"></a>
                <a href="https://blog.naver.com/a-eve" target="_blank"><img class="icon" id="icon-blog" src="./img/normal/icon-blog.png" alt="blog"></a>
                <a href="https://velog.io/@woohyun_park" target="_blank"><img class="icon" id="icon-velog" src="./img/normal/icon-velog.png" alt="velog"></a>
              </h1>
            </div>
          </div>
          <div class="bottom"></div>
        </body>
        </html>
        `
        response.writeHead(200);
        response.end(template);
      })
    }
    else{
      fs.readdir('./tab', function(error, tempMenulist){
        fs.readdir(`./tab/${title}/data`, function(error, tempTextlist){
          console.log('menu: ' + tempMenulist);
          console.log('text: ' + tempTextlist);

          //create menulist
          let menulist = '';
          let i = 0;
          while(i < tempMenulist.length){
            menulist = menulist + `<a href='?id=${tempMenulist[i]}' id="menu-${i+2}" class="menu">${tempMenulist[i]} </a>`
            i = i + 1;
          }

          //create tempTextlist
          let textlist = '';
          i = 0;
          while(i < tempTextlist.length){
            textlist = textlist + `
            <div class="imgBlock">
              <img src="./img/sogumm-위로.jpg" alt="sogumm-위로">
              <h2>${tempTextlist[i]}</h2>
              <div class="font">
            `
            let description = fs.readFileSync(`./tab/${title}/data/${tempTextlist[i]}`, 'utf8');
            textlist = textlist + `${description}
              </div>
              <br>
            </div>
            `;
            i = i + 1;
          }

          template = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="icon" href="./img/favicon.ico">
            <link rel="shortcut icon" href="../img/favicon.ico">
            <title>@iamdooddi</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
            <link rel="stylesheet" href="../style.css">
          </head>
          <body>
            <div class="container">
              <div class="top">
              </div>
              <div class="left">
              <a href="/" id="menu-1" class="menu">Home</a>
              ${menulist}
              </div>
              <div class="middle">
                <div class="three">
                ${textlist}
                </div>
              </div>
              <div class="right">
                <a href="/"><img id="logo-right" src="../img/normal/logo-right.png" alt="logo-right"></a>
              </div>
            </div>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        })
      })
    }
  }

  //     fs.readFile(`tab/${title}/data/${title}`, 'utf8', function(err, description){
  //       fs.readdir('./tab', function(error, menulist){
  //         console.log(menulist);
  //         let list = '';
  //         let i = 0;
  //         while(i < menulist.length){
  //           list = list + `<a href='?id=${menulist[i]}' id="menu-${i+2}" class="menu">${menulist[i]} </a>`
  //           i = i + 1;
  //         }
  //         console.log(description);
  //         template = `
  //         <!DOCTYPE html>
  //         <html lang="en">
  //         <head>
  //           <meta charset="UTF-8">
  //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //           <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //           <link rel="icon" href="./img/favicon.ico">
  //           <link rel="shortcut icon" href="../img/favicon.ico">
  //           <title>@iamdooddi</title>
  //           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
  //           <link rel="stylesheet" href="../style.css">
  //         </head>
  //         <body>
  //           <div class="container">
  //             <div class="top">
  //             </div>
  //             <div class="left">
  //             <a href="/" id="menu-1" class="menu">Home</a>
  //             ${list}
  //             </div>
  //             <div class="middle">
  //               <div class="middle_1over3">
  //                 <p class="${title}">
  //                   ${title}<br>
  //                   <img src="./img/sogumm-위로.jpg" alt="sogumm-위로">
  //                   <h2>sogumm - 위로</h2>
  //                   <div class="font">
  //                     ﻿${description}
  //                   </div>
  //                   <br>
  //                 </p>
  //               </div>
  //               <div class="middle_2over3">
  //                 <p class="${title}">
  //                   <img src="./img/HippoX불안한yee-Maybe.jpg" alt="Hippo X 불안한yee-Maybe">
  //                   <h2>Hippo X 불안한yee - Maybe</h2>
  //                   <div class="font">
  //                     ${description}
  //                   </div>
  //                   <br>
  //                 </p>
  //               </div>
  //               <div class="middle_3over3">
  //                 <p class="${title}">
  //                   <img src="./img/pH-1-TheIslandKid.jpg" alt="pH-1-TheIslandKid">
  //                   <h2>pH-1 - The Island Kid</h2>
  //                   <div class="font">
  //                     ${description}
  //                   </div>
  //                   <br>
  //                 </p>
  //               </div>
  //             </div>
  //             <div class="right">
  //               <a href="/"><img id="logo-right" src="../img/normal/logo-right.png" alt="logo-right"></a>
  //             </div>
  //           </div>
  //         </body>
  //         </html>
  //         `;
  //         response.writeHead(200);
  //         response.end(template);
  //       })
  //     })
  //   }
  // }
  else{
    response.writeHead(404);
    response.end('Not Found');
  }
  // 한글이 포함된 파일이 이상하게 인코딩되어 decodeURI을 사용하였다
  // response.writeHead(200);
  // response.end(fs.readFileSync(__dirname + decodeURI(_url)));
})
app.listen(3000);
