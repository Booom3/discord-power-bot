const apiUrl = '/api'

export const getGuilds = async() => {
    return (await fetch([apiUrl, 'guilds'].join('/'))).json();
}
