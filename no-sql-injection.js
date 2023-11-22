// Get user info from username
app.post("/user", (req, res) => {
  // asume the user is authenticated
  // ..

  // { "$ne": null }
  // not equal to null 

  if ( typeof req.body.username !== 'string' ) {
    return res.status(400).json({ message: "Invalid username" });
  }

  db.collection("users").find(
    {
      username: req.body.username,
    },
    (err, result) => {
      if (err || !result) {
        return res
          .status(500)
          .send({ message: "There was an error finding user" });
      } else {
        res.status(200).send(result);
      }
    }
  );
});


/*
a simple app that's taking a post request from slash user. 
looking inside of a database of users to try and find users whose username 
matches the thing that's in the request.

if we find it then we just send it back. otherwise, we're going to send 
an error message.


this is vulnerable due to
No SQL injection which is basically like a SQL injection, but not limited 
to just SQL queries. 
In this case the user could possibly enter a query that could allow them 
to access things that they shouldn't.

in particular what's happening is we're finding every entry, every document 
in our users that has this username matching rec.body.username. But it's 
not guaranteed that rec.body.username needs to be a string. In fact, what 
it might be is it might be this object here when we have $ne to null. And 
what this means is this is a special MongoDB operator, where $ne means not 
equal, not equal to null. 

In essence, if we were to try and find with this 

{ "$ne": null }

query instead, we would find every single instance of a user in our 
database that had a username where the username was set. This is really 
bad, because we're not just finding the username, we're finding things by 
the username, but finding all the data associated to it within our database. 
That means that this username could be paired with all sorts of sensitive 
data, like credit card number, like social security number, like date of 
birth, stuff that we're not supposed to see. 

So what we want to do is make sure that someone can't abuse this database 
by putting in some malformed query, something that's not a string, 
essentially. So what we can do is 

if (typeof req.body.username !== 'string') {
  return res.status(400).json({message: "Invalid Username!"})
}

and we can case some other that's not string. And if it's not a string, 
then it could be one of this MongoDB operator stuff that causes them to 
scrape data that they shouldn't be able to see,  in which case, what we'll 
do is we'll return the status 400 on them, and then we'll say, we'll 
return a message that says, this is a bad username or an invalid username. 

This way, people can't access stuff that they don't want, and we're only 
constraining requests that are actually usernames that they want to look 
up. 

This way, we prevent the NoSQL injection attack. 


*/
