# Obsidian Plugins

Personal Obsidian plugins for my own use.

## Structure

- `plugins/` - Individual plugin packages
- `vault/` - Development vault for testing plugins
- `scripts/` - Utility scripts

## Development

### Setup

```bash
pnpm install
```

### Build all plugins

```bash
pnpm build
```

### Development mode

```bash
pnpm dev
```

### Install plugins to vault

Install to the included development vault:
```bash
pnpm install-plugins
```

Install to a specific vault:
```bash
pnpm install-plugins /path/to/your/vault
```

The install script creates symlinks from your plugins to the vault's `.obsidian/plugins/` directory for easy development.
