'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';
import { useEffect } from 'react';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage',
    bootstrap: {
      distinctID: 'anonymous_user',
      isIdentifiedID: false
    },
    loaded: (posthog) => {
      // Set useful properties
      posthog.register({
        app_version: '1.0.0',
        platform: 'web',
        environment: process.env.NODE_ENV,
        screen_size: `${window.innerWidth}x${window.innerHeight}`,
        viewport_size: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
        user_agent: window.navigator.userAgent,
        language: window.navigator.language,
      });
    }
  });
}

export function PostHogPageview(): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      // Track pageview with current URL
      posthog.capture('$pageview', {
        $current_url: url,
        referrer: document.referrer,
        pathname: pathname,
        search_params: Object.fromEntries(searchParams?.entries() || []),
      });
    }
  }, [pathname, searchParams]);

  return <></>;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={posthog}>{children}</Provider>;
}

// Utility functions for tracking events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  posthog.capture(eventName, properties);
};

export const trackSnippetEvent = (action: 'create' | 'delete' | 'view', snippetId: string, properties?: Record<string, any>) => {
  trackEvent(`snippet_${action}`, {
    snippet_id: snippetId,
    ...properties
  });
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  posthog.identify(userId, properties);
}; 