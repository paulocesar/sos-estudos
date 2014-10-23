var J = require('joi'),
    _ = require('lodash'),
    C = require('../requires').C,
    email = require('../requires').email,
    Controller = require('../requires').Controller;

var generateSiteController = function (view) {
    return {
        handler: function (request, reply) {
            reply.view('site/' + view, {message: ''});
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
        config: C()
            .payload({
                nome: J.string(),
                email: J.string(),
                telefone: J.string(),
                cidade: J.string(),
                uf: J.string(),
                mensagem: J.string()
            })
            .done(),

        handler: function (request, reply) {
            var html = "<html>";

            _.each(request.payload, function (content, name) {
                html += '<p><b>' + name + ':</b> ' + content + '</p>';
            });

            html += '</html>';

            var promise = email
                .sendEmailQ('pauloc062@gmail.com', 'Contato', html, html)
                .then(function () {
                    return {message: "Enviado com successo!"};
                });

            this.renderQ(reply, 'site/contatos', promise);
        }
    }
});
