import { Download, Star, GitFork, Calendar } from 'lucide-react';
import { GitHubPackage } from '../types/package';
import { GitHubService } from '../services/github';

interface PackageCardProps {
  package: GitHubPackage;
  onViewDetails: (pkg: GitHubPackage) => void;
}

export function PackageCard({ package: pkg, onViewDetails }: PackageCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = GitHubService.getDownloadUrl(pkg.owner.login, pkg.name, pkg.default_branch);
    GitHubService.downloadPackage(url, `${pkg.name}-${pkg.default_branch}.zip`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      onClick={() => onViewDetails(pkg)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-200 hover:border-blue-400"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={pkg.owner.avatar_url}
            alt={pkg.owner.login}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{pkg.name}</h3>
            <p className="text-sm text-gray-600">{pkg.owner.login}</p>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
          title="Download package"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2 min-h-[40px]">
        {pkg.description || 'No description available'}
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>{pkg.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          <span>{pkg.forks_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(pkg.updated_at)}</span>
        </div>
      </div>

      {pkg.language && (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {pkg.language}
          </span>
        </div>
      )}

      {pkg.topics && pkg.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {pkg.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
