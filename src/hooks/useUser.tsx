import { number, queryKeys } from '@/constants';
import { getMyInfo } from '@/services/user';
import { useLoginState } from '@/store/useLoginState';
import { ErrorStatus } from '@/types/common';
import { User } from '@/types/domain/user';
import { useQuery } from '@tanstack/react-query';

function useUser() {
  const { token } = useLoginState();

  const {
    data: users,
    isError,
    error: usersError,
  } = useQuery<User, ErrorStatus>({
    queryKey: [queryKeys.USER.INFO],
    queryFn: getMyInfo,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    enabled: !!token,
  });

  return {
    userInfo: users,
    isLoggedIn: users && !isError && !!token,
    userError: usersError,
    isUserError: isError,
  };
}

export { useUser };
