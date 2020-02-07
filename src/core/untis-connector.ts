import WebUntis, { Lesson } from "webuntis";
import { log } from "console";
import { readFileSync } from "fs";
import { join } from "path";
import { Auth } from "../models/auth";

export class UntisConnector {
  /**
   * The authentication data required for the API
   */
  private auth = JSON.parse(
    readFileSync(join(__dirname, "../../private/settings.json")).toString()
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
    // const timetable = JSON.parse(
    //   readFileSync(join(__dirname, "../../private/Untitled-1.json")).toString()
    // );

    const mapped = timetable.map((l: Lesson) =>
      this.timeTransform(l.startTime)
    );

    log(mapped);
  }

  /**
   * Extracts the hours from a Untis time-number
   */
  private getHours = (number: number): number => Math.floor(number / 100);

  /**
   * Transforms a Untis time-number into a JS Date
   */
  private timeTransform = (untisTime: number): Date =>
    new Date(
      new Date().setHours(
        this.getHours(untisTime),
        untisTime - this.getHours(untisTime) * 100
      )
    );

  private addPaddingToNumber = (untisTime: number): string =>
    untisTime < 1000 ? "0" + untisTime : untisTime + "";
}
