var J = require('joi'),
    Controller = require('../requires').Controller;

var generateSiteController = function (view) {
    return {
        handler: function (request, reply) {
            reply.view('site/' + view);
        }
    }
}

module.exports = new Controller({
    name: 'site',
    get_index: generateSiteController('index'),
    get_empresa: generateSiteController('empresa'),
    get_contatos: generateSiteController('contatos'),
    get_depoimentos: generateSiteController('depoimentos'),
    get_faq: generateSiteController('faq'),
    get_equipe: generateSiteController('equipe'),
    get_missao: generateSiteController('missao'),
    get_professores: generateSiteController('professores'),
    get_trabalheconosco: generateSiteController('trabalheconosco'),

    post_emailcontact: {
        config: {
            validate: {
                params: {}
            }
        },

        handler: function (request, reply) {
            reply.view('');
        }
    }
});
