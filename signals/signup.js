opengrowth.signals.signup = ( request, customer ) => {
    // Name
    //console.log('33333HYEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
    var name = '';
    try       { name = customer.person.name.fullName }
    catch (e) { name = '' }

    var fname = '';
    try       { fname = customer.person.name.givenName }
    catch (e) { fname = '' }

    // City
    var city = '';
    try       { city = customer.person.geo.city }
    catch (e) { city = '' }

    // Company
    var company = '';
    try       { company = customer.person.employment.name }
    catch (e) { company = '' }

    // Title
    var title = '';
    try       { title = customer.person.employment.title }
    catch (e) { title = '' }

    // Usecase
    var usecase = '';
    try       { usecase = customer.usecase.label }
    catch (e) { usecase = '' }

    // Avatar
    var avatar = '';
    try       { avatar = customer.person.avatar }
    catch (e) { avatar = '' }

    // Twitter Handle
    var twitter = '';
    try       { twitter = customer.person.twitter.handle }
    catch (e) { twitter = '' }

    // Tweet if Twitter Handle
    if (twitter && twitter.toLocaleLowerCase().indexOf('pubnub') < 0) {
        const tweet = `@${twitter} hi ${fname} welcome to PubNub ~ ` +
                      `tweet me back`;
        opengrowth.delight.twitter.tweet( request, tweet );
    }

    const message =
    `Hi ${name || 'there'}! ` +
    `I am Neumann, an Artificial Intelligence alive in PubNub BLOCKS. ` +
    `Welcome to the Programmable Network.` +
    `<p><p>` +
    `${usecase ? 'I can help you with realtime ' + usecase + ' and more.' : ''} ` +
    //`${(city || company && title) ? 'I know a little about you.' : ''} ` +
    //`${city    ? 'I see you are in ' + city + '.' : ''} ` +
    //`${title   ? 'You are the ' + title + (company?'at '+company:'') + '.' : ''} ` +
    //`${company ? 'What is new at ' + company + '?' : ''} ` +
    `${(city||'').indexOf('San') >= 0 ? 
        'Since you are nearby you should visit our SF office! ':''}` +
    `<p><p>I will send you helpful tips at times.` +
    `<p><p>${avatar  ? '<img height=100 src="'+avatar+'">' : '' }` +
    `<p><p>Email generated with JSON:` +
    `<p><p> <pre>${JSON.stringify(customer)}</pre>`;

    // Debug show Message
    console.log(message);

    // Send Email
    //const email   = request.message.email;
    //const email   = 'blum.stephen@gmail.com';
    const email   = 'open-growth-activity@pubnub.com';
    const subject = `Hi ${name || 'there'}!`;
    opengrowth.delight.sendgrid.email(
        'signup', message, email, name, subject
    );
};
