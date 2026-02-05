import React from 'react';
import { ApplicationManagementPanel } from './ApplicationManagementPanel';
import { KBPermissionPanel } from './KBPermissionPanel';

export function ServiceManagement({ selectedSubModule }) {
  switch(selectedSubModule) {
    case 'apps':
      return <ApplicationManagementPanel />;
    case 'kb_permission':
      return <KBPermissionPanel />;
    // Future sub-modules can be added here
    default:
      return <ApplicationManagementPanel />;
  }
}
