import React, { memo, useCallback, useState } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PAGE_SIZE = 6;

const EmployeeListItem = memo(({ item, theme, onEdit }: any) => (
  <View style={employeeItemStyle(theme)}>
    <View>
      <Text style={{ color: theme.text, fontSize: 18 }}>{item.name}</Text>
      <Text style={{ color: theme.secondary, fontSize: 14 }}>{item.email}</Text>
      <Text style={{ color: theme.accent, fontSize: 13 }}>{item.role}</Text>
      <Text style={{ color: theme.text, fontSize: 13 }}>
        Arrival: {item.arrivalTime}
      </Text>
    </View>
    <TouchableOpacity onPress={() => onEdit(item)} style={editBtnStyle(theme)}>
      <FontAwesome5 name="user-edit" size={14} color={theme.card} />
      <Text style={{ color: theme.card, fontSize: 14, marginLeft: 8 }}>
        Edit
      </Text>
    </TouchableOpacity>
  </View>
));

function employeeItemStyle(theme: any) {
  return {
    backgroundColor: theme.card,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  };
}
function editBtnStyle(theme: any) {
  return {
    backgroundColor: theme.secondary,
    paddingHorizontal: 10,
    paddingVertical: 7,
    paddingRight: 14,
    borderRadius: 8,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  };
}

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

  const handleEdit = useCallback(
    (item: any) => {
      navigation.navigate('EmployeeEdit', {
        mode: 'edit',
        employee: item,
      });
    },
    [navigation],
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {isLoading ? (
        <ActivityIndicator color={theme.primary} style={{ marginTop: 0 }} />
      ) : (
        <>
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
                paddingHorizontal: 10,
                paddingVertical: 7,
                paddingRight: 14,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Ionicons name="person-add" size={14} color={theme.card} />
              <Text style={{ color: theme.card, fontSize: 14 }}>Add</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={employees}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingTop: 0, marginTop: 0, flexGrow: 1 }}
            renderItem={({ item }) => (
              <EmployeeListItem item={item} theme={theme} onEdit={handleEdit} />
            )}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <View style={{ padding: 16, alignItems: 'center' }}>
                  <ActivityIndicator color={theme.primary} />
                  <Text style={{ color: theme.secondary, marginTop: 8 }}>
                    Loading more…
                  </Text>
                </View>
              ) : null
            }
            initialNumToRender={PAGE_SIZE * 2}
            windowSize={7}
            maxToRenderPerBatch={PAGE_SIZE}
            updateCellsBatchingPeriod={30}
            removeClippedSubviews={true}
          />
        </>
      )}
    </View>
  );
}
