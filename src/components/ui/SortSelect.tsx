import { MenuItem, TextField } from '@mui/material';

export type SortOption = 'default' | 'followers' | 'repositories' | 'joined';

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

const SORT_LABELS: Record<SortOption, string> = {
  default: '기본',
  followers: 'followers',
  repositories: 'repositories',
  joined: 'joined',
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <TextField
      select
      size='small'
      label='정렬 기준'
      value={value}
      onChange={(event) => onChange(event.target.value as SortOption)}
      className='min-w-[180px]'
    >
      {Object.entries(SORT_LABELS).map(([key, label]) => (
        <MenuItem key={key} value={key}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
}
