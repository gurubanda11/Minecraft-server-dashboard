export default async function handler(req, res) {
  const { action } = req.query;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const CODESPACE_NAME = process.env.CODESPACE_NAME;

  const response = await fetch(`https://api.github.com/user/codespaces/${CODESPACE_NAME}/${action}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GITHUB_TOKEN}`,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });

  if (response.ok) {
    res.status(200).json({ message: `Server power state set: ${action}` });
  } else {
    res.status(500).json({ error: `Failed to execute ${action}` });
  }
}
