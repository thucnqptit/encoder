var data = [
  {"decode":"ph","encode":"f","checked":"true"},
  {"decode":"gi","encode":"z","checked":"true"},
  {"decode":"ng","encode":"ŋ","checked":"true"},
  {"decode":"kh","encode":"ҡ","checked":"true"},
  {"decode":"nh","encode":"ɲ","checked":"true"},
  {"decode":"ươ","encode":"w","checked":"true"},
  {"decode":"th","encode":"ɵ","checked":"true"},
  {"decode":"tr","encode":"j","checked":"true"}
];
var dataUp = [
  {"decode":"PH","encode":"F","checked":"true"},
  {"decode":"GI","encode":"Z","checked":"true"},
  {"decode":"NG","encode":"Ŋ","checked":"true"},
  {"decode":"Kh","encode":"Ҡ","checked":"true"},
  {"decode":"NH","encode":"Ɲ","checked":"true"},
  {"decode":"ƯƠ","encode":"W","checked":"true"},
  {"decode":"TH","encode":"Ɵ","checked":"true"},
  {"decode":"TR","encode":"J","checked":"true"}
];
var dataSettings = data;
var dataSettingsUp = dataUp;
closeModal();
function showModalSettings(){
  $('.ui.modal').show();
}
function closeModal(){
  $('.ui.modal').hide();
  setDataModal();
}
function saveSetting(){
  var checkList = $('.check');
  for(var i = 0; i < checkList.length; i++){
    dataSettings[i].checked = checkList[i].getAttribute('checked');
    dataSettingsUp[i].checked = dataSettings[i].checked;
  }
  closeModal()
}

function changeChecked(i){
  if (i.getAttribute('checked') === 'true'){
    i.setAttribute('checked','false');
  }
  else {
    i.setAttribute('checked','true');
  }
}
function setDataModal(){
  $('.listSettings').html("");
  for(var i = 0; i < dataSettings.length; i++){
    $('.listSettings').append(
    "<div class='seven wide column'><input type='text' value='"+dataSettings[i].encode+"' disabled></div>"
    + "<div class='eight wide column'><input type='text' value='"+dataSettings[i].decode+"' disabled></div>"
    + "<div class='one wide column'><input type='checkbox' tabindex='0' checked='"+dataSettings[i].checked+"' class='check' onchange='changeChecked(this)'></div>");
  }
}
var loadFile=function(url,callback){
    JSZipUtils.getBinaryContent(url,callback);
}
function selectFile() {
  $('#file').click();
}
function upFile(){
  var form = $('form')[0]; // You need to use standard javascript object here
  var formData = new FormData(form);
  $.ajax({
  url: 'https://admin.svchatbot.com/api/v1/files',
  data: formData,
  type: 'POST',
  headers: {"Authorization" : "access_token 6e5a2f7a-e2e0-4a26-aa8a-52692d57bbb5"},
  contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
  processData: false, // NEEDED, DON'T OMIT THIS
  // ... Other options like success and etc
  }).done((data) => {
      loadFile("https://admin.svchatbot.com/" + data.result,function(err,content){
          var doc=new Docxgen(content);
          text=doc.getFullText();
          console.log(text);
          // lineBreak = '<w:br/>'
          $('#text').html(text);
          $('#text').val(text);
      })
    }).fail((err) => {
      console.error(err);
    });
}
function convert(doc, array){
  for(var i = 0; i < array.length; i++){
    var res = doc.replace(new RegExp( array[i].encode , "g"), function () {
      if(array[i].checked === "true") return array[i].decode;
      return array[i].encode;
    });
    doc = res;
  }
  return doc;
}
function reconvert(doc, array){
  for(var i = 0; i < array.length; i++){
    var res = doc.replace(new RegExp( array[i].decode , "g"), function () {
      if(array[i].checked === "true") return array[i].encode;
      return array[i].decode;
    });
    doc = res;
  }
  return doc;
}
function encode(){
  var doc = $('#text').val();
  doc = reconvert(doc, dataSettingsUp);
  doc = reconvert(doc, dataSettings);
  $('#result').html(doc);
}
function decode(){
  var doc = $('#text').val();
  doc = convert(doc, dataSettingsUp);
  doc = convert(doc, dataSettings);
  $('#result').html(doc);
}
function printFile(){
  var prtContent = document.getElementById("result");
  var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
  WinPrint.document.write(prtContent.innerHTML);
  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  WinPrint.close();
}
