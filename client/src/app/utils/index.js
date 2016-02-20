module.exports = {
    now: function () {
        if (Date.now) {
            return Date.now();
        } else {
            return new Date().getTime();
        }
    }
};