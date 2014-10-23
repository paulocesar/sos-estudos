var _ = require('lodash')
  , Bbb = require('bigbluebutton')
  , config = require('../../config')
  , bbb = new Bbb(config.bbb.url, config.bbb.secret);

var meetings = {};

var emptyMeeting = function () {
    return {
        meetingID: 'noneMeetId',
        meetingName: 'noneName',
        moderatorPW: 'jnasdf9'
    };
};

_.extend(bbb, {
    forceJoinMeetingQ: function (meetingId, className, name) {
        var m = meetings[meetingId]
          , p = null
          , self = this;

        if (!m) {
            p = this.createMeetingQ(meetingId, className);
        } else {
            p = this._createInBbbQ(m);
        }

        return p.then(function () {
            return self.joinMeeting(meetingId, name);
        });
    },

    joinMeeting: function (meetingId, name) {
        // var m = meetings[meetingId] || emptyMeeting;
        return this.link({
            action: 'join',
            params: {
                fullName: name,
                meetingID: meetingId,
                password: 'jnasdf9'
            }
        });
    },

    getMeetingsQ: function () {
        return this.requestQ({ action: 'getMeetings' });
    },

    endMeetingQ: function (meetingId) {
        delete meetings[meetingId];

        return this.requestQ({
            action: 'end',
            params: {
                meetingID: meetingId,
                password: 'jnasdf9'
            }
        });
    },

    createMeetingQ: function (meetingId, className) {
        var params = {
                meetingID: meetingId,
                meetingName: className,
                moderatorPW: 'jnasdf9'
            };

        return this._createInBbbQ(params);
    },

    _createInBbbQ: function (params) {
        var data = {
          action: 'create',
          params: params,
          body: {}
        };

        return this.requestQ(data)
            .then(function () {
                meetings[params.meetingID] = params;
                return params.meetingID;
            });
    }
});

module.exports = bbb;
