$(function(){
  var id = $('#header').attr('data-id');
  var socket = io();
  socket.emit('join', id);

  $('#on').click(function(){
    socket.emit('instruction', {id: id, action: 'on'});
  });

  $('#off').click(function(){
    socket.emit('instruction', {id: id, action: 'off'});
  });
});
