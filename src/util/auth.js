const serverURL = "http://localhost:8080";

export function isLoggedIn(token) {
  return fetch(serverURL + "/login", { method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }});
};
