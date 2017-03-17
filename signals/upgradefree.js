opengrowth.signals.upgrade_free = ( request ) => {
    const user = request.message;
    const csm  = user.csm || {};
    let email = "open-growth-activity+silver@pubnub.com";
    // @if GOLD
    email = csm.email;
    // @endif

    let formatter = new Intl.DateTimeFormat("en", { month: "short" });
    let month = formatter.format(new Date());

    let textContent = `<p>
        Hi ${csm.first_name},
      </p>
      <p>
        Within the past 24 hours this <b>${user.product_tier}</b> user's
        sub key exceeded 1,000,000 messages since ${month} 1st:
      </p>

      <p>
        Account email:  ${user.email} <br />
        Sub Key:        ${user.sub_key}
      </p>

      <p>
        Best, <br />
        Neumann
      </p>`;

    var sendGridPostBody = {
      "message"      : textContent
    , "subject"      : "Upgrade Required: Free User"
    , "email"        : email
    , "name"         : csm.full_name
    , "reply_email"  : "neumann@pubnub.com"
    , "reply_name"   : "Neumann"
    , "sender_email" : "neumann@pubnub.com"
    , "sender_name"  : "Neumann"
    , "bccs"         : [ { "email": "open-growth-activity@pubnub.com" } ]
    , "categories"   : [ "og_upgrade_free" ]
    };

    return opengrowth.delight.sendgrid.email(sendGridPostBody);
};
