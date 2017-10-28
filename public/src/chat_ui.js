import Chat from "./chat.js";
import $ from 'jquery';

// helper function
function divEscapedContentElement(message) {
  return $("<div></div>").text(message);
}

function divSystemContentElement(message) {
  return $("<div></div>").html("<i>" + message + "</i>");
}

function processUserInput(chatApp, socket) {
  let message = $("send_message").val();
  let systemMessage = "";
  if (message.chartAt(0) === "/") {
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

  // listen on nameResult
  socket.on('nameResult', (result) => {
    let message;
    if (result.success) {
      message = `You are know as ${result.name}.`;
    } else {
      message = result.message;
    }
    $('#messages').append(divSystemContentElement(message));
  });

  //listen on joinReulst
  //socket.on('joinResult', (result) => {
  //  $('#room').text(result.room);
  //  $('#messages').append(divSystemContentElement('Room changed'));
  //});

  //listen on message
  //socket.on('message', (message) => {
  //  let newElement = $('<div></div>').text(message.text);
  //  $('#messages').append(newElement);
  //});

  setInterval(() => {
    socket.emit('rooms');
  }, 1000);

  $('#send_form').submit((e) => {
   e.preventDefault();
  //  processUserInput(chatApp, socket);
  })

});
