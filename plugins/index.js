class PluginController {
    constructor (p) {
        this.plugins = p;

        this.handler = (req, res, next) => {
            this.plugins.forEach((plugin) => {
                plugin.Handler(req, res, next);
            })
        }
    }

    
}

module.exports = PluginController;