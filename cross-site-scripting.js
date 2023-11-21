import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

export default function Root() {
  return (
    <Router>
      <QueryParamsDemo />
    </Router>
  );
}
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

// a query parameter
// https://example.com/settings?redirect=foo the good way
// https://example.com/settings?redirect=https://example 

/*

JAVASCRIPT PROTOCOL ATTACK
CROSS SITE SCRIPTING
cross site scripting is when a malicious attacker tries to get code to execute on your machine through your browser

they make a script to run cross site

JavaScript protocol - means that when you visit a URL that looks like javascript://
everything after the // is interpreted as javascript code and executed within your browser

example:
javascript://doSomethingBad()
if we visited the url it would try to execute the doSomethingBad() function with potentially could be unsafe because it could execute arbitrary code

if we were to write 
https://example.com/settings?redirect=javascript://doSomethingBad()

someone might give us a malicous link that could execute arbitrary code on our machine. a cross site scripting attack ----- XSS attack -----

-------------------------------------------------------------------------------------------------------------------------------------------------------------
---- theory
solutions to minimize the XSS attacks when fetching and displaying HTML content form external sources
1. Implement Content Security Policy (CSP) headers on your website.
2. Validate and Sanitize Content
3. When rendering HTML content on your website, encode the content appropriately to prevent the browser from interpreting it as executable code. 
4. Be cautious when fetching content from external sources. Keep your systems and plugins/modules up-to-date to benefit from the latest security patches.
-------------------------------------------------------------------------------------------------------------------------------------------------------------


in this specific case we need to sanitize the url
we want to know what protocol the url has. if its a javascript protocol thats pretty unsafe but
in particular https is ok.


*/
function QueryParamsDemo() {
  let query = useQuery();

  function validateURL(url){
    const userSuppliedUrl = new URL(url);
    if (userSuppliedUrl.protocol === "https:"){
        return url;
    }
    return "/";
  }

  return (
    <div>
      <h2>Return Home</h2>
      <a href={validateURL(query.get("redirects"))}>Click to go home</a>
    </div>
  );
}
