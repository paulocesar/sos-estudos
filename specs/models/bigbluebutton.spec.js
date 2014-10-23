var _ = require('lodash')
  , BigBlueButton = require('bigbluebutton')
  , config = require('../../config').bbb
  , bbb = new BigBlueButton(config.url, config.secret);

describe('User', function () {
    it('creates a room', function (done) {
        bbb.requestQ({
          action: 'create',
          params: {
            meetingID: 'nodesample3331',
            meetingName: 'Node Sample',
            moderatorPW: 'exemplo123asd'
          },
          body: {
            modules: {
              module: [
                {
                  name:'presentation',
                  document:{url:'http://www.tcpdf.org/examples/example_001.pdf'}
                }
              ]
            }
          }
        })
        .then(function (r) {
            var link = bbb.link({
                action: 'join',
                params: {
                    fullName: 'Paulo',
                    meetingID: 'nodesample3331',
                    password: 'exemplo123asd'
                }
            });

            console.log('test meeting: ', link);
            done();
        })
        .fail(done);
    });
});