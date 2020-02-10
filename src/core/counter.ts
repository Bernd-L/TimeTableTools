import { Unit } from "../models/unit";

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

  private countInCliOnce = () => {
    /**
     * The unit which is active at this moment in time
     */
    const currentUnit = this.getCurrentUnitForTime(new Date());

    console.log(
      this.getRenderedString(currentUnit, this.getNextUnit(currentUnit))
    );
  };

  /**
   * Returns the unit which is active at the specified moment in time
   */
  private getCurrentUnitForTime = (now: Date): Unit | undefined =>
    this.units.find(unit => {
      return now >= unit.startDate && now < unit.endDate;
    });

  /**
   * Returns the unit which will be active after the current one,
   * or the current one if there is none after it
   */
  private getNextUnitNoUndefined = (currentUnit: Unit): Unit =>
    this.units.reduce(
      (previousValue: Unit, currentValue: Unit): Unit =>
        // Get the earliest one...
        previousValue.startDate > currentValue.startDate &&
        // ...after the current one
        currentValue.startDate > currentUnit.startDate
          ? currentValue
          : previousValue,
      currentUnit
    );

  /**
   * Returns the unit which will be active after the current one,
   * or undefined if there is none after it
   */
  private getNextUnit = (currentUnit?: Unit): Unit | undefined => {
    // Handle undefined units
    if (currentUnit === undefined) return undefined;

    const nextUnit = this.getNextUnitNoUndefined(currentUnit);

    // Avoid returning the current unit
    return currentUnit === nextUnit ? undefined : nextUnit;
  };

  private getRenderedString = (currentUnit?: Unit, nextUnit?: Unit): string => {
    // Handle undefined units
    if (currentUnit === undefined) return "Nothing active at the moment";

    /**
     * The current moment in time
     */
    const now = new Date();

    const newLocal = currentUnit.endDate.getTime() - now.getTime();
    console.log(newLocal);

    const delta = new Date(newLocal);

    console.log(this.getColonStringFromDeltaDate(delta));

    return (
      this.getFancyStringFromDeltaDate(delta) +
      ` left in ${currentUnit.subjectName.name} with ${currentUnit.teacherName.name}; next up is ` +
      (nextUnit === undefined
        ? "nothing"
        : `${nextUnit.subjectName.name} with ${
            nextUnit.teacherName.name
          } at ${nextUnit.startDate.getHours()}:${nextUnit.startDate.getMinutes()}.`)
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
