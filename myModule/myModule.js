const { reader_files, writer_files, Headers } = require('../fs/fs');
const { v4 } = require('uuid')

function getEm(res, url) {
    Headers(res)
    const list = reader_files(url);
    return res.end(JSON.stringify(list))
}

function createEm(req, res, what) {
    req.on('data', (chunk) => {
        const data = JSON.parse(chunk);
        const list = reader_files(what);
        list.push({
            id: v4(), ...data
        })
        writer_files(what, list);
        Headers(res);
        return res.end(
            JSON.stringify([
                what + ' is created !'
            ]))
    })
}

function anyFindIndex(arr, id) {
    var itemIndex = null;
    try {
        itemIndex = arr.findIndex(function (item) {
            return item.id == id
        })
    } catch (err) {
        itemIndex = -1
    }
    return itemIndex
}

function deleteEM(res, id, what) {
    const list = reader_files(what);
    itemIndex = anyFindIndex(list, id)
    if (itemIndex == -1) {
        res.end(JSON.stringify([`There is no such ${what} !!`]))
    } else {
        list.splice(itemIndex, 1)
        writer_files(what, list);
        Headers(res);
        return res.end(JSON.stringify([
            what + ' is deleted'
        ]))
    }
}

function uptadeEm(req, res, id, what) {
    req.on('data', (chunk) => {
        if (what == 'users') {
            const { name, age, job } = JSON.parse(chunk);
            const list = reader_files(what);
            const itemIndex = anyFindIndex(list, id);
            if (itemIndex == -1) {
                return res.end(JSON.stringify([`There is no such ${what}`]))
            } else {
                list[itemIndex].name = name ? name : list[itemIndex].name;
                list[itemIndex].age = age ? age : list[itemIndex].age;
                list[itemIndex].job = job ? job : list[itemIndex].job;
                writer_files(what, list);
                Headers(res);
                return res.end(JSON.stringify([what + ' is updated !']))
            }
        } else if (what == 'cars') {
            const { brend, year, price } = JSON.parse(chunk);
            const list = reader_files(what);
            const itemIndex = anyFindIndex(list, id);
            if (itemIndex == -1) {
                return res.end(JSON.stringify([`There is no such ${what}`]))
            } else {
                list[itemIndex].brend = brend ? brend : list[itemIndex].brend;
                list[itemIndex].year = year ? year : list[itemIndex].year;
                list[itemIndex].price = price ? price : list[itemIndex].price;
                writer_files(what, list);
                Headers(res);
                return res.end(JSON.stringify([what + ' is updated !']))
            }
        } else if (what == 'animals') {
            const { name, age, price } = JSON.parse(chunk);
            const list = reader_files(what);
            const itemIndex = anyFindIndex(list, id);
            if (itemIndex == -1) {
                return res.end(JSON.stringify([`There is no such ${what}`]))
            } else {
                list[itemIndex].name = name ? name : list[itemIndex].name;
                list[itemIndex].age = age ? age : list[itemIndex].age;
                list[itemIndex].price = price ? price : list[itemIndex].price;
                writer_files(what, list);
                Headers(res);
                return res.end(JSON.stringify([what + ' is updated !']))
            }
        }
    })
}

module.exports = { getEm, createEm, deleteEM, anyFindIndex, uptadeEm }