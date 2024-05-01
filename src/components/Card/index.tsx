import React from 'react';
import { Card } from '@gluestack-ui/themed';

export const CardApp = ({ children}: {children: React.ReactNode}) => {
    return (
        <Card size="md" variant="elevated" m="$3">
            {children}
        </Card>
    );
};
