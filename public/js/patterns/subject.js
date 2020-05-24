var Subject = /** @class */ (function () {
    function Subject() {
        this._observers = new Array();
    }
    Subject.prototype.addObserver = function (observer) {
        this._observers.push(observer);
    };
    Subject.prototype.notify = function (data) {
        if (data === void 0) { data = null; }
        this._observers.forEach(function (observer) {
            observer.notify(data);
        });
    };
    return Subject;
}());
//# sourceMappingURL=subject.js.map