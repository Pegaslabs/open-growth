opengrowth.signals.realtime_analytics = ( request, customer ) => {
    const user = request.message;
    const csm  = user.csm || {};
    const csm_bccs = csm && csm.bccs ? csm.bccs : [];
    let email  = user.litmus || 'open-growth-activity+silver@pubnub.com';
    // @if GOLD
    email = user.email;
    // @endif

    let firstName    = opengrowth.customer.getFirstName(customer);
    let lastName     = opengrowth.customer.getLastName(customer);
    let company_name = opengrowth.customer.getCompany(customer);
    var display_url  = `https://admin.pubnub.com/#/` + 
      `user/${user.user_id}/account/${user.account_id}` +
      `/app/${user.app_id}/key/${user.key_id}/`;

    var template_data = {
        "customer_first_name" : firstName
      , "customer_last_name"  : lastName
      , "company_name"        : company_name
      , "csm_first_name"      : csm.first_name
      , "csm_last_name"       : csm.last_name
      , "csm_email"           : csm.email
      , "csm_phone"           : csm.phone
      , "csm_sf_bcc"          : csm_bccs
      , "app_name"            : user.app_name
      , "display_url"         : display_url
    };
    
    var sendWithUsPostBody = {
      "template": opengrowth.keys.swu.templates.enable_realtime_analytics,
      "recipient": {
        "name": firstName,
        "address": email
      },
      "template_data": template_data,
      "bcc": csm_bccs,
      "tags" : [ "og_enable_realtime_analytics" ]
    };

    // Send Email and Track Delight in Librato
    return opengrowth.delight.sendwithus.email(sendWithUsPostBody);
};