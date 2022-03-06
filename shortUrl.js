const axios = require("axios").default;

/* 
Function to Create Short Url
Accept : longUrl
Returns : Object with status and Shorted Url
*/
const shortUrl = async (longUrl) => {
  // Base Url of shrtfly
  const baseUrl = "https://shrtfly.com/api?";
  //   Response Format - json and text possible values
  const format = "json";
  //   Alias Url. Mention this in .env if your shrtfly have alias domain
  const alias = process.env.SHRTFLY_ALIAS;

  //   Form the entire url for GET request
  const url = `${baseUrl}api=${process.env.SHRTFLY_KEY}&url=${longUrl}&format=${format}&alias=${alias}`;

  //  Call the Api to create Short Url
  const { data } = await axios.get(url);

  //   When response is success return the data with shorted Url
  if (data.status === "success") {
    return data;
  } else {
    //   Return status failed with message
    return {
      status: "failed",
      message: "Failed to Create Shorten Url",
    };
  }
};

module.exports = { shortUrl };
