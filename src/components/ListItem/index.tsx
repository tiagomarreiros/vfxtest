import { Avatar, AvatarImage, Box, HStack, Heading, VStack, VirtualizedList, Text, Pressable } from '@gluestack-ui/themed';
import React from 'react';

export const ListItem = ({ item }) => {
    return (

        <Box
            borderBottomWidth="$1"
            borderColor="$trueGray800"
            sx={{
                _dark: {
                    borderColor: '$trueGray100',
                },
                '@base': {
                    pl: 0,
                    pr: 0,
                },
                '@sm': {
                    pl: '$4',
                    pr: '$5',
                },
            }}
            py="$2"
        >
            <HStack space="md" justifyContent="space-between">

                <VStack>
                    <Text
                        color="$coolGray800"
                        fontWeight="$bold"
                        sx={{
                            _dark: {
                                color: '$warmGray100',
                            },
                        }}
                    >
                        {item.symbol}
                    </Text>
                    <Text
                        color="$coolGray600"
                        sx={{
                            _dark: {
                                color: '$warmGray200',
                            },
                        }}
                    >
                        {item.region}
                    </Text>
                </VStack>
                <VStack justifyContent="center">
                    <Text
                        color="$coolGray800"
                        fontWeight="$bold"
                        sx={{
                            _dark: {
                                color: '$warmGray100',
                            },
                        }}
                    >
                        {item.currency}
                    </Text>

                </VStack>
            </HStack>
        </Box>
    );
};
