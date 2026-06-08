import { GitHubPackage, PackageRelease, SearchParams } from '../types/package';

const GITHUB_API = 'https://api.github.com';

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export class GitHubService {
  private static async fetchAPI(endpoint: string): Promise<any> {
    const response = await fetch(`${GITHUB_API}${endpoint}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Add VITE_GITHUB_TOKEN to .env to increase limit.');
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async searchPackages(params: SearchParams): Promise<GitHubPackage[]> {
    const { query, sort = 'stars', order = 'desc', page = 1 } = params;
    const searchQuery = `${query} in:name,description`;
    const data = await this.fetchAPI(
      `/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=${sort}&order=${order}&page=${page}&per_page=20`
    );
    return data.items || [];
  }

  static async getPackageDetails(owner: string, repo: string): Promise<GitHubPackage> {
    return this.fetchAPI(`/repos/${owner}/${repo}`);
  }

  static async getPackageReleases(owner: string, repo: string): Promise<PackageRelease[]> {
    return this.fetchAPI(`/repos/${owner}/${repo}/releases`);
  }

  static async getTrendingPackages(): Promise<GitHubPackage[]> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const dateStr = oneWeekAgo.toISOString().split('T')[0];
    const data = await this.fetchAPI(
      `/search/repositories?q=created:>${dateStr}&sort=stars&order=desc&per_page=20`
    );
    return data.items || [];
  }

  static getDownloadUrl(owner: string, repo: string, ref: string = 'main'): string {
    return `https://github.com/${owner}/${repo}/archive/refs/heads/${ref}.zip`;
  }

  static downloadPackage(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
