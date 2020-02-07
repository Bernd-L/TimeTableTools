import { UntisConnector } from "./core/untis-connector";
import { Counter } from "./core/counter";

const main = async () => {
  /**
   * The transformed time table for the current day
   */
  const units = await new UntisConnector().getTransformedTimeTable();

  console.log(units);

  /**
   * The counter
   */
  const counter = new Counter(1, units);

  // Start counting
  counter.countInCliBlocking();
};

// Start the program
main();
