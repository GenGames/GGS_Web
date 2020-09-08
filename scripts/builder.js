function buildElement(elementStructure, dataSource){
  var tag = elementStructure.tag;
  var startContent = dataSource[elementStructure.startContent] || "";
  var endContent = dataSource[elementStructure.endContent] || "";
  var classes = elementStructure.classes || [];
  var id = elementStructure.id || "";
  var properties = elementStructure.properties || [];
  var pulledProperties = elementStructure.pulledProperties || [];
  var children = elementStructure.children || [];
  var src = dataSource[elementStructure.srcKey] || "";
  var alt = dataSource[elementStructure.altKey] || "";
  var href = dataSource[elementStructure.hrefKey] || "";
  var listParent = elementStructure.listParent || "";
  var forcedInsert = elementStructure.forcedInsert || "";

  var html = "";

  if (listParent == "") {
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

    var pulledPropertiesHtml = "";
    for (var i = 0; i < pulledProperties.length; i++) {
      pulledPropertiesHtml += pulledProperties[i].key +"='"+ dataSource[pulledProperties[i].value]+"' ";
    }

    var idHtml = (id == "")? "": "id='" + id + "'";

    html += "<" + tag +" " + imageHtml + anchorHTML + idHtml + classHtml + propertiesHtml + pulledPropertiesHtml +"> " + forcedInsert + startContent;

    // add all embedded content
    for (var i = 0; i < children.length; i++) {
      html += buildElement(children[i], dataSource);
      if (classHtml.includes("teamMember-card") ) {
        console.log(html);
      }
    }

    html += endContent + "</" + tag + ">";
  }
  else
  {
    dataSource[elementStructure.listParent].forEach((item, i) => {
      href = item[elementStructure.hrefKey] || "";
      src = item[elementStructure.srcKey] || "";
      alt = item[elementStructure.altKey] || "";
      startContent = item[elementStructure.startContent] || "";
      endContent = item[elementStructure.endContent] || "";

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

      html += "<" + tag +" " + imageHtml + anchorHTML + idHtml + classHtml + propertiesHtml +"> " + startContent;

      // add all embedded content
      for (var i = 0; i < children.length; i++) {
        html += buildElement(children[i], dataSource);
      }

      html += endContent + "</" + tag + ">";
    });
  }

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
  if (query["focus"] != undefined && query["focus"] != "undefined" && query["target"] != undefined && query["target"] != "undefined")
  {
    LoadFocusData(query["focus"],query["target"],"pageLayout");
  }
  else if (query["list"] != undefined && query["list"] != "undefined")
  {
    var pageTitle = (query["list"] == "TeamMembers")? "Team Members": query["list"];
    document.getElementById("target").innerHTML += "<h1 class='pageTitle'>" + pageTitle + "</h1>";

    loadFileAsString("/GGS_Web/data/index.json",(indexData)=>{
      var fileNames = JSON.parse(indexData)[query["list"]];
      LoadListData(query["list"],fileNames,"listLayout");
    })
  }

  var displayType = (query["focus"] != undefined && query["focus"] != "undefined")? query["focus"] : query["list"];
  var focus = query["target"];
  generatePageMeta(displayType,focus);
}

function LoadListData(folderLocation,dataFilesArray,layoutType){
  for (var i = 0; i < dataFilesArray.length; i++) {
    var templateUrl = "/GGS_Web/data/" + folderLocation + "/" + folderLocation + "_Template.json";
    var dataFileUrl = "/GGS_Web/data/" + folderLocation + "/" + dataFilesArray[i] + ".json";
    LoadAndDisplayFile(templateUrl,dataFileUrl,layoutType);
  }
}

function LoadFocusData(folderLocation,dataFile,layoutType){
  var templateUrl = "/GGS_Web/data/" + folderLocation + "/" + folderLocation + "_Template.json";
  var dataFileUrl = "/GGS_Web/data/" + folderLocation + "/" + dataFile + ".json";
  LoadAndDisplayFile(templateUrl,dataFileUrl,layoutType);
}

function generatePageMeta(displayType, focus){
  var pageTitleMeta = "";

  if (focus != undefined) {
    pageTitleMeta += focus + " | ";
  }

  pageTitleMeta += displayType + " | GG Studio";

  document.title = pageTitleMeta;
}
