// modifies the speed of the carousel images moving
$('.carousel').carousel({
  interval: 8000
});

// stripe.api functions
var handler = StripeCheckout.configure({
  key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
  image: '',
  locale: 'auto',
  token: function(token) {
    // Use the token to create the charge with a server-side script.
    // You can access the token ID with `token.id`
  }
});

$('#customButton').on('click', function(e) {
  // Open Checkout with further options
  handler.open({
    name: 'Story Matters',
    description: '',
    amount: 5000
  });
  e.preventDefault();
});

// Close Checkout on page navigation
$(window).on('popstate', function() {
  handler.close();
});

// Delete profile
$('.delete-btn').click(function(e) {
  e.preventDefault();
  deleteProfile($(this).data('profile-id'));
});

function deleteProfile(profileId) {
  $.ajax({
    url: '/admin/editProfile/',
    type: 'DELETE',
    data: {id: profileId},
    success: function() {
      window.location = '/admin';
    },
    error: function(err) {
      console.log('Error Deleting: ', err);
    }
  });
}

// Edit profile
$('.edit-btn').click(function(e) {
  window.location = '/admin/editProfile/' + $(this).parent().attr('id');
});

$('#update-form').submit(function(e) {
  e.preventDefault();

  var myUrl = $(this).attr('action');
  var myData = $(this).serialize();

  $.ajax({
    method: 'GET',
    url: '/admin/editProfile',
    data: myData,
    success: function() {
      window.location = '/admin'
    },
    error: function(err) {
      console.log(err);
    }
  });
});

// alternate button when not signed in
$('#notButton').click(function(e) {
  e.preventDefault();
  swal({
    title: 'Whoops!',
    text: 'Please Log In or Sign Up',
    type: 'error'
    
  });
    
});
