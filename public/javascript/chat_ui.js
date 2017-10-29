import Chat from "./chat.js";
import $ from "jquery";

// helper function
function divEscapedContentElement(message) {
  return $("<div></div>").text(message);
}

function divSystemContentElement(message) {
  return $("<div></div>").html("<i>" + message + "</i>");
}

/**
 * 创建列表
 * @param {*}  rooms obj
 */
function createList(obj) {
  let _arr = Object.values(obj);
  if (!_arr.length) return false;
  let frag = document.createDocumentFragment();
  for (var i =0; i < _arr.length; i++ ) {
    let _li = document.createElement('LI');
    _li.textContent = _arr[i];
    frag.appendChild(_li);
  }
  return frag;
}

function processUserInput(chatApp, socket) {
  let message = $("#send_message").val();
  let systemMessage = "";
  if (message.charAt(0) === "/") {
    systemMessage = chatApp.processCommand(message);
    if (systemMessage) {
      $("#messages").append(divSystemContentElement(systemMessage));
    }
  } else {
    chatApp.sendMessage($("#room").text(), message);
    $("#messages").append(divEscapedContentElement(message));
    $("#messages").scrollTop($("#messages").prop("scrollHeight"));
  }

  $("#send_message").val("");
}

//instance
let socket = io();

$(document).ready(function() {
  const chatApp = new Chat(socket);

  socket.on("joinResult", result => {
    let _room = document.getElementById("room");
    _room.innerText = result.room;
  });

  // listen on nameResult
  socket.on("nameResult", result => {
    let message;
    if (result.success) {
      message = `You are know as ${result.name}.`;
    } else {
      message = result.message;
    }
    $("#messages").append(divSystemContentElement(message));
  });

  // listen on joinReulst
  socket.on("joinResult", result => {
    $("#room").text(result.room);
    $("#messages").append(divSystemContentElement("Room changed"));
  });

  //listen on message
  socket.on("message", message => {
    let newElement = $("<div></div>").text(message.text);
    $("#messages").append(newElement);
  });

  //get room list
  socket.on("rooms", rooms => {
    let listContainer = document.getElementById("rooms_list");
    listContainer.innerHTML = '';
    listContainer.appendChild(createList(rooms));
  });

  setInterval(() => {
    socket.emit("rooms");
  }, 2000);

  $("#send_form").submit(e => {
    e.preventDefault();
    processUserInput(chatApp, socket);
  });
});
