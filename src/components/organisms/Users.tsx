'use client';

import { getUsersWithPaginationAndFilter, GetUsersWithPaginationAndFilterResponseType } from '@/utils/api/usersApi';
import { debounce } from '@/utils/functions';
import { ICONS_SIZES } from '@/utils/constants';

import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { ArrowDownAZ, ArrowDownZA } from 'lucide-react';

import { Skeleton } from '../shadcn/skeleton';
import { Input } from '../shadcn/input';
import { Button } from '../shadcn/button';
import { UsersList } from './UsersList';
import Heading from '../atoms/Heading';
import { Tooltip, TooltipContent, TooltipTrigger } from '../shadcn/tooltip';

export type UsersPropsType = {
  usersAndPagination: GetUsersWithPaginationAndFilterResponseType;
};

const Users = (props: UsersPropsType) => {
  const { usersAndPagination } = props;
  const t = useTranslations();
  const [users, setUsers] = useState<GetUsersWithPaginationAndFilterResponseType['users']>(usersAndPagination.users);
  const [pagination, setPagination] = useState<GetUsersWithPaginationAndFilterResponseType['pagination']>(usersAndPagination.pagination);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState('');
  const totalPages = Math.ceil(pagination.totalUsers / 10);

  const fetchUsers = async (page?: number, filter?: string, sort?: 'asc' | 'desc') => {
    setIsLoading(true);
    try {
      const response = await getUsersWithPaginationAndFilter(page, filter, sort);

      setUsers(response.users);
      setPagination(response.pagination);
      setIsLoading(false);
    } catch (error) {
      toast.error(t('toast.fetch_users_error'));
      setIsLoading(false);
    }
  };

  const next = async () => {
    if (!pagination.hasMore) {
      return;
    }
    const nextPage = pagination.currentPage + 1;

    fetchUsers(nextPage);
  };

  const previous = async () => {
    if (pagination.currentPage === 1) {
      return;
    }
    const previousPage = pagination.currentPage - 1;

    fetchUsers(previousPage);
  };

  const sortDesc = async () => {
    fetchUsers(1, filter, 'desc');
  };

  const sortAsc = async () => {
    fetchUsers(1, filter, 'asc');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchUsers = useMemo(() => debounce(fetchUsers, 500), []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = e.currentTarget.value;

    setFilter(newFilter);
    debouncedFetchUsers(1, newFilter);
  };

  return (
    <section className="space-y-4">
      <div className="grid w-full items-center gap-2">
        <Heading size="text-2xl" tag="h2">
          {t('filter.title')}
        </Heading>
        <div className="flex gap-2">
          <Input onChange={handleFilterChange} value={filter} id="filter" type="text" placeholder={t('filter.placeholder')} />
          <Tooltip>
            <TooltipTrigger aria-label="sort ascending order" onClick={() => sortAsc()} className="w-10 flex justify-center items-center">
              <ArrowDownAZ size={ICONS_SIZES.sm} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('filter.sort_asc')}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger aria-label="sort descending order" onClick={() => sortDesc()} className="w-10 flex justify-center items-center">
              <ArrowDownZA size={ICONS_SIZES.sm} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('filter.sort_desc')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-32 rounded-xl border" />
          ))}
        </div>
      ) : (
        <UsersList users={users} />
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-muted-foreground">
          {pagination?.currentPage} / {totalPages}
        </p>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => previous()} disabled={pagination?.currentPage === 1}>
            {t('pagination.previous_btn')}
          </Button>
          <Button variant="outline" onClick={() => next()} disabled={pagination?.hasMore === false}>
            {t('pagination.next_btn')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Users;
