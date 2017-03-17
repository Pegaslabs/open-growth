// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Send Emails with SendGrid
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
opengrowth.delight.sendgrid = {};
opengrowth.delight.sendgrid.email = ( request ) => {
    // Record Delight Activity
    opengrowth.track.delight( 'sendgrid.email', request.signal, {
      "email"    : request.email
    , "subject"  : request.subject
    , "message"  : request.message || "SendGrid"
    , "bccs"     : request.bccs
    , "category" : request.categories[0]
    } );
    
    // sendgrid api url
    const apiurl = "https://api.sendgrid.com/v3/mail/send";

    // sendrid api user
    const apiuser = opengrowth.keys.sendgrid.user;

    // sendgrid api key
    const apikey = opengrowth.keys.sendgrid.apikey;

    // payload
    let data = {
      "from"              : { "email": request.sender_email,  "name": request.sender_name  }
    , "reply_to"          : { "email": request.reply_email, "name": request.reply_name }
    , "tracking_settings" : { "subscription_tracking" : { "enable" : false } }
    , "categories"        : request.categories
    , "template_id"       : request.template_id
    , "personalizations"  : [ {
            "to" : [ { "email" : request.email, "name" : request.name } ]
        ,   "substitutions" : request.substitutions
        ,   "personalizations" : request.bccs
        } ]
    };

    //add content if not using a template on sendgrid
    if ( request.message ) {
        data.content = [ { "type" : "text/html", "value" : request.message } ];
        delete data.personalizations.substitutions;
        delete data.template_id;
    }

    if ( request.subject ) {
        data.subject = request.subject;
    }

    let sendgridRequest = {
          "method"  : "POST"
        , "body"    : data
        , "headers" : {
          "Authorization" : `Bearer ${apikey}`
        , "Content-Type"  : "application/json"
        }
    }

    // post email
    return xhr.fetch( apiurl, sendgridRequest ).then( (res) => {
        if (res.status < 200 || res.status > 300) {
            // The response code is an error
            console.log("SendGrid Error:\n", res);
            opengrowth.log("sendgrid.email", "xhr", res, true);
        } else {
            // The response code is 2xx ok
            //console.log( "SendGrid Response:\n" + JSON.stringify(res));
            opengrowth.log("sendgrid.email", "xhr", res.status);
        }
    }).catch( err => {
        console.log("SendGrid Error:\n", err);
        opengrowth.log("sendgrid.email", "xhr", err, true);
    } );
};