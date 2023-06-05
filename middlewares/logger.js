const logger = (req, res, next) => {
    const { url, ip, method } = req

    console.log(`${new Date().toISOString()} Effettua richiesta ${method} all'endpoint ${url} da indirizzo ${ip}`)

    next()
}

module.exports = logger