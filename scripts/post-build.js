#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, '..', '.output', 'public')

// Копируем catalog/index.html в catalog.html
const sourcePath = path.join(publicDir, 'catalog', 'index.html')
const targetPath = path.join(publicDir, 'catalog.html')

if (fs.existsSync(sourcePath)) {
  fs.copyFileSync(sourcePath, targetPath)
  console.log('✅ catalog.html создан')
} else {
  console.log('❌ catalog/index.html не найден')
}
