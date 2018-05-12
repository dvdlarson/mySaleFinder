window.isLoggedIn = false;
 
$(document)
.ready(function() {
  $('.ui.form')
    .form({
      fields: {
        email: {
          identifier  : 'email',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your e-mail'
            },
            {
              type   : 'email',
              prompt : 'Please enter a valid e-mail'
            }
          ]
        },
        password: {
          identifier  : 'password',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your password'
            },
            {
              type   : 'length[6]',
              prompt : 'Your password must be at least 6 characters'
            }
          ]
        }
      }
    })
  ;
})
;
 
 $('.login.button')
  .api({
    action: 'login',
    beforeSend: function(settings) {
      // cancel request
      if(!isLoggedIn) {
        $(this).state('flash text', 'Requires Login!');
        return false;
      }
    }
  })
;

