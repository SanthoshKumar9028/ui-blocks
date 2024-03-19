const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getPackageVersion = async (packageFilePath, ...commits) => {
  const commitChanges = await Promise.all(
    commits.map((commit) => exec(`git show ${commit}:${packageFilePath}`))
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

const packages = [{ path: "packages/common/package.json" }];

(async () => {
  const changedPackages = await Promise.all(
    packages.map(({ path }) => {
      return getPackageVersion(path, "HEAD", "HEAD~1");
    })
  );

  console.log(
    `changed_packages=${changedPackages
      .filter(([cur, prv]) => cur.version != prv.version)
      .map(([cur]) => cur.name)
      .join()}`
  );
})();
