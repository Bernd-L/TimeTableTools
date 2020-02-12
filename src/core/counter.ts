import { Unit } from "../models/unit";
import { Title } from "./title";
import { writeFileSync } from "fs";
import { join } from "path";

export class Counter {
  /**
   * The counter class
   *
   * @param interval The interval in seconds between refreshing
   * @param units The units to be used for counting
   */
  constructor(private interval: number, private units: Unit[]) {}

  public countInCliBlocking = (): void => {
    setInterval(() => this.countInCliOnce(), this.interval * 1000);
  };

  public countToFileBlocking = (): void => {
    setInterval(() => this.countToFileOnce(), this.interval * 1000);
  };

  private countInCliOnce = () => {
    /**
     * The unit which is active at this moment in time
     */
    const currentUnit = this.getCurrentUnitForTime(new Date());

    const countString = this.getRenderedString(
      currentUnit,
      this.getNextUnit(currentUnit)
    );

    console.log(countString);
    Title.setTitle(countString);
  };

  private countToFileOnce = () => {
    /**
     * The unit which is active at this moment in time
     */
    const currentUnit = this.getCurrentUnitForTime(new Date());

    const countString = this.getRenderedString(
      currentUnit,
      this.getNextUnit(currentUnit)
    );

    console.log(countString);
    Title.setTitle(countString);
    writeFileSync(join(__dirname, "../../private/status.txt"), countString);
  };

  /**
   * Returns the unit which is active at the specified moment in time
   */
  private getCurrentUnitForTime = (now: Date): Unit | undefined =>
    this.units.find(unit => now >= unit.startDate && now < unit.endDate);

  /**
   * Returns the unit which will be active after the current one,
   * or the current one if there is none after it
   */
  private getNextUnitForDate = (now: Date): Unit =>
    this.units
      .filter(unit => unit.startDate > now)
      .reduce((acc, unit) => (acc.startDate < unit.startDate ? acc : unit));

  /**
   * Returns the unit which will be active after the current one,
   * or undefined if there is none after it
   */
  private getNextUnit = (currentUnit?: Unit): Unit | undefined => {
    // Handle undefined units
    // if (currentUnit === undefined) return undefined;

    let nextUnit;

    try {
      nextUnit = this.getNextUnitForDate(new Date());
    } catch (err) {
      nextUnit = undefined;
    }

    // Avoid returning the current unit
    return currentUnit === nextUnit ? undefined : nextUnit;
  };

  private getRenderedString = (currentUnit?: Unit, nextUnit?: Unit): string => {
    const nextUp =
      nextUnit === undefined
        ? "nothing"
        : `${nextUnit.subjectName.name} with ${
            nextUnit.teacherName.name
          } at ${nextUnit.startDate.getHours()}:${nextUnit.startDate.getMinutes()}.`;

    // Handle undefined units
    if (currentUnit === undefined)
      return "Nothing active at the moment; next up is " + nextUp;

    const delta = new Date(
      currentUnit.endDate.getTime() - new Date().getTime()
    );

    return (
      this.getFancyStringFromDeltaDate(delta) +
      ` left in ${currentUnit.subjectName.name} with ${currentUnit.teacherName.name}; next up is ` +
      nextUp
    );
  };

  /**
   * Turns a delta-date into a hh:mm:ss string
   */
  private getColonStringFromDeltaDate = (delta: Date): string =>
    delta.toLocaleTimeString([], {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });

  /**
   * Turns a delta-date into a "XXh YYm ZZs" string,
   * where h, m and s are literals, and XX, YY and ZZ are values.
   */
  private getFancyStringFromDeltaDate = (delta: Date) =>
    `${delta.getUTCHours()}h ${delta.getUTCMinutes()}m ${delta.getUTCSeconds()}s`;

  // private getTimeRemaining = (unit: Unit): minutes: number; number =>
}
