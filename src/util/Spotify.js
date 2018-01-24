const clientId = '156d20b13c1c46f7a31717bfdbf78589'
const redirectURI = 'http://localhost:3000/'

let accessTokken

let Spotify = {
	getAccessToken(){
		if(accessTokken){
			return accessTokken;
		}

		// extracting the accessTokken and expiration time from URL
		let expirationTime;
		if(window.location.href.match(/access_token=([^&])/)){
			accessToken = window.location.href.match(/access_token=([^&]*)/)[1]
      		expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1]
			return accessTokken;
		}

		/*
			Under correct access Tokken and expiration Time
			setup expiration time AND clear the access token after use
		*/
		
		if(accessTokken && expirationTime){
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		}

		return window.location.href = 'https://accounts.spotify.com/authorize?client_id=clientId&response_type=token&scope=playlist-modify-public&redirect_uri=redirectURI'
	},

	
}




export default Spotify;