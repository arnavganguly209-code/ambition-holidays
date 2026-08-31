import path from "path";

/**
 * Orbit CMS durable storage.
 * - Local/dev: project `data/` + `public/uploads`
 * - Production: set AMBITION_CMS_DIR to a path OUTSIDE the git repo
 *   (e.g. /var/www/ambition-holidays-cms) so `git reset --hard` never wipes edits.
 */
export function cmsRoot(): string {
  const fromEnv = process.env.AMBITION_CMS_DIR?.trim();
  if (fromEnv) return path.resolve(fromEnv);
  return path.join(process.cwd(), "data");
}

export function contentFilePath(): string {
  const fromEnv = process.env.AMBITION_CMS_DIR?.trim();
  if (fromEnv) {
    return path.join(path.resolve(fromEnv), "site-content.json");
  }
  return path.join(process.cwd(), "data", "site-content.json");
}

export function contentDataDir(): string {
  return path.dirname(contentFilePath());
}

/** Writable upload folders — CMS dir first when configured. */
export function uploadDirs(): string[] {
  const fromEnv = process.env.AMBITION_CMS_DIR?.trim();
  if (fromEnv) {
    const root = path.resolve(fromEnv);
    return [
      path.join(root, "uploads"),
      path.join(process.cwd(), "data", "uploads"),
      path.join(process.cwd(), "public", "uploads"),
    ];
  }
  return [
    path.join(process.cwd(), "data", "uploads"),
    path.join(process.cwd(), "public", "uploads"),
  ];
}
