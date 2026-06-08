export interface GitHubPackage {
  id: number;
  name: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
  default_branch: string;
}

export interface PackageRelease {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  assets: ReleaseAsset[];
  zipball_url: string;
  tarball_url: string;
}

export interface ReleaseAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

export interface SearchParams {
  query: string;
  sort?: 'stars' | 'forks' | 'updated';
  order?: 'asc' | 'desc';
  page?: number;
}
