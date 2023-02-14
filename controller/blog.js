const viewAll = (req, res) => {
    console.log('Tes')
    return res.send({
        msg : 'Welcome'
    })
}

module.exports = {
    viewAll
}