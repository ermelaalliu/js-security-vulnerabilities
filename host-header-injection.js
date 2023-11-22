app.post("/generate-pwd-reset-url", async function (req, res) {
  // assume the customer exists
  const customer = await customerdb.findOne(req.body.email);
  const resetToken = await genPwdResetToken(customer._id);
  const resetPwdUrl = `${
    // req.header("host") | security threat
    process.env.HOST_URL
  }/passwordReset?token= ${resetToken}&id=${customer._id}`;
  return res.json({ resetPwdUrl: resetPwdUrl });
});


/*

A web app that's taking post requests, and they're taking a generate password
reset URL link. What's happening here is that we're trying to generate a 
password reset for some kind of customer for some web app. So assuming the 
customer exists, we find the customer using the email, and then we get the 
password reset token via the customer's ID. What then happens is that we 
generate this reset password URL using this rep dot header dot host. Using 
password reset, we just make the URL out of string interpolation,

and then we send back the URL in a JSON object. 


This code is vulnerable because of a 

HOST HEADER INJECTION ATTACK

The reason 
why this might happen is we use this 

req.header of host. 
So we use the host header basically as one of the parameters to this URL. 


But this is 
actually under control of the person making the request in possible control 
of the attacker. By convention, this is usually just going to be something 
that's safe, but this could be changed by the person who's making the request. 


So in general, it's not a great idea to use the host header, because this 
could be used to send back a malicious link that then when clicked on could 
send the user anywhere. So best not to use this host header. So what we want 
to do is we want to use something that's more robust than just using the 
host header of the requests we're getting from the user. So suppose that we 
have 

process.env.HOST_URL 


environment variable lying around, it 
would be a lot safer if in the server in the web app, we were referencing this
HOST_URL instead of looking at the host header given to us by the request
itself. By doing just the simple step, we prevent the host header injection 
because we're no longer using a potentially malicious source of data.


*/