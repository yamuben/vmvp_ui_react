var axios = require("axios");
var FormData = require("form-data");
var fs = require("fs");
var data = new FormData();
data.append(
  "file",
  fs.createReadStream(
    "/Users/iyamuremyebenjamin/Desktop/Screenshot 2022-03-09 at 23.07.18.png"
  )
);

var config = {
  method: "put",
  url: "localhost:6000/api/v1/students/photo",
  headers: {
    ...data.getHeaders(),
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
