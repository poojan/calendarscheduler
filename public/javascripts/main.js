$(function () {
  var addToTeamClickHandler = function (evt) {
    var teacherId = $(this).attr('data-teacher-id');
    var userId = $(this).attr('data-user-id');

    var data = { teacherId: teacherId };

    $.post('/api/user/' + userId + '/team', data, function (err, response) {
      //console.log(err, response);
      refresh(userId, teacherId);
    });
  };

  var removeFromTeamClickHandler = function (evt) {
    var teacherId = $(this).attr('data-teacher-id');
    var userId = $(this).attr('data-user-id');

    var data = { teacherId: teacherId };

    $.ajax({
      url: '/api/user/' + userId + '/team',
      data: data,
      type: 'DELETE',
      success: function(result) {
        refresh(userId, teacherId);
      }
    });
  };

  function refresh(userId, teacherId) {
    $.get('/api/user/' + userId + '/team', function (userData) {
      var html = '';
      $.each(userData, function (i, v) {
        html += '<p>' + v.name;
        html += '<button data-user-id="' + userId + '" data-teacher-id="' + v._id + '" class="removeFromTeam">Remove</button>';
        html += '</p>';
      });
      $('#user-team').html(html);
      //$('.addToTeam').click(addToTeamClickHandler);
      $('.removeFromTeam').click(removeFromTeamClickHandler);
    });
  }


  $('.addToTeam').click(addToTeamClickHandler);

  $('.removeFromTeam').click(removeFromTeamClickHandler);
});
