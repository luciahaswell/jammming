const clientId = "32d908c419b943c989da68b6a42c0933";
const redirectUri = 'http://localhost:3000';
let accessToken = ""; 


const Spotify = {

  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn){
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);
      window.setTimeout(()=>(accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      const redirect = `http://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = redirect;
    }
  },

  async search(term){
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return (jsonResponse.tracks.items.map(tracks => ({
      id: tracks.id,
      name: tracks.name,
      artist: tracks.artists[0].name,
      album: tracks.album.name,
      uri: tracks.uri
    })));
  },

  createPlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return Promise.reject("Invalid playlist name or empty track list");
    }
  
    const accessToken = Spotify.getAccessToken();
    let userId;
  
    return fetch(`https://api.spotify.com/v1/me`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(response => response.json())
      .then(jsonResponse => {
        console.log('User response:', jsonResponse);
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: 'POST',
          body: JSON.stringify({ name: playlistName })
        });
      })
      .then(response => response.json())
      .then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: 'POST',
          body: JSON.stringify({ uris: trackUris })
        });
      })
      .then(response => response.json());
  }
};

  export default Spotify;
  
