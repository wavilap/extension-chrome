var counter=0;
var timerVar=null;
var timerDelay=300000;
 
// Badge colors
var BADGE_ACTIVE = {color:[204,0,51,255]};
var BADGE_LOADING = {color:[204,204,51,255]};
var BADGE_INACTIVE = {color:[153,153,153,255]};
 
function loadData(){
  var xhr=new XMLHttpRequest();
  xhr.open('GET','http://www.forosdelweb.com/usercp.php?fdwapi=1',true);
  xhr.onreadystatechange=function(){
    if(xhr.readyState == 4){
      var xmlDoc=new DOMParser().parseFromString(xhr.responseText,'text/xml');
 
      chrome.browserAction.setBadgeBackgroundColor(BADGE_INACTIVE);
      var userinfo=xmlDoc.getElementsByTagName('userinfo')[0];
      if(!userinfo){
        chrome.browserAction.setIcon({path:'images/icon-gray.png'});
        chrome.browserAction.setTitle({title: 'Credencial FdW\n--Desconectado--'});
        chrome.browserAction.setBadgeText({text: '?'});
        return;
      }
      else{
        counter=0;
        var notifications=xmlDoc.getElementsByTagName('notification');
        for (var i=0;i<notifications.length;i++){
          if(notifications[i].getAttribute('highlight')=='true'){
            counter++;
          }
        }
        chrome.browserAction.setIcon({path:'images/icon.png'});
        chrome.browserAction.setTitle({title: 'Credencial FdW\n--Conectado--'});
        if(counter>0){
          chrome.browserAction.setBadgeText({text: counter+''});
          chrome.browserAction.setBadgeBackgroundColor(BADGE_ACTIVE);
        }
        else
          chrome.browserAction.setBadgeText({text: ''});
      }
    }
    else return;
  }
  xhr.send(null);
  window.clearTimeout(timerVar);
  timerVar=window.setTimeout(loadData,timerDelay);
}
 
function init() {
  chrome.browserAction.setIcon({path:'images/icon-gray.png'});
  chrome.browserAction.setBadgeText({text: '...'});
  chrome.browserAction.setBadgeBackgroundColor(BADGE_LOADING);
  loadData();
}

init();