class Plugin {
    constructor (name="Plugin-Test") {
        this.Handler = (req, res, next) => {};

        this.Name = name;

        this.Datasets = {};
    }
}

module.exports = Plugin;