app.post("/signup", function (req, res) {
  db.users.find(
    {
      username: req.body.username,
    },
    async (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Error" });
      } else if (result.length === 0) {
        
        // insert user
        // await db.users.insert(req.body); | security threat
        await db.users.insert({
          username: String(req.body.username),
          email: String(req.body.email),
          password: encryptPassword(req.body.password),
        });
        return res.status(200);
      } else {
        return res.status(409);
      }
    }
  );
});

/*

JavaScript app that's taking in post requests at a slash sign up endpoint. 
And what we're doing is we're looking in a database of users to find a 
user whose username matches the username given in the request. 
And then what we do is if there's an error, we do some error handling. But 
otherwise, if we don't find that user with that username, then we just 
insert the req dot body as a new user. And then we return success, try to 
figure out why this code is vulnerable. And then we'll come back in a second.




This code is vulnerable because of something called a 

MASS ASSIGNMENT ATTACK

Mass assignment is when user input might be able to set properties on an 
object that it shouldn't be able to. Now, we the reason why this happens 
is because we're looking up usernames by the req dot body dot username. 

But if we don't find it, we insert the entire req dot body object. 

Now, suppose that our database has a few things in it associated to a 
username. It's not just a username, but also let's say 
a password, 
an email 
and an is admin flag. 

Now when we insert the entire req dot body, this 
could potentially be an object that sets this is admin flag that should 
not be able to be set by just anybody, nobody should be able to just make 
themselves an admin. But because we insert the entire req dot body, we 
don't have control over this. And someone could specify all these fields 
together. So what we'll do is instead of inserting the entire req dot body,
we'll make a new object that only sets the things that we know are safe. 
So we'll set username to be string of req dot body dot username, we'll 
set email to be string of req dot body dot email.
And let's also say that we set password to be string of req dot body dot 
password.

await db.users.insert({ 
    username: String(req.body.username), 
    email: String(req.body.email),
    password: String(req.body.password)
})

This is cool, but also it's probably not a good idea for us to 
store the password in our database in plain text. So what we can do also 
is we can do import encrypt password. And supposedly just have this 
./utils/passwords 

thing lying around. And we have this encrypt password method. And the
next thing we'll do is instead of storing the password as a string,
we're just going to call encrypt password on it. 

await db.users.insert({ 
    username: String(req.body.username), 
    email: String(req.body.email),
    password: encryptPassword(req.body.password)
});

This way, we prevent ourselves from the mass assignment attack. But also 
we encrypt the password so that it's not stored in our database in plain 
text.

And just like that, we prevent the security vulnerability.



*/
