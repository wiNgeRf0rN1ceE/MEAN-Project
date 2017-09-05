"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt");
exports.userSchema = new mongoose_1.Schema({
    email: String,
    password: String
});
exports.userSchema.pre('save', function (next) {
    var user = _this;
    if (_this.isModified('password') || _this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err)
                return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});
exports.userSchema.methods.comparePassword = function (pass, cb) {
    bcrypt.compare(pass, _this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zY2hlbWFzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQWdDRTs7QUFoQ0YscUNBQWtDO0FBQ2xDLCtCQUFrQztBQUVyQixRQUFBLFVBQVUsR0FBVyxJQUFJLGlCQUFNLENBQUM7SUFDekMsS0FBSyxFQUFFLE1BQU07SUFDYixRQUFRLEVBQUUsTUFBTTtDQUNuQixDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFJO0lBQ3hCLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQztJQUNoQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUk7WUFDekIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBQyxJQUFJO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUksVUFBQyxJQUFJLEVBQUUsRUFBRTtJQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU87UUFDN0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ0osTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=