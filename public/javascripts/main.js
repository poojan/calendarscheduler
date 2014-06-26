$(function () {
  $('.addToTeam').click(function (evt) {
    var teacherId = $(this).attr('data-teacher-id');
    var userId = $(this).attr('data-user-id');

    var data = { teacherId: teacherId };

    $.post('/api/user/' + userId + '/team', data, function (response) {
      $.get('/api/user/' + userId + '/team', function (userData) {
        var html = '';
        $.each(userData, function (i, v) {
          html += '<p>' + v.name + '</p>';
        });
        $('#user-team').html(html);
      });
    });
  });
});
