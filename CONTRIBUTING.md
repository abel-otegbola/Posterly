# Contributing to Posterly 🎨

Thank you for your interest in contributing to Posterly! We welcome contributions from the community and are grateful for your support.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please be respectful, inclusive, and considerate in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/posterly.git
   cd posterly
   ```
3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/original-owner/posterly.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up environment variables** (see README.md for details):
   ```bash
   cp .env.example .env.local
   # Add your API keys to .env.local
   ```
6. **Run the development server**:
   ```bash
   npm run dev
   ```

## How to Contribute

### Types of Contributions We're Looking For

- 🐛 **Bug fixes**: Help us squash bugs
- ✨ **New features**: Add new capabilities to Posterly
- 📝 **Documentation**: Improve or add documentation
- 🎨 **Templates**: Create new creative poster templates
- 🎯 **UI/UX improvements**: Enhance the user experience
- ⚡ **Performance optimizations**: Make Posterly faster
- 🧪 **Tests**: Add or improve test coverage
- 🌐 **Translations**: Help make Posterly multilingual

## Development Workflow

1. **Create a new branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following our [coding standards](#coding-standards)

3. **Test your changes** thoroughly:
   ```bash
   npm run build
   npm run dev
   ```

4. **Commit your changes** with a meaningful message:
   ```bash
   git add .
   git commit -m "feat: add new gradient template"
   ```

5. **Keep your branch updated** with upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** from your fork to the main repository

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use meaningful variable and function names

### React/Next.js

- Use functional components with hooks
- Follow the existing component structure
- Keep components focused and reusable
- Use proper prop typing with TypeScript interfaces

### Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Maintain consistent spacing and color usage
- Ensure responsive design for all screen sizes

### Code Quality

- Write clean, readable code
- Add comments for complex logic
- Remove console.logs before committing
- Follow the existing code structure and patterns

### File Organization

```
src/
├── app/              # Next.js app router pages
│   ├── api/         # API routes
│   └── [page]/      # Page components
└── components/       # Reusable components
    └── [component]/ # Component folders
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(templates): add cyberpunk template design
fix(editor): resolve text positioning bug on mobile
docs(readme): update installation instructions
style(button): improve hover state styling
refactor(api): optimize image generation endpoint
```

## Pull Request Process

1. **Update documentation** if needed (README, comments, etc.)
2. **Ensure all tests pass** and the build succeeds
3. **Update the CHANGELOG.md** with your changes (if applicable)
4. **Fill out the PR template** with all required information
5. **Link related issues** using keywords (e.g., "Fixes #123")
6. **Request review** from maintainers
7. **Address feedback** promptly and professionally
8. **Wait for approval** before merging

### PR Title Format

Use the same format as commit messages:
```
feat(templates): add new minimalist template
```

### PR Checklist

Before submitting, ensure:
- [ ] Code follows the project's coding standards
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tested on multiple screen sizes
- [ ] API keys and secrets not committed

## Reporting Bugs

### Before Submitting a Bug Report

- Check the existing issues to avoid duplicates
- Ensure you're using the latest version
- Verify the bug is reproducible

### How to Submit a Bug Report

Create an issue with the following information:

**Title**: Brief, descriptive title

**Description**:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details:
  - OS and version
  - Browser and version
  - Node.js version
  - npm/yarn version

**Example**:
```markdown
## Bug Description
Text editor crashes when deleting the last text element

## Steps to Reproduce
1. Create a new poster
2. Delete all text elements except one
3. Click delete on the last element
4. Application crashes

## Expected Behavior
Should handle deletion gracefully or prevent deletion of last element

## Actual Behavior
Application throws error and becomes unresponsive

## Environment
- OS: Windows 11
- Browser: Chrome 120
- Node.js: 20.10.0
```

## Feature Requests

We love hearing ideas for new features! Before submitting:

1. **Check existing feature requests** to avoid duplicates
2. **Consider the scope**: Does it fit the project's vision?
3. **Think about implementation**: How might it work?

### How to Submit a Feature Request

Create an issue with:

- **Title**: Clear, concise feature description
- **Problem**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other approaches considered
- **Additional Context**: Screenshots, mockups, examples

## Adding New Templates

Templates are a great way to contribute! Here's how:

1. **Design your template** with creative styling
2. **Add it to the POSTER_TEMPLATES array** in `src/components/text-editor/TextEditor.tsx`
3. **Follow the template structure**:
   ```typescript
   {
       name: "Template Name",
       description: "Brief description",
       styles: [
           { fontSize: 48, color: "#...", bgColor: "...", x: 30, y: 30, width: 80, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.02em" },
           // ... 3 more text styles
       ]
   }
   ```
4. **Test thoroughly** with different content lengths
5. **Submit a PR** with screenshots of your template

## Questions?

If you have questions about contributing:
- Open a discussion on GitHub
- Check existing documentation
- Reach out to maintainers

## Recognition

All contributors will be recognized in our README.md and release notes. Thank you for making Posterly better! 🎉

---

**Happy Contributing!** 🚀
