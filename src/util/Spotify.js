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
			accessTokken = window.location.href.match(/access_token=([^&]*)/)[1]
      		expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1]
			return accessTokken;
		}

		/*
			Under correct access Tokken and expiration Time
			setup expiration time AND clear the access token after use
		*/
		
		if(accessTokken && expirationTime){
			window.setTimeout(() => accessTokken = '', expirationTime * 1000);
			window.history.pushState('Access Token', null, '/');
		} else{
			return window.location.href = `https://accounts.spotify.com/authorize?client_id=clientId&response_type=token&scope=playlist-modify-public&redirect_uri=redirectURI`
		}

	},


	/*
		this search method accept the user input and
		return the result.
	*/

	search(term){
		return new Promise((resolve, reject) => {

			accessTokken = this.getAccessToken;

			fetch(`https://api.spotify.com/v1/search?type=track&q=term`, {
				headers:{
					Authorization: `Bearer ${accessTokken}`
				}
			})
			.then(response => response.json())
			.then(jsonResponse => {
				if(!jsonResponse.tracks){
					return [];
				} else {
					return jsonResponse.tracks.items.map(track => {
						return {
							id: track.id,
							name: track.name,
							artist: track.artists[0].name,
							album: track.album.name,
							uri: track.uri
						}
					})
				}
			})

		})
	},


	/*
		This method writes the new creted playlist by jammming app
		to the corresponding spotify account
	*/

	savePlaylist(createdPlaylistName, trackURIs){

	}



}




export default Spotify;