const jwt = require("jsonwebtoken");

// Secret key for signing JWT
// const secret = "my-super-duper-secret-key"; | security threat
const secret = process.env.JWT_TOKEN;


app.post("/login", (req, res) => {
  // Assume authentication happens successfully
  // & the following user is returned form the DB

  const user = { id: 123, name: "John Doe" };

  // Sign JWT with user ID and secret key
  const token = jwt.sign(user, secret);

  // Send JWR back to client
  res.json({ token });
});

/* 

Okay, so this code is vulnerable because of hard coded credentials.
We see here there's this const secret that we have here, my super 
duper secret key, it is pretty secret, but not secret enough, because 
we have it in our app source. In general, it's not a great idea to 
hard code secrets like this inside of your application code. If you 
were giving up the source, you'd be able to see it. If you were 
giving out even a compiled version, it'd be quite possible to 
reverse engineer the precise value, which means that your secret 
would get leaked, which is really, really bad. 


So what you want to do is in general, it's a better practice to 
use something like environment variables. So we could write 
something like process dot env dot JWT token, 

process.env.JWT_TOKEN

which means that we're 
reading the environment variable JWT token to find the identity of 
the secret, but it's not within the app source itself. This is 
both more secure for the reasons I mentioned earlier, as well as 
it makes it easier to swap out the token if we so need to, for 
instance, if we were to compromise our previous token. So just 
by using something like environment variables, we no longer have 
hard coded credentials. And this is no longer a security vulnerability.

*/
