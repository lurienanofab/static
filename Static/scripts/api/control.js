function ControlClient() {

    if (typeof $ != "function" || !$().jquery) {
        alert("Cannot use ControlClient without jQuery!")
        return;
    }

    var makeRequest = function (url) {
        var result = null;

        return $.ajax({
            "url": url,
            "success": function (data) {
                result = data;
            },
            "complete": function () {
                if (typeof callback == "function")
                    callback(result);
            }
        });
    }

    this.allBlocks = function () {
        return makeRequest("/api/control/block");
    };

    this.singleBlock = function (blockId) {
        return makeRequest("/api/control/block?id=" + blockId);
    };

    this.blockState = function (blockId) {
        return makeRequest("/api/control/block/state?id=" + blockId);
    };

    this.allPoints = function () {
        return makeRequest("/api/control/point");
    };

    this.singlePoint = function (pointId) {
        return makeRequest("/api/control/point?id=" + pointId);
    };

    this.pointState = function (pointId) {
        return makeRequest("/api/control/point/state?id=" + pointId);
    };

    this.allInstances = function () {
        return makeRequest("/api/control/instance");
    };

    this.singleInstance = function (actionId) {
        return makeRequest("/api/control/instance?id=" + actionId);
    };

    this.on = function (pointId, duration) {
        var d = isNaN(duration) ? 0 : Math.max(0, duration);
        return makeRequest("/api/control/point/state/on?id=" + pointId + "&duration=" + d);
    };

    this.off = function (pointId, duration) {
        var d = isNaN(duration) ? 0 : Math.max(0, duration);
        return makeRequest("/api/control/point/state/off?id=" + pointId + "&duration=" + d);
    };
}