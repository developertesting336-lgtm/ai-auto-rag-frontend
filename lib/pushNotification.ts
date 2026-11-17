/**
 * Browser Push & System Notification Manager
 * Handles user permission requests, permission state tracking,
 * and dispatching desktop push notifications on AI model health check alerts.
 */

export type NotificationPermissionState = 'granted' | 'denied' | 'default' | 'unsupported';

/**
 * Check if the browser supports standard HTML5 Web Notifications
 */
export function isNotificationSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'Notification' in window;
}

/**
 * Get current permission state ('granted', 'denied', 'default', 'unsupported')
 */
export function getNotificationPermission(): NotificationPermissionState {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission as NotificationPermissionState;
}

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }

  try {
    const permission = await Notification.requestPermission();
    if (typeof window !== 'undefined') {
      localStorage.setItem('autoflow_push_permission', permission);
    }
    return permission as NotificationPermissionState;
  } catch (err) {
    console.warn('[PushNotification] Error requesting permission:', err);
    return Notification.permission as NotificationPermissionState;
  }
}

/**
 * Trigger a desktop push notification
 */
export function showPushNotification(
  title: string,
  options?: {
    body?: string;
    icon?: string;
    tag?: string;
    data?: any;
    onClickUrl?: string;
  }
): boolean {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }

  try {
    const notification = new Notification(title, {
      body: options?.body,
      icon: options?.icon || '/favicon.ico',
      tag: options?.tag || 'ai-model-health-alert',
      data: options?.data,
    });

    notification.onclick = () => {
      window.focus();
      if (options?.onClickUrl && typeof window !== 'undefined') {
        window.location.href = options.onClickUrl;
      }
      notification.close();
    };

    return true;
  } catch (err) {
    console.warn('[PushNotification] Failed to show notification:', err);
    return false;
  }
}

export default {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  showPushNotification,
};
