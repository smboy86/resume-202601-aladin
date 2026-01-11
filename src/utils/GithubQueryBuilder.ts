interface SearchParams {
  type?: 'user' | 'org';
  identityFilters?: Array<'login' | 'name' | 'email'>;
  location?: string;
  language?: string;
  keyword?: string;
  repoRange?: {
    mode: 'gte' | 'lte' | 'range';
    value?: string;
    start?: string;
    end?: string;
  };
  created?: {
    mode: 'exact' | 'before' | 'after' | 'range';
    value?: string;
    start?: string;
    end?: string;
  };
}

export const buildGithubUserQuery = ({
  type,
  identityFilters,
  location,
  language,
  keyword,
  repoRange,
  created,
}: SearchParams): string => {
  const parts: string[] = [];

  if (type) parts.push(`type:${type}`);
  if (identityFilters && identityFilters.length > 0) {
    parts.push(identityFilters.map((filter) => `in:${filter}`).join(' '));
  }
  if (location) parts.push(`location:${location}`);
  if (language) parts.push(`language:${language}`);
  if (repoRange) {
    if (repoRange.mode === 'range' && repoRange.start && repoRange.end) {
      parts.push(`repos:${repoRange.start}..${repoRange.end}`);
    } else if (repoRange.mode !== 'range' && repoRange.value) {
      const operator = repoRange.mode === 'gte' ? '>=' : '<=';
      parts.push(`repos:${operator}${repoRange.value}`);
    }
  }
  if (created) {
    if (created.mode === 'range' && created.start && created.end) {
      parts.push(`created:${created.start}..${created.end}`);
    } else if (created.mode === 'before' && created.value) {
      parts.push(`created:<${created.value}`);
    } else if (created.mode === 'after' && created.value) {
      parts.push(`created:>${created.value}`);
    } else if (created.mode === 'exact' && created.value) {
      parts.push(`created:${created.value}`);
    }
  }
  if (keyword) parts.push(keyword);

  // 예: "type:user in:login location:seoul repos:>=10 smboy86"
  return parts.join(' ');
};
