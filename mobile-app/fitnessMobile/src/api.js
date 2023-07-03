export class Api {
    constructor() {
        this.serverUrl = 'http://192.168.1.118:3000';
    }

    register(user, callback) {
        this.post('/register', user, callback)
    }

    login(user, callback) {
        this.post('/login', user, callback)
    }

    getPrograms(token, callback) {
        this.get('/program/all', token, callback)
    }

    getProgramEnroll(token, callback) {
        this.get(`/program/`, token, callback)

    }

    postProgramEnroll(token, id, callback) {
        this.postNoBody(`/program/${id}/enroll`, token, callback)
    }

    getAccount(token, callback) {
        this.get('/account', token, callback)
    }

    updateAccount(token, user, callback) {
        console.log("Data", user)
        fetch(this.serverUrl + '/account', {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(result => callback(result))
        
    }

 

    get(path, token, callback) {
        fetch(this.serverUrl + path, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(result => callback(result))
        .catch(error => callback(error))
    }

    post(path, body, callback) {
        fetch(this.serverUrl + path, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
        .then(result => callback(result))
        .catch(error => callback(error))

    }

    postNoBody(path, token, callback) {
        console.log(path)
        fetch(this.serverUrl + path, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        }).then(response => response.json())
        .then(result => callback(result))
        .catch(error => callback(error))
    }
}