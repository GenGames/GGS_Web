function buildElement(elementStructure, dataSource){
  var tag = elementStructure.tag;
  var startContent = dataSource[elementStructure.startContent] || "";
  var endContent = dataSource[elementStructure.endContent] || "";
  var classes = elementStructure.classes || [];
  var id = elementStructure.id || "";
  var properties = elementStructure.properties || [];
  var children = elementStructure.children || [];
  var src = dataSource[elementStructure.srcKey] || "";
  var alt = dataSource[elementStructure.altKey] || "";
  var href = dataSource[elementStructure.hrefKey] || "";

  var classHtml = (0 != classes.length)? "class='":"";
  for (var i = 0; i < classes.length; i++) {
    classHtml += classes[i] + " ";

    if (i+1 == classes.length) {
      classHtml += "' ";
    }
  }

  var imageHtml = (src != "")? "src='" + src + "' alt='" + alt + "' ":"";
  var anchorHTML = (href != "")? "href='" + href +"' ":"";

  var propertiesHtml = "";
  for (var i = 0; i < properties.length; i++) {
    propertiesHtml += properties[i].key +"='"+properties[i].value+"' ";
  }

  var idHtml = (id == "")? "": "id='" + id + "'";

  var html = "<" + tag +" " + imageHtml + anchorHTML + idHtml + classHtml + propertiesHtml +"> " + startContent;

  // add all embedded content
  for (var i = 0; i < children.length; i++) {
    html += buildElement(children[i], dataSource);
  }

  html += endContent + "</" + tag + ">";

  return html;
}


function LoadAndDisplayFile(structurePath, dataPath, layoutType){
  loadFileAsString(structurePath,(structDataString)=>{
    var prefabStruct = JSON.parse(structDataString);


    loadFileAsString(dataPath,(profileData)=>{
      var profile = JSON.parse(profileData);

      var newElement = buildElement(prefabStruct[layoutType],profile);

      document.getElementById("target").innerHTML += newElement;
    });
  });
}

function determineLoadData(query){
  if (query["focus"] != undefined && query["focus"] != "undefined")
  {
    console.log("loading profile page");
  }
  else if (query["list"] != undefined && query["list"] != "undefined")
  {
    loadFileAsString("/data/index.json",(indexData)=>{
      var fileNames = JSON.parse(indexData)[query["list"]];
      LoadListData(query["list"],fileNames,"listLayout");
    })
  }
}

function LoadListData(folderLocation,dataFilesArray,layoutType)
{
  for (var i = 0; i < dataFilesArray.length; i++) {
    var templateUrl = "/data/" + folderLocation + "/_" + folderLocation + "_Template.json";
    var dataFileUrl = "/data/" + folderLocation + "/" + dataFilesArray[i] + ".json";
    LoadAndDisplayFile(templateUrl,dataFileUrl,layoutType);
  }
}
