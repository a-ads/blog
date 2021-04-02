---
date: '2018-10-04'
title: Bug bounty program
tags:
  - ''
category: Development
thumbnail: /blog/assets/illustration-3.png
---
The security of our operations is our highest priority for many reasons: we're dealing with our clients’ money, we must protect our partners' privacy, and we have our own reputation at stake. Either you are a professional security researcher or just a beginner, we welcome your security reports. However we'd love them to be useful and actionable, that's why we have certain recommendations in their regard.

  Security report guidelines:

* Please provide the information on how the vulnerability you've discovered might be used both theoretically and practically, what its impact is, and all the pertinent details.
* Please provide the exact steps on how the vulnerability can be exploited and how we can reproduce the issue ourselves. We'd love to see the demonstration of the attack which will not affect our existing users. You may create as many test user accounts as you need.
* Please submit the bug report via our support channels (email or web site widget) but only after you've verified that the bug indeed exists.
* Use whatever language you prefer if you don't feel comfortable writing in English.

We are leaving the monetary reward you'll get for your report to our discretion. The reward will be paid in bitcoins. Please remember that we don't reward for the already known vulnerabilities which are listed below.

Also, if you're a security researcher and you're reading this information we'd like to draw your attention to the fact that our SPF record is indeed valid and we do not deem account deletion a security vulnerability.

We welcome you to help us with finding flaws in our code by clicking “Report a bug” button on the bottom of our website.

## Hall of fame

\- 2021-03-09 Ardyan Vicky Ramadhan reported a bug that allowed to edit other users' unlinked advertisements ($30).

\- 2021-02-16 Ardyan Vicky Ramadhan reported a bug that allowed to edit other users' campaigns ($300).

\- 2021-01-08 Ardyan Vicky Ramadhan reported that we don't rate limit certain actions which could be performed by the user ($50).

\- 2021-01-08 Ardyan Vicky Ramadhan reported a Ticket Trick vulnerability ($50).

\- 2020-11-23 Ardyan Vicky Ramadhan reported a Formula/CSV injection vulnerability which could only exploited if the attacker gains unauthorized access to our advertisers ($50). This attack is difficult to mitigate, and explicitly [disallowed](https://owasp.org/www-community/attacks/CSV_Injection) from quite a few bug bounty programs.

\- 2020-10-02 Ardyan Vicky Ramadhan re-reported a tab open vulnerability first discovered two years prior ($25). It resurfaced after a major website redesign. We've adjusted our development guidelines to avoid it in the future.

\- 2020-09-01 Shiraz Ali Khan reported a minor configuration issue with our email server DNS record ($20).

\- 2020-03-27 Abir Khan Hridoy reported a possible DoS vulnerability in the user email confirmation routine ($25).

\- 2019-10-24 Agung Saputra (r00t-geek) found out that some of our servers are directly exposed to the Internet ($20).

\- 2018-05-06  Ch Chakradhar (Spi3er) reported a catalog CSRF vulnerability ($30).

\- 2018-03-02 Waqar Vicky reported a number of issues and received a $100 bounty:

* Password reset requests are not rate limited and can be used to perform a DoS attack
* Our jQuery library is outdated and might be insecure
* We allow extremely weak password at user registration
* After logging off you can use a web browser back button to see previously opened web pages
* After changing an email address _or_ password other open sessions and existing password reset tokens are not invalidated

\- 2017-12-10 Anonymous researcher reported a session termination vulnerability and earned $50.

\- 2017-11-22 Anonymous researcher reported a self XSS protection vulnerability - we don't consider it to be our vulnerability, but we may take measures to mitigate it in the future.

\- 2017-11-22 Anonymous researcher reported a tab open vulnerability and earned ~$100.

\- 2017-11-22 Anonymous researcher reported an SSL cookie vulnerability (investigating).

\- 2017-11-21 Anonymous researcher reported a minor issue related to the email change and earned a reward of ~$30.

\- 2017-11-16 Ch Chakradhar (Spi3er) reported a minor issue which made it possible to check the existence of a user by email and earned a reward of ~$30.

\- 2017-11-08 Anonymous researcher reported a vulnerability which gave him access to our staging database and to a third-party server which we used for monitoring and control. Thus he earned a reward of ~$500.

\- 2017-11-05 Ankit Bharathan reported a low-impact XSS issue in ad preview page and earned a reward of ~$50.

\- 2017-07-04 Jens Mueller (@jensvoid) responsibly reported a CORS misconfiguration vulnerability and earned a reward of ~$240.

## Known and other issues we won't reward for

\- Security headers-related issues (unless there is a way to exploit them)

\- We send plaintext passwords to our users via email.

\- Most of the information about our publishers' sites and advertisers' campaigns is public.

\- Some IPs of our servers are exposed to the internet.

\- There is a way to terminate a browser session of another user.

\- Ticket Trick vulnerability.
