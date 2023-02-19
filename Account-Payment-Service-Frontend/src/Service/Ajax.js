import EventHandler from "../EventHandler";

const Ajax = async (url, requestMethod, requestBody) => {
  const fetchData = {
    method: requestMethod,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  if (requestBody) {
    fetchData.body = JSON.stringify(requestBody);
    console.log(fetchData.body);
  }

  return fetch(url, fetchData).then(
    (response) =>
      new Promise((resolve, reject) => {
        // Status of response is from 200 to 299
        if (response.ok) {
          resolve(response.json());
        }
        reject(response);
      })
  );
};

const handleError = (response) => {
  let message = "";
  response.json().then((errText) => {
    message = `${errText.error}. ${errText.message}`;
    console.log(message);
    
    EventHandler.dispatch("error", message);
    if (response.status === 401) {
      EventHandler.dispatch("logout");
    }
  });
};

export { Ajax, handleError };
