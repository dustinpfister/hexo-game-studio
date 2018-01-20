
let fs = require('hexo-fs'),
_ = require('lodash'),
path = require('path');

// copy over what is in the client folder to the public js folder
exports.copyClient = function (hexo) {

    let source = path.join(hexo.base_dir, 'node_modules/hexo-game-studio/client'),
    target = path.join(hexo.public_dir, 'js');

    return fs.copyDir(source, target).then(function () {

        return null;

    }).catch (function (e) {

        return e;

    });

};

exports.copyGames = function (hexo) {

    let source = path.join(hexo.source_dir, '_games'),
    target = path.join(hexo.public_dir, '/games');

    return fs.copyDir(source, target).then(function () {

        return null;

    }).catch (function (e) {

        return e;

    });

};

// get an array of game names, split into a per page count.
exports.getGamesListArray = function (hexo) {

    let games_dir = path.join(hexo.source_dir, '_games');

    return fs.exists(games_dir).then(function (exist) {

        if (!exist) {

            return [[]];

        }

        return fs.readdir(games_dir);

    }).then(function (list) {

        // hard coded only for now.
        let perPage = 4;

        return _.chunk(list, perPage);

    }).catch (function (e) {

        return e;

    });

};
