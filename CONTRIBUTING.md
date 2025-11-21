# Contributing to Invest Factors

Thank you for your interest in contributing to Invest Factors! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and constructive in all interactions
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 14.21.3 or higher (use nvm with `.nvmrc` file)
- Yarn package manager
- Git

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/invest-factors.git
   cd invest-factors
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both `/backend` and `/frontend` directories
   - Fill in the required API keys and configuration

5. Start the development server:
   ```bash
   yarn dev
   ```

## Development Workflow

### Branch Naming Convention

Use descriptive branch names with the following prefixes:

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

Example: `feat/add-stock-filtering`, `fix/user-authentication`

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification. Commits are validated using commitlint.

Format: `<type>(<scope>): <subject>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

Examples:
```
feat(stock-list): add filtering by market cap
fix(user-profile): resolve avatar upload issue
docs(readme): update installation instructions
```

### Code Style

- We use ESLint for JavaScript/Vue linting
- Prettier for code formatting
- EditorConfig for consistent editor settings

Code style is automatically enforced via:
- Pre-commit hooks (husky + lint-staged)
- ESLint and Prettier run automatically on staged files

### Testing

- Write unit tests for new features
- Run tests before submitting PR:
  ```bash
  yarn test
  ```

### Pull Request Process

1. Create a new branch from `main`
2. Make your changes following the code style guidelines
3. Write or update tests as needed
4. Ensure all tests pass
5. Commit your changes with conventional commit messages
6. Push to your fork
7. Create a Pull Request to the main repository

#### PR Requirements

- Clear title describing the change
- Description explaining what and why
- Link to related issues (if applicable)
- All tests passing
- No merge conflicts
- At least one approval from maintainers

#### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
```

## Project Structure

```
invest-factors/
├── backend/          # Node.js/Express backend
│   ├── src/
│   │   ├── db/      # Database connections
│   │   ├── services/ # Business logic
│   │   └── utils/   # Utility functions
│   └── index.js     # Server entry point
├── frontend/        # Vue.js frontend
│   ├── src/
│   │   ├── components/ # Vue components
│   │   ├── views/      # Page views
│   │   ├── store/      # Vuex store
│   │   └── router/     # Vue Router
│   └── public/         # Static assets
└── _ci/             # CI/CD scripts
```

## Coding Standards

### JavaScript/Vue

- Use ES6+ features
- Use const/let instead of var
- Use async/await for asynchronous code
- Follow component naming conventions (PascalCase for components)
- Keep components small and focused

### Vue Specific

- Use Composition API for new components
- Follow Vue style guide: https://vuejs.org/style-guide/
- Use scoped styles in components
- Props should be validated with types

### Backend

- Use Express middleware for common functionality
- Validate input data
- Handle errors properly
- Use environment variables for configuration
- Write database queries in dedicated modules

## Security

- Never commit sensitive data (API keys, passwords, etc.)
- Use environment variables for secrets
- Validate and sanitize user input
- Follow OWASP security best practices

## Need Help?

- Check existing issues and pull requests
- Read the README and documentation
- Ask questions in issue comments
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
