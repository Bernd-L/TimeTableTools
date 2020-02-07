import WebUntis, { Lesson } from "webuntis";
import { log } from "console";
import { readFileSync } from "fs";
import { join } from "path";
import { Auth } from "./models/auth";
import { parse } from "date-fns";
import { de } from "date-fns/locale";

class Main {
  /**
   * The authentication data required for the API
   */
  private auth = JSON.parse(
    readFileSync(join(__dirname, "../private/settings.json")).toString()
  ) as Auth;

  /**
   * The Untis connection
   */
  private untis = new WebUntis(
    this.auth.school,
    this.auth.user,
    this.auth.password,
    this.auth.url
  );

  constructor() {
    this.main();
  }

  /**
   * The main entry point of the application
   */
  async main() {
    // Perform the authentication
    // await this.untis.login();

    /**
     * My own timetable
     */
    // const timetable = await this.untis.getOwnTimetableForToday();
    const timetable = JSON.parse(
      readFileSync(join(__dirname, "../private/Untitled-1.json")).toString()
    );

    // TODO Remove this log
    log(JSON.stringify(timetable));

    timetable.map((l: Lesson, i: number) => {
      const timeWithPadding = this.addPaddingToNumber(l.startTime);
      log("Time with padding: " + timeWithPadding);
      const na = new Date()(
        timeWithPadding,
        "hhmm",
        new Date().getTimezoneOffset()
      );

      log(na);
    });
  }

  private dateTransform = (untisDate: number): Date =>
    new Date(
      new Date().getFullYear,
      new Date().getMonth(),
      new Date().getDate,
      untisDate
    );
  private addPaddingToNumber = (untisTime: number): string =>
    untisTime < 1000 ? "0" + untisTime : untisTime + "";
}

// Start the program
new Main();
