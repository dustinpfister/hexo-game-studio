console.log('game studio!');

let api = require('./lib/api.js'),
_ = require('lodash');

api.copyClient(hexo).then(function () {

    console.log('Copyed over client system files.');

}).catch (function (e) {

    console.log(e);

});

// gen game pages
hexo.extend.generator.register('game-run-pages', function (locals) {

    return api.getGamesListArray(hexo).then(function (list) {

        let pages = [];

        // for each page
        list.forEach(function (games, i) {

            // for each game
            games.forEach(function (game) {

                pages.push({

                    path: 'games/' + game + '/index.html',
                    data: _.merge({}, locals, {

                        game: {

                            name: game

                        }

                    }),
                    layout: 'game_run'

                });

            });

        });

        return pages;

    });

});

// gen index
hexo.extend.generator.register('game-studio-index', function (locals) {

    return api.getGamesListArray(hexo).then(function (list) {

        let pages = [];

        list.forEach(function (games, i) {

            let fn = 'index';

            if (i > 0) {

                fn = 'page' + i

            }

            pages.push({

                path: 'games/' + fn + '.html',
                data: _.merge({}, locals, {

                    games: games

                }),
                layout: 'game_main'

            });

        });

        return pages

    }).catch (function (e) {

        console.log('error generating games index:');
        console.log(e);

        return [];

    });

    /*
    return [{
    path: 'games/index.html',
    data: 'foo'
    }, {
    path: 'games/page1.html',
    data: 'bar'
    }

    ];
     */

});