const clientId = '156d20b13c1c46f7a31717bfdbf78589'
//const redirectURI = 'http://miniature-pet.surge.sh'
const redirectURI = 'http://localhost:3000/'
const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
const UserURL = 'https://api.spotify.com/v1/me';



let accessToken = undefined
let expirationTime = undefined

const Spotify = {
	getAccessToken(){
		if(accessToken){
			return accessToken;
		} else {

			const accessTokenGetFromUrl =  window.location.href.match(/access_token=([^&]*)/);
      		const expirationTimeGetFromUrl = window.location.href.match(/expires_in=([^&]*)/);
			
			/*
				Under correct access Tokken and expiration Time
				setup expiration time AND clear the access token after use
			*/
			
			if(accessTokenGetFromUrl && expirationTimeGetFromUrl){
				accessToken = accessTokenGetFromUrl[1]
				expirationTime = expirationTimeGetFromUrl[1]
				window.setTimeout(() => accessToken = '', expirationTime * 1000);
				window.history.pushState('Access Token', null, '/');
				return accessToken;
			} else {
				window.location = spotifyURL
			}
		}

	},


	/*
		this search method accept the user input and
		return the result.
	*/

	search(term){
		const accessToken = Spotify.getAccessToken();
    	return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      		headers: {
        		Authorization: `Bearer ${accessToken}`
      			}
    		}).then(response => {
      		return response.json();
    		}).then(jsonResponse => {
      		if (!jsonResponse.tracks) {
        		return [];
      		}
      		return jsonResponse.tracks.items.map(track => ({
		        id: track.id,
		        name: track.name,
		        artist: track.artists[0].name,
		        album: track.album.name,
		        uri: track.uri
      		}));
    	});
	},


	/*
		This method writes the new creted playlist by jammming app
		to the corresponding spotify account
	*/

	savePlaylist(createdPlaylistName, trackURIs){
		if(!createdPlaylistName || !trackURIs || trackURIs.length === 0){
			return;
		} else{
			// Use the access token to access the spotify API
   			const headers = {
       			Authorization: `Bearer  ${accessToken}`
   			};

   			let currentUserId, createdPlaylistId = {
   				Authorization: `Bearer  ${accessToken}`
   			}

   			// GET current user's ID
   			fetch(UserURL, {
   				headers: headers
   			})
   			.then(response => {
   				if(response.ok){
   					return response.json()
   				} else {
   					throw new Error('Get request for user ID is failed')
   				}
   			})
   			.then(jsonResponse => currentUserId = jsonResponse.id)
   			// POST request to create the playlist
   			.then(() => { 
   				fetch(`https://api.spotify.com/v1/users/${currentUserId}/playlists`, {
   					method: 'POST',
   					headers: headers,
   					body: JSON.stringify({
   						name: createdPlaylistName
   					})
   				})
   				.then(response => {
   					if(response.ok){
   						return response.json()
   					} else {
   						throw new Error('POST request to create playlist is failed')
   					}
   				})
   				.then(jsonResponse => createdPlaylistId = jsonResponse.id)
   				//POST request to save the playlist to the user's account
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



