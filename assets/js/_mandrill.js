'use strick'
//9dmJOEs_tM07KG6UEN-5fA

mandrillRequestTo = {
  "email": null,
  "type": null
}

mandrillRequest = {

  "key": null,
  "message": {
    "html": null,
    "text": null,
    "subject": null,
    "from_email": null,
    "from_name": null,
    "to": [],
    "headers": {
      "Reply-To": null
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": null,
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null
  }

}

/**
 * mandrill controller object
 *
 * Cont
 *
 * @param $
 * @param key
 */
function mandrill( $, key ) {

  this.$ = $;
  this.request = mandrillRequest;
  this.request.key = key;
  this.url = 'https://mandrillapp.com/api/1.0/messages/send.json';
  this.sendToType = 'to';
  this.sendError = false;

  this.response = null;

  this.setToEmail = function (email) {
    this.request.message.to = this.emailListParser(email);
  };

  this.emailListParser = function ( email ){

    var pattern = /,/g;

    if ( pattern.test(email) ){

      var returnList = [];
      var emailListArray = email.split(',');

      emailListArray.forEach(function(email){

        var sendTo = jQuery.extend(true, {}, mandrillRequestTo);
        sendTo.email = email.trim();
        sendTo.type = this.sendToType;
        returnList.push(sendTo);

      });

      return returnList;

    } else {

      var sendTo = mandrillRequestTo;
      sendTo.email = email;
      sendTo.type = this.sendToType;

      return [ sendTo ];
    }

  };

  this.setFromEmail = function (email) {
    this.request.message.from_email = email;
  };

  this.setFromName = function (name) {
    this.request.message.from_name = name;
  };

  this.setMessage = function( message ){
    this.request.message.html = message;
    this.request.message.text = message;
  };

  this.setSubject = function( subject ){
    this.request.message.subject = subject;
  };

  this.setReplyTo = function ( email ){
    this.request.message.headers['Reply-to'] = email;
  };

  this.send = function( callback, failCallback ){
    this.$.post(this.url, this.request, function(data){

      $(data).each(function(){

        if ( this.status == 'invalid' ){
          failCallback();
        }

      });

      callback();
    }).fail(function(){
      if ( failCallback ){
        failCallback();
      }
    });
  }

}