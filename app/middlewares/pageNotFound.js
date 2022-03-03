module.exports =(req, res, next) => {
    res.status(404).json({
        err : "Page Not Found",
        status : 404
    })
}