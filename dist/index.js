"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cron_1 = require("cron");
const dir = require("dir_filenames");
exports.schedule = async (path) => {
    var e_1, _a;
    const classfiles = dir(path);
    try {
        for (var classfiles_1 = tslib_1.__asyncValues(classfiles), classfiles_1_1; classfiles_1_1 = await classfiles_1.next(), !classfiles_1_1.done;) {
            let file = classfiles_1_1.value;
            const classes = require(file);
            for (let i in classes) {
                const info = classes[i].schedule();
                if (info.disable === true) {
                    continue;
                }
                if (info.env) {
                    const env = info.env;
                    if (env.includes(process.env.NODE_ENV)) {
                        const job = new cron_1.CronJob(info.cron, classes[i].prototype.subscribe, () => { }, true, info.timeZone);
                        job.start();
                    }
                }
                else {
                    const job = new cron_1.CronJob(info.cron, classes[i].prototype.subscribe, () => { }, true, info.timeZone);
                    job.start();
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (classfiles_1_1 && !classfiles_1_1.done && (_a = classfiles_1.return)) await _a.call(classfiles_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThCO0FBQzlCLHFDQUFvQztBQWdCdkIsUUFBQSxRQUFRLEdBQWtCLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTs7SUFDNUQsTUFBTSxVQUFVLEdBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBOztRQUN0QyxLQUF1QixJQUFBLGVBQUEsc0JBQUEsVUFBVSxDQUFBLGdCQUFBO1lBQXRCLElBQUksSUFBSSx1QkFBQSxDQUFBO1lBQ2pCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM3QixLQUFLLElBQUksQ0FBQyxJQUFJLE9BQU8sRUFBRTtnQkFDckIsTUFBTSxJQUFJLEdBQWEsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dCQUM1QyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO29CQUN6QixTQUFRO2lCQUNUO2dCQUNELElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDWixNQUFNLEdBQUcsR0FBc0IsSUFBSSxDQUFDLEdBQUcsQ0FBQTtvQkFDdkMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBa0IsQ0FBQyxFQUFFO3dCQUNoRCxNQUFNLEdBQUcsR0FBWSxJQUFJLGNBQU8sQ0FDOUIsSUFBSSxDQUFDLElBQUksRUFDVCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFDOUIsR0FBUyxFQUFFLEdBQUUsQ0FBQyxFQUNkLElBQUksRUFDSixJQUFJLENBQUMsUUFBUSxDQUNkLENBQUE7d0JBQ0QsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO3FCQUNaO2lCQUNGO3FCQUFNO29CQUNMLE1BQU0sR0FBRyxHQUFZLElBQUksY0FBTyxDQUM5QixJQUFJLENBQUMsSUFBSSxFQUNULE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUM5QixHQUFTLEVBQUUsR0FBRSxDQUFDLEVBQ2QsSUFBSSxFQUNKLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQTtvQkFDRCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7aUJBQ1o7YUFDRjtTQUNGOzs7Ozs7Ozs7QUFDSCxDQUFDLENBQUEifQ==