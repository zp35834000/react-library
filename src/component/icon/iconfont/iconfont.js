(function(window){var svgSprite='<svg><symbol id="anticon-yingyongguanli" viewBox="0 0 1024 1024"><path d="M384 96H192a96 96 0 0 0-96 96v192a96 96 0 0 0 96 96h192a96 96 0 0 0 96-96V192a96 96 0 0 0-96-96z m32 288a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V192a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32v192zM384 544H192a96 96 0 0 0-96 96v192a96 96 0 0 0 96 96h192a96 96 0 0 0 96-96v-192a96 96 0 0 0-96-96z m32 288a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32v-192a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32v192zM832 544h-192a96 96 0 0 0-96 96v192a96 96 0 0 0 96 96h192a96 96 0 0 0 96-96v-192a96 96 0 0 0-96-96z m32 288a32 32 0 0 1-32 32h-192a32 32 0 0 1-32-32v-192a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32v192z"  ></path><path d="M736 288m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z"  ></path></symbol><symbol id="anticon-yibiaopan" viewBox="0 0 1024 1024"><path d="M959.36 524.8c0.128-4.288 0.64-8.48 0.64-12.8 0-53.6-9.408-105.92-27.616-155.2a32 32 0 0 0-60.032 22.144c13.76 37.28 21.28 76.64 22.944 117.024H832a32 32 0 0 0 0 64h60.672c-22.336 178.944-167.552 319.424-348.672 334.4V832a32 32 0 0 0-64 0v62.368C298.88 879.392 153.664 738.912 131.328 560H192a32 32 0 0 0 0-64H128.8C136.832 302.08 288.224 145.472 480 129.632V192a32 32 0 0 0 64 0V129.664c42.912 3.552 84.48 13.856 123.36 31.072a31.968 31.968 0 1 0 25.92-58.496A445.824 445.824 0 0 0 512 64C264.576 64 64 264.576 64 512c0 4.32 0.512 8.512 0.64 12.8-0.096 1.12-0.64 2.08-0.64 3.2 0 1.888 0.768 3.552 1.088 5.344C76.288 770.784 271.776 960 512 960s435.712-189.216 446.912-426.656c0.32-1.792 1.088-3.456 1.088-5.344 0-1.12-0.544-2.08-0.64-3.2z"  ></path><path d="M851.392 162.592L475.936 323.52A191.936 191.936 0 0 0 512 704a191.936 191.936 0 0 0 179.296-123.744L892.16 207.168c0.288-0.544 0.256-1.152 0.512-1.696 0.96-2.016 1.408-4.16 1.92-6.336 0.448-1.92 0.992-3.776 1.088-5.728 0.096-1.952-0.288-3.808-0.576-5.76-0.32-2.24-0.576-4.384-1.344-6.496-0.192-0.576-0.128-1.184-0.352-1.76-0.544-1.312-1.6-2.176-2.304-3.36a29.664 29.664 0 0 0-3.744-5.408 28.864 28.864 0 0 0-5.056-4.192c-1.12-0.8-1.888-1.92-3.136-2.592-0.544-0.288-1.152-0.256-1.696-0.512-2.016-0.96-4.16-1.408-6.336-1.92-1.92-0.448-3.776-0.992-5.728-1.088-1.952-0.096-3.808 0.288-5.76 0.576-2.24 0.32-4.384 0.576-6.496 1.344-0.576 0.192-1.184 0.096-1.76 0.352z m-253.056 178.08l194.048-83.168-100.768 187.136a192.32 192.32 0 0 0-93.28-103.968z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)