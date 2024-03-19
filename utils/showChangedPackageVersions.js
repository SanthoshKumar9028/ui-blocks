const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getPackageVersion = async (packageFilePath) => {
  const { stderr, stdout } = await exec(`git log --format="%H" -n 2`);
  if (stderr) throw stderr;

  const commitIds = stdout.split("\n").filter(Boolean);

  console.log(commitIds);

  const commitChanges = await Promise.all(
    commitIds.map((id) => exec(`git show ${id}:${packageFilePath}`))
  );

  return commitChanges.map((commitChange) => {
    const { stderr, stdout } = commitChange;

    if (stderr) throw stderr;

    return {
      name: JSON.parse(stdout).name,
      version: JSON.parse(stdout).version,
    };
  });
};

const packages = [{ path: "./packages/common/package.json" }];

(async () => {
  const changedPackages = await Promise.all(
    packages.map(({ path }) => {
      return getPackageVersion(path);
    })
  );

  console.log(changedPackages);

  console.log(
    `changed_packages=${changedPackages
      .filter(([cur, prv]) => cur.version != prv.version)
      .map(([cur]) => cur.name)
      .join()}`
  );
})();
