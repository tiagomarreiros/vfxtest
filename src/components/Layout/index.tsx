import { Box } from '@gluestack-ui/themed';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Layout = ({ children }: { children: React.ReactNode }) => {

    const insets = useSafeAreaInsets();
    return (
        <Box
            pl={10}
            pr={10}
            paddingTop={insets.top}
            paddingBottom={insets.bottom}
            flex={1}
        >
            {children}
        </Box>

    );
};
