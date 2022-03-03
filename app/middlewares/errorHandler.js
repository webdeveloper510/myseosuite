module.exports =(error, req, res, next) => {
    res.status(error.status).json({
        err : error.message,
        status : error.statusCode
    })
}