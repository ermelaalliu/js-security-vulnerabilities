import crypto from "crypto";

export function checkToken(userSupplied) {
  const account = account.retrieveToken(userSupplied);
  if (account) {
    if ( crypto.timingSafeEqual(account.service.token === user.service.tolen) ) {
      return true;
    }
  }

  return false;
}

/* 
user supplied information specifying some kind of account.
we want to check whether or not the user supplied information
has some kind of secret token that matches the account's secret
token that's on record

and we're going to use tripple equals and return true if it's true
otherwise we'll return false

TIMING ATTACK
javascript when comparing two strings the tripple equals function 
is going to just iterate through each character and compare them.
and if they don't match, it'll just return false

suppose that the account secret token was like 
abc 
then if the token that we supply is like d
we compare a with d and return false

what if we supply ae
it would compare a and a and they are the same
then it would compare b and e and it would return false

if you pay attention it takes a bit longeer to returning false in 
the second case because the prefix, a and a were the same

that means that if  malevolent attacker was sitting around with 
their stopwatch going and they had all the time in the world, they 
would brute force a bunch of strings to try and see which strings 
take a little bit longer than others, at which point it would 
figure out that it was getting closer and closer to the real 
token that it wouldn't otherwise know. 

a timing attack.

we want to make sure we don't give away information about the 
token based on how fast we return false

we'll import crypto from a crypto package

import crypto from "crypto";
and instead of using triple equals, we're going to use a crypto 
equality function that is a little less transparent about the timing.
so this crypto timing safe qqual function is going to be the same 
as our tripple equals, but it'll be better about not giving away how 
similar the inputs were





*/
