// Autumnflex.js
// (c) sebastian lin. 2019
// Distributed under MIT license.

function Subject(initValue) {
    this.value = initValue;
    this._closed = false;
    this._subscriber = [];
};
Subject.prototype.next = function (newValue) {
    this.value = newValue;
    return Promise.all(this._subscriber.map(function (subscriber) {
        subscriber.onValue(newValue);
    }));
};
Subject.prototype.close = function () {
    this._closed = true;
    return Promise.all(this._subscriber.map(function (subscriber) {
        subscriber.onClose();
    }));
};
Subject.prototype.subscribe = function (config) {
    var this_1 = this;
    this._subscriber.push(config);
    var res = {
        unsubscribe: function () {
            var _pos = this_1._subscriber.findIndex(function (x) { return x === config; });
            this_1._subscriber.splice(_pos, 1);
        }
    };
    res.unsubscribe.bind(res);
    return res;
};

Subject.merge = function (x, y) {
    var newSubject = new Subject();
    newSubject._trait = 'merge';
    var sub1 = x.subscribe({
        onValue: function (newValue) {
            newSubject.next(newValue);
        },
        onClose: function () {
            sub1.unsubscribe();
        }
    });
    var sub2 = y.subscribe({
        onValue: function (newValue) {
            newSubject.next(newValue);
        },
        onClose: function () {
            sub2.unsubscribe();
        }
    });
    newSubject._subscription = [sub1, sub2];
    return newSubject;
};
Subject.prototype.merge = function (y) {
    return Subject.merge(this, y);
}

Subject.filter = function (subj, f) {
    var newSubject = new Subject();
    newSubject._trait = 'filter';
    var sub1 = subj.subscribe({
        onValue: function (newValue) {
            if (f(newValue)) {
                newSubject.next(newValue);
            }
        },
        onClose: function () {
            sub1.unsubscribe();
        }
    });
    newSubject._subscription = [sub1];
    return newSubject;
}
Subject.prototype.filter = function (f) {
    return Subject.filter(this, f);
}


Subject.map = function (subj, f) {
    var newSubject = new Subject();
    newSubject._trait = 'map';
    var sub1 = subj.subscribe({
        onValue: function (newValue) {
            newSubject.next(f(newValue));
        },
        onClose: function () {
            sub1.unsubscribe();
        }
    });
    newSubject._subscription = [sub1];
    return newSubject;
}
Subject.prototype.map = function (f) {
    return Subject.map(this, f);
}


Subject.mapTo = function (subj, c) {
    var newSubject = new Subject();
    newSubject._trait = 'mapTo';
    var sub1 = subj.subscribe({
        onValue: function () {
            newSubject.next(c);
        },
        onClose: function() {
            sub1.unsubscribe();
        }
    });
    newSubject._subscription = [sub1];
    return newSubject;
}
Subject.prototype.mapTo = function (c) {
    return Subject.mapTo(this, c);
}

