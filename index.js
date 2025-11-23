const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/ords/a01068083/iot/:endpoint", async (req, res) => {
  try {
    const endpoint = req.params.endpoint; 
    const query = req.url.split("?")[1] || "";
    
    const apexURL =
      "https://oracleapex.com/ords/a01068083/iot/" +
      endpoint +
      (query ? "?" + query : "");

    console.log("Forwarding to:", apexURL);

    const response = await fetch(apexURL);
    const body = await response.text();

    res.status(response.status).send(body);
  } catch (error) {
    console.error(error);
    res.status(500).send("Proxy error: " + error.toString());
  }
});

app.get("/", (req, res) => {
  res.send("Paulo IoT Proxy Running 🚀");
});

app.listen(10000, () => console.log("Proxy running"));
