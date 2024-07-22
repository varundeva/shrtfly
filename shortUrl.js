const axios = require("axios").default;
/* 
Function to Create Short Url
Accept : longUrl
Returns : Promise with status and Shorted Url
*/
const shortUrl = (longUrl) => {
  // Base Url of shrtfly
  const baseUrl = "https://shrtfly.com/api?";
  //   Response Format - json and text possible values
  const format = "json";

  //   Form the entire url for GET request
  const url = `${baseUrl}api=${process.env.SHRTFLY_KEY}&url=${longUrl}&format=${format}&type=1`;
 
  //  Call the Api to create Short Url using Promise
  return axios.get(url)
    .then((response) => {
      const data = response.data;
     
      // When response is success return the data with shorted Url
      if (data.status === "success") {
        return data;
      } else {
        // Return status failed with message
        return data
      }
    })
    .catch((error) => {
      // Handle error from axios or custom error message
      return Promise.reject({
        status: "error",
        message: error.response ? error.response.data : error.message,
      });
    });
};

module.exports = { shortUrl };
