class TwitchAPI {
  constructor(){
    this.baseUrl = "https://api.twitch.tv/kraken/";
  }

  _setHeaders(){
    this.headers = new Headers({
      "Accept": "application/vnd.twitchtv.v5+json",
      "Authorization": `OAuth ${this.token}`
    });
  }

  setToken(token){
    this.token = token;
    this._setHeaders();
  }

  setUserId(userId){
    this.userId = userId;
  }

  getUserId(){
    return this.userId;
  }

  fetchJson(endpoint){
    return fetch(`${this.baseUrl}${endpoint}`, {headers: this.headers})
      .then((res) => res.json())
  }

  getChannel(){
    return this.fetchJson("channel");
  }

  getStream(userId = this.userId){
    return this.fetchJson(`streams/${userId}`);
  }

  getFollowers(userId = this.userId, limit = 10){
    return this.fetchJson(`channels/${userId}/follows?limit=${limit}`);
  }

  getUserId(username){
    return this.fetchJson(`users?login=${username}`);
  }
}

export default new TwitchAPI();
