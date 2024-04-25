import { Avatar, AvatarImage, Box, HStack, Heading, VStack, VirtualizedList, Text } from '@gluestack-ui/themed';
import React from 'react';

export const List = ({ data_ }: { data_: unknown }) => {
    console.log('data___', data_)

    function getItemCount(_data) {
        return data_.length
    }
    function getItem(_data, index) {
        return data_[index]
    }

    return (
        <>
            <Box>
                <VirtualizedList
                    getItemCount={getItemCount}
                    getItem={getItem}
                    renderItem={({ item }) => (
                        <Box
                            borderBottomWidth="$1"
                            borderColor="$trueGray800"
                            sx={{
                                _dark: {
                                    borderColor: "$trueGray100",
                                },
                                "@base": {
                                    pl: 0,
                                    pr: 0,
                                },
                                "@sm": {
                                    pl: "$4",
                                    pr: "$5",
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
                                        {item["1. symbol"]}
                                    </Text>
                                    <Text
                                        color="$coolGray600"
                                        sx={{
                                            _dark: {
                                                color: "$warmGray200",
                                            },
                                        }}
                                    >
                                        {item["4. region"]}
                                    </Text>
                                </VStack>
                                <VStack justifyContent='center'>
                                    <Text
                                        color="$coolGray800"
                                        fontWeight="$bold"
                                        sx={{
                                            _dark: {
                                                color: '$warmGray100',
                                            },
                                        }}
                                    >
                                        {item["8. currency"]}
                                    </Text>

                                </VStack>
                            </HStack>
                        </Box>
                    )}
                />
            </Box>
        </>
    )
};
