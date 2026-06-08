import { X, Download, ExternalLink, Star, GitFork, Code } from 'lucide-react';
import { GitHubPackage } from '../types/package';
import { GitHubService } from '../services/github';

interface PackageDetailsProps {
  package: GitHubPackage;
  onClose: () => void;
}

export function PackageDetails({ package: pkg, onClose }: PackageDetailsProps) {
  const handleDownload = () => {
    const url = GitHubService.getDownloadUrl(pkg.owner.login, pkg.name, pkg.default_branch);
    GitHubService.downloadPackage(url, `${pkg.name}-${pkg.default_branch}.zip`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{pkg.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={pkg.owner.avatar_url}
              alt={pkg.owner.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{pkg.full_name}</h3>
              <p className="text-gray-600">by {pkg.owner.login}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{pkg.description || 'No description available'}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 mb-1">
                <Star className="w-5 h-5" />
                <span className="font-semibold">Stars</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {pkg.stargazers_count.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 mb-1">
                <GitFork className="w-5 h-5" />
                <span className="font-semibold">Forks</span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {pkg.forks_count.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-purple-700 mb-1">
                <Code className="w-5 h-5" />
                <span className="font-semibold">Language</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{pkg.language || 'N/A'}</p>
            </div>
          </div>

          {pkg.topics && pkg.topics.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {pkg.topics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Package
            </button>
            <a
              href={pkg.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
