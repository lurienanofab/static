function BillingClient(sd, ed, clientId, record) {

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

    this.delete = true;

    this.getStartDate = function () {
        return self.getFirstOfMonth(moment(sd));
    }

    this.getEndDate = function () {
        return self.getFirstOfMonth(moment(ed));
    }

    this.getFirstOfMonth = function (m) {
        var fom = moment();

        fom.year(m.year());
        fom.month(m.month());
        fom.date(1);

        return fom;
    }

    this.getClientId = function () {
        if (clientId && !isNaN(clientId))
            return parseInt(clientId);
        else
            return 0;
    }

    this.getRecord = function () {
        if (record && !isNaN(record))
            return parseInt(record)
        else
            return 0;
    }

    this.isTemp = function () {
        var now = moment();
        var temp = self.getFirstOfMonth(now).isSameOrBefore(self.getStartDate());
        return temp;
    }

    this.createBillingProcessDataCommand = function (command) {
        return {
            "Command": command,
            "StartPeriod": self.getStartDate().format("YYYY-MM-DD"),
            "EndPeriod": self.getEndDate().format("YYYY-MM-DD"),
            "ClientID": self.getClientId(),
            "Record": self.getRecord()
        }
    }

    this.createBillingProcessStep1Command = function (command) {
        return {
            "Command": command,
            "StartPeriod": self.getStartDate().format("YYYY-MM-DD"),
            "EndPeriod": self.getEndDate().format("YYYY-MM-DD"),
            "ClientID": self.getClientId(),
            "Record": self.getRecord(),
            "IsTemp": self.isTemp(),
            "Delete": self.delete
        };
    }

    this.process = {
        "data": function (command) {
            return $.ajax({
                "url": "/webapi/billing/process/data",
                "type": "POST",
                "data": self.createBillingProcessDataCommand(command)
            });
        },
        "dataClean": function (command) {
            return $.ajax({
                "url": "/webapi/billing/process/data/clean",
                "type": "POST",
                "data": self.createBillingProcessDataCommand(command)
            });
        },
        "step1": function (command) {
            return $.ajax({
                "url": "/webapi/billing/process/step1",
                "type": "POST",
                "data": self.createBillingProcessStep1Command(command)
            });
        }
    };
}