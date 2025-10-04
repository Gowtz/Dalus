import {
  customProvider,
} from 'ai';
import { isDevelopmentEnv } from '@/lib/constants';
import {ollama} from 'ollama-ai-provider-v2';


export const myProvider = isDevelopmentEnv
  ? customProvider({
      languageModels: {
        'llama3.1':ollama('llama3.1:latest'),
        'gemma3': ollama('gemma3'),
        'qwen2.5-coder:3b': ollama('qwen2.5-coder:3b'),
        'qwen2.5-coder:1.5b': ollama('qwen2.5-coder:1.5b'),
      },
    })
  : customProvider({
      languageModels: {
        'chat-model':ollama('llama3.1:latest'),
        'chat-model-reasoning': ollama('llama3.1:latest'),
        'title-model': ollama('gemma3:latest'),
        'artifact-model':ollama('llama3.1:latest'),
      },
    });

