const authProvider = {
    // when a user tries to log in 
    login: ({ username, password }) => {
        if(username === 'akash123@gmail.com' && password === 'akash123'){
            localStorage.setItem('username', username);
            return Promise.resolve();
        }
        else{
            return Promise.reject();
        }
    },
    // when a user tries to logout
    logout: () => {
        localStorage.removeItem('username');
     return Promise.resolve();
    },
    // when the API throws an error
    checkError: ({ status }) => {
     if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject()
     }
     return Promise.resolve()
    },
    // when a user navigates to a new location
    checkAuth: () => {
     return localStorage.getItem('username') ?
      Promise.resolve() :
      Promise.reject({message: 'Not Authenticated! Please Login'});
    },
    getIdentity: () => {
     try {
      const username = localStorage.getItem('username');
      const fullName = 'Akash';
      const avatar = 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png';
        return Promise.resolve({ username, fullName, avatar });
     } catch (error) {
      return Promise.reject(error);
     }
    },
    // called when the user navigates to a new location
    getPermissions: () => Promise.resolve(),

};

export default authProvider;