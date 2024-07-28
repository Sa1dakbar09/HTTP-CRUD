const http = require('http');
const { createEm, getEm, deleteEM, uptadeEm } = require('./myModule/myModule');

const App = http.createServer(function (req, res) {
    const user_id = req.url.split('/')[2];
    const car_id = req.url.split('/')[2];
    const animal_id = req.url.split('/')[2];
    if (req.url == '/') {
        res.end('Cannot get here /')
    }
    else if (req.method == 'GET') {
        if (req.url == '/users') {
            getEm(res, 'users')
        } else if (req.url == '/cars') {
            getEm(res, 'cars')
        } else if (req.url == '/animals') {
            getEm(res, 'animals')
        } else {
            res.end('404, other thing not found')
        }
    }
    else if (req.method == 'POST') {
        if (req.url == '/create_users') {
            createEm(req, res, 'users')
        } else if (req.url == '/create_cars') {
            createEm(req, res, 'cars')
        } else if (req.url == '/create_animals') {
            createEm(req, res, 'animals')
        } else {
            res.end('404, other thing not found')
        }
    }
    else if (req.method == 'DELETE') {
        if (req.url == `/delete_users/${user_id}`) {
            const what = req.url.split('/')[1].split('_')[1]
            deleteEM(res, user_id, what)
        } else if (req.url === `/delete_cars/${car_id}`) {
            const what = req.url.split('/')[1].split('_')[1]
            deleteEM(res, car_id, what)
        } else if (req.url === `/delete_animals/${animal_id}`) {
            const what = req.url.split('/')[1].split('_')[1]
            deleteEM(res, animal_id, what)
        } else {
            res.end('404, other thing not found')
        }
    }
    else if (req.method == "PUT") {
        if (req.url == `/update_users/${user_id}`) {
            const what = req.url.split('/')[1].split('_')[1]
            uptadeEm(req, res, user_id, what);
        } else if (req.url == `/update_cars/${car_id}`) {
            const what = req.url.split('/')[1].split('_')[1]
            uptadeEm(req, res, car_id, what);
        } else if (req.url == `/update_animals/${animal_id}`) {
            const what = req.url.split('/')[1].split('_')[1]
            uptadeEm(req, res, animal_id, what);
        } else {
            res.end('404, other thing not found')
        }
    }
    else {
        res.end('404 not found')
    }
})

App.listen(8080, () => {
    console.log('Server is working on 8080 port !!');
})
    ;