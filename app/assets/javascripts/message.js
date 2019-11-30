$(function(){
  function buildHTML(message){
    let content = message.content ? `${ message.content }` : "";
    let image = message.image ? `<img src= ${ message.image }>` : "";
     let html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                    ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${content}
                   </p>
                   ${image}
                  </div>
                </div>`
    return html;
  }
    $('#new_message').on('submit', function(e){
    e.preventDefault()
    let formdata = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html)
      $('#message_content').val('');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $(".submit-btn").prop('disabled', false);
    })
  }) 
});


