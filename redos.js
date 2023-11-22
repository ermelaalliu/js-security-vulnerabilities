// Assume the RegEx validates correctly

// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g; | security threat
const validator = require('validator');

app.post("/validateEmail", (req, res) => {
  const email = req.body.email;
  if ( !email || !validator.isEmail(email) ) {
    return res.status(400).send({ error: "Invalid email" });
  }
  return req.status(200).send({ valid: true });
});

/*

We've got an app taking in post requests at slash validate email. 
Now, what we've got here is assume that this regex is a gigantically, 
incredibly complex regex that happens to validate emails. And what we're 
doing is we're taking in this rec.body.email in the request, and we're 
checking for whether or not it passes against this regular expression. 
If it doesn't, then we'll say invalid email and complain, and otherwise, 
we'll send back valid as true.

So this code is unsecure because of an attack called a 
redos attack, 
or 
REGULAR EXPRESSION DENIAL OF SERVICE
What this means is that this 
regular expression is really complicated. Don't worry too much about 
what it does, but it might take a really long time to validate certain 
inputs because the regular expression has to try out a bunch of options. 
It might take a very long time, depending on what the input that is being 
fed into it is. And because the input is under the control of the person 
making the request, this is not within our control and could potentially 
be crafted by some malicious attacker leading to denial of service,
because we might hang on certain inputs. So instead of rolling your own 
regular expression and doing this whole thing, what we can instead do 
is we could say we could use this validator library, which is very
efficient.



And then what we'll do instead is of instead of using this email regex 
test, we're going to say, if not validator dot is email, which is a 
function that already exists. And then this way, we can test for 
whether or not it adheres to the email structure, both without needing 
to roll our own regex, and also while ensuring that we can do so 
relatively efficiently and prevent these denial of service attacks. 

*/
