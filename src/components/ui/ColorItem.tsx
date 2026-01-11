'use client';

import type { ChipProps } from '@mui/material';
import { Box, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import type { ThemeExample } from '@/constants/common';

interface ColorItemProps {
  item: ThemeExample;
}

export const ColorItem = ({ item }: ColorItemProps) => (
  <ListItem className='px-6 py-4' disableGutters>
    <ListItemIcon className='min-w-0 pr-4'>
      <Box sx={{ width: 14, height: 14, borderRadius: '999px', bgcolor: item.color }} />
    </ListItemIcon>
    <ListItemText
      primary={<span className='font-medium text-zinc-900 dark:text-zinc-100'>{item.title}</span>}
      secondary={item.description}
    />
    <Chip label={item.title} color={item.key as Exclude<ChipProps['color'], undefined>} size='small' />
  </ListItem>
);
