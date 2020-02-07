import WebUntis from "webuntis";
import { log } from "console";
import { readFileSync } from "fs";
import { join } from "path";
import { Auth } from "./models/auth";

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
    await this.untis.login();

    /**
     * My own timetable
     */
    const timetable = await this.untis.getOwnTimetableForToday();

    // TODO Remove this log
    log(JSON.stringify(timetable));

    // timetable.
  }

  private dateTransform = (untisDate: number) => {};
}

// Start the program
new Main();
