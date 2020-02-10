import WebUntis, { Lesson } from "webuntis";
import { log } from "console";
import { readFileSync } from "fs";
import { join } from "path";
import { Auth } from "../models/auth";
import { Unit } from "../models/unit";

export class UntisConnector {
  constructor(private useTestData: boolean) {}

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

  /**
   * Retrieves and transforms data
   */
  async getTransformedTimeTable(): Promise<Unit[]> {
    // Perform the authentication
    if (!this.useTestData) await this.untis.login();

    /**
     * My own timetable
     */
    const lessons = !this.useTestData
      ? await this.untis.getOwnTimetableForToday()
      : (JSON.parse(
          readFileSync(
            join(__dirname, "../../private/Untitled-1.json")
          ).toString()
        ) as Lesson[]);

    return lessons.map(l => {
      return {
        startDate: this.timeTransform(l.startTime),
        endDate: this.timeTransform(l.endTime),
        subjectName: l.su[0],
        teacherName: l.te[0]
      } as Unit;
    }) as Unit[];
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
      new Date(
        new Date().setHours(
          this.getHours(untisTime),
          untisTime - this.getHours(untisTime) * 100
        )
      ).setSeconds(0)
    );

  private addPaddingToNumber = (untisTime: number): string =>
    untisTime < 1000 ? "0" + untisTime : untisTime + "";
}
