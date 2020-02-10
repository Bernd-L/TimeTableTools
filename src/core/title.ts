export class Title {
  public static isWindows = () => process.platform === "win32";

  public static setTitle = (title: string) =>
    Title.isWindows()
      ? (process.title = title)
      : process.stdout.write("\x1b]2;" + title + "\x1b\x5c");
}
