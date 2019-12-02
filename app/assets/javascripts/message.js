$(function(){

  function buildHTML(message){
    let content = message.content ? `${ message.content }` : "";
    let image = message.image ? `<img src= ${ message.image }>` : "";
     let html = `<div class="message" data-messages-id="${message.id}">
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
      $('#new_message')[0].reset("");
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $(".submit-btn").prop('disabled', false);
    })
    .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  })
  
  let reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    last_message_id = $(".message:last").data("message-id");
    $.ajax({
      url: "api/messages", 
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    }) 
    .done(function(messages) {
      messages.forEach(function(message){
        let insertHTML = buildHTML(message)
        $('.messages').append(insertHTML)
    })
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
     alert('ERROR');
    });
      }
    }
   setInterval(reloadMessages, 5000);
  });