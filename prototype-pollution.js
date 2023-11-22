const SOMEOBJECT = {};

app.get("/validateToken", (req, res) => {
  if (req.header("token")) {
    const token = Buffer.from(req.header("token"), "base64");
    // if (SOMEOBJECT[token] && token) { | security threat
    if (SOMEOBJECT.hasOwnProperty(token) && token) {
      return res.send("true");
    }
  }
  return res.send("false");
});

/*


we have a validate token function and it's taking an HTTP request. 

we're checking the header at key of token and we're going to pass it into
this Buffer.from function which decodes it form this basic C4 encoding.
And then what we're going to do is 
we also have the SOMEOBJECT which is empty.
We want to check whether or not this token that we pass into the 
server is a member of this sum object. But right now its empty so it 
should always be false
If it were to be in it, it would send true but because it's empty, we 
should always send false in this case.



But there's a vulnerability where we can get it to sometimes send true.

PROTOTYPE POLLUTION in JavaScript

The idea is that javascript is prototype based. every object has a 
prototype, which is a parent class that it inherits its methods from.
If index in with a 

"__proto__"

it will try and fetch that prototype object for you. And even though the 
SOMEOBJECT is empty, it does have a prototype because every object has 
a prototype because every object has a prototype. so if you manage to
pass in the "__proto__", what will happen is that this SOMEOBJECT 
indexed into it is going to fetch that prototype object, it'll end 
together with the proto string. And then because those are truthy, this
if will actually evaluate to true, and then we'll send true, even though
it should have been false, even because we should have been looking for
the token object, and the token in the object is empty so it shouldn't 
have had the token.

to protect against this


we want to make sure that instead of indexing in with SOMEOBJECT.token 
we want to make sure that only look at the properties of the object in 
question.

We can do that using hasOwn property function. So we use this method, 
we pass in the token and then istead of even if we were to pass in 
__proto__ string it's not going to go and fetch the proto. its going 
to go and check that property exists in the object. And because the 
object is empty, this will never evaluate to true and then we'll 
never send true. 

SOMEOBJECT.hasOwnProperty(token)

Thats how you prevent a prototype pollution attack

*/
