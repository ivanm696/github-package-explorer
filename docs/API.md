# API Documentation

## GitHub Service

The `GitHubService` class provides methods for interacting with the GitHub API.

### Methods

#### `searchPackages(params: SearchParams): Promise<GitHubPackage[]>`

Search for GitHub repositories.

**Parameters:**
- `params.query` (string): Search query
- `params.sort` ('stars' | 'forks' | 'updated'): Sort criteria
- `params.order` ('asc' | 'desc'): Sort order
- `params.page` (number): Page number for pagination

**Returns:** Array of GitHubPackage objects

**Example:**
```typescript
const results = await GitHubService.searchPackages({
  query: 'react',
  sort: 'stars',
  order: 'desc',
  page: 1
});
```

#### `getPackageDetails(owner: string, repo: string): Promise<GitHubPackage>`

Get detailed information about a specific repository.

**Parameters:**
- `owner` (string): Repository owner username
- `repo` (string): Repository name

**Returns:** GitHubPackage object

**Example:**
```typescript
const details = await GitHubService.getPackageDetails('facebook', 'react');
```

#### `getPackageReleases(owner: string, repo: string): Promise<PackageRelease[]>`

Get all releases for a repository.

**Parameters:**
- `owner` (string): Repository owner username
- `repo` (string): Repository name

**Returns:** Array of PackageRelease objects

**Example:**
```typescript
const releases = await GitHubService.getPackageReleases('facebook', 'react');
```

#### `getTrendingPackages(): Promise<GitHubPackage[]>`

Get trending repositories from the past week.

**Returns:** Array of GitHubPackage objects

**Example:**
```typescript
const trending = await GitHubService.getTrendingPackages();
```

#### `getDownloadUrl(owner: string, repo: string, ref?: string): string`

Generate download URL for repository source code.

**Parameters:**
- `owner` (string): Repository owner username
- `repo` (string): Repository name
- `ref` (string, optional): Branch/tag name (defaults to 'main')

**Returns:** Download URL string

**Example:**
```typescript
const url = GitHubService.getDownloadUrl('facebook', 'react', 'main');
```

#### `downloadPackage(url: string, filename: string): void`

Trigger browser download for a package.

**Parameters:**
- `url` (string): Download URL
- `filename` (string): Desired filename for download

**Example:**
```typescript
GitHubService.downloadPackage(url, 'react-main.zip');
```

## Type Definitions

### GitHubPackage

```typescript
interface GitHubPackage {
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
```

### PackageRelease

```typescript
interface PackageRelease {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  assets: ReleaseAsset[];
  zipball_url: string;
  tarball_url: string;
}
```

### SearchParams

```typescript
interface SearchParams {
  query: string;
  sort?: 'stars' | 'forks' | 'updated';
  order?: 'asc' | 'desc';
  page?: number;
}
```

## Rate Limiting

The GitHub API has rate limits:
- 60 requests/hour for unauthenticated requests
- 5,000 requests/hour for authenticated requests

To implement authentication, add a token to the API headers:

```typescript
headers: {
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': `Bearer ${YOUR_GITHUB_TOKEN}`
}
```

## Error Handling

All API methods throw errors that should be caught:

```typescript
try {
  const packages = await GitHubService.searchPackages({ query: 'react' });
} catch (error) {
  console.error('API Error:', error);
}
```
