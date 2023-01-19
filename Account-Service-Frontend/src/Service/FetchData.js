const fetchData = async (url, requestMethod, requestBody) => {
  const fetchData = {
    headers: { "Content-Type": "application/json" },
    method: requestMethod,
  };
  if (requestBody) {
    fetchData.body = JSON.stringify(requestBody);
  }

  return fetch(url, fetchData).then(
    (response) =>
      new Promise((resolve, reject) => {
        // Status of response is from 200 to 299
        if (response.ok) {
          resolve(response);
        }
        reject(response);
      })
  );
};

const handleStatus = (response) =>
  new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response);
    }
    reject(response);
  });

export default fetchData;
