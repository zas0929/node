$(document).ready(function() {
    var socket = io();
    $('form').submit(function() {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    $('#m').on('keypress', function() {
        socket.emit('user typing', 'typing');
    });


    socket.on('user typing', function(typing) {
        $('.chat').find('span').text(typing);
        setTimeout(function() {
            $('.chat').find('span').text('');
        }, 3000);

    })
    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('new user', function(user) {
        $('#messages').append($('<li>').text(user + " joined to game"));
    })
    socket.on('user out', function(user) {
        $('#messages').append($('<li>').text(user + " disconnected"));
    })
})
