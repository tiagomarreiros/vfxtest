import React from 'react';
import { Box, SafeAreaView } from '@gluestack-ui/themed';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView flex={1} edges={['right', 'left', 'top']}>
            <Box p={15}>
                {children}
            </Box>
        </SafeAreaView>

    );
}