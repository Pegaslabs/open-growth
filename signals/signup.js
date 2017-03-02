opengrowth.signals.signup = ( request, customer ) => {
    const user = request.message;
    const csm  = user.csm || {};
    const csm_bccs = csm && csm.bccs ? csm.bccs : [];
    let email  = user.litmus || 'open-growth-activity+testing@pubnub.com';
    // @if GOLD
    email = user.email;
    // @endif

    let firstName    = opengrowth.customer.getFirstName(customer);
    let lastName     = opengrowth.customer.getLastName(customer);
    let company_name = opengrowth.customer.getCompany(customer);

    let display_url = `https://admin.pubnub.com/#/user/${user.user_id}/` +
                      `account/${user.account_id}/` +
                      `app/${user.app_id}/key/${user.key_id}/`;
    let anchor_url  = display_url +
                      `?utm_source=EmailBlasts%20&utm_medium=` +
                      `Open-Growth&utm_campaign=` +
                      `EB-CY16-Q4-Open-Growth-01&utm_term=link2` +
                      `&utm_content=api-keys&signal=signup&link=keys`;

    var template_data = {
        "customer_first_name" : firstName
      , "customer_last_name"  : lastName
      , "company_name"        : company_name
      , "csm_first_name"      : csm.first_name
      , "csm_last_name"       : csm.last_name
      , "csm_email"           : csm.email
      , "csm_phone"           : csm.phone
      , "csm_bccs"            : csm_bccs
      , "display_url"         : display_url //signup
      , "anchor_url"          : anchor_url  //signup
    };

    var sendWithUsPostBody = {
      "template": opengrowth.keys.swu.templates.signup,
      "recipient": {
        "name": firstName,
        "address": email
      },
      "template_data": template_data,
      "bcc": csm_bccs,
      "tags" : [ "signup" ]
    };

    // Send Email and Track Delight in Librato
    opengrowth.delight.sendwithus.email(sendWithUsPostBody);
};