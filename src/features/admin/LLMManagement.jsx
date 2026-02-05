import React from 'react';
import { ModelManagementPanel } from './ModelManagementPanel';
import { ModelParametersPanel } from './ModelParametersPanel';
import { PromptManagementPanel } from './PromptManagementPanel';
import { APIManagementPanel } from './APIManagementPanel';

export function LLMManagement({ selectedSubModule }) {
  switch(selectedSubModule) {
    case 'models':
      return <ModelManagementPanel />;
    case 'params':
      return <ModelParametersPanel />;
    case 'prompts':
      return <PromptManagementPanel />;
    case 'apis':
      return <APIManagementPanel />;
    default:
      return <ModelManagementPanel />;
  }
}
