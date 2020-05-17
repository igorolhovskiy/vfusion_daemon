module.exports = module => {
    return function() {
        let args = [module.filename].concat([].slice.call(arguments));
        console.log.apply(console, args)
    }
}