# Control - AI Web Automation Extension

Control is a polished, ChatGPT-style AI web automation Chrome extension that helps you navigate the web, extract information, and complete tasks with a completely redesigned UI and enhanced user experience.

## Features

- **Modern, ChatGPT-like Interface**: Clean black and white theme with professional styling
- **Light/Dark Mode Support**: Automatically adapts to your system preferences or can be manually toggled
- **Streamlined Workflow**: Input at the bottom, right-aligned user messages, left-aligned AI responses
- **Collapsible Agent Logs**: Planner, Navigator, and Validator logs are hidden by default but accessible via dropdown
- **Professional Design**: Uses Inter font and professional SVG icons for a polished look
- **Flexible Model Support**: Works with various LLM providers including OpenAI, Anthropic, Google, and Ollama

## Installation

### Development Setup

1. Clone this repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Start the development server:
   ```
   pnpm dev
   ```

### Loading in Chrome

1. Build the extension:
   ```
   pnpm build
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the `dist` directory from this project

## File Structure

### Chrome Extension
- `chrome-extension/manifest.js`: Extension manifest configuration
- `chrome-extension/public/`: Public assets including icons and scripts
- `chrome-extension/src/background/`: Background service worker code

### Pages
- `pages/side-panel/`: Main UI for the extension sidebar
  - `src/SidePanel.tsx`: Main component for the sidebar UI
  - `src/components/`: UI components for the sidebar
  - `src/SidePanel.css`: Styling for the sidebar
- `pages/options/`: Settings page for the extension
  - `src/Options.tsx`: Main component for the settings page
  - `src/components/`: UI components for settings
- `pages/content/`: Content scripts injected into web pages

### Packages
- `packages/i18n/`: Internationalization support
- `packages/storage/`: Storage management for extension data
- `packages/ui/`: Shared UI components and utilities
- `packages/tailwind-config/`: Tailwind CSS configuration

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

<!-- ## Acknowledgments

Control is a fork of [Nanobrowser](https://github.com/nanobrowser/nanobrowser). All credit for the core functionality goes to the original authors. -->