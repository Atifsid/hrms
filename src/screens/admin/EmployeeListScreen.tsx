import { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getEmployees } from '../../api/employees';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '../../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PAGE_SIZE = 6;

export function EmployeeListScreen() {
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AdminStackParamList>>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['employees'],
    queryFn: ({ pageParam = 1 }) => getEmployees(pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const employees = data?.pages.flat() || [];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {isLoading ? (
        <ActivityIndicator color={theme.primary} style={{ marginTop: 0 }} />
      ) : (
        <FlatList
          data={employees}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingTop: 0, marginTop: 0, flexGrow: 1 }}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              <Text style={{ color: theme.text, fontSize: 24 }}>Employees</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EmployeeEdit', { mode: 'add' })
                }
                style={{
                  backgroundColor: theme.primary,
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: theme.card, fontSize: 16 }}>Add</Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: theme.card,
                marginHorizontal: 16,
                marginVertical: 8,
                borderRadius: 8,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={{ color: theme.text, fontSize: 18 }}>
                  {item.name}
                </Text>
                <Text style={{ color: theme.secondary, fontSize: 14 }}>
                  {item.email}
                </Text>
                <Text style={{ color: theme.accent, fontSize: 13 }}>
                  {item.role}
                </Text>
                <Text style={{ color: theme.text, fontSize: 13 }}>
                  Arrival: {item.arrivalTime}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EmployeeEdit', {
                    mode: 'edit',
                    employee: item,
                  })
                }
                style={{
                  backgroundColor: theme.secondary,
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: theme.card }}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator color={theme.primary} />
            ) : null
          }
        />
      )}
    </View>
  );
}
