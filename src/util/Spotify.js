const clientId = '156d20b13c1c46f7a31717bfdbf78589'
//const redirectURI = 'http://kindly-net.surge.sh'
const redirectURI = 'http://localhost:3000/'


let accessToken

const Spotify = {
	getAccessToken(){
		if(accessToken){
			return accessToken;
		}

		// extracting the accessToken and expiration time from URL
		let expirationTime;
		if(window.location.href.match(/access_token=([^&]*)/)){
			accessToken = window.location.href.match(/access_token=([^&]*)/)[1]
      		expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1]
		}

		/*
			Under correct access Tokken and expiration Time
			setup expiration time AND clear the access token after use
		*/
		
		if(accessToken && expirationTime){
			window.setTimeout(() => accessToken = undefined, expirationTime * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken
		} else{
			return window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
		}

	},


	/*
		this search method accept the user input and
		return the result.
	*/

	search(term){
		return new Promise((resolve, reject) => {

			accessToken = this.getAccessToken()

			fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
				headers:{
					Authorization: `Bearer ${accessToken}`
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
		if(!createdPlaylistName || !trackURIs){
			return;
		} else{
			// Use the access token to access the spotify API
			const url = 'https://api.spotify.com/v1/me';
   			const headers = {
       			Authorization: `Bearer ' ${accessToken}`
   			};

   			let currentUserId
   			let createdPlaylistId
   			fetch(url, {
   				headers: headers
   			})
   			.then(response => response.json())
   			.then(jsonResponse => currentUserId = jsonResponse.id)
   			.then(() => { 
   				fetch(`https://api.spotify.com/v1/users/${currentUserId}/playlists`, {
   					method: 'POST',
   					headers: headers,
   					body: JSON.stringify({
   						name: createdPlaylistName
   					})
   				})
   				.then(response => response.json())
   				.then(jsonResponse => createdPlaylistId = jsonResponse.id)
   				.then(() => {
   					fetch(`https://api.spotify.com/v1/users/${currentUserId}/playlists/${createdPlaylistId}/tracks`, {
   						method: 'POST',
   						headers: headers,
   						body: JSON.stringify({
   							uris: trackURIs
   						})
   					}) 
   					
   				})
   			})

		}
	}



};




export default Spotify;