## shrtfly - Url Shortner [Unofficial Package]
<!-- Start of banner code -->
<a href="https://shrtfly.com/ref/freesv"><img src="https://shrtfly.com/referral/728x90.gif" title="Make short links and earn the biggest money" /></a>
<!-- End of banner code -->

# What's the .env variables?
  - Two .env required, one is optional
  - You can also refer [.env Example](https://github.com/varundeva/shrtfly/blob/main/.env-example)
  ```
  SHRTFLY_KEY=YOUR_API_KEY
  //This must be added in shrtfly.com account
  SHRTFLY_ALIAS=youralias.com
  ```
  - You can create api key at [Shrtfly - URL Shortner](https://shrtfly.com/ref/freesv)        
# How to Use?
  - Install package using Inline `npm i shrtfly`
  - Import package `import {shortUrl} from "shrtfly"`
  - Use it Like 
    ```
    const longUrl = 'http://yourdomain.com'
    const url = shortUrl(longUrl)
    ```
  - Done

# To-do
  - Ad preferences
  - Your custom alias -> Mainstream is default now.
     - Mainstream: 1
     - Adult: 2
  - Response format -> JSON/TEXT. Currently, JSON is the default. 
