'use client';

import React, { useState } from 'react';
import { Autocomplete, TextField, CircularProgress, Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { LocationOption } from '@/types/location';
import { TOP_IT_LOCATIONS } from '@/constants/location';

interface Props {
  onLocationSelect: (location: LocationOption | null) => void;
}

export const LocationAutocomplete = ({ onLocationSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly LocationOption[]>([]);
  const loading = open && options.length === 0;

  // 컴포넌트가 열릴 때 데이터를 로드하는 시뮬레이션
  React.useEffect(() => {
    if (!loading) return;

    // 외부 API(예: Google Places) 연동 시 이 부분을 fetch 로직으로 대체
    const timer = setTimeout(() => {
      setOptions([...TOP_IT_LOCATIONS]); // TODO -- API 라던지 로컬 데이터를 이용해 실제 데이터와 유사하게 구현하는 부분 필요
    }, 500);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Autocomplete
      id='location-search'
      size='small'
      sx={{ width: '100%' }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.query === value.query}
      getOptionLabel={(option) => option.display}
      options={options}
      loading={loading}
      onChange={(_, newValue) => onLocationSelect(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label='활동 지역 선택'
          placeholder='도시명을 입력하세요 (예: Seoul)'
          variant='outlined'
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color='inherit' size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { key, ...optionProps } = props as any;
        return (
          <Box
            component='li'
            key={key}
            {...optionProps}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LocationOnIcon sx={{ color: 'text.secondary' }} />
            <Box>
              <Typography variant='body1'>{option.display}</Typography>
              <Typography variant='caption' color='text.secondary'>
                query: location:{option.query}
              </Typography>
            </Box>
          </Box>
        );
      }}
    />
  );
};
