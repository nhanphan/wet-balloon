$(function(){
  var id = $('#header').attr('data-id');
  var socket = io();
  socket.emit('join', id);
  $('#balloon').jrumble();
  socket.on('instruction', function(instruction){
    console.log(instruction);
    if(instruction.action === 'on'){
      $('#balloon').trigger('startRumble');
    }
    if(instruction.action === 'off'){
      $('#balloon').trigger('stopRumble');
    }
  });
});
