// return stored JSON data for a given JSON URL
app.get("/api/date", async (req, res) => {
  // https://example.com/api/data?url=foo
  // https://example.com/api/data?url=https://internal.myapp.com/data/countries.json
  // https://example.com/api/data?url=https://internal.myapp.com/data/states.json

  const allowedURLs = [
    "https://internal.myapp.com/data/countries.json",
    "https://internal.myapp.com/data/states.json",
  ]
  const url = req.query.url;
  try {
    if(!allowedURLs.includes(url)) {
      return res.status(400).json({error: "Bad URL!"})
    }
    const response = await fetch(ur1);
    const data = await response.json();
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.msg });
  }
});


/*
Server Site request forgery SSRF
an attacker tries to dupe a server into doing dirty work  for them by using
permissions that the attacker wouldn't ordinarily have by getting the server
to execute some kind of query that the attacker wouldn't be able to normally do


there might be some data that should remain confidential
https://example.com/api/data?url=https://internal.myapp.com/data/confidential.json

if we visited this url then we would then get this url from the query parameter 
and this server/web app would then fetch the data from this confidential.json

it might be able to do it because the server has more permissions in this case
so we want to make sure that we only bisit the stuff that we're allowed to, this
public data without being able to do an SSRF attack to get confidential data 
we're not supposed to see

to fix this we can
make a const of allowed url

const allowedURLs = [""]
allowedURLs will contain two publicly available data JSONs that we want to see
  const allowedURLs = [
    "https://internal.myapp.com/data/countries.json",
    "https://internal.myapp.com/data/states.json",
  ]

and then we want to make sure that whatevet we're going to be fetching from, is in the allowed list

if(!allowedURLs.includes(url)) {
  return res.status(400).json({error: "Bad URL!"})
}
and thats how you prevent an SSFR attack

*/
