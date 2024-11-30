'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AuthStorageKey } from '@/constants/Storage';
import { useAuthContext } from '@/context/AuthContext';

import Style from './style.module.scss';

function ProfileSidebar() {
  const router = useRouter();
  const [isCollapse, setIsCollapse] = useState(false);
  const authContext = useAuthContext();

  const collapsibleCtx = classNames({
    'w-20': isCollapse,
    'w-64': !isCollapse,
  });

  function onLogoutOut() {
    if (authContext?.onRefreshAuthContext) {
      localStorage.removeItem(AuthStorageKey);
      authContext.onRefreshAuthContext();
      router.push('/auth/login');
    }
  }

  return (
    <aside
      className={classNames(
        collapsibleCtx,
        'hidden md:block max-w-[200px]',
        Style['sidebar-wrapper']
      )}
    >
      <div className={Style['sidebar-content']}>
        <ul>
          <Link href="/admin/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link href="/admin/order">
            <li>Order</li>
          </Link>
          <Link href="/admin/booth">
            <li>Booth</li>
          </Link>
          <Link href="/admin/booth-type">
            <li>Booth Type</li>
          </Link>
          <Link href="/admin/event">
            <li>Event</li>
          </Link>
          <Link href="/admin/exhibition">
            <li>Exhibition</li>
          </Link>
          <li onClick={onLogoutOut}>Logout</li>
        </ul>
      </div>
    </aside>
  );
}

export default ProfileSidebar;
