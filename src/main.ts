import WebUntis from "webuntis";
import { log } from "console";
import { readFileSync } from "fs";
import { join } from "path";

const auth = JSON.parse(
  readFileSync(join(__dirname, "../private/settings.json")).toString()
) as {
  schoolNumber: number;
  school: string;
  url: string;
  user: string;
  key: string;
  password: string;
};

log(JSON.stringify(auth));

const untis = new WebUntis(auth.school, auth.user, auth.password, auth.url);

untis
  .login()
  .then(() => {
    return untis.getOwnTimetableForToday();
  })
  .then(timetable => {
    // profit
    log(JSON.stringify(timetable));
  });
