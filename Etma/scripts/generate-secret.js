#!/usr/bin/env node

/**
 * Скрипт для генерации случайного секретного ключа для NextAuth
 * Запустите: node scripts/generate-secret.js
 */

const crypto = require('crypto');

// Генерируем случайный секретный ключ длиной 64 символа
const secret = crypto.randomBytes(32).toString('hex');

console.log('🔐 Сгенерированный секретный ключ для NextAuth:');
console.log('');
console.log(`NEXTAUTH_SECRET=${secret}`);
console.log('');
console.log('📝 Скопируйте эту строку в ваш .env.local файл');
console.log('⚠️  Храните этот ключ в секрете и не коммитьте в репозиторий!');
