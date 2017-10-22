var dataSettings = [
  {"decode":"ph","encode":"f","checked":"true"},
  {"decode":"gi","encode":"j","checked":"true"},
  {"decode":"laugh out loud","encode":"lol","checked":"true"}
];
var dataSettingsTmp = [];
setDataModal();
function showModalSettings(){
  $('.ui.modal').show();
}
function closeModal(){
  $('.ui.modal').hide();
  setDataModal();
}
function saveSetting(){
  for(var i = 0; i < dataSettingsTmp; i++){
    for(var j = 0; j < dataSettings; j++){
      if(dataSettingsTmp[i].encode === dataSettings[j].encode){
        dataSettings.splice(j,1);
      }
    }
    dataSettings.push(dataSettingsTmp[i]);
  }
  setDataModal();
}
function addSetting(){
  console.log("ok");
  var encode = $('#encode-add').val();
  var decode = $('#decode-add').val();
  if(encode === "" || !encode || decode === "" || !decode) return;
  dataSettingsTmp.push({"decode":decode,"encode":encode,"checked":"true"});
  $('.listSettings').append(
  "<div class='seven wide column'><input type='text' value='"+encode+"' disabled></div>"
  + "<div class='eight wide column'><input type='text' value='"+decode+"' disabled></div>"
  + "<div class='one wide column'><input type='checkbox' tabindex='0' checked></div>");
  $('.listSettings').scrollTop($('.listSettings')[0].scrollHeight);
}
function setDataModal(){
  $('.listSettings').html("");
  for(var i = 0; i < dataSettings.length; i++){
    $('.listSettings').append(
    "<div class='seven wide column'><input type='text' value='"+dataSettings[i].encode+"' disabled></div>"
    + "<div class='eight wide column'><input type='text' value='"+dataSettings[i].decode+"' disabled></div>"
    + "<div class='one wide column'><input type='checkbox' tabindex='0' checked='"+dataSettings[i].checked+"'></div>");
  }
}
