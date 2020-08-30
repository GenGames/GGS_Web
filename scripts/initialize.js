var pageURL = window.location.href;
var isList = pageURL.includes("list");
var indexData;

function awake(){
  loadFileAsString("/data/index.json",(data)=>{
    indexData = JSON.parse(data);
    start();
  })
}

function start(){
  console.log("load starting");

  determineLoadData(getParams(pageURL));

  // TO DO::
  // Load all HTML elements

  // Head
  var headElement = document.getElementsByTagName("head");
  loadFileAsString("/data/htmlPrefabs/head.html",(headTxt)=>{
    headElement[0].innerHTML += headTxt;
  });
  // Header
  var headerElement = document.getElementsByTagName("header");
  loadFileAsString("/data/htmlPrefabs/header.html",(headerTxt)=>{
    headerElement[0].innerHTML += headerTxt;
  });

  // Footer
  var footerElement = document.getElementsByTagName("footer");
  loadFileAsString("/data/htmlPrefabs/footer.html",(footerTxt)=>{
    footerElement[0].innerHTML += footerTxt;
  });

}
