# Playwright image with browsers; version must match @playwright/test in package.json
FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /e2e

# Dependencies are installed in a cached layer, rebuilt only when package*.json change
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
