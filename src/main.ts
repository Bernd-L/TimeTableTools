import { UntisConnector } from "./core/untis-connector";
import { Counter } from "./core/counter";

const main = async () => {
  /**
   * The transformed time table for the current day
   */
  const units = await new UntisConnector(
    process.argv[2] === "test" || process.argv[3] === "test"
  ).getTransformedTimeTable();

  // TODO remove this log
  console.log(units);

  /**
   * The counter
   */
  const counter = new Counter(1, units);

  // Start counting
  switch (process.argv[2]) {
    case "file":
      counter.countToFileBlocking();
      break;
    case "cli":
    default:
      counter.countInCliBlocking();
      break;
  }
};

// Start the program
main();
