function SchedulerClient() {
    if (typeof $ != "function" || !$().jquery) {
        alert("Cannot use BillingClient without jQuery!")
        return;
    }

    if (typeof moment != "function") {
        alert("Cannot use BillingClient without moment!")
        return;
    }

    if (moment.version != '2.11.2') {
        alert("Requires moment version 2.11.2!")
        return;
    }

    var self = this;

    this.reservation = {
        "getReservation": function (reservationId) {
            var def = $.Deferred();

            $.ajax({
                "url": "/webapi/scheduler/reservation/" + reservationId
            }).done(function (data, textStatus, jqXHR) {
                def.resolve(new Reservation(data), textStatus, jqXHR);
            }).fail(def.reject);

            return def;
        }
    }
}

function Reservation(args) {

    //default values
    this.ReservationID = 0;
    this.BeginDateTime = null;
    this.EndDateTime = null;
    this.ActualBeginDateTime = null;
    this.ActualEndDateTime = null;
    this.CancelledDateTime = null;
    this.IsStarted = false;
    this.IsActive = false;
    this.ActivityID = 0;
    this.ActivityName = "";
    this.ResourceID = 0;
    this.ResourceName = "";
    this.AccountID = 0;
    this.AccountName = "";
    this.ClientID = 0;
    this.LName = "";
    this.FName = "";
    this.Notes = "";
    this.ChargeMultiplier = 1;
    this.Invitees = [];

    if (typeof args == 'object' && args != null) {
        this.ReservationID = args.ReservationID;
        this.BeginDateTime = args.BeginDateTime;
        this.EndDateTime = args.EndDateTime;
        this.ActualBeginDateTime = args.ActualBeginDateTime;
        this.ActualEndDateTime = args.ActualEndDateTime;
        this.CancelledDateTime = args.CancelledDateTime;
        this.IsStarted = args.IsStarted;
        this.IsActive = args.IsActive;
        this.ActivityID = args.ActivityID;
        this.ActivityName = args.ActivityName;
        this.ResourceID = args.ResourceID;
        this.ResourceName = args.ResourceName;
        this.AccountID = args.AccountID;
        this.AccountName = args.AccountName;
        this.ClientID = args.ClientID;
        this.LName = args.LName;
        this.FName = args.FName;
        this.Notes = args.Notes;
        this.ChargeMultiplier = args.ChargeMultiplier
        if ($.isArray(args.Invitees)) {
            this.Invitees = $.map(args.Invitees, function (val, i) {
                return new ReservationInvitee(val);
            })
        } else {
            this.Invitees = [];
        }
    }

    var self = this;

    this.getChargeBeginDateTime = function () {
        if (self.ActualBeginDateTime == null)
            return moment(self.BeginDateTime);
        else {
            var m = moment(self.BeginDateTime);
            if (m.isSameOrBefore(moment(self.ActualBeginDateTime)))
                return m;
            else
                return moment(self.ActualBeginDateTime);
        }
    }

    this.getChargeEndDateTime = function () {
        if (self.ActualEndDateTime == null)
            return moment(self.EndDateTime);
        else {
            var m = moment(self.EndDateTime);
            if (m.isSameOrAfter(moment(self.ActualEndDateTime)))
                return m;
            else
                return moment(self.ActualEndDateTime);
        }
    }

    this.updateHistory = function () {
        return $.ajax({
            "url": "/webapi/scheduler/reservation/history",
            "type": "PUT",
            "data": {
                "ReservationID": self.ReservationID,
                "AccountID": self.AccountID,
                "ChargeMultiplier": self.ChargeMultiplier,
                "Notes": self.Notes
            }
        });
    }
}

function ReservationInvitee(args) {

    //default values
    this.ReservationID = 0;
    this.ClientID = 0;
    this.LName = "";
    this.FName = "";

    if (typeof args == 'object' && args != null) {
        this.ReservationID = args.ReservationID;
        this.ClientID = args.ClientID;
        this.LName = args.LName;
        this.FName = args.FName;
    }
}